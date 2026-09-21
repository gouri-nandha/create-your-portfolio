import React from 'react';
import { GraduationCap, Calendar } from 'lucide-react';
import { EducationItem, TemplateStyle, TemplateVariant } from '../../../types/portfolio';

interface EducationSectionProps {
  education: EducationItem[];
  style: TemplateStyle;
  variant: TemplateVariant;
  isDark: boolean;
}

export const EducationSection: React.FC<EducationSectionProps> = ({ education, style, variant, isDark }) => {
  const isDev = style === 'developer';
  const isGlass = style === 'glass';
  const isBold = style === 'bold';

  return (
    <section id="education" className="py-16 px-6 max-w-5xl mx-auto">
      <div className="flex items-center gap-3 mb-8 justify-center md:justify-start">
        <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
          <GraduationCap className="w-5 h-5" />
        </div>
        <h2 className={`text-2xl sm:text-3xl font-bold ${isDev ? 'text-emerald-400 font-mono' : 'text-white'}`}>
          Education
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {education.map((edu, idx) => (
          <div
            key={idx}
            className={`p-6 rounded-2xl transition-all ${
              isGlass
                ? 'glass-panel'
                : isDev
                ? 'bg-slate-900 border border-slate-800 font-mono'
                : isBold
                ? 'bg-slate-900 border-2 border-slate-800'
                : 'bg-slate-900/50 border border-slate-800'
            }`}
          >
            <div className="flex items-center justify-between gap-2 mb-2">
              <h3 className="text-lg font-bold text-white">{edu.degree}</h3>
              <span className="text-xs font-medium text-slate-400">
                {edu.startDate} – {edu.endDate}
              </span>
            </div>
            <h4 className="text-sm font-semibold text-indigo-400 mb-2">
              {edu.institution} {edu.field ? `— ${edu.field}` : ''}
            </h4>
            {edu.description && (
              <p className="text-slate-300 text-sm leading-relaxed">{edu.description}</p>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};
