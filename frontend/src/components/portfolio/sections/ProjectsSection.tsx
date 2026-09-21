import React from 'react';
import { Layers, Github, ExternalLink } from 'lucide-react';
import { ProjectItem, TemplateStyle, TemplateVariant } from '../../../types/portfolio';

interface ProjectsSectionProps {
  projects: ProjectItem[];
  style: TemplateStyle;
  variant: TemplateVariant;
  isDark: boolean;
}

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({ projects, style, variant, isDark }) => {
  const isDev = style === 'developer';
  const isGlass = style === 'glass';
  const isBold = style === 'bold';

  return (
    <section id="projects" className="py-16 px-6 max-w-6xl mx-auto">
      <div className="flex items-center gap-3 mb-8 justify-center md:justify-start">
        <div className="p-2 rounded-lg bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
          <Layers className="w-5 h-5" />
        </div>
        <h2 className={`text-2xl sm:text-3xl font-bold ${isDev ? 'text-emerald-400 font-mono' : 'text-white'}`}>
          Featured Projects
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project, idx) => (
          <div
            key={idx}
            className={`group rounded-2xl overflow-hidden flex flex-col justify-between transition-all hover:translate-y-[-4px] ${
              isGlass
                ? 'glass-panel hover:shadow-xl hover:shadow-cyan-500/10'
                : isDev
                ? 'bg-slate-900 border border-slate-800 hover:border-emerald-500/50 font-mono'
                : isBold
                ? 'bg-slate-900 border-2 border-slate-800 hover:border-amber-400'
                : 'bg-slate-900/60 border border-slate-800 hover:border-indigo-500/40'
            }`}
          >
            <div>
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

              <div className="p-6">
                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors">
                  {project.title}
                </h3>
                <p className="text-slate-400 text-sm leading-relaxed mb-4 line-clamp-3">
                  {project.description}
                </p>

                {project.technologies && project.technologies.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {project.technologies.map((tech, tIdx) => (
                      <span
                        key={tIdx}
                        className="text-[11px] font-medium px-2 py-0.5 rounded bg-slate-800/80 text-slate-300 border border-slate-700/60"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="px-6 pb-6 pt-0 flex items-center gap-3">
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex-1 py-2 px-3 rounded-lg text-xs font-semibold border border-slate-700 bg-slate-800/50 hover:bg-slate-800 text-slate-200 transition-colors flex items-center justify-center gap-1.5"
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
                  className="flex-1 py-2 px-3 rounded-lg text-xs font-semibold bg-indigo-600 hover:bg-indigo-500 text-white transition-colors flex items-center justify-center gap-1.5 shadow-md shadow-indigo-600/20"
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
