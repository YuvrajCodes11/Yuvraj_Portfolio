import profilePhoto from './assets/images/yuvraj_profile_photo.jpeg';

export const PERSONAL_INFO = {
  name: 'Yuvraj Singh Sidhu',
  title: 'Freelance Full-Stack Product Developer',
  status: 'Available for freelance projects',
  avatarUrl: profilePhoto,
  github: 'https://github.com/YuvrajCodes11',
  linkedin: 'https://www.linkedin.com/in/yuvraj-singh-sidhu-86b961385',
  email: 'yuvrajcodes11@gmail.com',
  location: 'Chandigarh, India',
  resumeUrl: '/resume.pdf',
  bio: 'I help founders and growing businesses turn operational problems into reliable web products: SaaS platforms, internal dashboards, CRM systems, API backends, and automation tools built for long-term use.',
};

export const TRUST_METRICS = [
  { label: 'Production Projects', value: 4, suffix: '+', note: 'Client-grade platforms' },
  { label: 'Technologies', value: 12, suffix: '+', note: 'Modern full-stack tools' },
  { label: 'Client Satisfaction', value: 100, suffix: '%', note: 'Reliability-first delivery' },
  { label: 'Fast Delivery', value: 14, suffix: 'd', note: 'MVP-ready sprint cycles' },
];

export const SERVICES = [
  {
    title: 'SaaS Development',
    description: 'Subscription-ready platforms with secure accounts, role-based workflows, clean dashboards, and scalable backend foundations.',
  },
  {
    title: 'CRM Systems',
    description: 'Custom lead, customer, order, and team-management systems that match how your business actually operates.',
  },
  {
    title: 'Admin Dashboards',
    description: 'Operational dashboards that make data, approvals, inventory, users, and business activity easy to manage.',
  },
  {
    title: 'AI Integrations',
    description: 'Practical AI features for search, content workflows, customer support, internal assistants, and productivity automation.',
  },
  {
    title: 'REST API Development',
    description: 'Secure Spring Boot APIs with clear contracts, authentication, database integration, and production-minded error handling.',
  },
  {
    title: 'Business Automation',
    description: 'Automated workflows that reduce manual admin work, connect tools, trigger notifications, and keep teams moving.',
  },
  {
    title: 'Performance Optimization',
    description: 'Speed improvements across frontend, backend, database queries, assets, and deployment setup.',
  },
  {
    title: 'Custom Web Applications',
    description: 'Purpose-built applications for marketplaces, portals, e-commerce, community products, and internal business systems.',
  },
];

export const PROJECTS = [
  {
    id: 'mintynex',
    title: 'MintyNex',
    subtitle: 'Global TCG Trading Cards & Collector Community Platform',
    status: 'Production Ready',
    problem: 'Trading card collectors needed a trusted, dedicated platform to showcase digital binders, connect with local/global trainers, and arrange verified face-to-face card trades without high marketplace fees or shipping scam risks.',
    solution: 'Designed and built a complete TCG community platform with digital binder management, PSA/BGS grade filters, real-time community pull feed, trainer reputation levels, direct messaging, and structured trade proposals.',
    results: [
      'Live platform hosting 8,400+ active trainers and 3,400+ card listings',
      'Digital binder system with real card artwork, grade filters, and market value tracking',
      'In-person trade proposal engine with verified badges and rating system',
    ],
    technologies: ['React.js', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Supabase', 'Vercel'],
    features: [
      'Digital binder to showcase TCG collection with PSA/BGS grades and market pricing',
      'In-person safe trading engine with structured proposals and zero shipping risk',
      'Live community feed for trainers to share pack pulls, slabs, and trade updates',
      'MintyMart marketplace with 3,400+ listings filtered by grade, set, and region',
      'Trainer ranking system (Rookie to Elite) with star rep ratings and verified badges',
    ],
    liveUrl: 'https://minty-nex-frontend.vercel.app/',
    githubUrl: 'https://github.com/YuvrajCodes11',
  },
  {
    id: 'blue',
    title: 'BLUE',
    subtitle: 'Blue Economy Livelihoods Unified Ecosystem',
    status: 'Production Ready',
    problem: 'Fisheries, marine conservation groups, BMUs, donors, and ocean policy agencies lacked a unified intelligence portal to monitor coastal community livelihoods, track marine resources, and collaborate on ocean conservation.',
    solution: 'Engineered a sleek ocean intelligence platform featuring real-time ecosystem telemetry, fishery management tools, marine conservation metrics, and multi-stakeholder dashboards.',
    results: [
      'Centralized ocean intelligence portal for fisheries, BMUs, and marine conservation',
      'Interactive data dashboard for ocean livelihood tracking and stakeholder reporting',
      'High-performance Next.js web application deployed for production use',
    ],
    technologies: ['Next.js', 'TypeScript', 'Tailwind CSS', 'React.js', 'Vercel'],
    features: [
      'Ocean telemetry and marine livelihood analytics dashboard',
      'Multi-stakeholder access for BMUs, NGOs, conservationists, and public agencies',
      'Fishery management and marine resource tracking workflows',
      'Responsive, high-contrast dark theme optimized for ocean intelligence data',
      'Fast client-side navigation and production-grade deployment on Vercel',
    ],
    liveUrl: 'https://blue-black-gamma.vercel.app/',
    githubUrl: 'https://github.com/YuvrajCodes11',
  },
  {
    id: 'ac-management',
    title: 'AC Management App',
    subtitle: 'Air Conditioning Services ERP & Operations System',
    status: 'Production Ready',
    problem: 'Air conditioning service companies struggle to coordinate customer service requests, technician dispatching, BOQ material issues, AMC reminders, inventory, and executive business visibility across manual logs.',
    solution: 'Engineered a full-stack service management ERP system with role-based access for CEOs, managers, and service technicians to manage bookings, inventory, material dispatches, and business reporting.',
    results: [
      'Full service operations ERP system with role-based CEO and Manager portals',
      'Automated AMC reminders, customer service dispatches, and material issue tracking',
      'Live demo environment deployed on Railway infrastructure with instant demo login',
    ],
    technologies: ['Java', 'Spring Boot', 'React.js', 'Tailwind CSS', 'PostgreSQL', 'Railway'],
    features: [
      'Role-based portals (CEO / Owner view, Manager view, Technician view)',
      'Customer management and service request ticket tracking',
      'Technician scheduling, AMC contract renewals, and BOQ material issue control',
      'Real-time business reports, inventory tracking, and operational analytics',
      'Live production deployment on Railway with demo account access',
    ],
    liveUrl: 'https://web-production-95473.up.railway.app/',
    githubUrl: 'https://github.com/YuvrajCodes11',
  },
  {
    id: 'king-queen',
    title: 'A King & A Queen',
    subtitle: 'Premium Fashion E-Commerce Platform',
    status: 'Production Ready',
    problem: 'The business needed a polished online shopping experience that could handle products, checkout, orders, payments, and admin control without feeling like a template.',
    solution: 'Built a responsive e-commerce platform with secure authentication, dynamic product browsing, cart and checkout flows, order management, payment integration, and an admin dashboard for day-to-day retail operations.',
    results: [
      'Complete end-to-end shopping workflow delivered',
      'Admin tools included for inventory and order management',
      'Responsive storefront prepared for real customer traffic',
    ],
    technologies: ['React.js', 'JavaScript', 'CSS3', 'Java', 'Spring Boot', 'MySQL', 'Supabase'],
    features: [
      'Secure authentication and session-based account flow',
      'Product catalog with categories, search, sorting, and product details',
      'Shopping cart, checkout, order history, and payment-ready endpoints',
      'Admin dashboard for inventory, orders, and business visibility',
      'Mobile-first responsive interface for retail customers',
    ],
    liveUrl: '#',
    githubUrl: 'https://github.com/YuvrajCodes11',
  },
];

export const PROCESS_STEPS = [
  ['Discovery', 'Clarify the business goal, audience, workflows, constraints, and success metrics.'],
  ['Planning', 'Map the product scope, architecture, milestones, screens, data models, and delivery priorities.'],
  ['Development', 'Build clean frontend and backend modules with regular progress updates and review points.'],
  ['Testing', 'Test responsiveness, core flows, edge cases, API behavior, performance, and accessibility.'],
  ['Deployment', 'Ship to Vercel, Netlify, Railway, Supabase, or your preferred stack with production checks.'],
  ['Support', 'Provide fixes, improvements, handoff notes, and long-term maintainability support.'],
];

export const TECH_STACK = [
  'React',
  'Next.js',
  'TypeScript',
  'JavaScript',
  'Java',
  'Spring Boot',
  'REST APIs',
  'PostgreSQL',
  'MySQL',
  'Supabase',
  'Tailwind CSS',
  'Vercel',
  'Railway',
  'Netlify',
];

export const TESTIMONIAL_PLACEHOLDERS = [
  {
    quote: 'Yuvraj communicates clearly, works reliably, and treats product quality like a business requirement.',
    name: 'Riya',
    role: 'SaaS Founder',
  },
  {
    quote: 'The delivery process is structured, transparent, and focused on outcomes instead of just shipping screens.',
    name: 'Taj',
    role: 'Operations Lead',
  },
  {
    quote: 'A strong fit for dashboards, automation, and backend-heavy products that need clean architecture.',
    name: 'Hajji',
    role: 'Business Owner',
  },
];
