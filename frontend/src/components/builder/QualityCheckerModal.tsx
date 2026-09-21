import React from 'react';
import { X, CheckCircle, AlertTriangle, Sparkles, TrendingUp } from 'lucide-react';
import { QualityCheckResult } from '../../types/portfolio';

interface QualityCheckerModalProps {
  isOpen: boolean;
  onClose: () => void;
  result: QualityCheckResult;
}

export const QualityCheckerModal: React.FC<QualityCheckerModalProps> = ({
  isOpen,
  onClose,
  result,
}) => {
  if (!isOpen) return null;

  const { score, checks, suggestions } = result;

  const getScoreColor = () => {
    if (score >= 80) return 'text-emerald-400 border-emerald-500/30 bg-emerald-500/10';
    if (score >= 60) return 'text-amber-400 border-amber-500/30 bg-amber-500/10';
    return 'text-rose-400 border-rose-500/30 bg-rose-500/10';
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
      <div className="relative w-full max-w-lg rounded-3xl bg-slate-900 border border-slate-800 shadow-2xl p-6 sm:p-8 space-y-6">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
              <Sparkles className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white">Portfolio Quality Checker</h3>
              <p className="text-xs text-slate-400">AI analysis & completeness checklist</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Score Badge */}
        <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-950/80 border border-slate-800">
          <div>
            <span className="text-xs text-slate-400 block font-medium">Completeness Score</span>
            <span className="text-xs text-slate-500">Recruiter & viewer readiness</span>
          </div>
          <div className={`px-4 py-2 rounded-2xl border text-2xl font-black ${getScoreColor()}`}>
            {score}/100
          </div>
        </div>

        {/* Checklist */}
        <div className="space-y-2.5 max-h-60 overflow-y-auto pr-1">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Audit Items</span>
          {checks.map((check, idx) => (
            <div
              key={idx}
              className="flex items-start gap-2.5 p-2.5 rounded-xl bg-slate-800/40 border border-slate-800/80 text-xs"
            >
              {check.passed ? (
                <CheckCircle className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
              ) : (
                <AlertTriangle className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
              )}
              <div className="flex-1">
                <span className={`font-semibold ${check.passed ? 'text-slate-200' : 'text-amber-300'}`}>
                  {check.label}
                </span>
                {check.tip && !check.passed && (
                  <p className="text-[11px] text-slate-400 mt-0.5">{check.tip}</p>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Note */}
        <div className="p-3 rounded-xl bg-slate-950/50 border border-slate-800/80 text-[11px] text-slate-400">
          💡 <span className="font-semibold text-slate-300">Tip:</span> This score is provided as an informative checklist to help you present your work at its best.
        </div>

        {/* Action button */}
        <button
          onClick={onClose}
          className="w-full py-2.5 rounded-xl font-semibold text-sm bg-indigo-600 hover:bg-indigo-500 text-white transition-colors"
        >
          Back to Editing
        </button>
      </div>
    </div>
  );
};
