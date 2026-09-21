import React from 'react';
import { Portfolio } from '../../types/portfolio';
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
}

export const PortfolioRenderer: React.FC<PortfolioRendererProps> = ({ portfolio }) => {
  const { portfolioData, style, template, theme, sections } = portfolio;
  const isDark = theme === 'dark' || theme === 'system';

  // Base background and text colors depending on style and theme
  const getStyleWrapperClass = () => {
    let base = isDark ? 'bg-[#0a0e17] text-slate-100' : 'bg-slate-50 text-slate-900';

    switch (style) {
      case 'minimalist':
        return `${base} font-sans tracking-tight selection:bg-slate-800 selection:text-white`;
      case 'bold':
        return `${base} font-sans selection:bg-amber-500 selection:text-slate-950`;
      case 'glass':
        return `${base} bg-gradient-to-b from-slate-950 via-[#0d1424] to-slate-950 selection:bg-indigo-500`;
      case 'developer':
        return `${base} font-mono selection:bg-emerald-500 selection:text-slate-950`;
      case 'creative':
        return `${base} font-sans selection:bg-pink-500 selection:text-white`;
      default:
        return base;
    }
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${getStyleWrapperClass()}`}>
      {/* Portfolio Top Bar */}
      <header className="sticky top-0 z-40 backdrop-blur-md bg-slate-950/40 border-b border-slate-800/50 py-3.5 px-6">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <span className="font-bold text-sm tracking-wide text-white">
            {portfolioData.personal?.name || 'Portfolio'}
          </span>
          <nav className="hidden sm:flex items-center gap-5 text-xs font-medium text-slate-400">
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
