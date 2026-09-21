import React from 'react';
import { Award, ExternalLink } from 'lucide-react';
import { CertificationItem, TemplateStyle, TemplateVariant } from '../../../types/portfolio';

interface CertificationsSectionProps {
  certifications: CertificationItem[];
  style: TemplateStyle;
  variant: TemplateVariant;
  isDark: boolean;
}

export const CertificationsSection: React.FC<CertificationsSectionProps> = ({ certifications, style, variant, isDark }) => {
  if (!certifications || certifications.length === 0) return null;
  const isDev = style === 'developer';
  const isGlass = style === 'glass';

  return (
    <section id="certifications" className="py-16 px-6 max-w-5xl mx-auto">
      <div className="flex items-center gap-3 mb-8 justify-center md:justify-start">
        <div className="p-2 rounded-lg bg-yellow-500/10 text-yellow-400 border border-yellow-500/20">
          <Award className="w-5 h-5" />
        </div>
        <h2 className={`text-2xl sm:text-3xl font-bold ${isDev ? 'text-emerald-400 font-mono' : 'text-white'}`}>
          Certifications
        </h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {certifications.map((cert, idx) => (
          <div
            key={idx}
            className={`p-5 rounded-2xl flex flex-col justify-between transition-all ${
              isGlass
                ? 'glass-panel'
                : isDev
                ? 'bg-slate-900 border border-slate-800 font-mono'
                : 'bg-slate-900/50 border border-slate-800'
            }`}
          >
            <div>
              <h3 className="font-bold text-white text-base mb-1">{cert.name}</h3>
              <p className="text-xs text-slate-400">{cert.issuer} {cert.date ? `• ${cert.date}` : ''}</p>
            </div>
            {cert.url && (
              <a
                href={cert.url}
                target="_blank"
                rel="noreferrer"
                className="mt-4 text-xs font-semibold text-indigo-400 hover:text-indigo-300 flex items-center gap-1"
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
