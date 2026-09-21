import React from 'react';
import { MapPin, Mail, Sparkles, ArrowRight, ExternalLink } from 'lucide-react';
import { PersonalInfo, TemplateStyle, TemplateVariant } from '../../../types/portfolio';

interface HeroSectionProps {
  personal: PersonalInfo;
  style: TemplateStyle;
  variant: TemplateVariant;
  isDark: boolean;
  onEdit?: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ personal, style, variant, isDark, onEdit }) => {
  const isDev = style === 'developer';
  const isGlass = style === 'glass';
  const isBold = style === 'bold';
  const isMinimal = style === 'minimalist';
  const isCreative = style === 'creative';

  // Variant C: Bento Box Split Hero
  if (variant === 'variantC') {
    return (
      <section className="relative py-16 px-6 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch">
          {/* Main Info Bento Box */}
          <div
            className={`md:col-span-8 p-8 rounded-2xl flex flex-col justify-between transition-all ${
              isGlass
                ? 'glass-panel shadow-2xl shadow-indigo-500/10'
                : isDev
                ? 'bg-slate-900/90 border border-emerald-500/30 font-mono'
                : isBold
                ? 'bg-gradient-to-br from-indigo-950 via-slate-900 to-slate-900 border-2 border-indigo-500/40'
                : 'bg-slate-900/60 border border-slate-800'
            }`}
          >
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold mb-6 bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
                <span>Open for new opportunities</span>
              </div>
              <h1 className={`text-4xl md:text-5xl font-extrabold tracking-tight mb-4 ${isDev ? 'text-emerald-400' : 'text-white'}`}>
                {personal.name || 'Your Full Name'}
              </h1>
              <p className="text-lg md:text-xl text-slate-300 font-medium leading-relaxed max-w-xl">
                {personal.headline || 'Senior Software Engineer & Problem Solver'}
              </p>
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <a
                href="#projects"
                className={`px-5 py-2.5 rounded-xl font-semibold text-sm transition-all flex items-center gap-2 ${
                  isDev
                    ? 'bg-emerald-500 hover:bg-emerald-600 text-slate-950'
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
            className={`md:col-span-4 p-6 rounded-2xl flex flex-col items-center justify-center text-center ${
              isGlass
                ? 'glass-panel'
                : isDev
                ? 'bg-slate-900/90 border border-slate-800 font-mono'
                : 'bg-slate-900/60 border border-slate-800'
            }`}
          >
            {personal.profileImage ? (
              <img
                src={personal.profileImage}
                alt={personal.name}
                className="w-32 h-32 rounded-full object-cover ring-4 ring-indigo-500/40 shadow-xl mb-4"
              />
            ) : (
              <div className="w-32 h-32 rounded-full bg-slate-800 flex items-center justify-center text-3xl font-bold text-slate-300 ring-4 ring-indigo-500/20 mb-4">
                {personal.name ? personal.name.charAt(0) : 'P'}
              </div>
            )}
            <div className="text-sm text-slate-400 space-y-1">
              {personal.location && (
                <p className="flex items-center justify-center gap-1.5 text-xs text-slate-400">
                  <MapPin className="w-3.5 h-3.5 text-indigo-400" />
                  {personal.location}
                </p>
              )}
              {personal.email && (
                <p className="flex items-center justify-center gap-1.5 text-xs text-slate-400">
                  <Mail className="w-3.5 h-3.5 text-indigo-400" />
                  {personal.email}
                </p>
              )}
            </div>
          </div>
        </div>
      </section>
    );
  }

  // Variant B: Storyline / Clean Center Alignment
  if (variant === 'variantB') {
    return (
      <section className="relative py-20 px-6 max-w-4xl mx-auto text-center">
        {personal.profileImage && (
          <img
            src={personal.profileImage}
            alt={personal.name}
            className={`w-28 h-28 rounded-full mx-auto object-cover mb-6 ring-4 shadow-xl ${
              isDev ? 'ring-emerald-500' : 'ring-indigo-500/50'
            }`}
          />
        )}
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-semibold mb-6 bg-slate-800/80 border border-slate-700 text-slate-300">
          <Sparkles className="w-3.5 h-3.5 text-yellow-400" />
          <span>Building the next generation of web products</span>
        </div>
        <h1
          className={`text-5xl md:text-6xl font-extrabold tracking-tight mb-6 ${
            isDev
              ? 'text-emerald-400 font-mono'
              : isBold
              ? 'gradient-text-amber'
              : 'gradient-text-blue'
          }`}
        >
          {personal.name || 'Your Full Name'}
        </h1>
        <p className="text-xl text-slate-300 font-normal leading-relaxed max-w-2xl mx-auto mb-8">
          {personal.headline || 'Software Engineer & Full Stack Creator'}
        </p>
        <div className="flex flex-wrap justify-center items-center gap-4">
          <a
            href="#projects"
            className="px-6 py-3 rounded-xl font-semibold text-sm bg-gradient-to-r from-indigo-500 to-cyan-500 text-white shadow-lg shadow-indigo-500/20 hover:scale-105 transition-all"
          >
            View Showcase
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
    <section className="relative py-20 px-6 max-w-6xl mx-auto">
      <div className="flex flex-col-reverse md:flex-row items-center justify-between gap-12">
        <div className="flex-1 text-center md:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold mb-6 bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
            <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
            <span>Available for Hire & Collaboration</span>
          </div>

          <h1
            className={`text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight mb-6 ${
              isDev ? 'text-emerald-400 font-mono' : isBold ? 'text-white font-extrabold' : 'text-white'
            }`}
          >
            Hi, I'm <span className="gradient-text-blue">{personal.name || 'Alex Morgan'}</span>
          </h1>

          <p className="text-lg sm:text-xl text-slate-300 font-medium mb-8 leading-relaxed max-w-xl">
            {personal.headline || 'Full Stack Engineer crafting delightful, high-performance web experiences.'}
          </p>

          <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 mb-8">
            <a
              href="#projects"
              className="px-6 py-3 rounded-xl font-semibold text-sm bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-600/30 transition-all flex items-center gap-2 hover:translate-y-[-2px]"
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

          <div className="flex flex-wrap items-center justify-center md:justify-start gap-6 text-xs text-slate-400">
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
          <div className="relative w-48 h-48 sm:w-64 sm:h-64 rounded-2xl overflow-hidden ring-4 ring-indigo-500/30 shadow-2xl">
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
            <div className="absolute -bottom-3 -right-3 bg-slate-900 border border-emerald-500/40 px-3 py-1 rounded-md text-[11px] font-mono text-emerald-400 shadow-xl">
              status: active
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
