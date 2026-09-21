import React from 'react';
import { Sparkles, Heart, Github, Globe } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-slate-800/80 bg-slate-950 py-12 px-4 sm:px-6 lg:px-8 text-slate-400">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center">
            <Sparkles className="w-4 h-4 text-white" />
          </div>
          <span className="font-bold text-white text-base">
            Portfolio<span className="text-cyan-400">AI</span>
          </span>
          <span className="text-xs text-slate-500 ml-2">
            AI-Powered Portfolio Generator for Developers & Students
          </span>
        </div>

        <div className="flex items-center gap-6 text-sm text-slate-400">
          <Link to="/templates" className="hover:text-white transition-colors">
            Templates
          </Link>
          <Link to="/create" className="hover:text-white transition-colors">
            Builder
          </Link>
          <a
            href="https://github.com"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1.5 hover:text-white transition-colors"
          >
            <Github className="w-4 h-4" />
            GitHub
          </a>
        </div>

        <div className="text-xs text-slate-500 flex items-center gap-1">
          Built with <Heart className="w-3.5 h-3.5 text-pink-500 fill-pink-500 mx-0.5" /> for college showcase & production use
        </div>
      </div>
    </footer>
  );
};
