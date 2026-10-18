import React from 'react';
import { MapPin, Mail, Sparkles, ArrowRight, Terminal } from 'lucide-react';
import { PersonalInfo, TemplateStyle, TemplateVariant } from '../../../types/portfolio';
import { useViewport } from '../../../context/ViewportContext';

interface HeroSectionProps {
  personal: PersonalInfo;
  style: TemplateStyle;
  variant: TemplateVariant;
  isDark: boolean;
  onEdit?: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ personal, style, variant, isDark }) => {
  const { isMobile } = useViewport();
  const isDev = style === 'developer';
  const isGlass = style === 'glass';
  const isBold = style === 'bold';
  const isMinimal = style === 'minimalist';
  const isCreative = style === 'creative';

  // Variant C: Bento Box Split Hero
  if (variant === 'variantC') {
    return (
      <section className="relative py-12 px-4 sm:px-6 max-w-6xl mx-auto">
        <div className={`grid gap-5 items-stretch ${isMobile ? 'grid-cols-1' : 'grid-cols-1 md:grid-cols-12'}`}>
          {/* Main Info Bento Box */}
          <div
            className={`p-6 sm:p-8 rounded-3xl flex flex-col justify-between transition-all ${
              isMobile ? 'w-full' : 'md:col-span-8'
            } ${
              isGlass
                ? 'glass-panel shadow-2xl shadow-indigo-500/10 border border-white/10 backdrop-blur-xl bg-slate-900/40'
                : isDev
                ? 'bg-slate-900/90 border border-emerald-500/30 font-mono shadow-lg shadow-emerald-500/5'
                : isBold
                ? 'bg-slate-900 border-2 border-amber-400 shadow-[6px_6px_0px_0px_rgba(251,191,36,0.3)]'
                : isCreative
                ? 'bg-gradient-to-br from-pink-950/40 via-purple-950/30 to-slate-900/80 border border-pink-500/30 shadow-xl'
                : 'bg-slate-900/60 border border-slate-800'
            }`}
          >
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-6">
                <span className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold ${
                  isDev
                    ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                    : isCreative
                    ? 'bg-pink-500/10 text-pink-300 border border-pink-500/30'
                    : isBold
                    ? 'bg-amber-400/10 text-amber-300 border border-amber-400/40'
                    : 'bg-indigo-500/10 text-indigo-400 border border-indigo-500/20'
                }`}>
                  <span className={`w-2 h-2 rounded-full ${isDev ? 'bg-emerald-400 animate-pulse' : isCreative ? 'bg-pink-400 animate-ping' : 'bg-emerald-400'}`}></span>
                  <span>Open for opportunities</span>
                </span>
                {isDev && (
                  <span className="text-[11px] font-mono text-slate-500 px-2 py-0.5 rounded bg-slate-800/80">
                    branch: main
                  </span>
                )}
              </div>

              <h1 className={`text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight mb-4 break-words ${
                isDev
                  ? 'text-emerald-400'
                  : isCreative
                  ? 'bg-gradient-to-r from-pink-400 via-fuchsia-300 to-indigo-400 bg-clip-text text-transparent'
                  : isBold
                  ? 'text-white'
                  : 'text-white'
              }`}>
                {personal.name || 'Your Full Name'}
              </h1>

              <p className={`text-base sm:text-lg md:text-xl font-medium leading-relaxed max-w-xl ${
                isDev ? 'text-slate-300 font-mono' : isMinimal ? 'text-slate-400' : 'text-slate-300'
              }`}>
                {personal.headline || 'Senior Software Engineer & Problem Solver'}
              </p>
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a
                href="#projects"
                className={`px-5 py-2.5 rounded-xl font-semibold text-sm transition-all flex items-center gap-2 ${
                  isDev
                    ? 'bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-mono font-bold'
                    : isCreative
                    ? 'bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white shadow-lg shadow-pink-500/20'
                    : isBold
                    ? 'bg-amber-400 hover:bg-amber-500 text-slate-950 font-bold border-2 border-slate-950'
                    : 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-600/30'
                }`}
              >
                <span>Explore Works</span>
                <ArrowRight className="w-4 h-4" />
              </a>
              <a
                href="#contact"
                className="px-5 py-2.5 rounded-xl font-semibold text-sm border border-slate-700 bg-slate-800/60 hover:bg-slate-800 text-slate-200 transition-colors"
              >
                Get in Touch
              </a>
            </div>
          </div>

          {/* Profile Image / Status Bento Box */}
          <div
            className={`p-6 rounded-3xl flex flex-col items-center justify-center text-center transition-all ${
              isMobile ? 'w-full' : 'md:col-span-4'
            } ${
              isGlass
                ? 'glass-panel shadow-xl border border-white/10 backdrop-blur-xl bg-slate-900/40'
                : isDev
                ? 'bg-slate-900/90 border border-emerald-500/20 font-mono'
                : isBold
                ? 'bg-slate-900 border-2 border-amber-400/60 shadow-[4px_4px_0px_0px_rgba(251,191,36,0.2)]'
                : isCreative
                ? 'bg-gradient-to-br from-purple-950/40 to-slate-900/80 border border-purple-500/30'
                : 'bg-slate-900/60 border border-slate-800'
            }`}
          >
            {personal.profileImage ? (
              <img
                src={personal.profileImage}
                alt={personal.name}
                className={`w-28 h-28 sm:w-32 sm:h-32 rounded-full object-cover shadow-xl mb-4 ${
                  isDev ? 'ring-4 ring-emerald-500/40' : isCreative ? 'ring-4 ring-pink-500/50' : isBold ? 'ring-4 ring-amber-400' : 'ring-4 ring-indigo-500/40'
                }`}
              />
            ) : (
              <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full bg-slate-800 flex items-center justify-center text-3xl font-bold text-slate-300 ring-4 ring-indigo-500/20 mb-4">
                {personal.name ? personal.name.charAt(0) : 'P'}
              </div>
            )}
            <div className="text-sm text-slate-400 space-y-1.5 w-full">
              {personal.location && (
                <p className="flex items-center justify-center gap-1.5 text-xs text-slate-300 truncate">
                  <MapPin className="w-3.5 h-3.5 text-indigo-400 flex-shrink-0" />
                  <span>{personal.location}</span>
                </p>
              )}
              {personal.email && (
                <p className="flex items-center justify-center gap-1.5 text-xs text-slate-300 truncate">
                  <Mail className="w-3.5 h-3.5 text-cyan-400 flex-shrink-0" />
                  <span className="truncate">{personal.email}</span>
                </p>
              )}
            </div>
          </div>
        </div>
      </section>
    );
  }

  // Variant B: Storyline / Editorial Center Narrative
  if (variant === 'variantB') {
    return (
      <section className="relative py-16 sm:py-24 px-4 sm:px-6 max-w-4xl mx-auto text-center">
        {personal.profileImage && (
          <div className="relative inline-block mb-6">
            <img
              src={personal.profileImage}
              alt={personal.name}
              className={`w-28 h-28 sm:w-32 sm:h-32 rounded-full mx-auto object-cover ring-4 shadow-2xl ${
                isDev
                  ? 'ring-emerald-500'
                  : isCreative
                  ? 'ring-pink-500 ring-offset-4 ring-offset-slate-950'
                  : isBold
                  ? 'ring-amber-400 ring-offset-2 ring-offset-slate-950'
                  : 'ring-indigo-500/50'
              }`}
            />
            {isDev && (
              <span className="absolute bottom-0 right-1 w-4 h-4 bg-emerald-400 border-2 border-slate-950 rounded-full animate-ping"></span>
            )}
          </div>
        )}

        <div className={`inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-semibold mb-6 ${
          isCreative
            ? 'bg-pink-500/10 border border-pink-500/30 text-pink-300'
            : isBold
            ? 'bg-amber-400/10 border-2 border-amber-400/40 text-amber-300 font-bold'
            : 'bg-slate-800/80 border border-slate-700 text-slate-300'
        }`}>
          {isDev ? <Terminal className="w-3.5 h-3.5 text-emerald-400" /> : <Sparkles className="w-3.5 h-3.5 text-amber-400" />}
          <span>{isDev ? 'status: ready for production' : 'Building modern software experiences'}</span>
        </div>

        <h1
          className={`text-3xl sm:text-5xl md:text-6xl font-black tracking-tight mb-6 leading-tight ${
            isDev
              ? 'text-emerald-400 font-mono'
              : isCreative
              ? 'bg-gradient-to-r from-pink-400 via-purple-300 to-indigo-300 bg-clip-text text-transparent'
              : isBold
              ? 'text-white tracking-normal uppercase'
              : isMinimal
              ? 'text-slate-100 font-light'
              : 'text-white'
          }`}
        >
          {personal.name || 'Your Full Name'}
        </h1>

        <p className="text-base sm:text-lg md:text-xl text-slate-300 font-normal leading-relaxed max-w-2xl mx-auto mb-8">
          {personal.headline || 'Software Engineer & Full Stack Creator'}
        </p>

        <div className="flex flex-wrap justify-center items-center gap-3">
          <a
            href="#projects"
            className={`px-6 py-3 rounded-xl font-bold text-sm transition-all ${
              isDev
                ? 'bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-mono'
                : isCreative
                ? 'bg-gradient-to-r from-pink-500 to-violet-600 hover:scale-105 text-white shadow-lg shadow-pink-500/25'
                : isBold
                ? 'bg-amber-400 hover:bg-amber-300 text-slate-950 border-2 border-slate-950'
                : 'bg-gradient-to-r from-indigo-500 to-cyan-500 text-white shadow-lg shadow-indigo-500/20 hover:scale-105'
            }`}
          >
            Explore Storyline & Works
          </a>
          <a
            href="#contact"
            className="px-6 py-3 rounded-xl font-semibold text-sm border border-slate-700 bg-slate-800/60 hover:bg-slate-800 text-slate-200 transition-colors"
          >
            Contact
          </a>
        </div>
      </section>
    );
  }

  // Variant A: Modern Grid / Split Hero (Default)
  return (
    <section className="relative py-14 sm:py-20 px-4 sm:px-6 max-w-6xl mx-auto">
      <div className={`flex items-center justify-between gap-8 sm:gap-12 ${
        isMobile ? 'flex-col text-center' : 'flex-col-reverse md:flex-row text-center md:text-left'
      }`}>
        <div className="flex-1">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold mb-6 bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
            <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
            <span>Available for Hire & Collaboration</span>
          </div>

          <h1
            className={`text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight mb-5 ${
              isDev
                ? 'text-emerald-400 font-mono'
                : isCreative
                ? 'bg-gradient-to-r from-pink-400 via-fuchsia-300 to-cyan-300 bg-clip-text text-transparent'
                : isBold
                ? 'text-white font-extrabold uppercase'
                : isMinimal
                ? 'text-slate-100 font-normal tracking-tight'
                : 'text-white'
            }`}
          >
            Hi, I'm <span className={isCreative ? 'text-pink-400' : isDev ? 'text-emerald-400 underline decoration-emerald-500/50' : isBold ? 'text-amber-400' : 'text-indigo-400'}>{personal.name || 'Alex Morgan'}</span>
          </h1>

          <p className="text-base sm:text-lg md:text-xl text-slate-300 font-medium mb-8 leading-relaxed max-w-xl">
            {personal.headline || 'Full Stack Engineer crafting delightful, high-performance web experiences.'}
          </p>

          <div className={`flex flex-wrap items-center gap-3 mb-8 ${isMobile ? 'justify-center' : 'justify-center md:justify-start'}`}>
            <a
              href="#projects"
              className={`px-6 py-3 rounded-xl font-bold text-sm transition-all flex items-center gap-2 ${
                isDev
                  ? 'bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-mono'
                  : isCreative
                  ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow-lg shadow-pink-500/20'
                  : isBold
                  ? 'bg-amber-400 hover:bg-amber-300 text-slate-950 border-2 border-slate-950'
                  : 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-600/30'
              }`}
            >
              <span>View Projects</span>
              <ArrowRight className="w-4 h-4" />
            </a>
            <a
              href="#contact"
              className="px-6 py-3 rounded-xl font-semibold text-sm border border-slate-700 bg-slate-800/60 hover:bg-slate-800 text-slate-200 transition-colors"
            >
              Let's Talk
            </a>
          </div>

          <div className={`flex flex-wrap items-center gap-4 text-xs text-slate-400 ${isMobile ? 'justify-center' : 'justify-center md:justify-start'}`}>
            {personal.location && (
              <span className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-indigo-400" />
                {personal.location}
              </span>
            )}
            {personal.email && (
              <span className="flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-cyan-400" />
                {personal.email}
              </span>
            )}
          </div>
        </div>

        {/* Hero Image */}
        <div className="flex-shrink-0 relative">
          <div className={`relative w-40 h-40 sm:w-56 sm:h-56 rounded-2xl overflow-hidden shadow-2xl ${
            isDev
              ? 'ring-4 ring-emerald-500/40'
              : isCreative
              ? 'ring-4 ring-pink-500/40 rounded-3xl'
              : isBold
              ? 'ring-4 ring-amber-400'
              : 'ring-4 ring-indigo-500/30'
          }`}>
            <img
              src={
                personal.profileImage ||
                'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=600&auto=format&fit=crop&q=80'
              }
              alt={personal.name}
              className="w-full h-full object-cover"
            />
          </div>
          {isDev && (
            <div className="absolute -bottom-2 -right-2 bg-slate-900 border border-emerald-500/40 px-2.5 py-0.5 rounded-md text-[10px] font-mono text-emerald-400 shadow-xl">
              online: ready
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
