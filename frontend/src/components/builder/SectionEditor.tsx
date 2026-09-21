import React, { useState } from 'react';
import { Sparkles, Plus, Trash2, Check, X, Loader2, ArrowRight } from 'lucide-react';
import { PortfolioData, PortfolioSection, SkillItem, ProjectItem, ExperienceItem } from '../../types/portfolio';
import { aiClient } from '../../services/ai/aiClient';

interface SectionEditorProps {
  section: PortfolioSection;
  portfolioData: PortfolioData;
  onUpdate: (updater: (prev: PortfolioData) => PortfolioData) => void;
}

export const SectionEditor: React.FC<SectionEditorProps> = ({
  section,
  portfolioData,
  onUpdate,
}) => {
  // AI Assistant State
  const [aiLoading, setAiLoading] = useState(false);
  const [aiSuggestion, setAiSuggestion] = useState<{ field: string; original: string; text: string } | null>(null);

  const handleAiAssist = async (
    field: string,
    currentText: string,
    action: 'improve' | 'professional' | 'shorten' | 'engaging'
  ) => {
    if (!currentText.trim()) return;
    setAiLoading(true);
    try {
      const improved = await aiClient.assistText(action, currentText);
      setAiSuggestion({ field, original: currentText, text: improved });
    } catch (err) {
      console.error('AI assist failed:', err);
    } finally {
      setAiLoading(false);
    }
  };

  const renderAiButtons = (field: string, text: string) => (
    <div className="flex flex-wrap items-center gap-1.5 mt-2">
      <span className="text-[10px] uppercase font-bold text-indigo-400 flex items-center gap-1">
        <Sparkles className="w-3 h-3" /> AI Assistant:
      </span>
      <button
        type="button"
        disabled={aiLoading}
        onClick={() => handleAiAssist(field, text, 'improve')}
        className="px-2 py-0.5 rounded text-[11px] font-medium bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-300 border border-indigo-500/20 transition-colors disabled:opacity-50"
      >
        ✨ Improve
      </button>
      <button
        type="button"
        disabled={aiLoading}
        onClick={() => handleAiAssist(field, text, 'professional')}
        className="px-2 py-0.5 rounded text-[11px] font-medium bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-300 border border-indigo-500/20 transition-colors disabled:opacity-50"
      >
        👔 Professional
      </button>
      <button
        type="button"
        disabled={aiLoading}
        onClick={() => handleAiAssist(field, text, 'shorten')}
        className="px-2 py-0.5 rounded text-[11px] font-medium bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-300 border border-indigo-500/20 transition-colors disabled:opacity-50"
      >
        ✂️ Shorten
      </button>
      <button
        type="button"
        disabled={aiLoading}
        onClick={() => handleAiAssist(field, text, 'engaging')}
        className="px-2 py-0.5 rounded text-[11px] font-medium bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-300 border border-indigo-500/20 transition-colors disabled:opacity-50"
      >
        🔥 Engaging
      </button>
    </div>
  );

  return (
    <div className="p-4 space-y-6">
      <div className="border-b border-slate-800 pb-3">
        <h3 className="text-base font-bold text-white flex items-center gap-2">
          <span>Edit {section.title}</span>
        </h3>
        <p className="text-xs text-slate-400">Updates will reflect immediately in live preview</p>
      </div>

      {/* AI Suggestion Approval Bar */}
      {aiSuggestion && (
        <div className="p-3.5 rounded-xl bg-indigo-950/60 border border-indigo-500/40 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-cyan-400 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" /> AI Suggestion
            </span>
            <div className="flex items-center gap-1.5">
              <button
                onClick={() => {
                  // Apply suggestion to the target field
                  if (aiSuggestion.field === 'about') {
                    onUpdate(prev => ({ ...prev, about: aiSuggestion.text }));
                  } else if (aiSuggestion.field === 'headline') {
                    onUpdate(prev => ({
                      ...prev,
                      personal: { ...prev.personal, headline: aiSuggestion.text },
                    }));
                  } else if (aiSuggestion.field.startsWith('project-desc-')) {
                    const idx = parseInt(aiSuggestion.field.replace('project-desc-', ''), 10);
                    onUpdate(prev => {
                      const projects = [...prev.projects];
                      if (projects[idx]) projects[idx].description = aiSuggestion.text;
                      return { ...prev, projects };
                    });
                  } else if (aiSuggestion.field.startsWith('exp-desc-')) {
                    const idx = parseInt(aiSuggestion.field.replace('exp-desc-', ''), 10);
                    onUpdate(prev => {
                      const experience = [...prev.experience];
                      if (experience[idx]) experience[idx].description = aiSuggestion.text;
                      return { ...prev, experience };
                    });
                  }
                  setAiSuggestion(null);
                }}
                className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-emerald-500 hover:bg-emerald-600 text-slate-950 flex items-center gap-1"
              >
                <Check className="w-3.5 h-3.5" />
                <span>Accept</span>
              </button>
              <button
                onClick={() => setAiSuggestion(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
          <p className="text-xs text-slate-200 leading-relaxed italic bg-slate-900/60 p-2.5 rounded-lg border border-slate-800">
            "{aiSuggestion.text}"
          </p>
        </div>
      )}

      {/* Loading Spinner for AI */}
      {aiLoading && (
        <div className="flex items-center gap-2 p-2.5 rounded-lg bg-indigo-500/10 text-xs text-indigo-300">
          <Loader2 className="w-4 h-4 animate-spin text-indigo-400" />
          <span>Gemini AI is crafting enhanced copy...</span>
        </div>
      )}

      {/* SECTION: HERO / PERSONAL */}
      {section.type === 'hero' && (
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Full Name</label>
            <input
              type="text"
              value={portfolioData.personal.name}
              onChange={e =>
                onUpdate(prev => ({
                  ...prev,
                  personal: { ...prev.personal, name: e.target.value },
                }))
              }
              className="w-full px-3 py-2 text-sm rounded-lg bg-slate-900 border border-slate-800 text-white focus:outline-none focus:border-indigo-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Professional Headline</label>
            <input
              type="text"
              value={portfolioData.personal.headline}
              onChange={e =>
                onUpdate(prev => ({
                  ...prev,
                  personal: { ...prev.personal, headline: e.target.value },
                }))
              }
              className="w-full px-3 py-2 text-sm rounded-lg bg-slate-900 border border-slate-800 text-white focus:outline-none focus:border-indigo-500"
            />
            {renderAiButtons('headline', portfolioData.personal.headline)}
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Email</label>
              <input
                type="email"
                value={portfolioData.personal.email}
                onChange={e =>
                  onUpdate(prev => ({
                    ...prev,
                    personal: { ...prev.personal, email: e.target.value },
                    contact: { ...prev.contact, email: e.target.value },
                  }))
                }
                className="w-full px-3 py-2 text-sm rounded-lg bg-slate-900 border border-slate-800 text-white focus:outline-none focus:border-indigo-500"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Location</label>
              <input
                type="text"
                value={portfolioData.personal.location}
                onChange={e =>
                  onUpdate(prev => ({
                    ...prev,
                    personal: { ...prev.personal, location: e.target.value },
                  }))
                }
                className="w-full px-3 py-2 text-sm rounded-lg bg-slate-900 border border-slate-800 text-white focus:outline-none focus:border-indigo-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Profile Avatar URL</label>
            <input
              type="url"
              placeholder="https://..."
              value={portfolioData.personal.profileImage}
              onChange={e =>
                onUpdate(prev => ({
                  ...prev,
                  personal: { ...prev.personal, profileImage: e.target.value },
                }))
              }
              className="w-full px-3 py-2 text-sm rounded-lg bg-slate-900 border border-slate-800 text-white focus:outline-none focus:border-indigo-500"
            />
          </div>
        </div>
      )}

      {/* SECTION: ABOUT */}
      {section.type === 'about' && (
        <div className="space-y-3">
          <label className="block text-xs font-semibold text-slate-300">About Me Summary</label>
          <textarea
            rows={6}
            value={portfolioData.about}
            onChange={e =>
              onUpdate(prev => ({
                ...prev,
                about: e.target.value,
              }))
            }
            className="w-full px-3 py-2 text-sm rounded-lg bg-slate-900 border border-slate-800 text-white focus:outline-none focus:border-indigo-500 leading-relaxed"
          />
          {renderAiButtons('about', portfolioData.about)}
        </div>
      )}

      {/* SECTION: SKILLS */}
      {section.type === 'skills' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-300">Skills ({portfolioData.skills.length})</span>
            <button
              onClick={() =>
                onUpdate(prev => ({
                  ...prev,
                  skills: [...prev.skills, { name: 'New Skill', category: 'General' }],
                }))
              }
              className="px-2.5 py-1 rounded text-xs font-semibold bg-indigo-600 hover:bg-indigo-500 text-white flex items-center gap-1"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Skill</span>
            </button>
          </div>

          <div className="space-y-2 max-h-80 overflow-y-auto pr-1">
            {portfolioData.skills.map((skill, idx) => (
              <div key={idx} className="flex items-center gap-2 p-2 rounded-lg bg-slate-900/80 border border-slate-800">
                <input
                  type="text"
                  value={skill.name}
                  onChange={e => {
                    const val = e.target.value;
                    onUpdate(prev => {
                      const copy = [...prev.skills];
                      copy[idx].name = val;
                      return { ...prev, skills: copy };
                    });
                  }}
                  className="flex-1 px-2.5 py-1 text-xs rounded bg-slate-950 border border-slate-800 text-white"
                />
                <input
                  type="text"
                  placeholder="Category"
                  value={skill.category}
                  onChange={e => {
                    const val = e.target.value;
                    onUpdate(prev => {
                      const copy = [...prev.skills];
                      copy[idx].category = val;
                      return { ...prev, skills: copy };
                    });
                  }}
                  className="w-24 px-2 py-1 text-xs rounded bg-slate-950 border border-slate-800 text-slate-300"
                />
                <button
                  onClick={() =>
                    onUpdate(prev => ({
                      ...prev,
                      skills: prev.skills.filter((_, i) => i !== idx),
                    }))
                  }
                  className="p-1 text-slate-500 hover:text-red-400"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SECTION: PROJECTS */}
      {section.type === 'projects' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-300">Projects ({portfolioData.projects.length})</span>
            <button
              onClick={() =>
                onUpdate(prev => ({
                  ...prev,
                  projects: [
                    ...prev.projects,
                    {
                      title: 'New Showcase Project',
                      description: 'Describe this project, key technical challenges solved, and its measurable impact.',
                      technologies: ['React', 'TypeScript'],
                      githubUrl: '',
                      liveUrl: '',
                      image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&auto=format&fit=crop&q=80',
                    },
                  ],
                }))
              }
              className="px-2.5 py-1 rounded text-xs font-semibold bg-indigo-600 hover:bg-indigo-500 text-white flex items-center gap-1"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Project</span>
            </button>
          </div>

          <div className="space-y-4">
            {portfolioData.projects.map((proj, idx) => (
              <div key={idx} className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-cyan-400">Project #{idx + 1}</span>
                  <button
                    onClick={() =>
                      onUpdate(prev => ({
                        ...prev,
                        projects: prev.projects.filter((_, i) => i !== idx),
                      }))
                    }
                    className="p-1 text-slate-500 hover:text-red-400"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>

                <input
                  type="text"
                  placeholder="Project Title"
                  value={proj.title}
                  onChange={e => {
                    const val = e.target.value;
                    onUpdate(prev => {
                      const copy = [...prev.projects];
                      copy[idx].title = val;
                      return { ...prev, projects: copy };
                    });
                  }}
                  className="w-full px-2.5 py-1.5 text-xs rounded bg-slate-950 border border-slate-800 text-white font-semibold"
                />

                <div>
                  <textarea
                    rows={3}
                    placeholder="Project Description"
                    value={proj.description}
                    onChange={e => {
                      const val = e.target.value;
                      onUpdate(prev => {
                        const copy = [...prev.projects];
                        copy[idx].description = val;
                        return { ...prev, projects: copy };
                      });
                    }}
                    className="w-full px-2.5 py-1.5 text-xs rounded bg-slate-950 border border-slate-800 text-slate-200"
                  />
                  {renderAiButtons(`project-desc-${idx}`, proj.description)}
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="url"
                    placeholder="GitHub URL"
                    value={proj.githubUrl}
                    onChange={e => {
                      const val = e.target.value;
                      onUpdate(prev => {
                        const copy = [...prev.projects];
                        copy[idx].githubUrl = val;
                        return { ...prev, projects: copy };
                      });
                    }}
                    className="px-2 py-1 text-xs rounded bg-slate-950 border border-slate-800 text-slate-300"
                  />
                  <input
                    type="url"
                    placeholder="Live URL"
                    value={proj.liveUrl}
                    onChange={e => {
                      const val = e.target.value;
                      onUpdate(prev => {
                        const copy = [...prev.projects];
                        copy[idx].liveUrl = val;
                        return { ...prev, projects: copy };
                      });
                    }}
                    className="px-2 py-1 text-xs rounded bg-slate-950 border border-slate-800 text-slate-300"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SECTION: EXPERIENCE */}
      {section.type === 'experience' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-300">Experience ({portfolioData.experience.length})</span>
            <button
              onClick={() =>
                onUpdate(prev => ({
                  ...prev,
                  experience: [
                    ...prev.experience,
                    {
                      company: 'Company Name',
                      role: 'Software Engineer',
                      startDate: '2023',
                      endDate: 'Present',
                      description: 'Led technical deliverables and collaborated across teams.',
                      technologies: ['React', 'TypeScript'],
                    },
                  ],
                }))
              }
              className="px-2.5 py-1 rounded text-xs font-semibold bg-indigo-600 hover:bg-indigo-500 text-white flex items-center gap-1"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Role</span>
            </button>
          </div>

          <div className="space-y-4">
            {portfolioData.experience.map((exp, idx) => (
              <div key={idx} className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 space-y-2.5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-indigo-400">Position #{idx + 1}</span>
                  <button
                    onClick={() =>
                      onUpdate(prev => ({
                        ...prev,
                        experience: prev.experience.filter((_, i) => i !== idx),
                      }))
                    }
                    className="p-1 text-slate-500 hover:text-red-400"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="text"
                    placeholder="Role"
                    value={exp.role}
                    onChange={e => {
                      const val = e.target.value;
                      onUpdate(prev => {
                        const copy = [...prev.experience];
                        copy[idx].role = val;
                        return { ...prev, experience: copy };
                      });
                    }}
                    className="px-2.5 py-1.5 text-xs rounded bg-slate-950 border border-slate-800 text-white"
                  />
                  <input
                    type="text"
                    placeholder="Company"
                    value={exp.company}
                    onChange={e => {
                      const val = e.target.value;
                      onUpdate(prev => {
                        const copy = [...prev.experience];
                        copy[idx].company = val;
                        return { ...prev, experience: copy };
                      });
                    }}
                    className="px-2.5 py-1.5 text-xs rounded bg-slate-950 border border-slate-800 text-white"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="text"
                    placeholder="Start (e.g. 2022)"
                    value={exp.startDate}
                    onChange={e => {
                      const val = e.target.value;
                      onUpdate(prev => {
                        const copy = [...prev.experience];
                        copy[idx].startDate = val;
                        return { ...prev, experience: copy };
                      });
                    }}
                    className="px-2 py-1 text-xs rounded bg-slate-950 border border-slate-800 text-slate-300"
                  />
                  <input
                    type="text"
                    placeholder="End (e.g. Present)"
                    value={exp.endDate}
                    onChange={e => {
                      const val = e.target.value;
                      onUpdate(prev => {
                        const copy = [...prev.experience];
                        copy[idx].endDate = val;
                        return { ...prev, experience: copy };
                      });
                    }}
                    className="px-2 py-1 text-xs rounded bg-slate-950 border border-slate-800 text-slate-300"
                  />
                </div>

                <textarea
                  rows={3}
                  placeholder="Key accomplishments..."
                  value={exp.description}
                  onChange={e => {
                    const val = e.target.value;
                    onUpdate(prev => {
                      const copy = [...prev.experience];
                      copy[idx].description = val;
                      return { ...prev, experience: copy };
                    });
                  }}
                  className="w-full px-2.5 py-1.5 text-xs rounded bg-slate-950 border border-slate-800 text-slate-200"
                />
                {renderAiButtons(`exp-desc-${idx}`, exp.description)}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SECTION: EDUCATION */}
      {section.type === 'education' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-300">Education ({portfolioData.education.length})</span>
            <button
              onClick={() =>
                onUpdate(prev => ({
                  ...prev,
                  education: [
                    ...prev.education,
                    {
                      institution: 'University Name',
                      degree: 'B.S. in Computer Science',
                      field: 'Computer Science',
                      startDate: '2020',
                      endDate: '2024',
                      description: 'Relevant coursework and activities.',
                    },
                  ],
                }))
              }
              className="px-2.5 py-1 rounded text-xs font-semibold bg-indigo-600 hover:bg-indigo-500 text-white flex items-center gap-1"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Degree</span>
            </button>
          </div>

          <div className="space-y-3">
            {portfolioData.education.map((edu, idx) => (
              <div key={idx} className="p-3 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-emerald-400">Degree #{idx + 1}</span>
                  <button
                    onClick={() =>
                      onUpdate(prev => ({
                        ...prev,
                        education: prev.education.filter((_, i) => i !== idx),
                      }))
                    }
                    className="p-1 text-slate-500 hover:text-red-400"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
                <input
                  type="text"
                  placeholder="Degree"
                  value={edu.degree}
                  onChange={e => {
                    const val = e.target.value;
                    onUpdate(prev => {
                      const copy = [...prev.education];
                      copy[idx].degree = val;
                      return { ...prev, education: copy };
                    });
                  }}
                  className="w-full px-2.5 py-1.5 text-xs rounded bg-slate-950 border border-slate-800 text-white"
                />
                <input
                  type="text"
                  placeholder="Institution"
                  value={edu.institution}
                  onChange={e => {
                    const val = e.target.value;
                    onUpdate(prev => {
                      const copy = [...prev.education];
                      copy[idx].institution = val;
                      return { ...prev, education: copy };
                    });
                  }}
                  className="w-full px-2.5 py-1.5 text-xs rounded bg-slate-950 border border-slate-800 text-white"
                />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SECTION: CONTACT & SOCIAL */}
      {section.type === 'contact' && (
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">GitHub Profile URL</label>
            <input
              type="url"
              placeholder="https://github.com/..."
              value={portfolioData.social.github}
              onChange={e =>
                onUpdate(prev => ({
                  ...prev,
                  social: { ...prev.social, github: e.target.value },
                }))
              }
              className="w-full px-3 py-2 text-sm rounded-lg bg-slate-900 border border-slate-800 text-white focus:outline-none focus:border-indigo-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">LinkedIn Profile URL</label>
            <input
              type="url"
              placeholder="https://linkedin.com/in/..."
              value={portfolioData.social.linkedin}
              onChange={e =>
                onUpdate(prev => ({
                  ...prev,
                  social: { ...prev.social, linkedin: e.target.value },
                }))
              }
              className="w-full px-3 py-2 text-sm rounded-lg bg-slate-900 border border-slate-800 text-white focus:outline-none focus:border-indigo-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Personal Website / Blog</label>
            <input
              type="url"
              placeholder="https://..."
              value={portfolioData.social.website}
              onChange={e =>
                onUpdate(prev => ({
                  ...prev,
                  social: { ...prev.social, website: e.target.value },
                }))
              }
              className="w-full px-3 py-2 text-sm rounded-lg bg-slate-900 border border-slate-800 text-white focus:outline-none focus:border-indigo-500"
            />
          </div>
        </div>
      )}
    </div>
  );
};
