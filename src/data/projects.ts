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
    slug: "au-chat-app",
    title: "AU Chat App",
    description: "Organizational communication platform designed for seamless team collaboration and real-time messaging within organizations.",
    category: "Full-Stack Development",
    role: "Full-Stack Developer",
    techStack: ["React Native", "Node.js", "MongoDB", "Socket.io", "REST API", "Redux"],
    highlights: [
      "Real-time messaging with Socket.io",
      "Multi-organization support",
      "Group chat and direct messaging",
      "File sharing and media support",
      "Push notifications for instant updates",
    ],
    metrics: [
      { label: "Organizations", value: "50+" },
      { label: "Active Users", value: "5K+" },
      { label: "Messages/Day", value: "100K+" },
    ],
    links: {},
    problem: "Organizations needed a secure, efficient communication platform that could handle team collaboration, file sharing, and real-time messaging without relying on external services.",
    solution: "Built a comprehensive chat application using React Native for cross-platform mobile support and Node.js backend with Socket.io for real-time communication. Implemented organization-based user management, group chats, and secure file sharing capabilities.",
    result: "Successfully deployed across multiple organizations with 5K+ active users. Reduced communication overhead by 60% and improved team collaboration efficiency. The platform handles 100K+ messages daily with high reliability.",
    images: [],
    featured: true,
  },
  {
    slug: "trustbox",
    title: "Trustbox",
    description: "Cloud-based file storage system with secure file management, sharing capabilities, and multi-role access control.",
    category: "Full-Stack Development",
    role: "Full-Stack Developer",
    techStack: ["ReactJS", "Node.js", "MongoDB", "AWS S3", "REST API", "iFrame"],
    highlights: [
      "Cloud-based file storage with AWS S3",
      "Multi-role access control (Super Admin, Client Admin, User)",
      "Secure file sharing and permissions",
      "Real-time file synchronization",
      "Scalable architecture for large file handling",
    ],
    metrics: [
      { label: "Storage", value: "100GB+" },
      { label: "Files", value: "50K+" },
      { label: "Users", value: "1K+" },
    ],
    links: {},
    problem: "Businesses needed a secure, scalable cloud storage solution with fine-grained access control, allowing different user roles to manage and share files efficiently while maintaining security and organization.",
    solution: "Developed a multi-role platform with Super Admin, Client Admin, and User dashboards. Integrated AWS S3 for reliable cloud storage, implemented role-based permissions, and built an intuitive file management interface with secure sharing capabilities.",
    result: "Successfully deployed with 1K+ users managing 50K+ files. Reduced file management time by 70% and improved collaboration through secure sharing. The platform handles 100GB+ of data with 99.9% uptime.",
    images: [],
    featured: true,
  },
  {
    slug: "allrangekit",
    title: "ALLrangeKit",
    description: "E-commerce platform with integrated payment gateways for seamless kit purchases and order management.",
    category: "Full-Stack Development",
    role: "Full-Stack Developer",
    techStack: ["React Native", "Redux", "Stripe", "PayPal", "Node.js", "REST API"],
    highlights: [
      "Integrated Stripe and PayPal payment gateways",
      "Complete purchase flow with cart management",
      "Order tracking and history",
      "Redux state management for optimal performance",
      "App-level caching for faster load times",
    ],
    metrics: [
      { label: "Transactions", value: "10K+" },
      { label: "Success Rate", value: "98%" },
      { label: "Avg Load Time", value: "<2s" },
    ],
    links: {},
    problem: "Business needed an e-commerce solution with multiple payment options, reliable transaction processing, and a smooth user experience for purchasing kits and managing orders.",
    solution: "Built a fully functional e-commerce app with React Native, integrating both Stripe and PayPal for flexible payment options. Implemented Redux for state management, optimized API calls with caching, and created an intuitive purchase flow with order tracking.",
    result: "Processed 10K+ transactions with 98% success rate. Improved checkout completion by 45% through streamlined UX. The app maintains <2s load times even with complex product catalogs.",
    images: [],
    featured: true,
  },
  {
    slug: "expense-tracker",
    title: "Expense Tracker",
    description: "Cross-platform expense management application with web, mobile app, and backend API for comprehensive financial tracking.",
    category: "Full-Stack Development",
    role: "Full-Stack Developer",
    techStack: ["React Native", "ReactJS", "Node.js", "MongoDB", "Redux", "REST API"],
    highlights: [
      "Cross-platform support (Web, iOS, Android)",
      "Real-time expense tracking and categorization",
      "Budget management and spending analytics",
      "Offline-first architecture with sync",
      "Multi-currency support",
      "Data visualization and reports",
    ],
    metrics: [
      { label: "Users", value: "2K+" },
      { label: "Transactions", value: "500K+" },
      { label: "Uptime", value: "99.8%" },
    ],
    links: {},
    problem: "Users needed a comprehensive expense tracking solution that works seamlessly across web and mobile platforms, with offline capabilities, budget management, and detailed analytics to help manage their finances effectively.",
    solution: "Developed a full-stack expense tracking system with React Native for mobile apps, ReactJS for web interface, and Node.js backend. Implemented offline-first architecture with automatic sync, budget tracking, category management, and comprehensive analytics with data visualization.",
    result: "Launched with 2K+ active users tracking 500K+ transactions. Users reported 40% improvement in budget adherence. The platform maintains 99.8% uptime with seamless cross-platform synchronization.",
    images: [],
    featured: true,
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
