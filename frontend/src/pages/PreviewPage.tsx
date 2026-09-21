import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import confetti from 'canvas-confetti';
import { ArrowLeft, Download, FileCode, Edit3 } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';
import { PortfolioRenderer } from '../components/portfolio/PortfolioRenderer';
import { exportPortfolioAsZip, downloadStaticHtmlFile } from '../services/export/zipExporter';

export const PreviewPage: React.FC = () => {
  const { portfolioId } = useParams<{ portfolioId: string }>();
  const navigate = useNavigate();
  const { currentPortfolio, selectPortfolio } = usePortfolio();
  const [downloading, setDownloading] = useState(false);

  useEffect(() => {
    if (portfolioId) {
      selectPortfolio(portfolioId);
    }
  }, [portfolioId]);

  if (!currentPortfolio) {
    return (
      <div className="min-h-screen bg-[#070a12] flex items-center justify-center text-slate-300">
        <div className="text-center space-y-4">
          <p className="text-sm">Loading portfolio preview...</p>
          <Link to="/dashboard" className="text-xs text-indigo-400 hover:underline">
            Back to Dashboard
          </Link>
        </div>
      </div>
    );
  }

  const handleDownloadZip = async () => {
    setDownloading(true);
    try {
      await exportPortfolioAsZip(currentPortfolio);
      confetti({
        particleCount: 100,
        spread: 80,
        origin: { y: 0.6 },
      });
    } catch (err) {
      console.error(err);
    } finally {
      setDownloading(false);
    }
  };

  return (
    <div className="relative min-h-screen bg-[#070a12]">
      {/* Floating Action Controls Bar */}
      <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2 p-1.5 rounded-2xl bg-slate-900/90 border border-slate-700/80 shadow-2xl backdrop-blur-xl">
        <button
          onClick={() => navigate(`/builder/${currentPortfolio.id}`)}
          className="px-3 py-1.5 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 transition-colors flex items-center gap-1.5"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Editor</span>
        </button>

        <button
          onClick={() => downloadStaticHtmlFile(currentPortfolio)}
          className="px-3 py-1.5 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 transition-colors flex items-center gap-1.5"
        >
          <FileCode className="w-3.5 h-3.5" />
          <span>Download HTML</span>
        </button>

        <button
          onClick={handleDownloadZip}
          disabled={downloading}
          className="px-4 py-1.5 rounded-xl text-xs font-bold bg-gradient-to-r from-indigo-500 to-cyan-500 text-white shadow-md shadow-indigo-500/20 hover:scale-105 transition-all flex items-center gap-1.5"
        >
          <Download className="w-3.5 h-3.5" />
          <span>Download ZIP</span>
        </button>
      </div>

      {/* Render the full portfolio */}
      <PortfolioRenderer portfolio={currentPortfolio} />
    </div>
  );
};
