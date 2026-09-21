import React from 'react';
import { Palette, LayoutTemplate, Sun, Moon, Laptop, Check } from 'lucide-react';
import { TemplateStyle, TemplateVariant, ThemeMode } from '../../types/portfolio';

interface StyleCustomizerProps {
  currentStyle: TemplateStyle;
  currentTemplate: TemplateVariant;
  currentTheme: ThemeMode;
  onSelectStyle: (style: TemplateStyle) => void;
  onSelectTemplate: (template: TemplateVariant) => void;
  onSelectTheme: (theme: ThemeMode) => void;
}

export const StyleCustomizer: React.FC<StyleCustomizerProps> = ({
  currentStyle,
  currentTemplate,
  currentTheme,
  onSelectStyle,
  onSelectTemplate,
  onSelectTheme,
}) => {
  const styles: { id: TemplateStyle; label: string; desc: string; badge: string }[] = [
    {
      id: 'minimalist',
      label: 'Minimalist',
      desc: 'Swiss typography, high whitespace, monochrome clean lines',
      badge: 'Editorial',
    },
    {
      id: 'bold',
      label: 'Bold & Punchy',
      desc: 'High contrast, geometric accents, vibrant highlights',
      badge: 'Impact',
    },
    {
      id: 'glass',
      label: 'Glassmorphism',
      desc: 'Deep backdrop blurs, glowing gradients, translucent layers',
      badge: 'Modern',
    },
    {
      id: 'developer',
      label: 'Developer Terminal',
      desc: 'Monospaced fonts, syntax borders, git commit styling',
      badge: 'Tech',
    },
    {
      id: 'creative',
      label: 'Creative Studio',
      desc: 'Expressive headings, playful badges, boutique agency feel',
      badge: 'Artistic',
    },
  ];

  const variants: { id: TemplateVariant; label: string; desc: string }[] = [
    { id: 'variantA', label: 'Variant A: Modern Grid', desc: 'Split hero layout with interactive cards' },
    { id: 'variantB', label: 'Variant B: Storyline', desc: 'Single-column narrative with centered hero' },
    { id: 'variantC', label: 'Variant C: Bento Box', desc: 'Dense modular bento grid with quick metrics' },
  ];

  return (
    <div className="p-4 space-y-6">
      <div className="border-b border-slate-800 pb-3">
        <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
          <Palette className="w-4 h-4 text-cyan-400" />
          <span>Style & Architecture</span>
        </h3>
        <p className="text-xs text-slate-400">15 curated aesthetic and layout combinations</p>
      </div>

      {/* 5 Aesthetic Styles */}
      <div className="space-y-3">
        <span className="text-xs font-semibold text-slate-300">Design Aesthetic</span>
        <div className="space-y-2">
          {styles.map(s => {
            const isSelected = currentStyle === s.id;
            return (
              <button
                key={s.id}
                onClick={() => onSelectStyle(s.id)}
                className={`w-full text-left p-3 rounded-xl border transition-all flex items-start justify-between ${
                  isSelected
                    ? 'bg-indigo-600/20 border-indigo-500 text-white shadow-md'
                    : 'bg-slate-900/60 border-slate-800 text-slate-300 hover:border-slate-700'
                }`}
              >
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-bold">{s.label}</span>
                    <span className="text-[10px] px-1.5 py-0.2 rounded bg-slate-800 text-slate-400 border border-slate-700">
                      {s.badge}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400">{s.desc}</p>
                </div>
                {isSelected && <Check className="w-4 h-4 text-cyan-400 flex-shrink-0 mt-0.5" />}
              </button>
            );
          })}
        </div>
      </div>

      {/* 3 Layout Variants */}
      <div className="space-y-3 pt-3 border-t border-slate-800">
        <span className="text-xs font-semibold text-slate-300">Layout Variant</span>
        <div className="space-y-2">
          {variants.map(v => {
            const isSelected = currentTemplate === v.id;
            return (
              <button
                key={v.id}
                onClick={() => onSelectTemplate(v.id)}
                className={`w-full text-left p-2.5 rounded-xl border transition-all flex items-center justify-between ${
                  isSelected
                    ? 'bg-indigo-600/20 border-indigo-500 text-white'
                    : 'bg-slate-900/60 border-slate-800 text-slate-300 hover:border-slate-700'
                }`}
              >
                <div>
                  <span className="text-xs font-semibold block">{v.label}</span>
                  <span className="text-[10px] text-slate-400">{v.desc}</span>
                </div>
                {isSelected && <Check className="w-3.5 h-3.5 text-cyan-400" />}
              </button>
            );
          })}
        </div>
      </div>

      {/* Theme Toggle (Light / Dark / System) */}
      <div className="space-y-3 pt-3 border-t border-slate-800">
        <span className="text-xs font-semibold text-slate-300">Display Theme</span>
        <div className="grid grid-cols-3 gap-2">
          <button
            onClick={() => onSelectTheme('dark')}
            className={`py-2 px-3 rounded-lg text-xs font-medium border flex items-center justify-center gap-1.5 transition-colors ${
              currentTheme === 'dark'
                ? 'bg-indigo-600 border-indigo-500 text-white'
                : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            <Moon className="w-3.5 h-3.5" />
            <span>Dark</span>
          </button>
          <button
            onClick={() => onSelectTheme('light')}
            className={`py-2 px-3 rounded-lg text-xs font-medium border flex items-center justify-center gap-1.5 transition-colors ${
              currentTheme === 'light'
                ? 'bg-indigo-600 border-indigo-500 text-white'
                : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            <Sun className="w-3.5 h-3.5" />
            <span>Light</span>
          </button>
          <button
            onClick={() => onSelectTheme('system')}
            className={`py-2 px-3 rounded-lg text-xs font-medium border flex items-center justify-center gap-1.5 transition-colors ${
              currentTheme === 'system'
                ? 'bg-indigo-600 border-indigo-500 text-white'
                : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            <Laptop className="w-3.5 h-3.5" />
            <span>System</span>
          </button>
        </div>
      </div>
    </div>
  );
};
