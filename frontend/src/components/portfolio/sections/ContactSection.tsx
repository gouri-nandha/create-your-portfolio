import React from 'react';
import { Mail, Phone, Github, Linkedin, Twitter, Globe, Send } from 'lucide-react';
import { ContactInfo, SocialLinks, TemplateStyle, TemplateVariant } from '../../../types/portfolio';

interface ContactSectionProps {
  contact: ContactInfo;
  social: SocialLinks;
  style: TemplateStyle;
  variant: TemplateVariant;
  isDark: boolean;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ contact, social, style, variant, isDark }) => {
  const isDev = style === 'developer';
  const isGlass = style === 'glass';
  const isBold = style === 'bold';

  return (
    <section id="contact" className="py-20 px-6 max-w-4xl mx-auto text-center">
      <div
        className={`p-8 sm:p-12 rounded-3xl transition-all ${
          isGlass
            ? 'glass-panel shadow-2xl'
            : isDev
            ? 'bg-slate-900 border border-emerald-500/30 font-mono'
            : isBold
            ? 'bg-gradient-to-b from-slate-900 to-slate-950 border-2 border-indigo-500/30'
            : 'bg-slate-900/60 border border-slate-800'
        }`}
      >
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold mb-4 bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
          <Send className="w-3.5 h-3.5" />
          <span>Get in Touch</span>
        </div>

        <h2 className={`text-3xl sm:text-4xl font-extrabold mb-4 ${isDev ? 'text-emerald-400 font-mono' : 'text-white'}`}>
          Let's Build Something Exceptional
        </h2>

        <p className="text-slate-400 text-base max-w-xl mx-auto mb-8">
          Whether you have an upcoming project, freelance inquiry, or just want to connect — my inbox is always open.
        </p>

        {/* Contact direct buttons */}
        <div className="flex flex-wrap justify-center items-center gap-4 mb-8">
          {contact.email && (
            <a
              href={`mailto:${contact.email}`}
              className="px-5 py-3 rounded-xl text-sm font-semibold bg-indigo-600 hover:bg-indigo-500 text-white flex items-center gap-2 shadow-lg shadow-indigo-600/20 transition-all hover:scale-105"
            >
              <Mail className="w-4 h-4" />
              <span>{contact.email}</span>
            </a>
          )}
          {contact.phone && (
            <a
              href={`tel:${contact.phone}`}
              className="px-5 py-3 rounded-xl text-sm font-semibold border border-slate-700 bg-slate-800/80 hover:bg-slate-800 text-slate-200 flex items-center gap-2 transition-colors"
            >
              <Phone className="w-4 h-4" />
              <span>{contact.phone}</span>
            </a>
          )}
        </div>

        {/* Social Links */}
        <div className="flex justify-center items-center gap-4 pt-6 border-t border-slate-800/80">
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
