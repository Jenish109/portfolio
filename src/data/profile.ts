/**
 * Profile Data - Jenish Vaghasiya
 */

export const profile = {
  // Basic info
  name: "Jenish Vaghasiya",
  role: "Full Stack Developer",
  tagline: "I build experiences, not just websites.",
  bio: "A passionate developer specializing in React Native, ReactJS, and Node.js. I love creating intuitive, performant, and beautiful digital products that solve real problems.",
  location: "Gujarat, India",
  phone: "+91 97249 92568",
  
  // Contact & Social
  email: "jenisvaghasiya09@gmail.com",
  github: "https://github.com/Jenish109",
  linkedin: "https://www.linkedin.com/in/jenish-vaghasiya09",
  twitter: "",
  
  // Resume - Updated to new filename
  resumeUrl: "/Jenish Vaghasiya Resume.pdf",
  
  // Availability
  availableForWork: true,
  availableForFreelance: true,
  
  // Stats
  stats: [
    { value: "2+", label: "Years Experience" },
    { value: "10+", label: "Projects Completed" },
    { value: "5+", label: "Happy Clients" },
    { value: "15+", label: "Technologies" },
  ],
} as const;

export type Profile = typeof profile;

// Experience data
export const experience = [
  {
    title: "Freelancer",
    company: "Trustbox Cloud",
    period: "Feb 2025 - Current",
    description: "Developed a scalable multi-role platform with Super Admin, Client Admin, and User dashboards for managing branded video campaigns.",
    technologies: ["ReactJS", "NodeJS", "MongoDB", "REST API", "AWS", "iFrame"],
  },
  {
    title: "Web Developer",
    company: "Digitattva Technolabs",
    period: "Jan 2024 – Feb 2025",
    description: "Worked across multiple projects including Jain Panchang, Society Management, and Certified Backflow Jobs, focusing on bug fixing, debugging, and scalable feature development.",
    technologies: ["React Native", "TypeScript", "Redux", "OneSignal", "Tailwind CSS"],
  },
  {
    title: "ReactJS Developer",
    company: "Softnoesis",
    period: "Jul 2023 – Aug 2023",
    description: "Collaborated with the development team to design and build a fully responsive Real Estate website using ReactJS.",
    technologies: ["ReactJS", "JavaScript", "CSS", "Responsive Design"],
  },
];

// Projects for resume
export const resumeProjects = [
  {
    title: "AU Chat App",
    description: "Organizational communication platform with real-time messaging, file sharing, and multi-organization support.",
    technologies: ["React Native", "Node.js", "MongoDB", "Socket.io", "Redux"],
  },
  {
    title: "Trustbox",
    description: "Cloud-based file storage system with multi-role access control, secure file sharing, and AWS S3 integration.",
    technologies: ["ReactJS", "Node.js", "MongoDB", "AWS S3", "REST API"],
  },
  {
    title: "ALLrangeKit",
    description: "E-commerce platform with integrated Stripe and PayPal payment gateways for seamless kit purchases.",
    technologies: ["React Native", "Redux", "Stripe", "PayPal", "Node.js"],
  },
  {
    title: "Expense Tracker",
    description: "Cross-platform expense management application with web, mobile app, and backend API for financial tracking.",
    technologies: ["React Native", "ReactJS", "Node.js", "MongoDB", "Redux"],
  },
];

// Education
export const education = [
  {
    degree: "Bachelor of Computer Engineering",
    institution: "Sarvajanik College of Engineering",
    location: "Surat, Gujarat, India",
    period: "Aug 2020 – Jul 2024",
  },
  {
    degree: "Higher Secondary School",
    institution: "P.P. Savani Vidhyabhavan",
    location: "Surat, Gujarat, India",
    period: "Aug 2018 – Jul 2020",
  },
];

// Certifications
export const certifications = [
  "Complete Full Stack Web Development Course - Udemy",
  "Google Cloud Engineering and Machine Learning Track Program",
];
