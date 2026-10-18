import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles, ArrowRight, Terminal, Layers, LayoutGrid, Palette, Eye } from 'lucide-react';
import { TemplateStyle, TemplateVariant, Portfolio } from '../types/portfolio';
import { usePortfolio } from '../context/PortfolioContext';
import { DEFAULT_SECTIONS, SAMPLE_DEVELOPER_DATA } from '../data/samplePortfolios';
import { Navbar } from '../components/common/Navbar';
import { Footer } from '../components/common/Footer';

export const TemplatesPage: React.FC = () => {
  const [selectedStyleFilter, setSelectedStyleFilter] = useState<string>('all');
  const { createPortfolio } = usePortfolio();
  const navigate = useNavigate();

  const styles: { id: TemplateStyle; name: string; desc: string; badge: string; color: string }[] = [
    { id: 'minimalist', name: 'Minimalist', desc: 'Swiss layout, high whitespace & refined typography', badge: 'Editorial', color: 'from-slate-700 to-slate-900 border-slate-700 text-slate-300' },
    { id: 'bold', name: 'Bold Impact', desc: 'High contrast geometric cards & striking neon highlights', badge: 'Punchy', color: 'from-amber-500/20 to-amber-950/40 border-amber-400 text-amber-300' },
    { id: 'glass', name: 'Glassmorphism', desc: 'Backdrop blurs, translucent layers & soft glowing accents', badge: 'Modern', color: 'from-cyan-500/20 via-indigo-500/20 to-purple-950/40 border-cyan-400/50 text-cyan-300' },
    { id: 'developer', name: 'Developer Terminal', desc: 'Monospace code vibes, syntax borders & status indicators', badge: 'Tech', color: 'from-emerald-500/20 to-slate-950 border-emerald-500/40 text-emerald-400' },
    { id: 'creative', name: 'Creative Studio', desc: 'Editorial magazine layout with playful badges and cards', badge: 'Agency', color: 'from-pink-500/20 via-purple-500/20 to-indigo-950/40 border-pink-500/40 text-pink-300' },
  ];

  const variants: { id: TemplateVariant; name: string; layout: string; icon: any }[] = [
    { id: 'variantA', name: 'Modern Grid', layout: 'Split hero + dynamic multi-column project cards', icon: LayoutGrid },
    { id: 'variantB', name: 'Storyline', layout: 'Centered narrative timeline & focused presentation', icon: Layers },
    { id: 'variantC', name: 'Bento Box', layout: 'Dense interactive dashboard with quick metric tiles', icon: Sparkles },
  ];

  // 5 styles x 3 variants = 15 templates
  const allTemplates = styles.flatMap(s =>
    variants.map(v => ({
      style: s.id,
      styleName: s.name,
      variant: v.id,
      variantName: v.name,
      layoutDesc: v.layout,
      badge: s.badge,
      color: s.color,
      icon: v.icon,
    }))
  );

  const filteredTemplates = selectedStyleFilter === 'all'
    ? allTemplates
    : allTemplates.filter(t => t.style === selectedStyleFilter);

  const handleUseTemplate = async (style: TemplateStyle, template: TemplateVariant, name: string) => {
    const portfolioId = `portfolio-${Date.now()}`;
    const newP: Portfolio = {
      id: portfolioId,
      name: `${name} Portfolio`,
      style,
      template,
      theme: 'dark',
      sections: DEFAULT_SECTIONS,
      portfolioData: SAMPLE_DEVELOPER_DATA,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    await createPortfolio(newP);
    navigate(`/builder/${portfolioId}`);
  };

  // Helper to render mini wireframe visual
  const renderMiniWireframe = (styleId: TemplateStyle, variantId: TemplateVariant) => {
    const isDev = styleId === 'developer';
    const isGlass = styleId === 'glass';
    const isBold = styleId === 'bold';
    const isCreative = styleId === 'creative';

    const bgWireframe = isDev
      ? 'bg-slate-950 border-emerald-500/30 font-mono text-emerald-400'
      : isGlass
      ? 'bg-slate-950/80 border-cyan-500/30 backdrop-blur-md'
      : isBold
      ? 'bg-slate-950 border-amber-400/60'
      : isCreative
      ? 'bg-gradient-to-br from-[#1b0d2a] to-slate-950 border-pink-500/30'
      : 'bg-slate-950 border-slate-800';

    if (variantId === 'variantC') {
      // Bento Wireframe
      return (
        <div className={`w-full h-32 rounded-xl p-2.5 border ${bgWireframe} flex flex-col justify-between mb-4 relative overflow-hidden group-hover:scale-[1.02] transition-transform`}>
          <div className="flex items-center justify-between text-[10px] text-slate-500 pb-1 border-b border-slate-800/60">
            <span>{isDev ? '$ bento.layout' : 'BENTO MATRIX'}</span>
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400"></span>
          </div>
          <div className="grid grid-cols-12 gap-1.5 flex-1 pt-1.5">
            <div className={`col-span-7 rounded-lg p-1.5 flex flex-col justify-between ${isDev ? 'bg-emerald-950/30 border border-emerald-500/20' : isBold ? 'bg-amber-950/20 border border-amber-400/30' : isCreative ? 'bg-pink-950/20 border border-pink-500/30' : 'bg-slate-900 border border-slate-800'}`}>
              <div className="w-12 h-2 rounded bg-slate-700"></div>
              <div className="w-20 h-1.5 rounded bg-slate-800"></div>
            </div>
            <div className="col-span-5 flex flex-col gap-1.5">
              <div className="flex-1 rounded-lg bg-slate-900 border border-slate-800 p-1 flex items-center justify-center">
                <div className="w-6 h-6 rounded-full bg-indigo-500/20"></div>
              </div>
              <div className="flex-1 rounded-lg bg-slate-900/60 border border-slate-800 p-1 flex items-center justify-between">
                <div className="w-4 h-1.5 rounded bg-cyan-400/60"></div>
                <div className="w-4 h-1.5 rounded bg-slate-700"></div>
              </div>
            </div>
          </div>
        </div>
      );
    }

    if (variantId === 'variantB') {
      // Storyline Wireframe
      return (
        <div className={`w-full h-32 rounded-xl p-2.5 border ${bgWireframe} flex flex-col items-center justify-between mb-4 relative overflow-hidden group-hover:scale-[1.02] transition-transform`}>
          <div className="flex items-center justify-between w-full text-[10px] text-slate-500 pb-1 border-b border-slate-800/60">
            <span>{isDev ? '$ storyline.stream' : 'STORYLINE FLOW'}</span>
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-400"></span>
          </div>
          <div className="flex flex-col items-center gap-1.5 pt-1">
            <div className="w-8 h-8 rounded-full bg-indigo-500/20 border border-indigo-400/40 flex items-center justify-center text-[9px] text-indigo-300">
              ●
            </div>
            <div className="w-24 h-2 rounded bg-slate-700"></div>
            <div className="w-32 h-1.5 rounded bg-slate-800"></div>
          </div>
          <div className="w-full h-6 rounded-lg bg-slate-900/80 border border-slate-800 flex items-center justify-between px-2">
            <div className="w-10 h-1.5 rounded bg-slate-700"></div>
            <div className="w-6 h-2 rounded-full bg-indigo-500/40"></div>
          </div>
        </div>
      );
    }

    // Variant A: Modern Grid Wireframe
    return (
      <div className={`w-full h-32 rounded-xl p-2.5 border ${bgWireframe} flex flex-col justify-between mb-4 relative overflow-hidden group-hover:scale-[1.02] transition-transform`}>
        <div className="flex items-center justify-between text-[10px] text-slate-500 pb-1 border-b border-slate-800/60">
          <span>{isDev ? '$ modern.grid' : 'MODERN GRID'}</span>
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
        </div>
        <div className="flex items-center justify-between gap-2 pt-1">
          <div className="space-y-1">
            <div className="w-16 h-2 rounded bg-slate-600"></div>
            <div className="w-24 h-1.5 rounded bg-slate-800"></div>
          </div>
          <div className="w-8 h-8 rounded-lg bg-indigo-500/20 border border-indigo-400/30 flex-shrink-0"></div>
        </div>
        <div className="grid grid-cols-3 gap-1.5 pt-1">
          <div className="h-6 rounded bg-slate-900 border border-slate-800"></div>
          <div className="h-6 rounded bg-slate-900 border border-slate-800"></div>
          <div className="h-6 rounded bg-slate-900 border border-slate-800"></div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-[#070a12] text-slate-100 flex flex-col">
      <Navbar />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 mb-4">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>15 Unique Architectural Templates</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white">
            Choose Your Portfolio Aesthetic
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-2">
            Each template offers custom layouts, responsive typography, and distinct interaction states.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          <button
            onClick={() => setSelectedStyleFilter('all')}
            className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all ${
              selectedStyleFilter === 'all'
                ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30'
                : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            All 15 Templates
          </button>
          {styles.map(s => (
            <button
              key={s.id}
              onClick={() => setSelectedStyleFilter(s.id)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all ${
                selectedStyleFilter === s.id
                  ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30'
                  : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              {s.name}
            </button>
          ))}
        </div>

        {/* Templates Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTemplates.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-slate-700 flex flex-col justify-between transition-all group hover:translate-y-[-2px] shadow-lg"
              >
                <div>
                  {/* Style Header */}
                  <div className="flex items-center justify-between mb-3">
                    <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded border bg-gradient-to-r ${item.color}`}>
                      {item.styleName}
                    </span>
                    <span className="text-xs text-slate-500 font-medium">{item.badge}</span>
                  </div>

                  {/* Visual Wireframe Preview */}
                  {renderMiniWireframe(item.style, item.variant)}

                  {/* Title & Desc */}
                  <div>
                    <h3 className="text-base font-bold text-white group-hover:text-cyan-400 transition-colors flex items-center gap-2">
                      <Icon className="w-4 h-4 text-slate-400 group-hover:text-cyan-400" />
                      <span>{item.variantName}</span>
                    </h3>
                    <p className="text-xs text-slate-400 mt-1 leading-relaxed">{item.layoutDesc}</p>
                  </div>
                </div>

                <div className="pt-4 mt-4 border-t border-slate-800/80">
                  <button
                    onClick={() => handleUseTemplate(item.style, item.variant, `${item.styleName} ${item.variantName}`)}
                    className="w-full py-2.5 px-4 rounded-xl text-xs font-bold bg-slate-800 hover:bg-indigo-600 text-white transition-all flex items-center justify-center gap-1.5 shadow-md group-hover:bg-indigo-600"
                  >
                    <span>Use This Template</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </main>

      <Footer />
    </div>
  );
};
