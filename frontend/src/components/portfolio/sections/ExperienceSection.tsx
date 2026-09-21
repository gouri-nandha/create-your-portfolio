import React from 'react';
import { Briefcase, Calendar } from 'lucide-react';
import { ExperienceItem, TemplateStyle, TemplateVariant } from '../../../types/portfolio';

interface ExperienceSectionProps {
  experience: ExperienceItem[];
  style: TemplateStyle;
  variant: TemplateVariant;
  isDark: boolean;
}

export const ExperienceSection: React.FC<ExperienceSectionProps> = ({ experience, style, variant, isDark }) => {
  const isDev = style === 'developer';
  const isGlass = style === 'glass';
  const isBold = style === 'bold';

  return (
    <section id="experience" className="py-16 px-6 max-w-5xl mx-auto">
      <div className="flex items-center gap-3 mb-8 justify-center md:justify-start">
        <div className="p-2 rounded-lg bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
          <Briefcase className="w-5 h-5" />
        </div>
        <h2 className={`text-2xl sm:text-3xl font-bold ${isDev ? 'text-emerald-400 font-mono' : 'text-white'}`}>
          Work Experience
        </h2>
      </div>

      <div className="relative pl-6 sm:pl-8 border-l-2 border-slate-800 space-y-10">
        {experience.map((exp, idx) => (
          <div key={idx} className="relative group">
            {/* Timeline Dot */}
            <div
              className={`absolute -left-[31px] sm:-left-[39px] top-1.5 w-4 h-4 rounded-full border-2 ${
                isDev
                  ? 'border-emerald-400 bg-slate-950'
                  : 'border-indigo-500 bg-slate-950 group-hover:scale-125 transition-transform'
              }`}
            />

            <div
              className={`p-6 rounded-2xl transition-all ${
                isGlass
                  ? 'glass-panel shadow-lg'
                  : isDev
                  ? 'bg-slate-900 border border-slate-800 font-mono'
                  : isBold
                  ? 'bg-slate-900 border border-slate-700'
                  : 'bg-slate-900/50 border border-slate-800'
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-2">
                <h3 className="text-lg font-bold text-white group-hover:text-indigo-400 transition-colors">
                  {exp.role}
                </h3>
                <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-800 text-slate-300 inline-flex items-center gap-1 w-fit">
                  <Calendar className="w-3 h-3 text-indigo-400" />
                  {exp.startDate} – {exp.endDate || 'Present'}
                </span>
              </div>

              <h4 className="text-sm font-semibold text-cyan-400 mb-3">{exp.company}</h4>

              <p className="text-slate-300 text-sm leading-relaxed mb-4 whitespace-pre-line">
                {exp.description}
              </p>

              {exp.technologies && exp.technologies.length > 0 && (
                <div className="flex flex-wrap gap-1.5 pt-2 border-t border-slate-800/80">
                  {exp.technologies.map((tech, tIdx) => (
                    <span
                      key={tIdx}
                      className="text-[11px] font-medium px-2 py-0.5 rounded bg-slate-800/60 text-slate-400"
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
