import React from 'react';
import { Award, ExternalLink, ShieldCheck } from 'lucide-react';
import { CertificationItem, TemplateStyle, TemplateVariant } from '../../../types/portfolio';
import { useViewport } from '../../../context/ViewportContext';

interface CertificationsSectionProps {
  certifications: CertificationItem[];
  style: TemplateStyle;
  variant: TemplateVariant;
  isDark: boolean;
}

export const CertificationsSection: React.FC<CertificationsSectionProps> = ({ certifications, style, variant, isDark }) => {
  if (!certifications || certifications.length === 0) return null;
  const { isMobile, isTablet } = useViewport();
  const isDev = style === 'developer';
  const isGlass = style === 'glass';
  const isBold = style === 'bold';
  const isCreative = style === 'creative';
  const isMinimal = style === 'minimalist';

  const gridCols = isMobile
    ? 'grid-cols-1'
    : isTablet
    ? 'grid-cols-1 sm:grid-cols-2'
    : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3';

  return (
    <section id="certifications" className="py-14 px-4 sm:px-6 max-w-5xl mx-auto">
      <div className="flex items-center gap-3 mb-8 justify-center md:justify-start">
        <div className={`p-2 rounded-xl ${
          isDev ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' :
          isCreative ? 'bg-pink-500/10 text-pink-400 border border-pink-500/20' :
          isBold ? 'bg-amber-400/10 text-amber-300 border border-amber-400/30' :
          'bg-yellow-500/10 text-yellow-400 border border-yellow-500/20'
        }`}>
          <Award className="w-5 h-5" />
        </div>
        <h2 className={`text-2xl sm:text-3xl font-extrabold ${isDev ? 'text-emerald-400 font-mono' : 'text-white'}`}>
          Certifications & Accreditations
        </h2>
      </div>

      <div className={`grid ${gridCols} gap-4 sm:gap-5`}>
        {certifications.map((cert, idx) => (
          <div
            key={idx}
            className={`p-5 rounded-2xl flex flex-col justify-between transition-all ${
              isGlass
                ? 'glass-panel border border-white/10 backdrop-blur-xl bg-slate-900/40 shadow-xl'
                : isDev
                ? 'bg-slate-900 border border-emerald-500/30 font-mono text-slate-200'
                : isBold
                ? 'bg-slate-900 border-2 border-amber-400/80 shadow-[4px_4px_0px_0px_rgba(251,191,36,0.25)]'
                : isCreative
                ? 'bg-gradient-to-br from-pink-950/30 to-purple-950/20 border border-pink-500/30 rounded-2xl'
                : isMinimal
                ? 'bg-slate-900/30 border border-slate-800'
                : 'bg-slate-900/50 border border-slate-800'
            }`}
          >
            <div>
              <div className="flex items-start gap-2 mb-2">
                <ShieldCheck className={`w-4 h-4 flex-shrink-0 mt-0.5 ${
                  isDev ? 'text-emerald-400' : isCreative ? 'text-pink-400' : isBold ? 'text-amber-400' : 'text-yellow-400'
                }`} />
                <h3 className="font-bold text-white text-sm sm:text-base leading-snug break-words">
                  {cert.name}
                </h3>
              </div>
              <p className="text-xs text-slate-400 ml-6">
                {cert.issuer} {cert.date ? `• ${cert.date}` : ''}
              </p>
            </div>

            {cert.url && (
              <a
                href={cert.url}
                target="_blank"
                rel="noreferrer"
                className={`mt-4 text-xs font-semibold flex items-center gap-1 ml-6 transition-colors ${
                  isDev ? 'text-emerald-400 hover:text-emerald-300' :
                  isCreative ? 'text-pink-400 hover:text-pink-300' :
                  isBold ? 'text-amber-300 hover:text-amber-200 font-bold' :
                  'text-indigo-400 hover:text-indigo-300'
                }`}
              >
                <span>Verify Credential</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};
