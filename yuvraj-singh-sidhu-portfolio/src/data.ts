import { Project, SkillNode, ServiceItem } from './types';

export const PERSONAL_INFO = {
  name: 'Yuvraj Singh Sidhu',
  title: 'System Architect // Java Developer',
  status: 'Online',
  version: 'V4.0.2',
  avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80', // Beautiful cyber avatar placeholder
  github: 'https://github.com',
  linkedin: 'https://linkedin.com',
  email: 'contact@yuvrajsidhu.dev',
  location: 'LAT_43.6532° N // LONG_79.3832° W', // Toronto coords
  bio: 'A futuristic systems architect of full-scale applications, constructing bulletproof backends in Java and Spring Boot, wired into microservice mesh networks. I craft reactive, fluid client interfaces in modular React and Tailwind CSS, designing zero-latency digital systems with robust cryptography and architectural integrity.',
};

export const SKILL_NODES: SkillNode[] = [
  { id: 'java', name: 'Java ERP', category: 'core', level: 98, angle: 0, radius: 100, speed: 0.015, iconName: 'Cpu' },
  { id: 'spring', name: 'Spring Boot', category: 'backend', level: 96, angle: 90, radius: 130, speed: -0.01, iconName: 'Layers' },
  { id: 'react', name: 'React SPA', category: 'frontend', level: 94, angle: 180, radius: 160, speed: 0.008, iconName: 'Code' },
  { id: 'mysql', name: 'MySQL Node', category: 'database', level: 92, angle: 270, radius: 190, speed: -0.006, iconName: 'Database' },
  { id: 'docker', name: 'Mesh Docker', category: 'core', level: 90, angle: 45, radius: 145, speed: 0.012, iconName: 'ShieldAlert' },
  { id: 'aws', name: 'Cloud AWS', category: 'backend', level: 88, angle: 225, radius: 175, speed: -0.007, iconName: 'Cloud' },
];

export const TECHNICAL_GRID = {
  computing: {
    score: '98%',
    label: 'High-Concurrency Processing',
    details: 'Multi-threaded queue architectures, memory leak optimization, complex algorithmic structures.',
  },
  design: {
    score: '92%',
    label: 'Fluid UI Engine (UX/DX)',
    details: 'Motion orchestration, design tokens, accessible components, ergonomic command interfaces.',
  }
};

export const PROJECTS: Project[] = [
  {
    id: 'mintynex',
    title: 'MintyNex',
    subtitle: 'High-Throughput Social Core Node',
    description: 'An advanced, decentralized social mesh network node featuring peer-to-peer relaying and end-to-peer payload encryption. Optimized for zero-loss message transfers over unstable WebSocket channels.',
    metaText: 'SYSTEM_LINK: MESH_RELAY_v2.0',
    tags: ['Auth_Gateway', 'Mesh_Network', 'Reactive_Socket'],
    techStack: ['Java 21', 'Spring Boot 3', 'WebSockets', 'React', 'Tailwind', 'Redis Cluster'],
    imageUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80', // Cyber abstract digital network
    liveUrl: '#',
    githubUrl: '#',
    features: [
      'Self-healing peer connections using lightweight heartbeat packets',
      'Dynamic security-level handshake with automatic AES key rotation',
      'Encrypted client-side sandbox allowing secure local message caching',
      'Interactive visual dashboard showing server nodes topology and throughput'
    ],
    stats: [
      { label: 'Latency', value: '4.8ms', color: 'cyan' },
      { label: 'Throughput', value: '24K req/s', color: 'green' },
      { label: 'Uptime', value: '99.99%', color: 'amber' }
    ]
  },
  {
    id: 'king-queen',
    title: 'A King & A Queen',
    subtitle: 'Cryptographic Luxury Retail Pipeline',
    description: 'A premium luxury fashion e-commerce architecture pairing high-art visuals with a high-integrity order pipeline. Outfitted with dynamic canvas animations, 3D assets rendering, and real-time currency conversion trackers.',
    metaText: 'SYSTEM_LINK: SECURE_COMMERCE_v1.4',
    tags: ['Metallic_Rendering', 'Live_Conversion', 'Encrypted_Checkout'],
    techStack: ['React', 'Motion', 'Tailwind', 'Node.js', 'MySQL', 'Stripe Secure Core'],
    imageUrl: 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=1200&q=80', // Luxury aesthetic
    liveUrl: '#',
    githubUrl: '#',
    features: [
      'Interactive 3D-like metallic jewelry ring visualizer utilizing HTML Canvas',
      'Zero-delay international exchange rate fetcher with currency fallback nodes',
      'PCI-compliant RSA-4096 checkout payload signatures preventing MITM tampering',
      'Ultra-dense administrative catalog bento with intuitive hover micro-animations'
    ],
    stats: [
      { label: 'Live Traffic', value: '1,420 Active', color: 'cyan' },
      { label: 'Conversion', value: '+4.2%', color: 'green' },
      { label: 'Checkout Time', value: '1.2s', color: 'amber' }
    ]
  }
];

export const SERVICES: ServiceItem[] = [
  {
    id: 'fullstack',
    code: 'Bento Node_01',
    title: 'Full-Stack Integration Architecture',
    description: 'Building end-to-end applications from the ground up. High-performance single page frontends connected via secure JSON Web Token bridges to reactive Spring-backed REST services.',
    techStack: ['React', 'Spring Boot', 'TypeScript', 'Tailwind CSS'],
    features: ['Modular state engines', 'Lazy asset pipelines', 'Interactive bento panels'],
    loadIndex: 12
  },
  {
    id: 'apis',
    code: 'Bento Node_02',
    title: 'Distributed API Core Services',
    description: 'Crafting robust microservice architectures. Developing secure REST, GraphQL, and RPC endpoints, standardizing protocols, rate-limiting layers, and encryption tunnels.',
    techStack: ['Java 21', 'Spring Cloud', 'gRPC', 'OAuth 2.0'],
    features: ['High-throughput validation', 'Circuit breaker resilience', 'Inter-service telemetry'],
    loadIndex: 25
  },
  {
    id: 'databases',
    code: 'Bento Node_03',
    title: 'Database Design & Clustering',
    description: 'Relational schema designs and indexing strategies for sub-millisecond execution. Designing distributed clusters with read replicas, high-availability setups, and data sanitization.',
    techStack: ['MySQL', 'PostgreSQL', 'Redis Cascade', 'Hibernate ORM'],
    features: ['ACID transaction guarantee', 'Latency-optimized queries', 'Automated backup handshakes'],
    loadIndex: 18
  },
  {
    id: 'machinement',
    code: 'Bento Node_04',
    title: 'Machine Intelligent Pipelines',
    description: 'Integrating client-side and server-side machine intelligence models to create adaptive user interfaces, smart text search clusters, and analytical pipelines.',
    techStack: ['Gemini Core API', 'TensorFlow.js', 'Vector DB Embeddings'],
    features: ['Live intent classifications', 'Smart natural search', 'Reactive prompt matrices'],
    loadIndex: 40
  }
];

export const INITIAL_LOGS_DATA = [
  { timestamp: '14:24:02', type: 'system', message: 'CORE CLIENT BOOTING: Port 3000 mapped successfully.' },
  { timestamp: '14:24:03', type: 'info', message: 'INTEGRITY TEST: Binary hash verification passed [RSA_4096_MD5].' },
  { timestamp: '14:24:03', type: 'success', message: 'SYSTEM ONLINE: Ready to compile cybernetic interface components.' },
];
