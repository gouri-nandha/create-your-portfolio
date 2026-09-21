import { Portfolio, PortfolioData } from '../types/portfolio';

export const SAMPLE_DEVELOPER_DATA: PortfolioData = {
  personal: {
    name: 'Marcus Vance',
    headline: 'Senior Full-Stack & Distributed Systems Engineer',
    email: 'marcus.vance@example.com',
    phone: '+1 (415) 890-1234',
    location: 'San Francisco, CA',
    profileImage: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=600&auto=format&fit=crop&q=80',
  },
  about: 'Distributed systems architect and open-source enthusiast with 5+ years specializing in reactive user interfaces, high-concurrency microservices, and modern cloud deployment pipelines. Driven by clean architecture, performance optimization, and delighting users.',
  skills: [
    { name: 'TypeScript', category: 'Frontend' },
    { name: 'React / Next.js', category: 'Frontend' },
    { name: 'Tailwind CSS', category: 'Frontend' },
    { name: 'Node.js', category: 'Backend' },
    { name: 'Go (Golang)', category: 'Backend' },
    { name: 'PostgreSQL', category: 'Database' },
    { name: 'Redis', category: 'Database' },
    { name: 'Docker & K8s', category: 'DevOps' },
    { name: 'AWS Cloud', category: 'Cloud' },
    { name: 'GraphQL', category: 'Backend' },
    { name: 'CI/CD Pipelines', category: 'DevOps' },
    { name: 'Git / GitHub', category: 'Tools' },
  ],
  education: [
    {
      institution: 'University of California, Berkeley',
      degree: 'B.S. in Electrical Engineering & Computer Science',
      field: 'Computer Science',
      startDate: '2017',
      endDate: '2021',
      description: 'Focus on distributed systems and algorithmic game theory. Magna Cum Laude. President of Open Source Society.',
    },
  ],
  experience: [
    {
      company: 'Aether Cloud Technologies',
      role: 'Staff Platform Engineer',
      startDate: '2022',
      endDate: 'Present',
      description: 'Spearheaded the redesign of core stream ingestion pipeline, slashing latency by 45% across 20M+ daily events. Mentored 8 engineers and unified frontend design system.',
      technologies: ['React', 'TypeScript', 'Node.js', 'Go', 'PostgreSQL', 'Docker'],
    },
    {
      company: 'OmniFlow Labs',
      role: 'Full Stack Engineer',
      startDate: '2021',
      endDate: '2022',
      description: 'Architected real-time collaborative workspace tools with WebSockets and CRDTs. Increased active user retention by 28%.',
      technologies: ['React', 'Next.js', 'Redis', 'Tailwind CSS', 'AWS'],
    },
  ],
  projects: [
    {
      title: 'HyperPulse — Distributed Stream Analytics',
      description: 'Ultra-low latency real-time metric visualization dashboard capable of rendering 100,000+ dynamic data points at 60 FPS.',
      technologies: ['React', 'TypeScript', 'WebSockets', 'Canvas API', 'Tailwind'],
      githubUrl: 'https://github.com/marcusvance/hyperpulse',
      liveUrl: 'https://hyperpulse-demo.dev',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop&q=80',
    },
    {
      title: 'VoxelDB — Embedded Time-Series Engine',
      description: 'Zero-dependency key-value cache and time-series log engine in Go with memory mapped persistence and snappy CLI tooling.',
      technologies: ['Go', 'Memory-Mapped I/O', 'CLI', 'Docker'],
      githubUrl: 'https://github.com/marcusvance/voxeldb',
      liveUrl: 'https://voxeldb.dev',
      image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&auto=format&fit=crop&q=80',
    },
    {
      title: 'KubeSentry — Cluster Health Visualizer',
      description: 'Open-source container monitoring dashboard with interactive topological dependency maps and automated anomaly alarms.',
      technologies: ['React', 'TypeScript', 'GraphQL', 'Tailwind CSS'],
      githubUrl: 'https://github.com/marcusvance/kubesentry',
      liveUrl: 'https://kubesentry.io',
      image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop&q=80',
    },
  ],
  certifications: [
    {
      name: 'AWS Certified Solutions Architect – Professional',
      issuer: 'Amazon Web Services',
      date: '2023',
      url: 'https://aws.amazon.com/certification/',
    },
    {
      name: 'CKA: Certified Kubernetes Administrator',
      issuer: 'Cloud Native Computing Foundation',
      date: '2022',
      url: 'https://www.cncf.io/certification/cka/',
    },
  ],
  achievements: [
    'Winner of Global Hackathon 2023 (1st place out of 650 submissions)',
    'Keynote Speaker at ReactTech Summit 2024 on Reactive Web Architecture',
    'Creator of GitHub repository with 4,500+ stars',
  ],
  research: [
    'High-Throughput CRDT Synchronization in Heterogeneous Edge Networks (arXiv:2022.0491)',
  ],
  social: {
    github: 'https://github.com/marcusvance',
    linkedin: 'https://linkedin.com/in/marcusvance',
    twitter: 'https://twitter.com/marcusvance_dev',
    website: 'https://marcusvance.dev',
  },
  contact: {
    email: 'marcus.vance@example.com',
    phone: '+1 (415) 890-1234',
  },
};

export const SAMPLE_DESIGNER_DATA: PortfolioData = {
  personal: {
    name: 'Elena Rostova',
    headline: 'Senior Product Designer & Creative Technologist',
    email: 'elena.rostova@example.com',
    phone: '+1 (312) 555-0199',
    location: 'New York, NY',
    profileImage: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600&auto=format&fit=crop&q=80',
  },
  about: 'Multidisciplinary designer weaving human-centric design, micro-interactions, and design systems into intuitive digital products. Obsessed with typography, accessibility, and frictionless user journeys.',
  skills: [
    { name: 'Product Design', category: 'Design' },
    { name: 'Figma & Design Systems', category: 'Design' },
    { name: 'UI / UX Prototyping', category: 'Design' },
    { name: 'User Research', category: 'Design' },
    { name: 'HTML & CSS / Tailwind', category: 'Frontend' },
    { name: 'Framer Motion', category: 'Frontend' },
    { name: 'Design Tokens', category: 'Design' },
    { name: 'WCAG 2.1 Accessibility', category: 'Design' },
  ],
  education: [
    {
      institution: 'Rhode Island School of Design (RISD)',
      degree: 'B.F.A. in Graphic Design & Interactive Media',
      field: 'Design',
      startDate: '2018',
      endDate: '2022',
      description: 'Departmental Honors. Capstone: Spatial Interfaces for Generative Typography.',
    },
  ],
  experience: [
    {
      company: 'Studio Lumina NYC',
      role: 'Lead Product Designer',
      startDate: '2022',
      endDate: 'Present',
      description: 'Directed end-to-end design systems for Fortune 500 fintech apps. Elevated user satisfaction by 42% and standardized 140+ shared components.',
      technologies: ['Figma', 'Design Systems', 'User Testing', 'Tailwind CSS'],
    },
  ],
  projects: [
    {
      title: 'Aura — Intelligent Mindfulness & Audio Space',
      description: 'Sensory audio app interface combining ambient soundscapes, spatial haptics, and minimalist dark mode aesthetics.',
      technologies: ['Figma', 'Framer', 'Prototyping', 'Audio UX'],
      githubUrl: 'https://github.com/elenarostova/aura-design',
      liveUrl: 'https://aura-audio.example.com',
      image: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=800&auto=format&fit=crop&q=80',
    },
    {
      title: 'Nova Pay — Global Micro-Transactions System',
      description: 'Frictionless checkout experience and mobile banking interface engineered with comprehensive accessibility testing.',
      technologies: ['Design Systems', 'Figma', 'UX Research'],
      githubUrl: 'https://github.com/elenarostova/novapay-ui',
      liveUrl: 'https://novapay-showcase.example.com',
      image: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=800&auto=format&fit=crop&q=80',
    },
  ],
  certifications: [
    {
      name: 'Nielsen Norman UX Master Certification',
      issuer: 'NN/g',
      date: '2023',
      url: 'https://www.nngroup.com',
    },
  ],
  achievements: [
    'Awwwards Site of the Day 2023 for Creative Portfolio',
    'Featured on Dribbble Top 50 Trendsetters in Product Design',
  ],
  research: [],
  social: {
    github: 'https://github.com/elenarostova',
    linkedin: 'https://linkedin.com/in/elenarostova',
    twitter: 'https://twitter.com/elena_design',
    website: 'https://elenarostova.design',
  },
  contact: {
    email: 'elena.rostova@example.com',
    phone: '+1 (312) 555-0199',
  },
};

export const SAMPLE_STUDENT_DATA: PortfolioData = {
  personal: {
    name: 'Aarav Patel',
    headline: 'Computer Science Undergraduate & AI Researcher',
    email: 'aarav.patel@student.edu',
    phone: '+1 (206) 456-7890',
    location: 'Seattle, WA',
    profileImage: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=600&auto=format&fit=crop&q=80',
  },
  about: 'Final-year Computer Science student passionate about NLP, computer vision, and building full-stack applications that make complex technology accessible. Seeking software engineering and machine learning roles.',
  skills: [
    { name: 'Python', category: 'Backend' },
    { name: 'C++', category: 'Backend' },
    { name: 'Java', category: 'Backend' },
    { name: 'PyTorch', category: 'AI/ML' },
    { name: 'React', category: 'Frontend' },
    { name: 'FastAPI', category: 'Backend' },
    { name: 'SQL', category: 'Database' },
    { name: 'Git', category: 'Tools' },
    { name: 'Linux', category: 'DevOps' },
  ],
  education: [
    {
      institution: 'University of Washington',
      degree: 'B.S. in Computer Science',
      field: 'Machine Learning & Systems',
      startDate: '2022',
      endDate: '2026',
      description: 'GPA: 3.92/4.0. Relevant coursework: Data Structures, Algorithms, Neural Networks, Database Systems, Computer Security.',
    },
  ],
  experience: [
    {
      company: 'UW Computational Vision Lab',
      role: 'Undergraduate Research Assistant',
      startDate: '2023',
      endDate: 'Present',
      description: 'Trained diffusion models for high-resolution medical imaging segmentation. Reduced inference overhead by 22% using TensorRT.',
      technologies: ['Python', 'PyTorch', 'CUDA', 'OpenCV'],
    },
  ],
  projects: [
    {
      title: 'VisionScribe — Realtime ASL Gesture Translator',
      description: 'Webcam-driven American Sign Language interpreter leveraging MediaPipe keypoints and an optimized LSTM network.',
      technologies: ['Python', 'React', 'MediaPipe', 'WebRTC'],
      githubUrl: 'https://github.com/aaravpatel/visionscribe',
      liveUrl: 'https://visionscribe.student.edu',
      image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&auto=format&fit=crop&q=80',
    },
    {
      title: 'CampusRide — Peer Carpooling Platform',
      description: 'Cross-platform student rideshare app featuring route clustering, split-fare calculations, and verified university email authentication.',
      technologies: ['React', 'FastAPI', 'PostgreSQL', 'Mapbox'],
      githubUrl: 'https://github.com/aaravpatel/campusride',
      liveUrl: 'https://campusride.student.edu',
      image: 'https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=800&auto=format&fit=crop&q=80',
    },
  ],
  certifications: [
    {
      name: 'Deep Learning Specialization',
      issuer: 'DeepLearning.AI / Coursera',
      date: '2023',
      url: 'https://coursera.org',
    },
  ],
  achievements: [
    'Dean’s List for 5 Consecutive Quarters',
    '1st Place — UW Annual Hackathon 2024',
  ],
  research: [
    'Low-Latency Edge Vision Inference using Distilled Diffusion Models (Presented at Student Research Symposium 2024)',
  ],
  social: {
    github: 'https://github.com/aaravpatel',
    linkedin: 'https://linkedin.com/in/aaravpatel',
    twitter: 'https://twitter.com/aarav_ai',
    website: 'https://aaravpatel.me',
  },
  contact: {
    email: 'aarav.patel@student.edu',
    phone: '+1 (206) 456-7890',
  },
};

export const DEFAULT_SECTIONS = [
  { id: 'sec-hero', type: 'hero' as const, title: 'Hero', visible: true },
  { id: 'sec-about', type: 'about' as const, title: 'About Me', visible: true },
  { id: 'sec-skills', type: 'skills' as const, title: 'Skills & Tools', visible: true },
  { id: 'sec-projects', type: 'projects' as const, title: 'Featured Projects', visible: true },
  { id: 'sec-experience', type: 'experience' as const, title: 'Work Experience', visible: true },
  { id: 'sec-education', type: 'education' as const, title: 'Education', visible: true },
  { id: 'sec-certifications', type: 'certifications' as const, title: 'Certifications', visible: true },
  { id: 'sec-achievements', type: 'achievements' as const, title: 'Achievements', visible: true },
  { id: 'sec-contact', type: 'contact' as const, title: 'Get In Touch', visible: true },
];

export const INITIAL_SAMPLE_PORTFOLIOS: Portfolio[] = [
  {
    id: 'portfolio-dev-1',
    name: 'Marcus Vance — Platform Engineer',
    style: 'developer',
    template: 'variantA',
    theme: 'dark',
    accentColor: '#38bdf8',
    sections: DEFAULT_SECTIONS,
    portfolioData: SAMPLE_DEVELOPER_DATA,
    createdAt: '2026-08-10T10:00:00.000Z',
    updatedAt: '2026-09-18T14:30:00.000Z',
  },
  {
    id: 'portfolio-des-2',
    name: 'Elena Rostova — Product Design',
    style: 'glass',
    template: 'variantA',
    theme: 'dark',
    accentColor: '#a855f7',
    sections: DEFAULT_SECTIONS,
    portfolioData: SAMPLE_DESIGNER_DATA,
    createdAt: '2026-08-15T11:00:00.000Z',
    updatedAt: '2026-09-20T09:15:00.000Z',
  },
  {
    id: 'portfolio-stu-3',
    name: 'Aarav Patel — AI Researcher',
    style: 'bold',
    template: 'variantB',
    theme: 'dark',
    accentColor: '#f59e0b',
    sections: DEFAULT_SECTIONS,
    portfolioData: SAMPLE_STUDENT_DATA,
    createdAt: '2026-09-01T08:00:00.000Z',
    updatedAt: '2026-09-21T12:00:00.000Z',
  },
];
