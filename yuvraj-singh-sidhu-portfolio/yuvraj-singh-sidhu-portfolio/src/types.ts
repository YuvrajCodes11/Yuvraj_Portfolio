export interface Project {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  metaText: string;
  tags: string[];
  techStack: string[];
  imageUrl: string;
  liveUrl?: string;
  githubUrl?: string;
  stats: { label: string; value: string; color?: string }[];
  features: string[];
}

export interface SkillNode {
  id: string;
  name: string;
  category: 'core' | 'frontend' | 'backend' | 'database';
  level: number; // percentage
  angle: number; // initial angle in orbit
  radius: number; // orbit distance
  speed: number; // orbital rotation speed
  iconName: string;
}

export interface ServiceItem {
  id: string;
  code: string;
  title: string;
  description: string;
  techStack: string[];
  features: string[];
  loadIndex: number;
}

export interface TerminalLog {
  timestamp: string;
  type: 'system' | 'success' | 'warning' | 'info';
  message: string;
}
