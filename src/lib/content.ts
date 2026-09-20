/**
 * Single source of truth for all portfolio copy and data.
 * Merged from the original repo (src/data.ts) plus the verified WayPoint / contact details.
 * Every section reads from here: edit this file, never the components.
 */
import profilePhoto from '../assets/images/yuvraj_profile_photo.jpeg'

export interface Project {
  id: string
  index: string
  title: string
  subtitle: string
  category: string
  status?: string
  /** Optional lead paragraph shown in the case-study dialog. */
  overview?: string
  problem?: string
  solution?: string
  results?: string[]
  features?: string[]
  stack: string[]
  liveUrl?: string
  githubUrl?: string
}

export interface Service {
  title: string
  description: string
}

export interface Metric {
  label: string
  value: number
  suffix: string
  note: string
}

export interface StackGroup {
  label: string
  items: string[]
}

export interface Channel {
  label: string
  handle: string
  href: string
  /** Renders as a file download instead of an external link. */
  download?: boolean
}

export const profile = {
  name: 'Yuvraj Singh Sidhu',
  role: 'Freelance Full-Stack Product Developer',
  status: 'Available for freelance projects',
  location: 'Chandigarh, India',
  avatar: profilePhoto,
  email: 'yuvrajcodes11@gmail.com',
  github: 'https://github.com/YuvrajCodes11',
  linkedin: 'https://www.linkedin.com/in/yuvraj-singh-sidhu-86b961385',
  x: 'https://x.com/Yuvraj_S11',
  resumeUrl: '/resume.pdf',
  portfolioUrl: 'https://yuvraj-portfolio-murex.vercel.app/',
  canonicalUrl: 'https://yuvrajcodes11.vercel.app',
  pitch:
    'I help businesses replace messy manual work with reliable web products: customer portals, admin dashboards, e-commerce systems, API backends, and automation workflows built to launch fast and scale cleanly.',
  bio: 'I help founders and growing businesses turn operational problems into reliable web products: SaaS platforms, internal dashboards, CRM systems, API backends, and automation tools built for long-term use.',
  about: [
    'I focus on reliability, clear communication, clean architecture, and maintainable delivery. My goal is to understand the business process first, then build software that is easy to use, easy to extend, and stable enough to support real customers or internal teams.',
    'You get structured updates, thoughtful technical decisions, scalable foundations, and support after launch so your product can keep improving instead of becoming expensive to change.',
  ],
  proof: ['Clean architecture', 'Clear communication', 'Launch-focused delivery'],
} as const

export const rotatingWords = [
  'SaaS platforms',
  'admin dashboards',
  'CRM systems',
  'REST APIs',
  'AI integrations',
] as const

export const metrics: Metric[] = [
  { label: 'Production Projects', value: 4, suffix: '+', note: 'Client-grade platforms' },
  { label: 'Technologies', value: 12, suffix: '+', note: 'Modern full-stack tools' },
  { label: 'Client Satisfaction', value: 100, suffix: '%', note: 'Reliability-first delivery' },
  { label: 'Fast Delivery', value: 14, suffix: 'd', note: 'MVP-ready sprint cycles' },
]

export const services: Service[] = [
  {
    title: 'SaaS Development',
    description:
      'Subscription-ready platforms with secure accounts, role-based workflows, clean dashboards, and scalable backend foundations.',
  },
  {
    title: 'CRM Systems',
    description:
      'Custom lead, customer, order, and team-management systems that match how your business actually operates.',
  },
  {
    title: 'Admin Dashboards',
    description:
      'Operational dashboards that make data, approvals, inventory, users, and business activity easy to manage.',
  },
  {
    title: 'AI Integrations',
    description:
      'Practical AI features for search, content workflows, customer support, internal assistants, and productivity automation.',
  },
  {
    title: 'REST API Development',
    description:
      'Secure Spring Boot APIs with clear contracts, authentication, database integration, and production-minded error handling.',
  },
  {
    title: 'Business Automation',
    description:
      'Automated workflows that reduce manual admin work, connect tools, trigger notifications, and keep teams moving.',
  },
  {
    title: 'Performance Optimization',
    description:
      'Speed improvements across frontend, backend, database queries, assets, and deployment setup.',
  },
  {
    title: 'Custom Web Applications',
    description:
      'Purpose-built applications for marketplaces, portals, e-commerce, community products, and internal business systems.',
  },
]

export const projects: Project[] = [
  {
    id: 'pokevault',
    index: '01',
    title: 'PokeVault',
    subtitle: 'Global TCG Trading Cards & Collector Community Platform',
    category: 'Social marketplace',
    status: 'Production Ready',
    problem:
      'Trading card collectors needed a trusted, dedicated platform to showcase digital binders, connect with local/global trainers, and arrange verified face-to-face card trades without high marketplace fees or shipping scam risks.',
    solution:
      'Designed and built a complete TCG community platform with digital binder management, PSA/BGS grade filters, real-time community pull feed, trainer reputation levels, direct messaging, and structured trade proposals.',
    results: [
      'Live platform hosting 8,400+ active trainers and 3,400+ card listings',
      'Digital binder system with real card artwork, grade filters, and market value tracking',
      'In-person trade proposal engine with verified badges and rating system',
    ],
    features: [
      'Digital binder to showcase TCG collection with PSA/BGS grades and market pricing',
      'In-person safe trading engine with structured proposals and zero shipping risk',
      'Live community feed for trainers to share pack pulls, slabs, and trade updates',
      'CardVault marketplace with 3,400+ listings filtered by grade, set, and region',
      'Trainer ranking system (Rookie to Elite) with star rep ratings and verified badges',
    ],
    stack: ['React.js', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Supabase', 'Vercel'],
    liveUrl: 'https://minty-nex-frontend.vercel.app/',
    githubUrl: 'https://github.com/YuvrajCodes11',
  },
  {
    id: 'waypoint',
    index: '02',
    title: 'WayPoint',
    subtitle: 'Native iOS Mobile Application',
    category: 'iOS app',
    status: 'Shipathon 2026 Finalist',
    overview:
      'A native iOS mobile application built with Swift and SwiftUI, focused on clean UX. An offline-first, AI-powered travel co-pilot.',
    stack: ['Swift', 'SwiftUI', 'SwiftData'],
  },
  {
    id: 'ac-management',
    index: '03',
    title: 'AC Management App',
    subtitle: 'Air Conditioning Services ERP & Operations System',
    category: 'ERP & operations',
    status: 'Production Ready',
    problem:
      'Air conditioning service companies struggle to coordinate customer service requests, technician dispatching, BOQ material issues, AMC reminders, inventory, and executive business visibility across manual logs.',
    solution:
      'Engineered a full-stack service management ERP system with role-based access for CEOs, managers, and service technicians to manage bookings, inventory, material dispatches, and business reporting.',
    results: [
      'Full service operations ERP system with role-based CEO and Manager portals',
      'Automated AMC reminders, customer service dispatches, and material issue tracking',
      'Live demo environment deployed on Railway infrastructure with instant demo login',
    ],
    features: [
      'Role-based portals (CEO / Owner view, Manager view, Technician view)',
      'Customer management and service request ticket tracking',
      'Technician scheduling, AMC contract renewals, and BOQ material issue control',
      'Real-time business reports, inventory tracking, and operational analytics',
      'Live production deployment on Railway with demo account access',
    ],
    stack: ['Java', 'Spring Boot', 'React.js', 'Tailwind CSS', 'PostgreSQL', 'Railway'],
    githubUrl: 'https://github.com/YuvrajCodes11',
  },
  {
    id: 'blue',
    index: '04',
    title: 'BLUE',
    subtitle: 'Blue Economy Livelihoods Unified Ecosystem',
    category: 'Ocean intelligence',
    status: 'Production Ready',
    problem:
      'Fisheries, marine conservation groups, BMUs, donors, and ocean policy agencies lacked a unified intelligence portal to monitor coastal community livelihoods, track marine resources, and collaborate on ocean conservation.',
    solution:
      'Engineered a sleek ocean intelligence platform featuring real-time ecosystem telemetry, fishery management tools, marine conservation metrics, and multi-stakeholder dashboards.',
    results: [
      'Centralized ocean intelligence portal for fisheries, BMUs, and marine conservation',
      'Interactive data dashboard for ocean livelihood tracking and stakeholder reporting',
      'High-performance Next.js web application deployed for production use',
    ],
    features: [
      'Ocean telemetry and marine livelihood analytics dashboard',
      'Multi-stakeholder access for BMUs, NGOs, conservationists, and public agencies',
      'Fishery management and marine resource tracking workflows',
      'Responsive, high-contrast dark theme optimized for ocean intelligence data',
      'Fast client-side navigation and production-grade deployment on Vercel',
    ],
    stack: ['Next.js', 'TypeScript', 'Tailwind CSS', 'React.js', 'Vercel'],
    liveUrl: 'https://blue-black-gamma.vercel.app/',
    githubUrl: 'https://github.com/YuvrajCodes11',
  },
  {
    id: 'king-queen',
    index: '05',
    title: 'A King & A Queen',
    subtitle: 'Premium Fashion E-Commerce Platform',
    category: 'E-commerce',
    status: 'Production Ready',
    problem:
      'The business needed a polished online shopping experience that could handle products, checkout, orders, payments, and admin control without feeling like a template.',
    solution:
      'Built a responsive e-commerce platform with secure authentication, dynamic product browsing, cart and checkout flows, order management, payment integration, and an admin dashboard for day-to-day retail operations.',
    results: [
      'Complete end-to-end shopping workflow delivered',
      'Admin tools included for inventory and order management',
      'Responsive storefront prepared for real customer traffic',
    ],
    features: [
      'Secure authentication and session-based account flow',
      'Product catalog with categories, search, sorting, and product details',
      'Shopping cart, checkout, order history, and payment-ready endpoints',
      'Admin dashboard for inventory, orders, and business visibility',
      'Mobile-first responsive interface for retail customers',
    ],
    stack: ['React.js', 'JavaScript', 'CSS3', 'Java', 'Spring Boot', 'MySQL', 'Supabase'],
    liveUrl: 'https://e-commerce-iota-smoky.vercel.app/',
    githubUrl: 'https://github.com/YuvrajCodes11',
  },
  {
    id: 'bloom-n-blossom',
    index: '06',
    title: 'Bloom n Blossom Kasauli',
    subtitle: 'Luxury Mountain Homestay Website',
    category: 'Hospitality website',
    overview:
      'A single-page marketing site for a mountain homestay in Kasauli, built to showcase the property with video and send guests straight through to its Airbnb listing.',
    features: [
      'Full-screen hero video with a mobile-specific video source and a tap-to-play fallback',
      'Hover-to-play video tours of the living room, balcony and bedroom',
      'Amenities grid that expands and collapses, plus a swipeable guest-review carousel',
      'Booking card with date and guest selection, live price calculation and a deep link into the Airbnb listing',
      'Fully responsive layout with scroll-triggered section reveals',
    ],
    stack: ['Next.js', 'React', 'TypeScript', 'CSS'],
    githubUrl: 'https://github.com/YuvrajCodes11/AirBNB',
  },
  {
    id: 'cab-tours',
    index: '07',
    title: 'North India Cab & Tours',
    subtitle: 'Premium Booking Website Concept for a Cab Operator',
    category: 'Booking website',
    status: 'Frontend demo',
    overview:
      'A frontend-only demo built to show a cab owner how a premium booking website could look. Enquiry forms open a pre-filled WhatsApp message instead of submitting to a server.',
    features: [
      'Multi-page App Router site: home, destinations, services, fleet, gallery, about and contact',
      'Quick-enquiry form that opens a pre-filled WhatsApp message',
      'Sticky mobile call and WhatsApp bar, FAQ accordion and review cards',
      'Single config file for business details, so real content drops in without touching components',
      'Sitemap and robots generated for search engines',
    ],
    stack: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion'],
    githubUrl: 'https://github.com/YuvrajCodes11/CAB_WEBAPP',
  },
]

export const processSteps: Array<{ title: string; description: string }> = [
  { title: 'Discovery', description: 'Clarify the business goal, audience, workflows, constraints, and success metrics.' },
  { title: 'Planning', description: 'Map the product scope, architecture, milestones, screens, data models, and delivery priorities.' },
  { title: 'Development', description: 'Build clean frontend and backend modules with regular progress updates and review points.' },
  { title: 'Testing', description: 'Test responsiveness, core flows, edge cases, API behavior, performance, and accessibility.' },
  { title: 'Deployment', description: 'Ship to Vercel, Netlify, Railway, Supabase, or your preferred stack with production checks.' },
  { title: 'Support', description: 'Provide fixes, improvements, handoff notes, and long-term maintainability support.' },
]

export const stackGroups: StackGroup[] = [
  { label: 'Frontend', items: ['React', 'Next.js', 'TypeScript', 'JavaScript', 'Tailwind CSS'] },
  { label: 'Backend', items: ['Node.js', 'Java', 'Spring Boot', 'REST APIs'] },
  { label: 'Data', items: ['PostgreSQL', 'MySQL', 'Supabase'] },
  { label: 'Mobile', items: ['Swift', 'SwiftUI', 'SwiftData'] },
  { label: 'Deploy', items: ['Vercel', 'Railway', 'Netlify'] },
]

/** Flat list used by the hero ticker and the JSON-LD `knowsAbout` field. */
export const techStack: string[] = stackGroups.flatMap((g) => g.items)

/** Contact channels. Order = display order. Email is the primary CTA. */
export const channels: Channel[] = [
  { label: 'Email', handle: profile.email, href: `mailto:${profile.email}?subject=Let's build my next product` },
  { label: 'LinkedIn', handle: 'yuvraj-singh-sidhu', href: profile.linkedin },
  { label: 'GitHub', handle: 'YuvrajCodes11', href: profile.github },
  { label: 'X', handle: '@Yuvraj_S11', href: profile.x },
  { label: 'Resume', handle: 'Download PDF', href: profile.resumeUrl, download: true },
]

export const navLinks = [
  { label: 'Services', href: '#services' },
  { label: 'Work', href: '#work' },
  { label: 'About', href: '#about' },
  { label: 'Process', href: '#process' },
  { label: 'Contact', href: '#contact' },
] as const
