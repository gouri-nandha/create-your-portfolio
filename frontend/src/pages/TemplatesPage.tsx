import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Layout, Check, Sparkles, ArrowRight } from 'lucide-react';
import { TemplateStyle, TemplateVariant, Portfolio } from '../types/portfolio';
import { usePortfolio } from '../context/PortfolioContext';
import { DEFAULT_SECTIONS, SAMPLE_DEVELOPER_DATA } from '../data/samplePortfolios';
import { Navbar } from '../components/common/Navbar';
import { Footer } from '../components/common/Footer';

export const TemplatesPage: React.FC = () => {
  const [selectedStyleFilter, setSelectedStyleFilter] = useState<string>('all');
  const { createPortfolio } = usePortfolio();
  const navigate = useNavigate();

  const styles: { id: TemplateStyle; name: string; desc: string; badge: string }[] = [
    { id: 'minimalist', name: 'Minimalist', desc: 'Swiss layout, high whitespace & refined typography', badge: 'Clean' },
    { id: 'bold', name: 'Bold Impact', desc: 'High contrast geometric cards & striking neon highlights', badge: 'Punchy' },
    { id: 'glass', name: 'Glassmorphism', desc: 'Backdrop blurs, translucent layers & soft glowing accents', badge: 'Modern' },
    { id: 'developer', name: 'Developer Terminal', desc: 'Monospace code vibes, syntax borders & status indicators', badge: 'Geek' },
    { id: 'creative', name: 'Creative Studio', desc: 'Editorial magazine layout with playful badges and cards', badge: 'Agency' },
  ];

  const variants: { id: TemplateVariant; name: string; layout: string }[] = [
    { id: 'variantA', name: 'Modern Grid', layout: 'Split hero + dynamic multi-column project cards' },
    { id: 'variantB', name: 'Storyline', layout: 'Centered narrative timeline & focused presentation' },
    { id: 'variantC', name: 'Bento Box', layout: 'Dense interactive dashboard with quick metric tiles' },
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

  return (
    <div className="min-h-screen bg-[#070a12] text-slate-100 flex flex-col">
      <Navbar />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 mb-4">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>15 Curated Architecture Styles</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white">
            Choose Your Portfolio Aesthetic
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-2">
            Switch styles anytime inside the builder without losing any written content.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          <button
            onClick={() => setSelectedStyleFilter('all')}
            className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all ${
              selectedStyleFilter === 'all'
                ? 'bg-indigo-600 text-white'
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
                  ? 'bg-indigo-600 text-white'
                  : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              {s.name}
            </button>
          ))}
        </div>

        {/* Templates Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTemplates.map((item, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-slate-700 flex flex-col justify-between transition-all group"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-300 border border-indigo-500/20">
                    {item.styleName}
                  </span>
                  <span className="text-xs text-slate-500">{item.badge}</span>
                </div>

                <div>
                  <h3 className="text-base font-bold text-white group-hover:text-cyan-400 transition-colors">
                    {item.variantName}
                  </h3>
                  <p className="text-xs text-slate-400 mt-1 leading-relaxed">{item.layoutDesc}</p>
                </div>
              </div>

              <div className="pt-6 mt-4 border-t border-slate-800/80">
                <button
                  onClick={() => handleUseTemplate(item.style, item.variant, `${item.styleName} ${item.variantName}`)}
                  className="w-full py-2.5 px-4 rounded-xl text-xs font-bold bg-slate-800 hover:bg-indigo-600 text-white transition-all flex items-center justify-center gap-1.5"
                >
                  <span>Use This Template</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
};
