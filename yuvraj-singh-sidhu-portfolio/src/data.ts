import profilePhoto from './assets/images/yuvraj_profile_photo.jpeg';

export const PERSONAL_INFO = {
  name: 'Yuvraj Singh Sidhu',
  title: 'Freelance Full-Stack Product Developer',
  status: 'Available for freelance projects',
  avatarUrl: profilePhoto,
  github: 'https://github.com/YuvrajCodes11/Yuvraj_Portfolio',
  linkedin: 'https://www.linkedin.com/in/yuvraj-singh-sidhu-86b961385',
  email: 'yuvrajcodes11@gmail.com',
  location: 'Chandigarh, India',
  resumeUrl: '/resume.pdf',
  bio: 'I help founders and growing businesses turn operational problems into reliable web products: SaaS platforms, internal dashboards, CRM systems, API backends, and automation tools built for long-term use.',
};

export const TRUST_METRICS = [
  { label: 'Production Projects', value: 2, suffix: '+', note: 'Client-grade platforms' },
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
    subtitle: 'Social Networking, Marketplace, Trading & Community Platform',
    status: 'In Development',
    problem: 'The product needed more than a basic community site. It required profiles, social activity, communities, marketplace listings, messaging, notifications, collections, and a safe trading flow in one scalable platform.',
    solution: 'Designed a modular full-stack architecture with Supabase/PostgreSQL data models, secure authentication, marketplace flows, notification-ready events, and a staged escrow trading system that can grow feature-by-feature without rewriting the core.',
    results: [
      'Phase 1 social and marketplace foundation completed',
      'Escrow trading workflow planned for safer user-to-user exchanges',
      'Architecture prepared for React/Next.js migration and future scale',
    ],
    technologies: ['Java', 'Spring Boot', 'React.js', 'Next.js', 'Supabase', 'PostgreSQL', 'Railway', 'Netlify'],
    features: [
      'User authentication and role-ready profile system',
      'Social feed with posts, likes, comments, and notifications',
      'Friend requests, communities, messaging, and unread states',
      'Marketplace listings, collection management, and trading flow',
      'Admin dashboard foundation for moderation and platform control',
    ],
    liveUrl: '#',
    githubUrl: 'https://github.com/YuvrajCodes11/Yuvraj_Portfolio',
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
    githubUrl: 'https://github.com/YuvrajCodes11/Yuvraj_Portfolio',
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
    name: 'Future Client',
    role: 'SaaS Founder',
  },
  {
    quote: 'The delivery process is structured, transparent, and focused on outcomes instead of just shipping screens.',
    name: 'Future Client',
    role: 'Operations Lead',
  },
  {
    quote: 'A strong fit for dashboards, automation, and backend-heavy products that need clean architecture.',
    name: 'Future Client',
    role: 'Business Owner',
  },
];
