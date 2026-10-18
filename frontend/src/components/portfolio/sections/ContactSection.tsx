import React from 'react';
import { Mail, Phone, Github, Linkedin, Twitter, Globe, Send, MessageSquare } from 'lucide-react';
import { ContactInfo, SocialLinks, TemplateStyle, TemplateVariant } from '../../../types/portfolio';
import { useViewport } from '../../../context/ViewportContext';

interface ContactSectionProps {
  contact: ContactInfo;
  social: SocialLinks;
  style: TemplateStyle;
  variant: TemplateVariant;
  isDark: boolean;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ contact, social, style, variant, isDark }) => {
  const { isMobile } = useViewport();
  const isDev = style === 'developer';
  const isGlass = style === 'glass';
  const isBold = style === 'bold';
  const isCreative = style === 'creative';
  const isMinimal = style === 'minimalist';

  return (
    <section id="contact" className="py-16 sm:py-20 px-4 sm:px-6 max-w-4xl mx-auto text-center">
      <div
        className={`p-6 sm:p-12 rounded-3xl transition-all ${
          isGlass
            ? 'glass-panel border border-white/10 backdrop-blur-xl bg-slate-900/40 shadow-2xl'
            : isDev
            ? 'bg-slate-900 border border-emerald-500/30 font-mono shadow-lg shadow-emerald-500/5'
            : isBold
            ? 'bg-slate-900 border-2 border-amber-400 shadow-[6px_6px_0px_0px_rgba(251,191,36,0.3)]'
            : isCreative
            ? 'bg-gradient-to-br from-pink-950/30 via-purple-950/20 to-slate-900/80 border border-pink-500/30 shadow-xl'
            : 'bg-slate-900/60 border border-slate-800'
        }`}
      >
        <div className={`inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-semibold mb-4 ${
          isDev ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30' :
          isCreative ? 'bg-pink-500/10 text-pink-300 border border-pink-500/30' :
          isBold ? 'bg-amber-400/10 text-amber-300 border border-amber-400/40' :
          'bg-indigo-500/10 text-indigo-400 border border-indigo-500/20'
        }`}>
          <Send className="w-3.5 h-3.5" />
          <span>Get in Touch</span>
        </div>

        <h2 className={`text-2xl sm:text-4xl font-extrabold mb-4 break-words ${
          isDev ? 'text-emerald-400 font-mono' : isCreative ? 'bg-gradient-to-r from-pink-400 via-purple-300 to-indigo-300 bg-clip-text text-transparent' : isBold ? 'text-white uppercase' : 'text-white'
        }`}>
          Let's Build Something Exceptional
        </h2>

        <p className="text-slate-300 text-sm sm:text-base max-w-xl mx-auto mb-8 leading-relaxed">
          Whether you have an upcoming project, freelance inquiry, or just want to connect — my inbox is always open.
        </p>

        {/* Contact direct buttons */}
        <div className={`flex flex-wrap items-center justify-center gap-3 mb-8 ${isMobile ? 'flex-col w-full' : ''}`}>
          {contact.email && (
            <a
              href={`mailto:${contact.email}`}
              className={`px-5 py-3 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 transition-all ${
                isMobile ? 'w-full' : ''
              } ${
                isDev
                  ? 'bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-mono font-bold'
                  : isCreative
                  ? 'bg-gradient-to-r from-pink-500 to-violet-600 hover:scale-105 text-white shadow-lg shadow-pink-500/20'
                  : isBold
                  ? 'bg-amber-400 hover:bg-amber-500 text-slate-950 font-bold border-2 border-slate-950'
                  : 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-600/20'
              }`}
            >
              <Mail className="w-4 h-4 flex-shrink-0" />
              <span className="truncate">{contact.email}</span>
            </a>
          )}
          {contact.phone && (
            <a
              href={`tel:${contact.phone}`}
              className={`px-5 py-3 rounded-xl text-sm font-semibold border border-slate-700 bg-slate-800/80 hover:bg-slate-800 text-slate-200 flex items-center justify-center gap-2 transition-colors ${
                isMobile ? 'w-full' : ''
              }`}
            >
              <Phone className="w-4 h-4 flex-shrink-0" />
              <span>{contact.phone}</span>
            </a>
          )}
        </div>

        {/* Social Links */}
        <div className="flex justify-center items-center gap-3 pt-6 border-t border-slate-800/80">
          {social.github && (
            <a
              href={social.github}
              target="_blank"
              rel="noreferrer"
              className="p-3 rounded-xl bg-slate-800/60 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-700/60 hover:border-slate-600 transition-colors"
              title="GitHub"
            >
              <Github className="w-5 h-5" />
            </a>
          )}
          {social.linkedin && (
            <a
              href={social.linkedin}
              target="_blank"
              rel="noreferrer"
              className="p-3 rounded-xl bg-slate-800/60 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-700/60 hover:border-slate-600 transition-colors"
              title="LinkedIn"
            >
              <Linkedin className="w-5 h-5" />
            </a>
          )}
          {social.twitter && (
            <a
              href={social.twitter}
              target="_blank"
              rel="noreferrer"
              className="p-3 rounded-xl bg-slate-800/60 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-700/60 hover:border-slate-600 transition-colors"
              title="Twitter"
            >
              <Twitter className="w-5 h-5" />
            </a>
          )}
          {social.website && (
            <a
              href={social.website}
              target="_blank"
              rel="noreferrer"
              className="p-3 rounded-xl bg-slate-800/60 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-700/60 hover:border-slate-600 transition-colors"
              title="Website"
            >
              <Globe className="w-5 h-5" />
            </a>
          )}
        </div>
      </div>
    </section>
  );
};
