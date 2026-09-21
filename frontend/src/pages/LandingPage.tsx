import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Sparkles, 
  ArrowRight, 
  Upload, 
  Bot, 
  Palette, 
  Download, 
  CheckCircle2, 
  Github, 
  Layout, 
  ShieldCheck, 
  Zap, 
  Layers 
} from 'lucide-react';
import { Navbar } from '../components/common/Navbar';
import { Footer } from '../components/common/Footer';
import { INITIAL_SAMPLE_PORTFOLIOS } from '../data/samplePortfolios';

export const LandingPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#070a12] text-slate-100 selection:bg-indigo-500 selection:text-white">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-24 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Ambient Glows */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-indigo-500/20 blur-[140px] rounded-full pointer-events-none"></div>
        <div className="absolute top-1/3 left-1/4 w-[300px] h-[300px] bg-cyan-500/15 blur-[120px] rounded-full pointer-events-none"></div>

        <div className="max-w-5xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold bg-indigo-500/10 text-indigo-300 border border-indigo-500/20 mb-8 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
            <span>AI-Driven Portfolio Engine for 2026</span>
          </div>

          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black tracking-tight text-white leading-[1.1] mb-8">
            Turn Your Resume <br className="hidden sm:inline" />
            Into a <span className="gradient-text-blue">Professional Portfolio</span>
          </h1>

          <p className="text-lg sm:text-xl text-slate-300 max-w-3xl mx-auto mb-10 leading-relaxed font-normal">
            Upload your resume, let AI organize your experience, choose a design, and create a
            standout personal portfolio in minutes. Complete with live editing, quality scoring, and
            one-click standalone static ZIP export.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <Link
              to="/create"
              className="w-full sm:w-auto px-8 py-4 rounded-2xl font-bold text-base bg-gradient-to-r from-indigo-500 via-indigo-600 to-cyan-500 text-white shadow-xl shadow-indigo-500/25 hover:scale-105 transition-all flex items-center justify-center gap-2"
            >
              <span>Create My Portfolio</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              to="/templates"
              className="w-full sm:w-auto px-8 py-4 rounded-2xl font-bold text-base border border-slate-700/80 bg-slate-900/60 hover:bg-slate-800 text-slate-200 transition-colors flex items-center justify-center gap-2"
            >
              <Layout className="w-4 h-4 text-slate-400" />
              <span>See 15 Templates</span>
            </Link>
          </div>

          {/* Interactive Visual Preview of Builder */}
          <div className="relative mx-auto max-w-5xl rounded-3xl p-3 bg-gradient-to-b from-slate-700/30 to-slate-900/40 border border-slate-700/50 shadow-2xl backdrop-blur-xl">
            <div className="rounded-2xl overflow-hidden bg-slate-950 border border-slate-800 shadow-inner">
              {/* Fake Window Header */}
              <div className="px-4 py-3 bg-slate-900/90 border-b border-slate-800 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-rose-500/80"></div>
                  <div className="w-3 h-3 rounded-full bg-amber-500/80"></div>
                  <div className="w-3 h-3 rounded-full bg-emerald-500/80"></div>
                  <span className="text-xs font-mono text-slate-400 ml-2">portfolio-ai // live-builder-v2.5</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-400">
                  <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 font-semibold">
                    Quality: 92/100
                  </span>
                  <span className="px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300 font-medium">
                    Developer Style
                  </span>
                </div>
              </div>

              {/* Fake Builder Mockup Content */}
              <div className="grid grid-cols-12 h-96">
                {/* Left Mini Column */}
                <div className="col-span-3 border-r border-slate-800/80 bg-slate-900/30 p-4 space-y-2 hidden md:block text-left">
                  <span className="text-[11px] font-bold uppercase text-slate-400 tracking-wider">Sections</span>
                  {['Hero', 'About Me', 'Skills', 'Projects', 'Experience', 'Contact'].map((sec, i) => (
                    <div
                      key={i}
                      className={`p-2 rounded-lg text-xs font-medium flex items-center justify-between ${
                        i === 0 ? 'bg-indigo-600/30 border border-indigo-500/40 text-white' : 'bg-slate-900/50 text-slate-400'
                      }`}
                    >
                      <span>☰ {sec}</span>
                      <span className="text-[10px] text-slate-500">visible</span>
                    </div>
                  ))}
                </div>

                {/* Center Live Preview Mockup */}
                <div className="col-span-12 md:col-span-6 p-8 flex flex-col justify-center items-center text-center bg-[#0a0e17]">
                  <div className="w-20 h-20 rounded-full ring-2 ring-indigo-500/40 overflow-hidden mb-4 shadow-lg">
                    <img
                      src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=80"
                      alt="Avatar"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="text-2xl font-black text-white mb-1">Marcus Vance</h3>
                  <p className="text-xs text-indigo-400 font-medium mb-3">
                    Senior Full-Stack & Distributed Systems Engineer
                  </p>
                  <p className="text-xs text-slate-400 max-w-sm mb-4 leading-relaxed">
                    Passionate software architect with 5+ years building scalable web apps and high-throughput microservices.
                  </p>
                  <div className="flex gap-2">
                    <span className="px-2 py-0.5 rounded text-[10px] bg-slate-800 text-slate-300">TypeScript</span>
                    <span className="px-2 py-0.5 rounded text-[10px] bg-slate-800 text-slate-300">React</span>
                    <span className="px-2 py-0.5 rounded text-[10px] bg-slate-800 text-slate-300">Go</span>
                    <span className="px-2 py-0.5 rounded text-[10px] bg-slate-800 text-slate-300">AWS</span>
                  </div>
                </div>

                {/* Right Mini Column */}
                <div className="col-span-3 border-l border-slate-800/80 bg-slate-900/30 p-4 space-y-3 hidden md:block text-left">
                  <span className="text-[11px] font-bold uppercase text-slate-400 tracking-wider">AI Assistant</span>
                  <div className="p-2.5 rounded-xl bg-indigo-950/60 border border-indigo-500/30 text-[11px] text-slate-300 space-y-1.5">
                    <div className="flex items-center gap-1 text-cyan-400 font-semibold text-[10px]">
                      <Sparkles className="w-3 h-3" /> One-click enhancements
                    </div>
                    <p className="text-[10px] text-slate-400">Headline refined with active metrics.</p>
                  </div>
                  <div className="space-y-1 text-xs">
                    <div className="p-2 rounded bg-slate-900/60 text-slate-300">✨ Make Professional</div>
                    <div className="p-2 rounded bg-slate-900/60 text-slate-300">✨ Make Shorter</div>
                    <div className="p-2 rounded bg-slate-900/60 text-slate-300">✨ Make Engaging</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-xs font-bold uppercase tracking-wider text-cyan-400 mb-2">Effortless Workflow</h2>
          <h3 className="text-3xl sm:text-4xl font-extrabold text-white">How PortfolioAI Works</h3>
          <p className="text-slate-400 text-sm mt-3">From raw document to live hosted portfolio in four straightforward steps.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[
            {
              step: '01',
              title: 'Upload or Import',
              desc: 'Upload PDF, DOCX, or paste resume text. You can also import public GitHub repositories instantly.',
              icon: Upload,
              color: 'text-indigo-400',
            },
            {
              step: '02',
              title: 'AI Structuring',
              desc: 'Gemini AI extracts personal details, skills, experience, and projects into a clean JSON schema.',
              icon: Bot,
              color: 'text-cyan-400',
            },
            {
              step: '03',
              title: 'Customize Design',
              desc: 'Select from 5 styles and 15 variations. Drag and reorder sections, edit text with AI, and toggle themes.',
              icon: Palette,
              color: 'text-amber-400',
            },
            {
              step: '04',
              title: 'Export Standalone ZIP',
              desc: 'Download pure static HTML, CSS, and JS. Zero framework dependencies. Open anywhere or host for free.',
              icon: Download,
              color: 'text-emerald-400',
            },
          ].map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-slate-900/50 border border-slate-800 hover:border-slate-700 transition-all space-y-4"
              >
                <div className="flex items-center justify-between">
                  <div className={`p-3 rounded-xl bg-slate-800/80 ${item.color}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="font-mono text-2xl font-black text-slate-700">{item.step}</span>
                </div>
                <h4 className="text-lg font-bold text-white">{item.title}</h4>
                <p className="text-slate-400 text-xs leading-relaxed">{item.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* AI Features Grid */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-950/60 border-y border-slate-800/80">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-xs font-bold uppercase tracking-wider text-indigo-400 mb-2">Intelligent Capabilities</h2>
            <h3 className="text-3xl sm:text-4xl font-extrabold text-white">Demonstrable AI Powered by Gemini</h3>
            <p className="text-slate-400 text-sm mt-3">Smart features that save hours of manual writing and styling.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: 'Resume to Structured JSON',
                desc: 'Intelligently parses unstructured resumes (PDF, DOCX, TXT) directly into standard portfolio sections without false hallucinations.',
                icon: Bot,
              },
              {
                title: 'In-Place AI Copywriter',
                desc: 'Buttons like "✨ Improve", "✨ Make Professional", and "✨ Shorten" help refine project descriptions with instant side-by-side review.',
                icon: Sparkles,
              },
              {
                title: 'Portfolio Quality Checker',
                desc: 'Recruiter readiness score out of 100 with clear, actionable checklist items for missing contact details or projects.',
                icon: CheckCircle2,
              },
              {
                title: 'GitHub Repo Enrichment',
                desc: 'Fetches your top repositories directly from GitHub and uses AI to summarize accomplishments and highlight technologies.',
                icon: Github,
              },
              {
                title: 'Strict Schema Reliability',
                desc: 'Strict JSON typing ensures the generated portfolio is never broken by incomplete AI responses or invalid tokens.',
                icon: ShieldCheck,
              },
              {
                title: 'Offline Mock AI Fallback',
                desc: 'Guaranteed to work 100% locally even without an active internet connection or Gemini API key.',
                icon: Zap,
              },
            ].map((f, i) => {
              const Icon = f.icon;
              return (
                <div key={i} className="p-6 rounded-2xl bg-slate-900/40 border border-slate-800/80 space-y-3">
                  <div className="p-2.5 rounded-xl bg-indigo-500/10 text-indigo-400 w-fit">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h4 className="text-base font-bold text-white">{f.title}</h4>
                  <p className="text-xs text-slate-400 leading-relaxed">{f.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 15 Styles & Templates Showcase */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <h2 className="text-xs font-bold uppercase tracking-wider text-cyan-400 mb-2">Style Gallery</h2>
          <h3 className="text-3xl sm:text-4xl font-extrabold text-white">5 Curated Styles × 3 Layout Variants</h3>
          <p className="text-slate-400 text-sm mt-3">From minimalist Swiss typography to high-tech terminal dark themes.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {INITIAL_SAMPLE_PORTFOLIOS.map(p => (
            <div
              key={p.id}
              className="rounded-2xl overflow-hidden bg-slate-900 border border-slate-800 flex flex-col justify-between hover:border-slate-700 transition-all group"
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded bg-indigo-500/10 text-indigo-300 border border-indigo-500/20">
                    {p.style}
                  </span>
                  <span className="text-xs text-slate-400">{p.template}</span>
                </div>
                <h4 className="text-lg font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors">
                  {p.name}
                </h4>
                <p className="text-xs text-slate-400 leading-relaxed line-clamp-3">
                  {p.portfolioData.about}
                </p>
              </div>

              <div className="px-6 pb-6 pt-0">
                <Link
                  to={`/preview/${p.id}`}
                  className="w-full py-2.5 px-4 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-white transition-colors flex items-center justify-center gap-1.5"
                >
                  <span>Preview Template</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Call To Action */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto text-center">
        <div className="p-10 sm:p-14 rounded-3xl bg-gradient-to-br from-indigo-900/60 via-slate-900 to-slate-950 border border-indigo-500/30 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/10 blur-[90px] rounded-full pointer-events-none"></div>
          <h3 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">
            Ready to Build Your Standout Portfolio?
          </h3>
          <p className="text-slate-300 text-sm sm:text-base max-w-xl mx-auto mb-8 leading-relaxed">
            Free forever, no paid API keys required, zero complicated configuration.
          </p>
          <Link
            to="/create"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl font-bold text-base bg-indigo-600 hover:bg-indigo-500 text-white shadow-xl shadow-indigo-600/30 transition-all hover:scale-105"
          >
            <span>Get Started with Resume</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
};
