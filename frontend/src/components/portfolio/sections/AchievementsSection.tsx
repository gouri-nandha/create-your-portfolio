import React from 'react';
import { Trophy } from 'lucide-react';
import { TemplateStyle, TemplateVariant } from '../../../types/portfolio';

interface AchievementsSectionProps {
  achievements: string[];
  style: TemplateStyle;
  variant: TemplateVariant;
  isDark: boolean;
}

export const AchievementsSection: React.FC<AchievementsSectionProps> = ({ achievements, style, variant, isDark }) => {
  if (!achievements || achievements.length === 0) return null;
  const isDev = style === 'developer';
  const isGlass = style === 'glass';

  return (
    <section id="achievements" className="py-16 px-6 max-w-5xl mx-auto">
      <div className="flex items-center gap-3 mb-8 justify-center md:justify-start">
        <div className="p-2 rounded-lg bg-amber-500/10 text-amber-400 border border-amber-500/20">
          <Trophy className="w-5 h-5" />
        </div>
        <h2 className={`text-2xl sm:text-3xl font-bold ${isDev ? 'text-emerald-400 font-mono' : 'text-white'}`}>
          Honors & Achievements
        </h2>
      </div>

      <div className="space-y-3">
        {achievements.map((item, idx) => (
          <div
            key={idx}
            className={`p-4 rounded-xl flex items-start gap-3.5 transition-all ${
              isGlass
                ? 'glass-panel'
                : isDev
                ? 'bg-slate-900 border border-slate-800 font-mono text-emerald-300'
                : 'bg-slate-900/50 border border-slate-800'
            }`}
          >
            <span className="text-lg">🏆</span>
            <p className="text-slate-200 text-sm sm:text-base leading-snug">{item}</p>
          </div>
        ))}
      </div>
    </section>
  );
};
