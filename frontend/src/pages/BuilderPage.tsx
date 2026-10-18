import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import confetti from 'canvas-confetti';
import { 
  ArrowLeft, 
  Eye, 
  Download, 
  Sparkles, 
  Palette, 
  Edit3, 
  FileCode, 
  Check, 
  Maximize2 
} from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';
import { SectionManager } from '../components/builder/SectionManager';
import { SectionEditor } from '../components/builder/SectionEditor';
import { StyleCustomizer } from '../components/builder/StyleCustomizer';
import { DeviceViewportSelector, ViewportMode } from '../components/builder/DeviceViewportSelector';
import { QualityCheckerModal } from '../components/builder/QualityCheckerModal';
import { PortfolioRenderer } from '../components/portfolio/PortfolioRenderer';
import { aiClient } from '../services/ai/aiClient';
import { exportPortfolioAsZip, downloadStaticHtmlFile } from '../services/export/zipExporter';
import { QualityCheckResult } from '../types/portfolio';

export const BuilderPage: React.FC = () => {
  const { portfolioId } = useParams<{ portfolioId: string }>();
  const navigate = useNavigate();
  const {
    currentPortfolio,
    selectPortfolio,
    updatePortfolioData,
    updatePortfolioMeta,
    reorderSections,
    toggleSectionVisibility,
    addSection,
    removeSection,
    setStyle,
    setTemplate,
    setTheme,
  } = usePortfolio();

  const [activeSectionId, setActiveSectionId] = useState<string>('sec-hero');
  const [rightPanelTab, setRightPanelTab] = useState<'editor' | 'style'>('editor');
  const [viewportMode, setViewportMode] = useState<ViewportMode>('desktop');
  const [qualityModalOpen, setQualityModalOpen] = useState(false);
  const [qualityResult, setQualityResult] = useState<QualityCheckResult>({
    score: 82,
    checks: [],
    suggestions: [],
  });
  const [isExporting, setIsExporting] = useState(false);

  // Load target portfolio
  useEffect(() => {
    if (portfolioId) {
      selectPortfolio(portfolioId);
    }
  }, [portfolioId]);

  // Recalculate Quality Score when portfolio data changes
  useEffect(() => {
    if (currentPortfolio) {
      aiClient.checkQuality(currentPortfolio.portfolioData).then(res => {
        setQualityResult(res);
      });
    }
  }, [currentPortfolio?.portfolioData]);

  if (!currentPortfolio) {
    return (
      <div className="min-h-screen bg-[#070a12] flex items-center justify-center text-slate-300">
        <div className="text-center space-y-4">
          <p className="text-sm">Portfolio not found or loading...</p>
          <Link to="/dashboard" className="text-xs text-indigo-400 hover:underline">
            Back to Dashboard
          </Link>
        </div>
      </div>
    );
  }

  const activeSection =
    currentPortfolio.sections.find(s => s.id === activeSectionId) ||
    currentPortfolio.sections[0];

  const handleDownloadZip = async () => {
    setIsExporting(true);
    try {
      await exportPortfolioAsZip(currentPortfolio);
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
      });
    } catch (err) {
      console.error('ZIP Export failed:', err);
    } finally {
      setIsExporting(false);
    }
  };

  const handleDownloadHtml = () => {
    downloadStaticHtmlFile(currentPortfolio);
  };

  const getViewportWidthClass = () => {
    switch (viewportMode) {
      case 'mobile':
        return 'max-w-[375px] my-6 rounded-[36px] shadow-2xl border-[8px] border-slate-800 overflow-hidden';
      case 'tablet':
        return 'max-w-[768px] my-6 rounded-3xl shadow-2xl border-[6px] border-slate-800 overflow-hidden';
      case 'desktop':
      default:
        return 'w-full';
    }
  };

  return (
    <div className="h-screen flex flex-col bg-[#070a12] text-slate-100 overflow-hidden">
      {/* Top Header Bar */}
      <header className="h-14 border-b border-slate-800/80 bg-slate-950/80 px-4 flex items-center justify-between flex-shrink-0 z-30">
        <div className="flex items-center gap-3">
          <Link
            to="/dashboard"
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            title="Back to Dashboard"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>

          <input
            type="text"
            value={currentPortfolio.name}
            onChange={e => updatePortfolioMeta({ name: e.target.value })}
            className="bg-transparent text-sm font-bold text-white border-b border-transparent hover:border-slate-700 focus:border-indigo-500 focus:outline-none px-1 py-0.5 max-w-[200px] sm:max-w-xs truncate"
          />
        </div>

        {/* Center: Device Switcher */}
        <div className="hidden md:flex items-center">
          <DeviceViewportSelector
            currentMode={viewportMode}
            onChangeMode={setViewportMode}
            onFullScreen={() => navigate(`/preview/${currentPortfolio.id}`)}
          />
        </div>

        {/* Right: Actions (Quality, Preview, Export) */}
        <div className="flex items-center gap-2">
          {/* Quality Score Trigger */}
          <button
            onClick={() => setQualityModalOpen(true)}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-semibold bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-300 transition-colors"
            title="Portfolio Quality Score"
          >
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>Score: {qualityResult.score}/100</span>
          </button>

          <Link
            to={`/preview/${currentPortfolio.id}`}
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-colors"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Preview</span>
          </Link>

          <button
            onClick={handleDownloadHtml}
            className="hidden lg:flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-medium bg-slate-900 border border-slate-800 hover:bg-slate-800 text-slate-300 transition-colors"
            title="Download Standalone HTML"
          >
            <FileCode className="w-3.5 h-3.5" />
            <span>HTML</span>
          </button>

          <button
            onClick={handleDownloadZip}
            disabled={isExporting}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-bold bg-gradient-to-r from-indigo-500 to-cyan-500 text-white shadow-md shadow-indigo-500/20 hover:scale-105 transition-all disabled:opacity-50"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export ZIP</span>
          </button>
        </div>
      </header>

      {/* Main 3-Column Studio Body */}
      <div className="flex-1 flex overflow-hidden">
        {/* LEFT COLUMN: Section Manager */}
        <aside className="w-64 border-r border-slate-800/80 bg-slate-950/60 flex flex-col flex-shrink-0">
          <SectionManager
            sections={currentPortfolio.sections}
            activeSectionId={activeSectionId}
            onSelectSection={id => {
              setActiveSectionId(id);
              setRightPanelTab('editor');
            }}
            onReorder={reorderSections}
            onToggleVisibility={toggleSectionVisibility}
            onAddSection={addSection}
            onRemoveSection={removeSection}
          />
        </aside>

        {/* CENTER COLUMN: Live Interactive Preview */}
        <main className="flex-1 bg-slate-950 overflow-y-auto flex justify-center items-start p-2 sm:p-4">
          <div className={`transition-all duration-300 ${getViewportWidthClass()}`}>
            <PortfolioRenderer
              portfolio={currentPortfolio}
              isInteractive={true}
              viewportMode={viewportMode}
            />
          </div>
        </main>

        {/* RIGHT COLUMN: Tabbed Editor & Style Panel */}
        <aside className="w-80 border-l border-slate-800/80 bg-slate-950/70 flex flex-col flex-shrink-0">
          {/* Tabs */}
          <div className="flex border-b border-slate-800 bg-slate-900/50">
            <button
              onClick={() => setRightPanelTab('editor')}
              className={`flex-1 py-3 text-xs font-bold transition-colors flex items-center justify-center gap-1.5 ${
                rightPanelTab === 'editor'
                  ? 'text-white border-b-2 border-indigo-500 bg-slate-900/80'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Edit3 className="w-3.5 h-3.5" />
              <span>Content</span>
            </button>

            <button
              onClick={() => setRightPanelTab('style')}
              className={`flex-1 py-3 text-xs font-bold transition-colors flex items-center justify-center gap-1.5 ${
                rightPanelTab === 'style'
                  ? 'text-white border-b-2 border-indigo-500 bg-slate-900/80'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Palette className="w-3.5 h-3.5" />
              <span>Design (15)</span>
            </button>
          </div>

          {/* Panel Content */}
          <div className="flex-1 overflow-y-auto">
            {rightPanelTab === 'editor' && activeSection && (
              <SectionEditor
                section={activeSection}
                portfolioData={currentPortfolio.portfolioData}
                onUpdate={updatePortfolioData}
              />
            )}

            {rightPanelTab === 'style' && (
              <StyleCustomizer
                currentStyle={currentPortfolio.style}
                currentTemplate={currentPortfolio.template}
                currentTheme={currentPortfolio.theme}
                onSelectStyle={setStyle}
                onSelectTemplate={setTemplate}
                onSelectTheme={setTheme}
              />
            )}
          </div>
        </aside>
      </div>

      {/* Quality Checker Modal */}
      <QualityCheckerModal
        isOpen={qualityModalOpen}
        onClose={() => setQualityModalOpen(false)}
        result={qualityResult}
      />
    </div>
  );
};
