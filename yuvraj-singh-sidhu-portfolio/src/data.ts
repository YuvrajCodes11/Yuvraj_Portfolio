import { Project, SkillNode, ServiceItem } from './types';

export const PERSONAL_INFO = {
  name: 'Yuvraj Singh Sidhu',
  title: 'Full-Stack Developer',
  status: 'Online',
  version: 'V4.0.2',
  avatarUrl: '', // Avatar image removed, fallback to clean elegant initials avatar
  github: 'https://github.com',
  linkedin: 'https://www.linkedin.com/in/yuvraj-singh-sidhu-86b961385',
  email: 'yuvrajcodes11@gmail.com',
  location: 'Chandigarh, India',
  bio: 'Freelance Full-Stack Developer with 1.5 years of hands-on experience building scalable web applications, social networking platforms, e-commerce solutions, REST APIs, and database-driven systems. Specialized in Java Spring Boot development, MERN Stack technologies, secure authentication architectures, and reliable database integrations.',
};

export const SKILL_NODES: SkillNode[] = [
  { id: 'java', name: 'Java Backend', category: 'core', level: 98, angle: 0, radius: 100, speed: 0.015, iconName: 'Cpu' },
  { id: 'spring', name: 'Spring Boot', category: 'backend', level: 96, angle: 90, radius: 130, speed: -0.01, iconName: 'Layers' },
  { id: 'react', name: 'React & Next.js', category: 'frontend', level: 94, angle: 180, radius: 160, speed: 0.008, iconName: 'Code' },
  { id: 'supabase', name: 'Supabase & Postgres', category: 'database', level: 92, angle: 270, radius: 190, speed: -0.006, iconName: 'Database' },
  { id: 'auth', name: 'Auth & Security', category: 'core', level: 93, angle: 45, radius: 145, speed: 0.012, iconName: 'ShieldAlert' },
  { id: 'platforms', name: 'Railway & Deployment', category: 'backend', level: 89, angle: 225, radius: 175, speed: -0.007, iconName: 'Cloud' },
];

export const TECHNICAL_GRID = {
  computing: {
    score: '98%',
    label: 'High-Performance Coding',
    details: 'Writing fast, reliable backend code, optimizing REST API endpoints using Java & Spring Boot, and managing transactional Postgres databases.',
  },
  design: {
    score: '92%',
    label: 'Beautiful & Interactive UIs',
    details: 'Designing clean, modern user interfaces using React.js/Next.js and Tailwind CSS with smooth layout transitions and high-contrast usability.',
  }
};

export const PROJECTS: Project[] = [
  {
    id: 'mintynex',
    title: 'MintyNex',
    subtitle: 'Pokemon TCG Social & Trading Ecosystem',
    description: 'A full-scale, scalable social and marketplace platform designed for Pokémon TCG collectors. It integrates a rich social news feed, personal card virtual binder tracking, localized player discovery, and secure transactional escrow handlers.',
    metaText: 'STATUS: IN DEVELOPMENT (PHASE 1 & 2)',
    tags: ['Pokemon_TCG', 'Social_Feed', 'Binder_Collection', 'MintyMart_Marketplace', 'Trading_Escrow', 'Realtime_Chat'],
    techStack: ['Java (Core + REST)', 'Spring Boot', 'Next.js', 'React.js', 'Supabase', 'PostgreSQL', 'Railway', 'Netlify'],
    imageUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80',
    liveUrl: '#',
    githubUrl: '#',
    features: [
      'Built multi-layer authentication & accounts via secure Supabase PostgreSQL schemas',
      'Engineered interactive Social Feed featuring posts, toggle likes, and threaded comments',
      'Developed grid-based virtual Card Binder to register, track details, and filter cards by type',
      'Designed localized player discovery locator matching collectors by city and country',
      'Established real-time message exchange corridors complete with notifications and unread counts',
      'Crafted transactional Escrow trade transitions logic (Proposed -> Accepted -> In Progress -> Completed)'
    ],
    stats: [
      { label: 'Phase 1 State', value: 'Complete', color: 'green' },
      { label: 'Phase 2 Trade', value: 'In Progress', color: 'cyan' },
      { label: 'Core Platform', value: 'Spring/Supa', color: 'amber' }
    ]
  },
  {
    id: 'king-queen',
    title: 'A King & A Queen',
    subtitle: 'Luxury E-Commerce Shopping Experience',
    description: 'A premium, modern fashion e-commerce shopping platform configured to provide supreme storefront browsing, order processing, secure auth, inventory management, and modular administrator controls.',
    metaText: 'STATUS: COMPLETED',
    tags: ['Fashion_Storefront', 'Product_Catalog', 'Shopping_Cart', 'Order_Processing', 'Payment_Gateway', 'Inventory_Mgmt'],
    techStack: ['React.js', 'JavaScript', 'CSS3', 'Java', 'Spring Boot', 'MySQL', 'Supabase', 'Cloud UI'],
    imageUrl: 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=1200&q=80',
    liveUrl: '#',
    githubUrl: '#',
    features: [
      'Implemented fully secure catalog search and custom category selectors',
      'Built centralized cart system supporting multi-item additions and update calculations',
      'Engineered order checkout workflows and payment merchant connection endpoints',
      'Structured custom database schemas linking MySQL and Supabase for safe storage',
      'Designed fully modular administrative control board for real-time inventory adjustments',
      'Created sleek, fully responsive user experience supporting fluid viewport scales'
    ],
    stats: [
      { label: 'Platform State', value: 'Completed', color: 'green' },
      { label: 'Frontend Engine', value: 'React.js', color: 'cyan' },
      { label: 'Backend Core', value: 'Spring Boot', color: 'amber' }
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
    techStack: ['Java Coding', 'Spring Boot', 'REST APIs', 'Secure Auth'],
    features: ['High speed endpoints', 'Safe data transfer', 'Rate limit protection'],
    loadIndex: 25
  },
  {
    id: 'databases',
    code: 'Service_03',
    title: 'Database Optimization',
    description: 'Structuring database tables so your application loads instantly. I design databases to scale safely while ensuring regular secure backups.',
    techStack: ['MySQL', 'PostgreSQL', 'Supabase', 'Database Integration'],
    features: ['ACID transactions', 'Optimized queries', 'Automated safe backups'],
    loadIndex: 18
  },
  {
    id: 'machinement',
    code: 'Service_04',
    title: 'Systems & Architecture Design',
    description: 'Drafting scalable, clean backend code structures and security definitions. I write robust multi-module architectures optimized for client-grade production.',
    techStack: ['System Design', 'Authentication System', 'Clean Architecture'],
    features: ['Modular architectures', 'Authentication modules', 'Reliable deploy channels'],
    loadIndex: 40
  }
];

export const INITIAL_LOGS_DATA = [
  { timestamp: '14:24:02', type: 'system', message: 'Ready to receive contact queries.' },
  { timestamp: '14:24:03', type: 'info', message: 'Email system ready for submissions to yuvrajcodes11@gmail.com.' },
  { timestamp: '14:24:03', type: 'success', message: 'ALL SYSTEMS STABLE: Welcome to Yuvraj\'s Portfolio.' },
];
