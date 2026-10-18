import React from 'react';
import { Portfolio } from '../../types/portfolio';
import { ViewportMode } from '../builder/DeviceViewportSelector';
import { ViewportProvider, useViewport } from '../../context/ViewportContext';
import { HeroSection } from './sections/HeroSection';
import { AboutSection } from './sections/AboutSection';
import { SkillsSection } from './sections/SkillsSection';
import { ProjectsSection } from './sections/ProjectsSection';
import { ExperienceSection } from './sections/ExperienceSection';
import { EducationSection } from './sections/EducationSection';
import { CertificationsSection } from './sections/CertificationsSection';
import { AchievementsSection } from './sections/AchievementsSection';
import { ContactSection } from './sections/ContactSection';

interface PortfolioRendererProps {
  portfolio: Portfolio;
  isInteractive?: boolean;
  viewportMode?: ViewportMode;
}

const PortfolioContent: React.FC<PortfolioRendererProps> = ({ portfolio }) => {
  const { portfolioData, style, template, theme, sections } = portfolio;
  const isDark = theme === 'dark' || theme === 'system';
  const { isMobile } = useViewport();

  // Distinct background, typography, and styling depending on chosen style
  const getStyleWrapperClass = () => {
    let base = isDark ? 'text-slate-100' : 'text-slate-900 bg-slate-50';

    switch (style) {
      case 'minimalist':
        return isDark
          ? 'bg-[#080a0f] text-slate-200 font-sans tracking-tight selection:bg-slate-700 selection:text-white'
          : `${base} font-sans tracking-tight`;
      case 'bold':
        return isDark
          ? 'bg-[#0a0d17] text-white font-sans selection:bg-amber-400 selection:text-slate-950'
          : `${base} font-sans font-medium`;
      case 'glass':
        return isDark
          ? 'bg-gradient-to-b from-[#050814] via-[#091226] to-[#060a16] text-slate-100 selection:bg-indigo-500'
          : `${base} bg-gradient-to-b from-indigo-50/50 via-slate-50 to-indigo-50/30`;
      case 'developer':
        return isDark
          ? 'bg-[#070b12] text-slate-200 font-mono selection:bg-emerald-500 selection:text-slate-950'
          : `${base} font-mono`;
      case 'creative':
        return isDark
          ? 'bg-gradient-to-br from-[#12071c] via-[#1a0a28] to-[#0c0617] text-slate-100 selection:bg-pink-500 selection:text-white'
          : `${base} bg-gradient-to-br from-pink-50/40 via-purple-50/30 to-indigo-50/40`;
      default:
        return base;
    }
  };

  const getHeaderClass = () => {
    switch (style) {
      case 'developer':
        return 'border-b border-emerald-500/20 bg-slate-950/80 font-mono text-emerald-400';
      case 'glass':
        return 'backdrop-blur-xl bg-slate-950/30 border-b border-white/10 shadow-lg shadow-indigo-500/5';
      case 'bold':
        return 'border-b-2 border-amber-400/30 bg-slate-950/90';
      case 'creative':
        return 'border-b border-pink-500/20 bg-[#12071c]/70 backdrop-blur-md';
      case 'minimalist':
      default:
        return 'border-b border-slate-800/60 bg-slate-950/40 backdrop-blur-md';
    }
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${getStyleWrapperClass()}`}>
      {/* Portfolio Top Bar */}
      <header className={`sticky top-0 z-40 py-3.5 px-4 sm:px-6 transition-all ${getHeaderClass()}`}>
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <span className={`font-bold text-sm tracking-wide flex items-center gap-2 ${
            style === 'developer' ? 'text-emerald-400' : style === 'creative' ? 'text-pink-300' : 'text-white'
          }`}>
            {style === 'developer' && <span className="text-emerald-500">$</span>}
            {portfolioData.personal?.name || 'Portfolio'}
          </span>
          {!isMobile && (
            <nav className="flex items-center gap-5 text-xs font-medium text-slate-400">
              {sections
                .filter(s => s.visible && s.type !== 'hero')
                .map(s => (
                  <a
                    key={s.id}
                    href={`#${s.type}`}
                    className="hover:text-white transition-colors capitalize"
                  >
                    {s.title}
                  </a>
                ))}
            </nav>
          )}
        </div>
      </header>

      {/* Render each visible section in the configured order */}
      <main className="space-y-4">
        {sections
          .filter(s => s.visible)
          .map(s => {
            switch (s.type) {
              case 'hero':
                return (
                  <HeroSection
                    key={s.id}
                    personal={portfolioData.personal}
                    style={style}
                    variant={template}
                    isDark={isDark}
                  />
                );
              case 'about':
                return (
                  <AboutSection
                    key={s.id}
                    about={portfolioData.about}
                    style={style}
                    variant={template}
                    isDark={isDark}
                  />
                );
              case 'skills':
                return (
                  <SkillsSection
                    key={s.id}
                    skills={portfolioData.skills}
                    style={style}
                    variant={template}
                    isDark={isDark}
                  />
                );
              case 'projects':
                return (
                  <ProjectsSection
                    key={s.id}
                    projects={portfolioData.projects}
                    style={style}
                    variant={template}
                    isDark={isDark}
                  />
                );
              case 'experience':
                return (
                  <ExperienceSection
                    key={s.id}
                    experience={portfolioData.experience}
                    style={style}
                    variant={template}
                    isDark={isDark}
                  />
                );
              case 'education':
                return (
                  <EducationSection
                    key={s.id}
                    education={portfolioData.education}
                    style={style}
                    variant={template}
                    isDark={isDark}
                  />
                );
              case 'certifications':
                return (
                  <CertificationsSection
                    key={s.id}
                    certifications={portfolioData.certifications}
                    style={style}
                    variant={template}
                    isDark={isDark}
                  />
                );
              case 'achievements':
                return (
                  <AchievementsSection
                    key={s.id}
                    achievements={portfolioData.achievements}
                    style={style}
                    variant={template}
                    isDark={isDark}
                  />
                );
              case 'contact':
                return (
                  <ContactSection
                    key={s.id}
                    contact={portfolioData.contact}
                    social={portfolioData.social}
                    style={style}
                    variant={template}
                    isDark={isDark}
                  />
                );
              default:
                return null;
            }
          })}
      </main>

      {/* Footer */}
      <footer className="py-12 border-t border-slate-800/60 text-center text-xs text-slate-500">
        <p>© {new Date().getFullYear()} {portfolioData.personal?.name || 'Developer'}. All rights reserved.</p>
      </footer>
    </div>
  );
};

export const PortfolioRenderer: React.FC<PortfolioRendererProps> = (props) => {
  return (
    <ViewportProvider mode={props.viewportMode}>
      <PortfolioContent {...props} />
    </ViewportProvider>
  );
};
