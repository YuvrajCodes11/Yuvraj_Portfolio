import { Project, SkillNode, ServiceItem } from './types';

export const PERSONAL_INFO = {
  name: 'Yuvraj Singh Sidhu',
  title: 'Java Developer // Full-Stack Engineer',
  status: 'Online',
  version: 'V4.0.2',
  avatarUrl: '/src/assets/images/yuvraj_profile_1780512972195.png', // User uploaded profile avatar
  github: 'https://github.com',
  linkedin: 'https://linkedin.com',
  email: 'yuvrajcodes11@gmail.com',
  location: 'Toronto, Ontario, Canada', // Easily understandable physical location
  bio: 'I am a passionate software engineer specializing in building dependable, high-speed backend systems using Java and Spring Boot, as well as fast, modern web interfaces with React and Tailwind CSS. I design secure, optimized, and easy-to-use digital applications that solve real-world problems and help businesses succeed.',
};

export const SKILL_NODES: SkillNode[] = [
  { id: 'java', name: 'Java Coding', category: 'core', level: 98, angle: 0, radius: 100, speed: 0.015, iconName: 'Cpu' },
  { id: 'spring', name: 'Spring Boot', category: 'backend', level: 96, angle: 90, radius: 130, speed: -0.01, iconName: 'Layers' },
  { id: 'react', name: 'React UI', category: 'frontend', level: 94, angle: 180, radius: 160, speed: 0.008, iconName: 'Code' },
  { id: 'mysql', name: 'Databases (SQL)', category: 'database', level: 92, angle: 270, radius: 190, speed: -0.006, iconName: 'Database' },
  { id: 'docker', name: 'Docker Containers', category: 'core', level: 90, angle: 45, radius: 145, speed: 0.012, iconName: 'ShieldAlert' },
  { id: 'aws', name: 'AWS Cloud Services', category: 'backend', level: 88, angle: 225, radius: 175, speed: -0.007, iconName: 'Cloud' },
];

export const TECHNICAL_GRID = {
  computing: {
    score: '98%',
    label: 'High-Performance Coding',
    details: 'Writing fast, reliable code, optimizing applications for speed, and managing database flows to prevent server slowdowns.',
  },
  design: {
    score: '92%',
    label: 'Beautiful & Interactive UIs',
    details: 'Designing clean, professional modern layouts with delightful animations and easy-to-use interactive controls for customers.',
  }
};

export const PROJECTS: Project[] = [
  {
    id: 'mintynex',
    title: 'MintyNex',
    subtitle: 'Real-Time Messaging Application',
    description: 'A modern, private chat application featuring real-time message delivery and secure end-to-end encryption. Built to transmit messages quickly and reliably even under slow internet conditions.',
    metaText: 'STATUS: ACTIVE CHAT PROJECT',
    tags: ['Realtime_Chat', 'Secure_Messaging', 'Fast_Delivery'],
    techStack: ['Java', 'Spring Boot', 'WebSockets', 'React', 'Tailwind', 'Redis'],
    imageUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80', // Cyber abstract digital network
    liveUrl: '#',
    githubUrl: '#',
    features: [
      'Automatically handles reconnections if your internet connection drops',
      'High-grade message encryption to ensure chats remain entirely private',
      'Secured local web storage for smooth viewing of messages while offline',
      'Interactive chat dashboard displaying live system active node status'
    ],
    stats: [
      { label: 'Response Time', value: '4.8ms', color: 'cyan' },
      { label: 'Performance', value: '24K msg/s', color: 'green' },
      { label: 'Uptime', value: '99.99%', color: 'amber' }
    ]
  },
  {
    id: 'king-queen',
    title: 'A King & A Queen',
    subtitle: 'Luxury E-Commerce Shopping Experience',
    description: 'A high-end fashion online store that features elegant styling, a secure encrypted checkout system, live international currency conversion, and beautiful interactions.',
    metaText: 'STATUS: E-COMMERCE PLATFORM',
    tags: ['Interactive_Shop', 'Live_Currency', 'Encrypted_Checkout'],
    techStack: ['React', 'Motion Animations', 'Tailwind CSS', 'Node.js', 'MySQL Database', 'Stripe Payments'],
    imageUrl: 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=1200&q=80', // Luxury aesthetic
    liveUrl: '#',
    githubUrl: '#',
    features: [
      'Interactive metallic jewelry ring color selector built with responsive graphics',
      'Instant overseas currency converter with automatic local fallback settings',
      'Highly secure payment gateway verified with modern security certificates',
      'Beautiful catalog layouts featuring smooth hover reactions and navigation'
    ],
    stats: [
      { label: 'Live Visitors', value: '1,420 Active', color: 'cyan' },
      { label: 'Sales Growth', value: '+4.2%', color: 'green' },
      { label: 'Load Time', value: '1.2 seconds', color: 'amber' }
    ]
  }
];

export const SERVICES: ServiceItem[] = [
  {
    id: 'fullstack',
    code: 'Service_01',
    title: 'Full-Stack Web Development',
    description: 'Building complete web applications from start to finish. I connect fast and interactive user interfaces to powerful, secure backend web servers.',
    techStack: ['React UI', 'Spring Boot', 'TypeScript', 'Tailwind CSS'],
    features: ['Modern state managers', 'Optimized assets', 'Intuitive layouts'],
    loadIndex: 12
  },
  {
    id: 'apis',
    code: 'Service_02',
    title: 'Back-End API Development',
    description: 'Creating robust and highly secure back-end APIs. I design fast communication channels between servers to ensure user data flows safely.',
    techStack: ['Java Coding', 'Spring Cloud', 'REST APIs', 'Secure Auth'],
    features: ['High speed endpoints', 'Safe data transfer', 'Rate limit protection'],
    loadIndex: 25
  },
  {
    id: 'databases',
    code: 'Service_03',
    title: 'Database Optimization',
    description: 'Structuring database tables so your application loads instantly. I design databases to scale safely while ensuring regular secure backups.',
    techStack: ['MySQL', 'PostgreSQL', 'Redis Cache', 'Hibernate ORM'],
    features: ['ACID transactions', 'Optimized queries', 'Automated safe backups'],
    loadIndex: 18
  },
  {
    id: 'machinement',
    code: 'Service_04',
    title: 'AI & Smart Integrations',
    description: 'Integrating modern AI models (like Google Gemini) to build helpful search features, translation helper tools, and smart interfaces.',
    techStack: ['Gemini AI API', 'TensorFlow.js', 'Vector Search'],
    features: ['AI text generation', 'Smart search filters', 'Adaptive helpers'],
    loadIndex: 40
  }
];

export const INITIAL_LOGS_DATA = [
  { timestamp: '14:24:02', type: 'system', message: 'Ready to receive contact queries.' },
  { timestamp: '14:24:03', type: 'info', message: 'Email system ready for submissions to yuvrajcodes11@gmail.com.' },
  { timestamp: '14:24:03', type: 'success', message: 'ALL SYSTEMS STABLE: Welcome to Yuvraj\'s Portfolio.' },
];
