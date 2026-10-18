import React from 'react';
import { Cpu, CheckCircle2, Sparkles, Terminal, Code2 } from 'lucide-react';
import { SkillItem, TemplateStyle, TemplateVariant } from '../../../types/portfolio';
import { useViewport } from '../../../context/ViewportContext';

interface SkillsSectionProps {
  skills: SkillItem[];
  style: TemplateStyle;
  variant: TemplateVariant;
  isDark: boolean;
}

export const SkillsSection: React.FC<SkillsSectionProps> = ({ skills, style, variant, isDark }) => {
  const { isMobile, isTablet } = useViewport();
  const isDev = style === 'developer';
  const isGlass = style === 'glass';
  const isBold = style === 'bold';
  const isCreative = style === 'creative';
  const isMinimal = style === 'minimalist';

  // Group skills by category
  const categories = Array.from(new Set(skills.map(s => s.category || 'General')));

  // Variant B: Storyline Proficiency Bars
  if (variant === 'variantB') {
    return (
      <section id="skills" className="py-14 px-4 sm:px-6 max-w-5xl mx-auto">
        <div className="flex items-center gap-3 mb-8 justify-center md:justify-start">
          <div className="p-2 rounded-xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
            <Cpu className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] font-bold tracking-widest text-indigo-400 uppercase">Mastery Spectrum</span>
            <h2 className={`text-2xl sm:text-3xl font-extrabold ${isDev ? 'text-emerald-400 font-mono' : 'text-white'}`}>
              Skills & Technical Expertise
            </h2>
          </div>
        </div>

        <div className="space-y-6">
          {categories.map(cat => {
            const catSkills = skills.filter(s => (s.category || 'General') === cat);
            return (
              <div
                key={cat}
                className={`p-6 rounded-2xl transition-all ${
                  isGlass
                    ? 'glass-panel border border-white/10 backdrop-blur-xl bg-slate-900/40 shadow-xl'
                    : isDev
                    ? 'bg-slate-900 border border-emerald-500/30 font-mono'
                    : isBold
                    ? 'bg-slate-900 border-2 border-amber-400/80 shadow-[4px_4px_0px_0px_rgba(251,191,36,0.25)]'
                    : isCreative
                    ? 'bg-gradient-to-br from-pink-950/20 via-purple-950/30 to-slate-900/80 border border-pink-500/30'
                    : 'bg-slate-900/60 border border-slate-800'
                }`}
              >
                <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-4 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-indigo-400"></span>
                  <span>{cat}</span>
                </h3>

                <div className={`grid gap-4 ${isMobile ? 'grid-cols-1' : 'grid-cols-1 sm:grid-cols-2'}`}>
                  {catSkills.map((sk, idx) => {
                    const level = (idx % 3 === 0) ? '95%' : (idx % 3 === 1) ? '90%' : '85%';
                    return (
                      <div key={idx} className="space-y-1.5">
                        <div className="flex justify-between items-center text-xs">
                          <span className="font-semibold text-slate-200">{sk.name}</span>
                          <span className="text-[11px] text-slate-400">{(idx % 3 === 0) ? 'Expert' : 'Advanced'}</span>
                        </div>
                        <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
                          <div
                            className={`h-full rounded-full transition-all duration-500 ${
                              isDev ? 'bg-emerald-400' : isCreative ? 'bg-gradient-to-r from-pink-500 to-purple-500' : isBold ? 'bg-amber-400' : 'bg-gradient-to-r from-indigo-500 to-cyan-400'
                            }`}
                            style={{ width: level }}
                          ></div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </section>
    );
  }

  // Variant C: Bento Matrix (Modular tiles for each skill category)
  if (variant === 'variantC') {
    const gridCols = isMobile ? 'grid-cols-1' : isTablet ? 'grid-cols-1 sm:grid-cols-2' : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3';

    return (
      <section id="skills" className="py-14 px-4 sm:px-6 max-w-6xl mx-auto">
        <div className="flex items-center gap-3 mb-8 justify-center md:justify-start">
          <div className="p-2 rounded-xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
            <Cpu className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] font-bold tracking-widest text-indigo-400 uppercase">Modular Matrix</span>
            <h2 className={`text-2xl sm:text-3xl font-extrabold ${isDev ? 'text-emerald-400 font-mono' : 'text-white'}`}>
              Skills & Core Stack
            </h2>
          </div>
        </div>

        <div className={`grid ${gridCols} gap-5`}>
          {categories.map((cat, cIdx) => {
            const catSkills = skills.filter(s => (s.category || 'General') === cat);
            return (
              <div
                key={cat}
                className={`p-5 rounded-3xl flex flex-col justify-between transition-all group ${
                  isGlass
                    ? 'glass-panel border border-white/10 backdrop-blur-xl bg-slate-900/40 shadow-xl'
                    : isDev
                    ? 'bg-slate-900 border border-emerald-500/30 font-mono'
                    : isBold
                    ? 'bg-slate-900 border-2 border-amber-400/80 shadow-[4px_4px_0px_0px_rgba(251,191,36,0.25)]'
                    : isCreative
                    ? 'bg-gradient-to-br from-pink-950/20 via-purple-950/30 to-slate-900/80 border border-pink-500/30'
                    : 'bg-slate-900/60 border border-slate-800'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-4 pb-2 border-b border-slate-800">
                    <span className="text-xs font-bold text-white uppercase tracking-wider">{cat}</span>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-800 text-slate-400">
                      {catSkills.length} tools
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {catSkills.map((sk, idx) => (
                      <span
                        key={idx}
                        className={`px-3 py-1.5 rounded-xl text-xs font-medium flex items-center gap-1.5 transition-all ${
                          isDev
                            ? 'bg-slate-800/80 border border-emerald-500/30 text-emerald-300 font-mono'
                            : isCreative
                            ? 'bg-pink-500/10 border border-pink-500/30 text-pink-200 rounded-full'
                            : isBold
                            ? 'bg-slate-800 border border-amber-400/30 text-amber-200'
                            : 'bg-slate-800/60 border border-slate-700/60 text-slate-200'
                        }`}
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-cyan-400"></span>
                        <span>{sk.name}</span>
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    );
  }

  // Variant A: Modern Grid (Categorized chips)
  return (
    <section id="skills" className="py-14 px-4 sm:px-6 max-w-5xl mx-auto">
      <div className="flex items-center gap-3 mb-8 justify-center md:justify-start">
        <div className="p-2 rounded-xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
          <Cpu className="w-5 h-5" />
        </div>
        <h2 className={`text-2xl sm:text-3xl font-extrabold ${isDev ? 'text-emerald-400 font-mono' : 'text-white'}`}>
          Skills & Technologies
        </h2>
      </div>

      <div className="space-y-6">
        {categories.map(cat => {
          const catSkills = skills.filter(s => (s.category || 'General') === cat);
          return (
            <div key={cat} className="space-y-3">
              <h3 className="text-xs uppercase tracking-wider font-bold text-slate-400">
                {cat}
              </h3>
              <div className="flex flex-wrap gap-2.5">
                {catSkills.map((sk, idx) => (
                  <div
                    key={idx}
                    className={`px-3.5 py-1.5 rounded-xl text-sm font-medium transition-all flex items-center gap-2 ${
                      isGlass
                        ? 'glass-panel text-slate-200 hover:border-indigo-500/40 border border-white/10 backdrop-blur-xl bg-slate-900/40'
                        : isDev
                        ? 'bg-slate-900 border border-slate-800 text-emerald-400 font-mono hover:border-emerald-500/50'
                        : isBold
                        ? 'bg-slate-800 border-2 border-slate-700 text-white hover:border-amber-400'
                        : isCreative
                        ? 'bg-pink-500/10 border border-pink-500/30 text-pink-200 hover:border-pink-400'
                        : 'bg-slate-900/60 border border-slate-800 text-slate-300 hover:text-white'
                    }`}
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-400"></span>
                    <span>{sk.name}</span>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
