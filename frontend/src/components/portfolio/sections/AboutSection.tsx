import React from 'react';
import { User, Sparkles } from 'lucide-react';
import { TemplateStyle, TemplateVariant } from '../../../types/portfolio';

interface AboutSectionProps {
  about: string;
  style: TemplateStyle;
  variant: TemplateVariant;
  isDark: boolean;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ about, style, variant, isDark }) => {
  const isDev = style === 'developer';
  const isGlass = style === 'glass';
  const isBold = style === 'bold';

  return (
    <section id="about" className="py-16 px-6 max-w-5xl mx-auto">
      <div className="flex items-center gap-3 mb-6 justify-center md:justify-start">
        <div className="p-2 rounded-lg bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
          <User className="w-5 h-5" />
        </div>
        <h2 className={`text-2xl sm:text-3xl font-bold ${isDev ? 'text-emerald-400 font-mono' : 'text-white'}`}>
          About Me
        </h2>
      </div>

      <div
        className={`p-6 sm:p-8 rounded-2xl relative transition-all ${
          isGlass
            ? 'glass-panel shadow-xl'
            : isDev
            ? 'bg-slate-900/80 border border-emerald-500/20 font-mono'
            : isBold
            ? 'bg-slate-900 border-2 border-indigo-500/30'
            : 'bg-slate-900/50 border border-slate-800'
        }`}
      >
        {isDev && (
          <div className="text-xs text-emerald-400/60 pb-3 mb-3 border-b border-slate-800 flex items-center justify-between">
            <span>// bio.config.json</span>
            <span>UTF-8</span>
          </div>
        )}
        <p className="text-slate-300 text-base sm:text-lg leading-relaxed whitespace-pre-line font-normal">
          {about || 'Share your story, vision, and core competencies here.'}
        </p>
      </div>
    </section>
  );
};
