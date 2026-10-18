import React from 'react';
import { GraduationCap, Calendar } from 'lucide-react';
import { EducationItem, TemplateStyle, TemplateVariant } from '../../../types/portfolio';
import { useViewport } from '../../../context/ViewportContext';

interface EducationSectionProps {
  education: EducationItem[];
  style: TemplateStyle;
  variant: TemplateVariant;
  isDark: boolean;
}

export const EducationSection: React.FC<EducationSectionProps> = ({ education, style, variant, isDark }) => {
  const { isMobile, isTablet } = useViewport();
  const isDev = style === 'developer';
  const isGlass = style === 'glass';
  const isBold = style === 'bold';
  const isCreative = style === 'creative';
  const isMinimal = style === 'minimalist';

  const gridCols = isMobile ? 'grid-cols-1' : isTablet ? 'grid-cols-1' : 'grid-cols-1 md:grid-cols-2';

  return (
    <section id="education" className="py-14 px-4 sm:px-6 max-w-5xl mx-auto">
      <div className="flex items-center gap-3 mb-8 justify-center md:justify-start">
        <div className={`p-2 rounded-xl ${
          isDev ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' :
          isCreative ? 'bg-pink-500/10 text-pink-400 border border-pink-500/20' :
          isBold ? 'bg-amber-400/10 text-amber-300 border border-amber-400/30' :
          'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
        }`}>
          <GraduationCap className="w-5 h-5" />
        </div>
        <h2 className={`text-2xl sm:text-3xl font-extrabold ${isDev ? 'text-emerald-400 font-mono' : 'text-white'}`}>
          Education
        </h2>
      </div>

      <div className={`grid ${gridCols} gap-5 sm:gap-6`}>
        {education.map((edu, idx) => (
          <div
            key={idx}
            className={`p-6 rounded-2xl transition-all ${
              isGlass
                ? 'glass-panel border border-white/10 backdrop-blur-xl bg-slate-900/40 shadow-xl'
                : isDev
                ? 'bg-slate-900 border border-emerald-500/30 font-mono'
                : isBold
                ? 'bg-slate-900 border-2 border-amber-400/80 shadow-[4px_4px_0px_0px_rgba(251,191,36,0.25)]'
                : isCreative
                ? 'bg-gradient-to-br from-pink-950/20 to-purple-950/30 border border-pink-500/30 rounded-3xl'
                : isMinimal
                ? 'bg-slate-900/30 border border-slate-800'
                : 'bg-slate-900/50 border border-slate-800'
            }`}
          >
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2 mb-2">
              <h3 className="text-base sm:text-lg font-bold text-white break-words">{edu.degree}</h3>
              <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-800/80 text-slate-300 inline-flex items-center gap-1 w-fit flex-shrink-0">
                <Calendar className="w-3 h-3 text-indigo-400" />
                <span>{edu.startDate} – {edu.endDate}</span>
              </span>
            </div>
            <h4 className={`text-sm font-semibold mb-3 ${
              isDev ? 'text-emerald-400' : isCreative ? 'text-pink-300' : isBold ? 'text-amber-400' : 'text-indigo-400'
            }`}>
              {edu.institution} {edu.field ? `— ${edu.field}` : ''}
            </h4>
            {edu.description && (
              <p className="text-slate-300 text-sm leading-relaxed whitespace-pre-line">{edu.description}</p>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};
