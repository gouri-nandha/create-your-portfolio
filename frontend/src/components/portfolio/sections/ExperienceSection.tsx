import React from 'react';
import { Briefcase, Calendar, GitCommit, CheckCircle2 } from 'lucide-react';
import { ExperienceItem, TemplateStyle, TemplateVariant } from '../../../types/portfolio';
import { useViewport } from '../../../context/ViewportContext';

interface ExperienceSectionProps {
  experience: ExperienceItem[];
  style: TemplateStyle;
  variant: TemplateVariant;
  isDark: boolean;
}

export const ExperienceSection: React.FC<ExperienceSectionProps> = ({ experience, style, variant, isDark }) => {
  const { isMobile, isTablet } = useViewport();
  const isDev = style === 'developer';
  const isGlass = style === 'glass';
  const isBold = style === 'bold';
  const isCreative = style === 'creative';
  const isMinimal = style === 'minimalist';

  // Variant C: Bento Modular Experience Cards
  if (variant === 'variantC') {
    const gridCols = isMobile ? 'grid-cols-1' : isTablet ? 'grid-cols-1' : 'grid-cols-1 md:grid-cols-2';

    return (
      <section id="experience" className="py-14 px-4 sm:px-6 max-w-6xl mx-auto">
        <div className="flex items-center gap-3 mb-8 justify-center md:justify-start">
          <div className="p-2 rounded-xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
            <Briefcase className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] font-bold tracking-widest text-indigo-400 uppercase">Career Matrix</span>
            <h2 className={`text-2xl sm:text-3xl font-extrabold ${isDev ? 'text-emerald-400 font-mono' : 'text-white'}`}>
              Experience
            </h2>
          </div>
        </div>

        <div className={`grid ${gridCols} gap-5 sm:gap-6`}>
          {experience.map((exp, idx) => (
            <div
              key={idx}
              className={`p-6 rounded-3xl flex flex-col justify-between transition-all ${
                isGlass
                  ? 'glass-panel border border-white/10 backdrop-blur-xl bg-slate-900/40 shadow-xl'
                  : isDev
                  ? 'bg-slate-900 border border-emerald-500/30 font-mono'
                  : isBold
                  ? 'bg-slate-900 border-2 border-amber-400/80 shadow-[4px_4px_0px_0px_rgba(251,191,36,0.3)]'
                  : isCreative
                  ? 'bg-gradient-to-br from-pink-950/20 to-purple-950/30 border border-pink-500/30 rounded-3xl'
                  : 'bg-slate-900/60 border border-slate-800'
              }`}
            >
              <div>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 mb-2">
                  <h3 className="text-base sm:text-lg font-bold text-white break-words">{exp.role}</h3>
                  <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-slate-800 text-slate-300 w-fit">
                    {exp.startDate} – {exp.endDate || 'Present'}
                  </span>
                </div>
                <h4 className={`text-sm font-semibold mb-3 ${
                  isDev ? 'text-emerald-400' : isCreative ? 'text-pink-300' : isBold ? 'text-amber-400' : 'text-cyan-400'
                }`}>
                  {exp.company}
                </h4>
                <p className="text-slate-300 text-xs sm:text-sm leading-relaxed mb-4 whitespace-pre-line">
                  {exp.description}
                </p>
              </div>

              {exp.technologies && exp.technologies.length > 0 && (
                <div className="flex flex-wrap gap-1.5 pt-3 border-t border-slate-800/80">
                  {exp.technologies.map((tech, tIdx) => (
                    <span
                      key={tIdx}
                      className={`text-[10px] px-2 py-0.5 rounded font-medium ${
                        isDev ? 'bg-slate-800 text-emerald-300 font-mono' : 'bg-slate-800/60 text-slate-400'
                      }`}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>
    );
  }

  // Variant A & B: Connected Timeline
  return (
    <section id="experience" className="py-14 px-4 sm:px-6 max-w-5xl mx-auto">
      <div className="flex items-center gap-3 mb-8 justify-center md:justify-start">
        <div className="p-2 rounded-xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
          <Briefcase className="w-5 h-5" />
        </div>
        <h2 className={`text-2xl sm:text-3xl font-extrabold ${isDev ? 'text-emerald-400 font-mono' : 'text-white'}`}>
          Work Experience
        </h2>
      </div>

      <div className="relative pl-6 sm:pl-8 border-l-2 border-slate-800 space-y-8 sm:space-y-10 ml-2 sm:ml-4">
        {experience.map((exp, idx) => (
          <div key={idx} className="relative group">
            {/* Timeline Dot */}
            <div
              className={`absolute -left-[31px] sm:-left-[39px] top-1.5 w-4 h-4 rounded-full border-2 ${
                isDev
                  ? 'border-emerald-400 bg-slate-950'
                  : isCreative
                  ? 'border-pink-500 bg-slate-950'
                  : isBold
                  ? 'border-amber-400 bg-slate-950'
                  : 'border-indigo-500 bg-slate-950 group-hover:scale-125 transition-transform'
              }`}
            />

            <div
              className={`p-5 sm:p-6 rounded-2xl sm:rounded-3xl transition-all ${
                isGlass
                  ? 'glass-panel border border-white/10 backdrop-blur-xl bg-slate-900/40 shadow-lg'
                  : isDev
                  ? 'bg-slate-900 border border-slate-800 font-mono text-slate-200'
                  : isBold
                  ? 'bg-slate-900 border-2 border-slate-700 hover:border-amber-400 shadow-[4px_4px_0px_0px_rgba(251,191,36,0.2)]'
                  : isCreative
                  ? 'bg-gradient-to-br from-pink-950/20 to-purple-950/20 border border-pink-500/30'
                  : 'bg-slate-900/50 border border-slate-800'
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-2">
                <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-indigo-400 transition-colors break-words">
                  {exp.role}
                </h3>
                <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-800 text-slate-300 inline-flex items-center gap-1 w-fit flex-shrink-0">
                  <Calendar className="w-3 h-3 text-indigo-400" />
                  <span>{exp.startDate} – {exp.endDate || 'Present'}</span>
                </span>
              </div>

              <h4 className={`text-sm font-semibold mb-3 ${
                isDev ? 'text-emerald-400' : isCreative ? 'text-pink-300' : isBold ? 'text-amber-400' : 'text-cyan-400'
              }`}>
                {exp.company}
              </h4>

              <p className="text-slate-300 text-xs sm:text-sm leading-relaxed mb-4 whitespace-pre-line">
                {exp.description}
              </p>

              {exp.technologies && exp.technologies.length > 0 && (
                <div className="flex flex-wrap gap-1.5 pt-2 border-t border-slate-800/80">
                  {exp.technologies.map((tech, tIdx) => (
                    <span
                      key={tIdx}
                      className={`text-[10px] sm:text-[11px] font-medium px-2 py-0.5 rounded ${
                        isDev ? 'bg-slate-800 text-emerald-300' : 'bg-slate-800/60 text-slate-400'
                      }`}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
