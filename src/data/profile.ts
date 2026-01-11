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
  email: "jenishvaghasiya509@gmail.com",
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
    title: "Daily Todo - Stay Organized",
    description: "Built a dynamic To-Do app with folder/file/task creation, drag-and-drop, and offline support using AsyncStorage.",
    technologies: ["React Native", "NodeJS", "Redux", "API Integration"],
  },
  {
    title: "AllrangeKit",
    description: "Developed a fully functional kit purchase flow integrating Stripe and PayPal payment gateways.",
    technologies: ["React Native", "Redux", "Stripe", "PayPal"],
  },
  {
    title: "Face Recognition (R&D)",
    description: "Integrated AWS Rekognition for real-time face identification from pre-fed data.",
    technologies: ["React Native", "AWS Rekognition"],
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
