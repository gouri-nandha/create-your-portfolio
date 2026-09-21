import React from 'react';
import { Monitor, Tablet, Smartphone, Maximize2 } from 'lucide-react';

export type ViewportMode = 'desktop' | 'tablet' | 'mobile';

interface DeviceViewportSelectorProps {
  currentMode: ViewportMode;
  onChangeMode: (mode: ViewportMode) => void;
  onFullScreen?: () => void;
}

export const DeviceViewportSelector: React.FC<DeviceViewportSelectorProps> = ({
  currentMode,
  onChangeMode,
  onFullScreen,
}) => {
  return (
    <div className="flex items-center gap-1 bg-slate-900/90 border border-slate-800 p-1 rounded-xl shadow-lg">
      <button
        onClick={() => onChangeMode('desktop')}
        className={`p-1.5 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-colors ${
          currentMode === 'desktop'
            ? 'bg-indigo-600 text-white shadow-sm'
            : 'text-slate-400 hover:text-white hover:bg-slate-800'
        }`}
        title="Desktop (100%)"
      >
        <Monitor className="w-3.5 h-3.5" />
        <span className="hidden sm:inline">Desktop</span>
      </button>

      <button
        onClick={() => onChangeMode('tablet')}
        className={`p-1.5 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-colors ${
          currentMode === 'tablet'
            ? 'bg-indigo-600 text-white shadow-sm'
            : 'text-slate-400 hover:text-white hover:bg-slate-800'
        }`}
        title="Tablet (768px)"
      >
        <Tablet className="w-3.5 h-3.5" />
        <span className="hidden sm:inline">Tablet</span>
      </button>

      <button
        onClick={() => onChangeMode('mobile')}
        className={`p-1.5 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-colors ${
          currentMode === 'mobile'
            ? 'bg-indigo-600 text-white shadow-sm'
            : 'text-slate-400 hover:text-white hover:bg-slate-800'
        }`}
        title="Mobile (375px)"
      >
        <Smartphone className="w-3.5 h-3.5" />
        <span className="hidden sm:inline">Mobile</span>
      </button>

      {onFullScreen && (
        <button
          onClick={onFullScreen}
          className="p-1.5 rounded-lg text-xs font-medium text-slate-400 hover:text-white hover:bg-slate-800 transition-colors ml-1 border-l border-slate-800"
          title="Full Screen Preview"
        >
          <Maximize2 className="w-3.5 h-3.5" />
        </button>
      )}
    </div>
  );
};
