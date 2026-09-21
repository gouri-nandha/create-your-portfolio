import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Sparkles } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';
import { PortfolioRenderer } from '../components/portfolio/PortfolioRenderer';
import { INITIAL_SAMPLE_PORTFOLIOS } from '../data/samplePortfolios';

export const PublicPortfolioPage: React.FC = () => {
  const { username } = useParams<{ username: string }>();
  const { portfolios } = usePortfolio();

  // Find portfolio by username match or fallback to sample
  const portfolio =
    portfolios.find(p =>
      p.portfolioData.personal.name.toLowerCase().includes(username?.toLowerCase() || '')
    ) || INITIAL_SAMPLE_PORTFOLIOS[0];

  return (
    <div className="min-h-screen bg-[#070a12] relative">
      {/* Subtle branding banner */}
      <div className="py-2 px-4 bg-slate-950/90 border-b border-slate-800 flex items-center justify-between text-xs text-slate-400">
        <span className="flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
          <span>Created with <strong>PortfolioAI</strong></span>
        </span>
        <Link
          to="/create"
          className="text-indigo-400 hover:text-indigo-300 font-semibold hover:underline"
        >
          Build Your Own Free →
        </Link>
      </div>

      <PortfolioRenderer portfolio={portfolio} />
    </div>
  );
};
