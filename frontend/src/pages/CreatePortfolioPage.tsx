import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Upload, 
  FileText, 
  Edit3, 
  Github, 
  Sparkles, 
  Loader2, 
  CheckCircle2, 
  AlertCircle,
  ArrowRight,
  FolderGit2
} from 'lucide-react';
import { parseResumeFile } from '../services/parser';
import { aiClient } from '../services/ai/aiClient';
import { fetchGitHubUserRepos, convertReposToProjects, GitHubRepo } from '../services/github/githubApi';
import { usePortfolio } from '../context/PortfolioContext';
import { Portfolio, PortfolioData } from '../types/portfolio';
import { DEFAULT_SECTIONS, SAMPLE_DEVELOPER_DATA } from '../data/samplePortfolios';
import { Navbar } from '../components/common/Navbar';

type IngestTab = 'upload' | 'paste' | 'manual' | 'github';

export const CreatePortfolioPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<IngestTab>('upload');
  const [isProcessing, setIsProcessing] = useState(false);
  const [loadingStep, setLoadingStep] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Paste state
  const [pastedText, setPastedText] = useState('');

  // GitHub state
  const [githubUsername, setGithubUsername] = useState('');
  const [githubRepos, setGithubRepos] = useState<GitHubRepo[]>([]);
  const [selectedRepoIds, setSelectedRepoIds] = useState<number[]>([]);
  const [fetchingRepos, setFetchingRepos] = useState(false);

  // Manual state
  const [manualName, setManualName] = useState('');
  const [manualHeadline, setManualHeadline] = useState('');
  const [manualAbout, setManualAbout] = useState('');
  const [manualSkills, setManualSkills] = useState('');

  const { createPortfolio } = usePortfolio();
  const navigate = useNavigate();

  const handleCreateAndNavigate = async (portfolioData: PortfolioData, sourceName: string) => {
    const portfolioId = `portfolio-${Date.now()}`;
    const newPortfolio: Portfolio = {
      id: portfolioId,
      name: portfolioData.personal.name ? `${portfolioData.personal.name}’s Portfolio` : `${sourceName} Portfolio`,
      style: 'developer',
      template: 'variantA',
      theme: 'dark',
      sections: DEFAULT_SECTIONS,
      portfolioData,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    await createPortfolio(newPortfolio);
    navigate(`/builder/${portfolioId}`);
  };

  // 1. Handle File Upload
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setErrorMessage(null);
    setIsProcessing(true);

    try {
      setLoadingStep('Reading your document...');
      await new Promise(r => setTimeout(r, 400));
      const extractedText = await parseResumeFile(file);

      if (!extractedText || extractedText.length < 20) {
        throw new Error('Extracted text was too short or empty. Please verify your document contents.');
      }

      setLoadingStep('Understanding your experience & accomplishments...');
      await new Promise(r => setTimeout(r, 600));

      setLoadingStep('Organizing your skills & tech stack...');
      const portfolioData = await aiClient.parseResume(extractedText);

      setLoadingStep('Generating your custom portfolio...');
      await new Promise(r => setTimeout(r, 400));

      await handleCreateAndNavigate(portfolioData, file.name.split('.')[0]);
    } catch (err: any) {
      setErrorMessage(err.message || 'Failed to process document. You can try pasting text directly.');
      setIsProcessing(false);
    }
  };

  // 2. Handle Paste Text
  const handlePasteSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!pastedText.trim()) return;

    setErrorMessage(null);
    setIsProcessing(true);

    try {
      setLoadingStep('Analyzing pasted profile content with AI...');
      const portfolioData = await aiClient.parseResume(pastedText);

      setLoadingStep('Structuring portfolio sections...');
      await new Promise(r => setTimeout(r, 400));

      await handleCreateAndNavigate(portfolioData, 'Custom Profile');
    } catch (err: any) {
      setErrorMessage(err.message || 'Failed to parse text.');
      setIsProcessing(false);
    }
  };

  // 3. Handle GitHub Import
  const handleFetchRepos = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!githubUsername.trim()) return;

    setErrorMessage(null);
    setFetchingRepos(true);

    try {
      const repos = await fetchGitHubUserRepos(githubUsername);
      setGithubRepos(repos);
      setSelectedRepoIds(repos.slice(0, 4).map(r => r.id));
    } catch (err: any) {
      setErrorMessage(err.message || 'Failed to fetch repositories.');
    } finally {
      setFetchingRepos(false);
    }
  };

  const handleImportGitHub = async () => {
    const selected = githubRepos.filter(r => selectedRepoIds.includes(r.id));
    if (selected.length === 0) {
      setErrorMessage('Please select at least one repository to import.');
      return;
    }

    setIsProcessing(true);
    setLoadingStep('Importing GitHub repositories and polishing descriptions with AI...');

    try {
      const convertedProjects = convertReposToProjects(selected);
      const enhancedProjects = await aiClient.improveProjects(convertedProjects);

      const baseData: PortfolioData = {
        ...SAMPLE_DEVELOPER_DATA,
        personal: {
          ...SAMPLE_DEVELOPER_DATA.personal,
          name: githubUsername,
          headline: 'Full-Stack Developer & Open Source Contributor',
        },
        social: {
          ...SAMPLE_DEVELOPER_DATA.social,
          github: `https://github.com/${githubUsername}`,
        },
        projects: enhancedProjects,
      };

      await handleCreateAndNavigate(baseData, `${githubUsername} GitHub`);
    } catch (err: any) {
      setErrorMessage(err.message || 'Failed to build portfolio from GitHub.');
      setIsProcessing(false);
    }
  };

  // 4. Handle Manual Entry
  const handleManualSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!manualName.trim()) return;

    const skillsArray = manualSkills
      .split(',')
      .map(s => s.trim())
      .filter(Boolean)
      .map(name => ({ name, category: 'Technical' }));

    const manualData: PortfolioData = {
      ...SAMPLE_DEVELOPER_DATA,
      personal: {
        ...SAMPLE_DEVELOPER_DATA.personal,
        name: manualName,
        headline: manualHeadline || 'Software Developer',
      },
      about: manualAbout || 'Passionate developer dedicated to creating high quality web applications.',
      skills: skillsArray.length > 0 ? skillsArray : SAMPLE_DEVELOPER_DATA.skills,
    };

    setIsProcessing(true);
    setLoadingStep('Assembling your custom portfolio...');
    await handleCreateAndNavigate(manualData, manualName);
  };

  return (
    <div className="min-h-screen bg-[#070a12] text-slate-100 flex flex-col">
      <Navbar />

      <main className="flex-1 max-w-4xl w-full mx-auto px-4 sm:px-6 py-12">
        <div className="text-center max-w-xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 mb-4">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>AI Portfolio Ingest Engine</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-white">
            Create Your Portfolio
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-2">
            Choose your preferred method to import your skills and background.
          </p>
        </div>

        {/* Ingest Method Tabs */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 p-1.5 rounded-2xl bg-slate-900 border border-slate-800 mb-8">
          {[
            { id: 'upload' as const, label: 'Upload Resume', icon: Upload },
            { id: 'paste' as const, label: 'Paste Content', icon: FileText },
            { id: 'github' as const, label: 'GitHub Import', icon: Github },
            { id: 'manual' as const, label: 'Manual Entry', icon: Edit3 },
          ].map(tab => {
            const Icon = tab.icon;
            const isCurrent = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id);
                  setErrorMessage(null);
                }}
                className={`py-3 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 ${
                  isCurrent
                    ? 'bg-indigo-600 text-white shadow-md'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Error Message Bar */}
        {errorMessage && (
          <div className="mb-6 p-4 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-3">
            <AlertCircle className="w-5 h-5 flex-shrink-0 text-rose-400" />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* Loading Progress State */}
        {isProcessing && (
          <div className="p-12 rounded-3xl bg-slate-900/80 border border-slate-800 text-center space-y-6 shadow-2xl backdrop-blur-xl">
            <div className="relative w-16 h-16 mx-auto">
              <div className="w-16 h-16 rounded-2xl bg-indigo-600/20 flex items-center justify-center animate-pulse">
                <Sparkles className="w-8 h-8 text-cyan-400" />
              </div>
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-bold text-white">AI Engine Working</h3>
              <p className="text-sm font-medium text-indigo-300 flex items-center justify-center gap-2">
                <Loader2 className="w-4 h-4 animate-spin text-cyan-400" />
                <span>{loadingStep || 'Processing...'}</span>
              </p>
            </div>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              Extracting structured sections, synthesizing clean headlines, and preparing live visual builder.
            </p>
          </div>
        )}

        {/* TAB 1: UPLOAD RESUME */}
        {!isProcessing && activeTab === 'upload' && (
          <div className="p-8 sm:p-12 rounded-3xl bg-slate-900/60 border border-slate-800 text-center relative overflow-hidden">
            <input
              type="file"
              id="resume-upload"
              accept=".pdf,.docx,.txt"
              onChange={handleFileUpload}
              className="hidden"
            />
            <label
              htmlFor="resume-upload"
              className="cursor-pointer flex flex-col items-center justify-center border-2 border-dashed border-slate-700 hover:border-indigo-500 rounded-2xl p-10 transition-all bg-slate-950/40 hover:bg-slate-900/60 group"
            >
              <div className="w-16 h-16 rounded-2xl bg-indigo-500/10 text-indigo-400 group-hover:scale-110 group-hover:bg-indigo-500/20 transition-all flex items-center justify-center mb-4">
                <Upload className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-bold text-white mb-1">
                Drop your resume here, or <span className="text-cyan-400 underline">browse</span>
              </h3>
              <p className="text-xs text-slate-400 mb-4">
                Supports PDF, DOCX, or TXT (Max 15MB)
              </p>
              <div className="flex items-center gap-3 text-[11px] text-slate-500">
                <span>✓ Private Client Parsing</span>
                <span>✓ Strict JSON Schema</span>
                <span>✓ 100% Free</span>
              </div>
            </label>
          </div>
        )}

        {/* TAB 2: PASTE CONTENT */}
        {!isProcessing && activeTab === 'paste' && (
          <form onSubmit={handlePasteSubmit} className="p-8 rounded-3xl bg-slate-900/60 border border-slate-800 space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-2">
                Paste your resume, LinkedIn summary, or bio text:
              </label>
              <textarea
                rows={10}
                required
                value={pastedText}
                onChange={e => setPastedText(e.target.value)}
                placeholder="Paste your education, work experience, projects, skills, or full resume text here..."
                className="w-full p-4 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs leading-relaxed focus:outline-none focus:border-indigo-500"
              />
            </div>
            <button
              type="submit"
              className="w-full py-3.5 rounded-xl font-bold text-sm bg-gradient-to-r from-indigo-500 to-cyan-500 text-white hover:from-indigo-600 hover:to-cyan-600 transition-all flex items-center justify-center gap-2 shadow-lg shadow-indigo-500/20"
            >
              <Sparkles className="w-4 h-4" />
              <span>Generate Structured Portfolio with AI</span>
            </button>
          </form>
        )}

        {/* TAB 3: GITHUB IMPORT */}
        {!isProcessing && activeTab === 'github' && (
          <div className="p-8 rounded-3xl bg-slate-900/60 border border-slate-800 space-y-6">
            <form onSubmit={handleFetchRepos} className="flex gap-2">
              <input
                type="text"
                required
                value={githubUsername}
                onChange={e => setGithubUsername(e.target.value)}
                placeholder="Enter public GitHub username (e.g. torvalds or your username)"
                className="flex-1 px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-indigo-500"
              />
              <button
                type="submit"
                disabled={fetchingRepos}
                className="px-5 py-2.5 rounded-xl font-bold text-xs bg-indigo-600 hover:bg-indigo-500 text-white transition-colors flex items-center gap-1.5"
              >
                {fetchingRepos ? <Loader2 className="w-4 h-4 animate-spin" /> : <FolderGit2 className="w-4 h-4" />}
                <span>Fetch Repos</span>
              </button>
            </form>

            {githubRepos.length > 0 && (
              <div className="space-y-4 pt-4 border-t border-slate-800">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-white">
                    Select Repositories to Feature ({selectedRepoIds.length} selected):
                  </span>
                  <button
                    type="button"
                    onClick={() => {
                      if (selectedRepoIds.length === githubRepos.length) {
                        setSelectedRepoIds([]);
                      } else {
                        setSelectedRepoIds(githubRepos.map(r => r.id));
                      }
                    }}
                    className="text-[11px] text-cyan-400 hover:underline"
                  >
                    Toggle All
                  </button>
                </div>

                <div className="space-y-2.5 max-h-72 overflow-y-auto pr-1">
                  {githubRepos.map(repo => {
                    const isChecked = selectedRepoIds.includes(repo.id);
                    return (
                      <div
                        key={repo.id}
                        onClick={() => {
                          if (isChecked) {
                            setSelectedRepoIds(selectedRepoIds.filter(id => id !== repo.id));
                          } else {
                            setSelectedRepoIds([...selectedRepoIds, repo.id]);
                          }
                        }}
                        className={`p-3 rounded-xl border text-xs cursor-pointer transition-all flex items-start gap-3 ${
                          isChecked
                            ? 'bg-indigo-600/20 border-indigo-500 text-white'
                            : 'bg-slate-950/60 border-slate-800 text-slate-300 hover:border-slate-700'
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => {}}
                          className="mt-0.5 rounded text-indigo-600"
                        />
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <span className="font-bold text-white">{repo.name}</span>
                            <span className="text-[10px] text-slate-400">★ {repo.stargazers_count}</span>
                          </div>
                          <p className="text-slate-400 text-[11px] mt-0.5 line-clamp-1">{repo.description}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <button
                  type="button"
                  onClick={handleImportGitHub}
                  className="w-full py-3.5 rounded-xl font-bold text-sm bg-gradient-to-r from-indigo-500 to-cyan-500 text-white transition-all flex items-center justify-center gap-2 shadow-lg shadow-indigo-500/20"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Import Selected & Refine with AI</span>
                </button>
              </div>
            )}
          </div>
        )}

        {/* TAB 4: MANUAL ENTRY */}
        {!isProcessing && activeTab === 'manual' && (
          <form onSubmit={handleManualSubmit} className="p-8 rounded-3xl bg-slate-900/60 border border-slate-800 space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Your Full Name</label>
              <input
                type="text"
                required
                value={manualName}
                onChange={e => setManualName(e.target.value)}
                placeholder="e.g. Jordan Lee"
                className="w-full px-3 py-2 text-xs rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Headline / Primary Role</label>
              <input
                type="text"
                value={manualHeadline}
                onChange={e => setManualHeadline(e.target.value)}
                placeholder="e.g. Full Stack Engineer | React & Cloud"
                className="w-full px-3 py-2 text-xs rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">About Summary</label>
              <textarea
                rows={4}
                value={manualAbout}
                onChange={e => setManualAbout(e.target.value)}
                placeholder="Brief paragraph on your passion, key strengths, and goals..."
                className="w-full px-3 py-2 text-xs rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Core Skills (comma separated)</label>
              <input
                type="text"
                value={manualSkills}
                onChange={e => setManualSkills(e.target.value)}
                placeholder="React, TypeScript, Node.js, Python, PostgreSQL, AWS"
                className="w-full px-3 py-2 text-xs rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-indigo-500"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-xl font-bold text-sm bg-gradient-to-r from-indigo-500 to-cyan-500 text-white transition-all flex items-center justify-center gap-2 shadow-lg shadow-indigo-500/20"
            >
              <span>Build Portfolio</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        )}
      </main>
    </div>
  );
};
