import React from 'react';
import { Cpu, CheckCircle2 } from 'lucide-react';
import { SkillItem, TemplateStyle, TemplateVariant } from '../../../types/portfolio';

interface SkillsSectionProps {
  skills: SkillItem[];
  style: TemplateStyle;
  variant: TemplateVariant;
  isDark: boolean;
}

export const SkillsSection: React.FC<SkillsSectionProps> = ({ skills, style, variant, isDark }) => {
  const isDev = style === 'developer';
  const isGlass = style === 'glass';
  const isBold = style === 'bold';

  // Group skills by category
  const categories = Array.from(new Set(skills.map(s => s.category || 'General')));

  return (
    <section id="skills" className="py-16 px-6 max-w-5xl mx-auto">
      <div className="flex items-center gap-3 mb-8 justify-center md:justify-start">
        <div className="p-2 rounded-lg bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
          <Cpu className="w-5 h-5" />
        </div>
        <h2 className={`text-2xl sm:text-3xl font-bold ${isDev ? 'text-emerald-400 font-mono' : 'text-white'}`}>
          Skills & Technologies
        </h2>
      </div>

      {categories.length > 1 ? (
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
                      className={`px-3.5 py-1.5 rounded-lg text-sm font-medium transition-all flex items-center gap-1.5 ${
                        isGlass
                          ? 'glass-panel text-slate-200 hover:border-indigo-500/40'
                          : isDev
                          ? 'bg-slate-900 border border-slate-800 text-emerald-400 font-mono hover:border-emerald-500/50'
                          : isBold
                          ? 'bg-slate-800 border border-slate-700 text-white hover:border-amber-400'
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
      ) : (
        <div className="flex flex-wrap gap-3">
          {skills.map((sk, idx) => (
            <div
              key={idx}
              className="px-4 py-2 rounded-xl text-sm font-medium bg-slate-900/80 border border-slate-800 text-slate-200 flex items-center gap-2 hover:border-indigo-500/40 transition-colors"
            >
              <CheckCircle2 className="w-4 h-4 text-cyan-400" />
              <span>{sk.name}</span>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};
