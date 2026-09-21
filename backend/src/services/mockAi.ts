import { PortfolioData, SkillItem } from '../types.js';

export function parseResumeTextMock(rawText: string): PortfolioData {
  const lines = rawText.split('\n').map(l => l.trim()).filter(Boolean);
  
  // Extract Email
  const emailMatch = rawText.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/);
  const email = emailMatch ? emailMatch[0] : 'alex.turner@example.com';

  // Extract Phone
  const phoneMatch = rawText.match(/(?:\+?\d{1,3}[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}/);
  const phone = phoneMatch ? phoneMatch[0] : '+1 (555) 234-5678';

  // Extract Links
  const githubMatch = rawText.match(/(?:https?:\/\/)?(?:www\.)?github\.com\/([a-zA-Z0-9_-]+)/i);
  const linkedinMatch = rawText.match(/(?:https?:\/\/)?(?:www\.)?linkedin\.com\/in\/([a-zA-Z0-9_-]+)/i);

  // Extract Name (Usually the first non-empty line without special characters)
  let name = 'Alex Morgan';
  for (const line of lines.slice(0, 5)) {
    if (!line.includes('@') && !line.includes('http') && line.length < 35 && /^[a-zA-Z\s.'-]+$/.test(line)) {
      name = line;
      break;
    }
  }

  // Detect Headline or synthesize from keywords
  let headline = 'Software Engineer & Full-Stack Developer';
  if (/machine learning|data science|ai/i.test(rawText)) {
    headline = 'AI Engineer & Full-Stack Developer';
  } else if (/frontend|ui\/ux|design|react/i.test(rawText)) {
    headline = 'Frontend Engineer & UI/UX Specialist';
  } else if (/cloud|devops|aws|docker/i.test(rawText)) {
    headline = 'Cloud Architect & Systems Engineer';
  }

  // Detect Location
  const locationMatch = rawText.match(/(?:San Francisco|New York|Seattle|Austin|Boston|London|Bengaluru|Berlin|Toronto|Chicago|Remote)[^,\n]*/i);
  const location = locationMatch ? locationMatch[0].trim() : 'San Francisco, CA';

  // Extract Skills
  const commonTech = [
    { name: 'TypeScript', category: 'Frontend' },
    { name: 'React', category: 'Frontend' },
    { name: 'Next.js', category: 'Frontend' },
    { name: 'Tailwind CSS', category: 'Frontend' },
    { name: 'Node.js', category: 'Backend' },
    { name: 'Python', category: 'Backend' },
    { name: 'FastAPI', category: 'Backend' },
    { name: 'PostgreSQL', category: 'Database' },
    { name: 'MongoDB', category: 'Database' },
    { name: 'Docker', category: 'DevOps' },
    { name: 'AWS', category: 'Cloud' },
    { name: 'Git', category: 'Tools' },
    { name: 'GraphQL', category: 'Backend' },
    { name: 'TensorFlow', category: 'AI/ML' },
    { name: 'PyTorch', category: 'AI/ML' }
  ];

  const extractedSkills: SkillItem[] = [];
  for (const tech of commonTech) {
    const regex = new RegExp(`\\b${tech.name}\\b`, 'i');
    if (regex.test(rawText)) {
      extractedSkills.push(tech);
    }
  }

  if (extractedSkills.length === 0) {
    extractedSkills.push(
      { name: 'TypeScript', category: 'Frontend' },
      { name: 'React', category: 'Frontend' },
      { name: 'Node.js', category: 'Backend' },
      { name: 'Python', category: 'Backend' },
      { name: 'PostgreSQL', category: 'Database' },
      { name: 'Git', category: 'Tools' }
    );
  }

  return {
    personal: {
      name,
      headline,
      email,
      phone,
      location,
      profileImage: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80'
    },
    about: `Passionate ${headline.toLowerCase()} with a proven track record of designing scalable web applications and intuitive digital experiences. Dedicated to clean code, performance optimization, and solving real-world challenges through modern web technologies.`,
    skills: extractedSkills,
    education: [
      {
        institution: 'University of Technology',
        degree: 'Bachelor of Science',
        field: 'Computer Science',
        startDate: '2020',
        endDate: '2024',
        description: 'Focused on Algorithms, Distributed Systems, and Human-Computer Interaction. Dean’s Honors List.'
      }
    ],
    experience: [
      {
        company: 'Apex Digital Solutions',
        role: 'Full Stack Engineer',
        startDate: '2024',
        endDate: 'Present',
        description: 'Engineered responsive web applications supporting 50k+ monthly active users. Reduced bundle size by 35% and integrated real-time microservices.',
        technologies: ['React', 'TypeScript', 'Node.js', 'Tailwind CSS']
      },
      {
        company: 'Vanguard Labs',
        role: 'Software Developer Intern',
        startDate: '2023',
        endDate: '2023',
        description: 'Collaborated with senior engineers to implement automated testing pipelines and RESTful backend microservices.',
        technologies: ['Python', 'PostgreSQL', 'Docker', 'Git']
      }
    ],
    projects: [
      {
        title: 'CloudPulse - Realtime Analytics Dashboard',
        description: 'High-throughput system monitoring platform with interactive metric visualizations, alerts, and sub-second data streaming.',
        technologies: ['React', 'TypeScript', 'Tailwind CSS', 'WebSockets'],
        githubUrl: githubMatch ? `https://github.com/${githubMatch[1]}/cloudpulse` : 'https://github.com/alexmorgan/cloudpulse',
        liveUrl: 'https://cloudpulse-demo.vercel.app',
        image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop&q=80'
      },
      {
        title: 'Nexus AI - Document Intelligence Agent',
        description: 'Autonomous multi-document question-answering assistant utilizing vector embeddings and semantic search.',
        technologies: ['Python', 'FastAPI', 'PostgreSQL', 'LangChain'],
        githubUrl: githubMatch ? `https://github.com/${githubMatch[1]}/nexus-ai` : 'https://github.com/alexmorgan/nexus-ai',
        liveUrl: 'https://nexus-ai-demo.vercel.app',
        image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop&q=80'
      }
    ],
    certifications: [
      {
        name: 'AWS Certified Solutions Architect',
        issuer: 'Amazon Web Services',
        date: '2024',
        url: 'https://aws.amazon.com/certification/'
      }
    ],
    achievements: [
      'Finalist in National Hackathon 2023 (Top 10 out of 400+ teams)',
      'Published open source developer tool with over 1,200 GitHub stars'
    ],
    research: [],
    social: {
      github: githubMatch ? `https://github.com/${githubMatch[1]}` : 'https://github.com/alexmorgan',
      linkedin: linkedinMatch ? `https://linkedin.com/in/${linkedinMatch[1]}` : 'https://linkedin.com/in/alexmorgan',
      twitter: 'https://twitter.com/alexmorgan_dev',
      website: 'https://alexmorgan.dev'
    },
    contact: {
      email,
      phone
    }
  };
}

export function assistTextMock(action: string, text: string): string {
  const trimmed = text.trim();
  if (!trimmed) return 'Dynamic and results-driven software engineer specializing in scalable applications.';

  switch (action) {
    case 'professional':
      return `Experienced professional with demonstrated expertise in ${trimmed.replace(/^I am a |^Passionate /i, '')}. Committed to engineering excellence, scalable architectures, and cross-functional team leadership.`;
    case 'shorten':
      return trimmed.length > 80
        ? trimmed.split('.')[0] + '.'
        : trimmed;
    case 'engaging':
      return `Transforming ambitious concepts into elegant, high-impact digital solutions: ${trimmed}`;
    case 'improve':
    default:
      return `${trimmed.charAt(0).toUpperCase() + trimmed.slice(1)} Emphasizing proactive problem-solving, clean code aesthetics, and measurable impact.`;
  }
}

export function analyzeQualityMock(data: PortfolioData) {
  let score = 0;
  const checks: { label: string; passed: boolean; tip?: string }[] = [];

  // Name check
  if (data.personal?.name?.trim()) {
    score += 15;
    checks.push({ label: 'Full name provided', passed: true });
  } else {
    checks.push({ label: 'Missing full name', passed: false, tip: 'Add your full name in the Hero section' });
  }

  // Headline check
  if (data.personal?.headline?.trim()) {
    score += 10;
    checks.push({ label: 'Professional headline defined', passed: true });
  } else {
    checks.push({ label: 'Add a professional headline', passed: false, tip: 'Specify your target role (e.g. Full Stack Engineer)' });
  }

  // About check
  if (data.about && data.about.length > 40) {
    score += 15;
    checks.push({ label: 'Comprehensive About section', passed: true });
  } else {
    checks.push({ label: 'Expand About summary', passed: false, tip: 'Write 2-3 sentences highlighting your core passion and experience' });
  }

  // Skills check
  if (data.skills && data.skills.length >= 4) {
    score += 15;
    checks.push({ label: `${data.skills.length} technical skills cataloged`, passed: true });
  } else {
    checks.push({ label: 'Add at least 4 skills', passed: false, tip: 'List your core programming languages and frameworks' });
  }

  // Projects check
  if (data.projects && data.projects.length >= 2) {
    score += 20;
    checks.push({ label: `${data.projects.length} showcase projects added`, passed: true });
  } else {
    checks.push({ label: 'Add at least 2 showcase projects', passed: false, tip: 'Projects are the #1 thing recruiters review' });
  }

  // Social Links
  if (data.social?.github || data.social?.linkedin) {
    score += 15;
    checks.push({ label: 'Professional social links attached', passed: true });
  } else {
    checks.push({ label: 'Link GitHub or LinkedIn profile', passed: false, tip: 'Include your active GitHub or LinkedIn URL' });
  }

  // Experience / Education
  if (data.experience?.length > 0 || data.education?.length > 0) {
    score += 10;
    checks.push({ label: 'Work experience or academic background included', passed: true });
  } else {
    checks.push({ label: 'Add education or work experience', passed: false, tip: 'Add your college degree or internships' });
  }

  return {
    score: Math.min(100, score),
    checks,
    suggestions: checks.filter(c => !c.passed).map(c => c.tip || c.label)
  };
}
