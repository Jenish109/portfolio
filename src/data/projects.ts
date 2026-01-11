/**
 * Projects Data
 * Define your portfolio projects here
 */

export interface ProjectMetric {
  label: string;
  value: string;
}

export interface Project {
  slug: string;
  title: string;
  description: string;
  category: string;
  role: string;
  techStack: string[];
  highlights: string[];
  metrics: ProjectMetric[];
  links: {
    demo?: string;
    github?: string;
  };
  problem: string;
  solution: string;
  result: string;
  images: string[];
  featured: boolean;
}

export const projects: Project[] = [
  {
    slug: "ecommerce-platform",
    title: "E-Commerce Platform",
    description: "Modern e-commerce solution with real-time inventory management and seamless checkout experience.",
    category: "Full-Stack Development",
    role: "Full-Stack Developer",
    techStack: ["Next.js", "TypeScript", "PostgreSQL", "Stripe", "Tailwind CSS"],
    highlights: [
      "Built from scratch with focus on performance",
      "Implemented real-time inventory tracking",
      "Integrated Stripe for seamless payments",
      "Achieved 95+ Lighthouse score",
    ],
    metrics: [
      { label: "Load Time", value: "<1s" },
      { label: "Conversion", value: "+34%" },
      { label: "Users", value: "10K+" },
    ],
    links: {
      demo: "https://example.com",
      github: "https://github.com/example/ecommerce",
    },
    problem: "The client had an outdated e-commerce site with slow load times, poor mobile experience, and a complicated checkout process causing cart abandonment.",
    solution: "Rebuilt the platform using Next.js for server-side rendering. Implemented a streamlined 3-step checkout, real-time inventory updates, and fully responsive design.",
    result: "34% increase in conversions, 70% reduction in page load times, and significantly improved customer satisfaction. ROI achieved within the first month.",
    images: ["/projects/ecommerce-1.jpg", "/projects/ecommerce-2.jpg"],
    featured: true,
  },
  {
    slug: "ai-dashboard",
    title: "AI Analytics Dashboard",
    description: "Analytics dashboard with AI-powered insights and predictive analytics for business intelligence.",
    category: "Web Application",
    role: "Frontend Lead",
    techStack: ["React", "Python", "TensorFlow", "AWS", "D3.js"],
    highlights: [
      "Real-time data visualization",
      "AI-powered trend predictions",
      "Custom charting library",
      "Role-based access control",
    ],
    metrics: [
      { label: "Accuracy", value: "94%" },
      { label: "Time Saved", value: "15h/wk" },
      { label: "Clients", value: "50+" },
    ],
    links: {
      demo: "https://example.com",
    },
    problem: "Manual data analysis was consuming 20+ hours per week. Stakeholders needed faster access to insights for decision-making.",
    solution: "Built a real-time dashboard with ML models for trend prediction. Implemented interactive visualizations that made complex data accessible.",
    result: "Reduced analysis time by 75%. Predictions helped increase revenue by identifying opportunities 2 weeks earlier on average.",
    images: ["/projects/dashboard-1.jpg"],
    featured: true,
  },
  {
    slug: "mobile-banking",
    title: "Mobile Banking App",
    description: "Secure and intuitive mobile banking experience with biometric authentication and instant transfers.",
    category: "Mobile Development",
    role: "React Native Developer",
    techStack: ["React Native", "Node.js", "MongoDB", "AWS", "Plaid"],
    highlights: [
      "Biometric authentication",
      "Real-time transaction updates",
      "Instant peer-to-peer transfers",
      "Offline mode support",
    ],
    metrics: [
      { label: "Rating", value: "4.8★" },
      { label: "Downloads", value: "100K+" },
      { label: "DAU", value: "25K" },
    ],
    links: {
      demo: "https://example.com",
    },
    problem: "Existing banking app had poor UX, slow performance, and lacked modern features customers expected.",
    solution: "Complete redesign with focus on speed and simplicity. Implemented biometric login, instant transfers, and smart notifications.",
    result: "App store rating increased from 2.8 to 4.8 stars. Daily active users grew by 300% in 6 months.",
    images: ["/projects/banking-1.jpg"],
    featured: true,
  },
  {
    slug: "saas-platform",
    title: "SaaS Platform",
    description: "Scalable multi-tenant SaaS application for project management and team collaboration.",
    category: "Full-Stack Development",
    role: "Tech Lead",
    techStack: ["Next.js", "Prisma", "Redis", "Docker", "Kubernetes"],
    highlights: [
      "Multi-tenant architecture",
      "Real-time collaboration",
      "Custom workflow builder",
      "99.9% uptime SLA",
    ],
    metrics: [
      { label: "Tenants", value: "200+" },
      { label: "Uptime", value: "99.9%" },
      { label: "API Calls", value: "1M/day" },
    ],
    links: {
      github: "https://github.com/example/saas",
    },
    problem: "Client needed a platform that could scale to thousands of tenants while maintaining isolation and performance.",
    solution: "Designed a multi-tenant architecture with tenant isolation at the database level. Implemented auto-scaling and comprehensive monitoring.",
    result: "Successfully scaled to 200+ tenants with zero downtime. Platform now handles 1M+ API calls daily.",
    images: ["/projects/saas-1.jpg"],
    featured: false,
  },
  {
    slug: "real-time-collab",
    title: "Real-time Collaboration Tool",
    description: "Real-time document collaboration with WebSocket-based synchronization and conflict resolution.",
    category: "Web Application",
    role: "Backend Engineer",
    techStack: ["Next.js", "Socket.io", "Redis", "Y.js", "PostgreSQL"],
    highlights: [
      "Real-time cursors and presence",
      "Conflict-free replicated data types",
      "Version history and rollback",
      "End-to-end encryption",
    ],
    metrics: [
      { label: "Latency", value: "<50ms" },
      { label: "Concurrent", value: "1000+" },
      { label: "Uptime", value: "99.95%" },
    ],
    links: {
      demo: "https://example.com",
      github: "https://github.com/example/collab",
    },
    problem: "Team needed a document collaboration tool that could handle hundreds of concurrent editors without conflicts.",
    solution: "Implemented CRDTs for conflict-free editing. Built a custom WebSocket infrastructure for low-latency updates.",
    result: "Successfully supports 1000+ concurrent editors with sub-50ms latency. Zero data loss incidents.",
    images: ["/projects/collab-1.jpg"],
    featured: false,
  },
];

// Get featured projects
export function getFeaturedProjects(): Project[] {
  return projects.filter((p) => p.featured);
}

// Get project by slug
export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

// Get all project slugs (for static generation)
export function getAllProjectSlugs(): string[] {
  return projects.map((p) => p.slug);
}

// Get all unique categories
export function getAllCategories(): string[] {
  const categories = new Set(projects.map((p) => p.category));
  return Array.from(categories);
}

// Get all unique tech
export function getAllTech(): string[] {
  const tech = new Set(projects.flatMap((p) => p.techStack));
  return Array.from(tech).sort();
}
