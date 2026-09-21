export interface PersonalInfo {
  name: string;
  headline: string;
  email: string;
  phone: string;
  location: string;
  profileImage: string;
}

export interface SkillItem {
  name: string;
  category: string;
}

export interface EducationItem {
  institution: string;
  degree: string;
  field: string;
  startDate: string;
  endDate: string;
  description: string;
}

export interface ExperienceItem {
  company: string;
  role: string;
  startDate: string;
  endDate: string;
  description: string;
  technologies: string[];
}

export interface ProjectItem {
  title: string;
  description: string;
  technologies: string[];
  githubUrl: string;
  liveUrl: string;
  image: string;
}

export interface CertificationItem {
  name: string;
  issuer: string;
  date: string;
  url: string;
}

export interface SocialLinks {
  github: string;
  linkedin: string;
  twitter: string;
  website: string;
}

export interface ContactInfo {
  email: string;
  phone: string;
}

export interface PortfolioData {
  personal: PersonalInfo;
  about: string;
  skills: SkillItem[];
  education: EducationItem[];
  experience: ExperienceItem[];
  projects: ProjectItem[];
  certifications: CertificationItem[];
  achievements: string[];
  research: string[];
  social: SocialLinks;
  contact: ContactInfo;
}

export type SectionType =
  | 'hero'
  | 'about'
  | 'skills'
  | 'projects'
  | 'experience'
  | 'education'
  | 'certifications'
  | 'achievements'
  | 'contact'
  | 'social';

export interface PortfolioSection {
  id: string;
  type: SectionType;
  title: string;
  visible: boolean;
}

export type TemplateStyle = 'minimalist' | 'bold' | 'glass' | 'creative' | 'developer';
export type TemplateVariant = 'variantA' | 'variantB' | 'variantC';
export type ThemeMode = 'dark' | 'light' | 'system';

export interface Portfolio {
  id: string;
  name: string;
  template: TemplateVariant;
  style: TemplateStyle;
  theme: ThemeMode;
  sections: PortfolioSection[];
  portfolioData: PortfolioData;
  createdAt: string;
  updatedAt: string;
}
