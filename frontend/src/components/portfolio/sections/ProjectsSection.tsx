import React from 'react';
import { Layers, Github, ExternalLink, Sparkles, Terminal, Code } from 'lucide-react';
import { ProjectItem, TemplateStyle, TemplateVariant } from '../../../types/portfolio';
import { useViewport } from '../../../context/ViewportContext';

interface ProjectsSectionProps {
  projects: ProjectItem[];
  style: TemplateStyle;
  variant: TemplateVariant;
  isDark: boolean;
}

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({ projects, style, variant, isDark }) => {
  const { isMobile, isTablet } = useViewport();
  const isDev = style === 'developer';
  const isGlass = style === 'glass';
  const isBold = style === 'bold';
  const isCreative = style === 'creative';
  const isMinimal = style === 'minimalist';

  const getCardStyle = () => {
    if (isGlass) return 'glass-panel hover:shadow-2xl hover:shadow-cyan-500/10 border border-white/10 backdrop-blur-xl bg-slate-900/40';
    if (isDev) return 'bg-slate-900 border border-emerald-500/30 hover:border-emerald-400 font-mono';
    if (isBold) return 'bg-slate-900 border-2 border-amber-400/80 shadow-[4px_4px_0px_0px_rgba(251,191,36,0.3)] hover:shadow-[6px_6px_0px_0px_rgba(251,191,36,0.5)]';
    if (isCreative) return 'bg-gradient-to-br from-[#180e28] to-[#10091c] border border-pink-500/30 hover:border-pink-400/60 rounded-3xl shadow-lg';
    if (isMinimal) return 'bg-slate-900/30 border border-slate-800/80 hover:border-slate-700';
    return 'bg-slate-900/60 border border-slate-800 hover:border-indigo-500/40';
  };

  const getTechPillStyle = () => {
    if (isDev) return 'bg-slate-800/90 text-emerald-400 border border-emerald-500/20 font-mono text-[10px]';
    if (isCreative) return 'bg-pink-500/10 text-pink-300 border border-pink-500/20 text-[11px] rounded-full';
    if (isBold) return 'bg-amber-400/10 text-amber-300 border border-amber-400/30 text-[11px] font-bold';
    return 'bg-slate-800/80 text-slate-300 border border-slate-700/60 text-[11px]';
  };

  // Variant B: Storyline / Editorial Alternating Showcase (when not strictly mobile)
  if (variant === 'variantB' && !isMobile) {
    return (
      <section id="projects" className="py-16 px-4 sm:px-6 max-w-6xl mx-auto">
        <div className="flex items-center gap-3 mb-10 justify-center md:justify-start">
          <div className="p-2 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
            <Layers className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] font-bold tracking-widest text-indigo-400 uppercase">Case Studies & Architecture</span>
            <h2 className={`text-2xl sm:text-3xl font-extrabold ${isDev ? 'text-emerald-400 font-mono' : 'text-white'}`}>
              Featured Project Chronicles
            </h2>
          </div>
        </div>

        <div className="space-y-12">
          {projects.map((project, idx) => {
            const isReversed = idx % 2 === 1;
            return (
              <div
                key={idx}
                className={`rounded-3xl overflow-hidden p-6 sm:p-8 flex flex-col md:flex-row gap-8 items-center transition-all ${getCardStyle()}`}
              >
                {/* Image side */}
                <div className={`w-full md:w-1/2 flex-shrink-0 ${isReversed ? 'md:order-2' : 'md:order-1'}`}>
                  {project.image ? (
                    <div className="relative rounded-2xl overflow-hidden shadow-2xl h-60 sm:h-72 w-full bg-slate-950">
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent"></div>
                    </div>
                  ) : (
                    <div className="rounded-2xl bg-slate-800/50 h-60 sm:h-72 flex items-center justify-center border border-slate-700/50">
                      <Code className="w-12 h-12 text-slate-500" />
                    </div>
                  )}
                </div>

                {/* Content side */}
                <div className={`w-full md:w-1/2 flex flex-col justify-between ${isReversed ? 'md:order-1' : 'md:order-2'}`}>
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-indigo-400 mb-2 block">
                      Case Study 0{idx + 1}
                    </span>
                    <h3 className="text-2xl font-bold text-white mb-3 hover:text-cyan-400 transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-6">
                      {project.description}
                    </p>

                    {project.technologies && project.technologies.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-6">
                        {project.technologies.map((tech, tIdx) => (
                          <span key={tIdx} className={`px-2.5 py-1 rounded-md font-medium ${getTechPillStyle()}`}>
                            {tech}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="flex items-center gap-3 pt-4 border-t border-slate-800">
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="px-4 py-2 rounded-xl text-xs font-semibold border border-slate-700 bg-slate-800/60 hover:bg-slate-800 text-slate-200 transition-colors flex items-center gap-2"
                      >
                        <Github className="w-4 h-4" />
                        <span>Source Code</span>
                      </a>
                    )}
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="px-4 py-2 rounded-xl text-xs font-semibold bg-indigo-600 hover:bg-indigo-500 text-white transition-colors flex items-center gap-2 shadow-md shadow-indigo-600/20"
                      >
                        <span>Interactive Demo</span>
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    );
  }

  // Variant C: Bento Box Layout (1 large featured tile + modular companion tiles)
  if (variant === 'variantC' && !isMobile && projects.length >= 2) {
    const featured = projects[0];
    const companions = projects.slice(1);

    return (
      <section id="projects" className="py-16 px-4 sm:px-6 max-w-6xl mx-auto">
        <div className="flex items-center gap-3 mb-8 justify-center md:justify-start">
          <div className="p-2 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
            <Layers className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] font-bold tracking-widest text-indigo-400 uppercase">Modular Matrix</span>
            <h2 className={`text-2xl sm:text-3xl font-extrabold ${isDev ? 'text-emerald-400 font-mono' : 'text-white'}`}>
              Featured Projects
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* Main Large Bento Project (Spans 7 columns) */}
          <div className={`md:col-span-7 rounded-3xl overflow-hidden flex flex-col justify-between transition-all group ${getCardStyle()}`}>
            {featured.image && (
              <div className="relative h-56 sm:h-64 w-full overflow-hidden bg-slate-950">
                <img
                  src={featured.image}
                  alt={featured.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-bold bg-indigo-600/90 text-white shadow-lg backdrop-blur-md">
                  ★ Flagship Project
                </div>
              </div>
            )}
            <div className="p-6 flex-1 flex flex-col justify-between">
              <div>
                <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">{featured.title}</h3>
                <p className="text-slate-300 text-sm leading-relaxed mb-4">{featured.description}</p>
                {featured.technologies && (
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {featured.technologies.map((tech, tIdx) => (
                      <span key={tIdx} className={`px-2 py-0.5 rounded-md font-medium ${getTechPillStyle()}`}>
                        {tech}
                      </span>
                    ))}
                  </div>
                )}
              </div>
              <div className="flex items-center gap-3 pt-3 border-t border-slate-800">
                {featured.githubUrl && (
                  <a href={featured.githubUrl} target="_blank" rel="noreferrer" className="text-xs text-slate-300 hover:text-white flex items-center gap-1.5 font-medium">
                    <Github className="w-4 h-4" /> Code
                  </a>
                )}
                {featured.liveUrl && (
                  <a href={featured.liveUrl} target="_blank" rel="noreferrer" className="text-xs text-cyan-400 hover:underline flex items-center gap-1.5 font-bold ml-auto">
                    Live Demo <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}
              </div>
            </div>
          </div>

          {/* Side Companions (Spans 5 columns) */}
          <div className="md:col-span-5 flex flex-col gap-5">
            {companions.map((comp, idx) => (
              <div key={idx} className={`p-5 rounded-2xl flex-1 flex flex-col justify-between transition-all group ${getCardStyle()}`}>
                <div>
                  <h4 className="text-base font-bold text-white mb-1.5 group-hover:text-cyan-400 transition-colors">
                    {comp.title}
                  </h4>
                  <p className="text-slate-400 text-xs leading-relaxed line-clamp-2 mb-3">
                    {comp.description}
                  </p>
                  {comp.technologies && (
                    <div className="flex flex-wrap gap-1 mb-3">
                      {comp.technologies.slice(0, 3).map((tech, tIdx) => (
                        <span key={tIdx} className={`px-1.5 py-0.5 rounded text-[10px] ${getTechPillStyle()}`}>
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
                <div className="flex items-center gap-3 pt-2 border-t border-slate-800/60 text-xs">
                  {comp.githubUrl && <a href={comp.githubUrl} target="_blank" rel="noreferrer" className="text-slate-400 hover:text-white flex items-center gap-1"><Github className="w-3.5 h-3.5" /> Code</a>}
                  {comp.liveUrl && <a href={comp.liveUrl} target="_blank" rel="noreferrer" className="text-cyan-400 hover:underline ml-auto flex items-center gap-1 font-semibold">Demo <ExternalLink className="w-3 h-3" /></a>}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  // Variant A (Modern Grid) OR Mobile fallback:
  // When isMobile is true, it strictly uses grid-cols-1, giving full 100% width to every card so text never squishes!
  const gridClasses = isMobile
    ? 'grid-cols-1 gap-5'
    : isTablet
    ? 'grid-cols-1 sm:grid-cols-2 gap-6'
    : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6';

  return (
    <section id="projects" className="py-14 px-4 sm:px-6 max-w-6xl mx-auto">
      <div className="flex items-center gap-3 mb-8 justify-center md:justify-start">
        <div className="p-2 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
          <Layers className="w-5 h-5" />
        </div>
        <h2 className={`text-2xl sm:text-3xl font-extrabold ${isDev ? 'text-emerald-400 font-mono' : 'text-white'}`}>
          Featured Projects
        </h2>
      </div>

      <div className={`grid ${gridClasses}`}>
        {projects.map((project, idx) => (
          <div
            key={idx}
            className={`group rounded-2xl overflow-hidden flex flex-col justify-between transition-all hover:translate-y-[-4px] ${getCardStyle()}`}
          >
            <div>
              {/* Dev style top window terminal bar */}
              {isDev && (
                <div className="bg-slate-950 px-4 py-2 border-b border-emerald-500/20 flex items-center gap-1.5 text-[11px] text-emerald-400/70">
                  <span className="w-2 h-2 rounded-full bg-red-500/60 inline-block"></span>
                  <span className="w-2 h-2 rounded-full bg-yellow-500/60 inline-block"></span>
                  <span className="w-2 h-2 rounded-full bg-green-500/60 inline-block"></span>
                  <span className="ml-2 font-mono text-[10px]">project_{idx + 1}.tsx</span>
                </div>
              )}

              {project.image && (
                <div className="relative h-44 w-full overflow-hidden bg-slate-950">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent"></div>
                </div>
              )}

              <div className="p-5 sm:p-6">
                <h3 className="text-lg sm:text-xl font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors break-words">
                  {project.title}
                </h3>
                <p className="text-slate-300 text-xs sm:text-sm leading-relaxed mb-4 line-clamp-3">
                  {project.description}
                </p>

                {project.technologies && project.technologies.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {project.technologies.map((tech, tIdx) => (
                      <span
                        key={tIdx}
                        className={`px-2 py-0.5 rounded font-medium ${getTechPillStyle()}`}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="px-5 sm:px-6 pb-6 pt-0 flex items-center gap-3">
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex-1 py-2 px-3 rounded-xl text-xs font-semibold border border-slate-700 bg-slate-800/50 hover:bg-slate-800 text-slate-200 transition-colors flex items-center justify-center gap-1.5"
                >
                  <Github className="w-3.5 h-3.5" />
                  <span>Code</span>
                </a>
              )}
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noreferrer"
                  className={`flex-1 py-2 px-3 rounded-xl text-xs font-semibold text-white transition-colors flex items-center justify-center gap-1.5 shadow-md ${
                    isCreative
                      ? 'bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 shadow-pink-500/20'
                      : isBold
                      ? 'bg-amber-400 hover:bg-amber-500 text-slate-950 font-bold border border-slate-950'
                      : 'bg-indigo-600 hover:bg-indigo-500 shadow-indigo-600/20'
                  }`}
                >
                  <span>Live Demo</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
