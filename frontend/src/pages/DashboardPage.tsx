import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Plus, 
  Edit3, 
  Eye, 
  Trash2, 
  Download, 
  Sparkles, 
  FolderKanban, 
  Calendar, 
  Palette,
  ExternalLink,
  Layers
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { usePortfolio } from '../context/PortfolioContext';
import { exportPortfolioAsZip } from '../services/export/zipExporter';
import { Navbar } from '../components/common/Navbar';
import { Footer } from '../components/common/Footer';
import { Portfolio } from '../types/portfolio';

export const DashboardPage: React.FC = () => {
  const { currentUser } = useAuth();
  const { portfolios, deletePortfolio, selectPortfolio } = usePortfolio();
  const navigate = useNavigate();
  const [downloadingId, setDownloadingId] = useState<string | null>(null);

  const displayName = currentUser?.displayName || currentUser?.email?.split('@')[0] || 'Creator';

  const handleDownload = async (portfolio: Portfolio) => {
    setDownloadingId(portfolio.id);
    try {
      await exportPortfolioAsZip(portfolio);
    } catch (err) {
      console.error('Download failed:', err);
    } finally {
      setDownloadingId(null);
    }
  };

  return (
    <div className="min-h-screen bg-[#070a12] text-slate-100 flex flex-col">
      <Navbar />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Header Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-8 border-b border-slate-800">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-indigo-400 mb-1">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              <span>Workspace Dashboard</span>
            </div>
            <h1 className="text-3xl font-extrabold text-white">
              Welcome back, <span className="gradient-text-blue">{displayName}</span>
            </h1>
            <p className="text-slate-400 text-xs mt-1">
              Manage your generated portfolios, test styles, and export static builds.
            </p>
          </div>

          <Link
            to="/create"
            className="px-5 py-2.5 rounded-xl text-sm font-bold bg-gradient-to-r from-indigo-500 to-cyan-500 text-white shadow-lg shadow-indigo-500/20 hover:scale-105 transition-all flex items-center gap-2 w-fit"
          >
            <Plus className="w-4 h-4" />
            <span>+ Create New Portfolio</span>
          </Link>
        </div>

        {/* Portfolio Cards Grid */}
        <div className="py-8">
          {portfolios.length === 0 ? (
            /* Empty State */
            <div className="p-12 text-center rounded-3xl bg-slate-900/40 border border-slate-800 space-y-4 max-w-md mx-auto my-12">
              <div className="w-14 h-14 rounded-2xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center mx-auto">
                <FolderKanban className="w-7 h-7" />
              </div>
              <h3 className="text-lg font-bold text-white">No portfolios yet</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Upload your resume, paste your bio, or connect GitHub to let AI build your first portfolio in seconds.
              </p>
              <Link
                to="/create"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold bg-indigo-600 hover:bg-indigo-500 text-white transition-colors"
              >
                <Plus className="w-4 h-4" />
                <span>Create First Portfolio</span>
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {portfolios.map(portfolio => (
                <div
                  key={portfolio.id}
                  className="rounded-2xl overflow-hidden bg-slate-900/60 border border-slate-800 hover:border-slate-700 transition-all flex flex-col justify-between group shadow-xl"
                >
                  <div>
                    {/* Visual Card Header / Thumbnail */}
                    <div className="h-40 bg-gradient-to-br from-slate-900 to-slate-950 p-5 border-b border-slate-800 relative overflow-hidden flex flex-col justify-between">
                      <div className="flex items-center justify-between relative z-10">
                        <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                          {portfolio.style} style
                        </span>
                        <span className="text-[11px] text-slate-400 flex items-center gap-1">
                          <Calendar className="w-3 h-3 text-slate-500" />
                          {new Date(portfolio.updatedAt).toLocaleDateString()}
                        </span>
                      </div>

                      {/* Mini preview thumbnail visual */}
                      <div className="relative z-10 flex items-center gap-3">
                        {portfolio.portfolioData.personal.profileImage ? (
                          <img
                            src={portfolio.portfolioData.personal.profileImage}
                            alt="avatar"
                            className="w-12 h-12 rounded-full object-cover ring-2 ring-indigo-500/40"
                          />
                        ) : (
                          <div className="w-12 h-12 rounded-full bg-slate-800 flex items-center justify-center font-bold text-slate-300">
                            {portfolio.name.charAt(0)}
                          </div>
                        )}
                        <div>
                          <h4 className="text-sm font-bold text-white group-hover:text-cyan-400 transition-colors line-clamp-1">
                            {portfolio.name}
                          </h4>
                          <p className="text-[11px] text-slate-400 line-clamp-1">
                            {portfolio.portfolioData.personal.headline}
                          </p>
                        </div>
                      </div>

                      <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-indigo-500/10 rounded-full blur-2xl"></div>
                    </div>

                    {/* Card Body */}
                    <div className="p-5 space-y-3">
                      <div className="flex items-center justify-between text-xs text-slate-400">
                        <span className="flex items-center gap-1.5">
                          <Layers className="w-3.5 h-3.5 text-indigo-400" />
                          <span>{portfolio.sections.filter(s => s.visible).length} active sections</span>
                        </span>
                        <span className="text-[11px] text-slate-400 capitalize">
                          {portfolio.template}
                        </span>
                      </div>
                      <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                        {portfolio.portfolioData.about || 'Personal portfolio profile.'}
                      </p>
                    </div>
                  </div>

                  {/* Actions Footer */}
                  <div className="px-5 pb-5 pt-0 grid grid-cols-4 gap-2 border-t border-slate-800/60 mt-2 pt-3">
                    <button
                      onClick={async () => {
                        await selectPortfolio(portfolio.id);
                        navigate(`/builder/${portfolio.id}`);
                      }}
                      className="col-span-2 py-2 px-3 rounded-xl text-xs font-semibold bg-indigo-600 hover:bg-indigo-500 text-white transition-colors flex items-center justify-center gap-1.5 shadow-sm"
                      title="Edit in Visual Builder"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                      <span>Edit</span>
                    </button>

                    <Link
                      to={`/preview/${portfolio.id}`}
                      className="py-2 px-3 rounded-xl text-xs font-semibold border border-slate-700 bg-slate-800 hover:bg-slate-700 text-slate-200 transition-colors flex items-center justify-center gap-1"
                      title="Full Screen Preview"
                    >
                      <Eye className="w-3.5 h-3.5" />
                    </Link>

                    <button
                      onClick={() => handleDownload(portfolio)}
                      disabled={downloadingId === portfolio.id}
                      className="py-2 px-3 rounded-xl text-xs font-semibold border border-slate-700 bg-slate-800 hover:bg-slate-700 text-slate-200 transition-colors flex items-center justify-center gap-1"
                      title="Download ZIP"
                    >
                      <Download className="w-3.5 h-3.5" />
                    </button>

                    <button
                      onClick={() => {
                        if (confirm(`Delete portfolio "${portfolio.name}"?`)) {
                          deletePortfolio(portfolio.id);
                        }
                      }}
                      className="col-span-4 mt-1 py-1 text-[11px] text-slate-500 hover:text-red-400 transition-colors flex items-center justify-center gap-1"
                    >
                      <Trash2 className="w-3 h-3" />
                      <span>Delete</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};
