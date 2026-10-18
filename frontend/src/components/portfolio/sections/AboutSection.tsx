import React from 'react';
import { User, Sparkles, Terminal, Compass, Quote, Target } from 'lucide-react';
import { TemplateStyle, TemplateVariant } from '../../../types/portfolio';
import { useViewport } from '../../../context/ViewportContext';

interface AboutSectionProps {
  about: string;
  style: TemplateStyle;
  variant: TemplateVariant;
  isDark: boolean;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ about, style, variant, isDark }) => {
  const { isMobile } = useViewport();
  const isDev = style === 'developer';
  const isGlass = style === 'glass';
  const isBold = style === 'bold';
  const isCreative = style === 'creative';
  const isMinimal = style === 'minimalist';

  // Variant B: Storyline / Narrative Pull Quote
  if (variant === 'variantB') {
    return (
      <section id="about" className="py-16 px-4 sm:px-6 max-w-4xl mx-auto">
        <div className="flex items-center gap-3 mb-8 justify-center">
          <div className="p-2 rounded-xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
            <Quote className="w-5 h-5 text-indigo-400" />
          </div>
          <h2 className={`text-2xl sm:text-3xl font-extrabold ${isDev ? 'text-emerald-400 font-mono' : 'text-white'}`}>
            My Story & Mission
          </h2>
        </div>

        <div
          className={`p-8 sm:p-12 rounded-3xl relative transition-all text-center ${
            isGlass
              ? 'glass-panel border border-white/10 backdrop-blur-xl bg-slate-900/40 shadow-2xl'
              : isDev
              ? 'bg-slate-900 border border-emerald-500/30 font-mono text-emerald-300'
              : isBold
              ? 'bg-slate-900 border-2 border-amber-400 shadow-[6px_6px_0px_0px_rgba(251,191,36,0.3)]'
              : isCreative
              ? 'bg-gradient-to-br from-pink-950/30 via-purple-950/20 to-slate-900/80 border border-pink-500/30'
              : 'bg-slate-900/60 border border-slate-800'
          }`}
        >
          <p className="text-slate-200 text-base sm:text-xl leading-relaxed whitespace-pre-line font-medium max-w-2xl mx-auto">
            {about || 'I craft resilient, high-impact digital systems. Driven by curious exploration, technical rigor, and thoughtful product design.'}
          </p>

          <div className="mt-8 pt-6 border-t border-slate-800 flex flex-wrap items-center justify-center gap-4 text-xs text-slate-400">
            <span className="flex items-center gap-1.5"><Target className="w-3.5 h-3.5 text-cyan-400" /> Focus: Scalable Cloud Architecture</span>
            <span className="flex items-center gap-1.5"><Compass className="w-3.5 h-3.5 text-indigo-400" /> Approach: Modern, Maintainable Code</span>
          </div>
        </div>
      </section>
    );
  }

  // Variant C: Bento Quick Stat Grid
  if (variant === 'variantC') {
    return (
      <section id="about" className="py-14 px-4 sm:px-6 max-w-6xl mx-auto">
        <div className="flex items-center gap-3 mb-8 justify-center md:justify-start">
          <div className="p-2 rounded-xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
            <User className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] font-bold tracking-widest text-indigo-400 uppercase">Profile Overview</span>
            <h2 className={`text-2xl sm:text-3xl font-extrabold ${isDev ? 'text-emerald-400 font-mono' : 'text-white'}`}>
              About & Philosophy
            </h2>
          </div>
        </div>

        <div className={`grid gap-5 ${isMobile ? 'grid-cols-1' : 'grid-cols-1 md:grid-cols-12'}`}>
          {/* Main Story Bento (Spans 8 cols) */}
          <div
            className={`p-6 sm:p-8 rounded-3xl transition-all ${isMobile ? 'w-full' : 'md:col-span-8'} ${
              isGlass
                ? 'glass-panel border border-white/10 backdrop-blur-xl bg-slate-900/40 shadow-xl'
                : isDev
                ? 'bg-slate-900 border border-emerald-500/30 font-mono'
                : isBold
                ? 'bg-slate-900 border-2 border-amber-400 shadow-[4px_4px_0px_0px_rgba(251,191,36,0.3)]'
                : isCreative
                ? 'bg-gradient-to-br from-pink-950/20 to-slate-900/80 border border-pink-500/30'
                : 'bg-slate-900/60 border border-slate-800'
            }`}
          >
            {isDev && (
              <div className="text-xs text-emerald-400/70 pb-3 mb-4 border-b border-emerald-500/20 flex items-center justify-between font-mono">
                <span>// bio.config.json</span>
                <span>UTF-8</span>
              </div>
            )}
            <p className="text-slate-300 text-sm sm:text-base md:text-lg leading-relaxed whitespace-pre-line">
              {about || 'I specialize in engineering responsive, maintainable full-stack systems with strong emphasis on reliability and seamless user journeys.'}
            </p>
          </div>

          {/* Quick Pillars Bento (Spans 4 cols) */}
          <div className={`space-y-4 ${isMobile ? 'w-full' : 'md:col-span-4'}`}>
            <div className={`p-4 rounded-2xl border ${isDev ? 'bg-slate-900/80 border-emerald-500/20 font-mono' : isBold ? 'bg-slate-900 border-2 border-amber-400/60' : 'bg-slate-900/50 border-slate-800'}`}>
              <h4 className="text-xs font-bold text-white uppercase mb-1">Architecture</h4>
              <p className="text-xs text-slate-400">Distributed microservices, event-driven pipelines, edge caching.</p>
            </div>
            <div className={`p-4 rounded-2xl border ${isDev ? 'bg-slate-900/80 border-emerald-500/20 font-mono' : isBold ? 'bg-slate-900 border-2 border-amber-400/60' : 'bg-slate-900/50 border-slate-800'}`}>
              <h4 className="text-xs font-bold text-white uppercase mb-1">Delivery</h4>
              <p className="text-xs text-slate-400">Automated CI/CD, container orchestration, zero-downtime releases.</p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // Variant A: Modern Grid Clean Card (Default)
  return (
    <section id="about" className="py-14 px-4 sm:px-6 max-w-5xl mx-auto">
      <div className="flex items-center gap-3 mb-6 justify-center md:justify-start">
        <div className="p-2 rounded-xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
          <User className="w-5 h-5" />
        </div>
        <h2 className={`text-2xl sm:text-3xl font-extrabold ${isDev ? 'text-emerald-400 font-mono' : 'text-white'}`}>
          About Me
        </h2>
      </div>

      <div
        className={`p-6 sm:p-8 rounded-3xl relative transition-all ${
          isGlass
            ? 'glass-panel border border-white/10 backdrop-blur-xl bg-slate-900/40 shadow-xl'
            : isDev
            ? 'bg-slate-900/80 border border-emerald-500/30 font-mono'
            : isBold
            ? 'bg-slate-900 border-2 border-amber-400/80 shadow-[4px_4px_0px_0px_rgba(251,191,36,0.3)]'
            : isCreative
            ? 'bg-gradient-to-br from-pink-950/20 to-purple-950/30 border border-pink-500/30'
            : 'bg-slate-900/50 border border-slate-800'
        }`}
      >
        {isDev && (
          <div className="text-xs text-emerald-400/60 pb-3 mb-3 border-b border-emerald-500/20 flex items-center justify-between font-mono">
            <span>// bio.config.json</span>
            <span>UTF-8</span>
          </div>
        )}
        <p className="text-slate-300 text-sm sm:text-base sm:leading-relaxed whitespace-pre-line font-normal">
          {about || 'Share your story, vision, and core competencies here.'}
        </p>
      </div>
    </section>
  );
};
