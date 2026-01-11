/**
 * Chat Flow Configuration
 * Defines the conversation nodes for the portfolio chat experience
 */

import { profile } from "./profile";

// Section types for the chat journey
export type SectionName = "Hook" | "Problem" | "Journey" | "Proof" | "Future";

// Action types for suggested replies
export type ReplyAction = "navigate" | "downloadResume" | "openLink";

// Suggested reply structure
export interface SuggestedReply {
  text: string;
  nextNodeId: string;
  action?: ReplyAction;
  actionPayload?: string;
}

// Chat node structure
export interface ChatNode {
  id: string;
  section: SectionName;
  messages: string[];
  suggestedReplies?: SuggestedReply[];
  showSkills?: boolean;
  showProjects?: boolean;
  showContact?: boolean;
  // Keywords for free text matching
  keywords?: string[];
}

// Skills data for the skills card
export const skills = {
  frontend: ["React Native", "ReactJS", "TypeScript", "JavaScript", "Redux", "Tailwind CSS", "HTML/CSS"],
  backend: ["Node.js", "REST APIs", "MongoDB", "MySQL", "AWS Services"],
  tools: ["Git", "VS Code", "MS Office", "React Navigation", "AsyncStorage", "OneSignal"],
  soft: ["Problem Solving", "Communication", "Team Collaboration", "Debugging"],
};

// Chat flow nodes
export const chatFlow: Record<string, ChatNode> = {
  // ==================== HOOK ====================
  hook: {
    id: "hook",
    section: "Hook",
    messages: [
      `Hey there! I'm ${profile.name}. 👋`,
      "I build experiences, not just websites.",
      "I believe great software should feel magical — intuitive, fast, and delightful to use.",
      "What brings you here today?",
    ],
    suggestedReplies: [
      { text: "Show me your work", nextNodeId: "proof" },
      { text: "Tell me your story", nextNodeId: "problem" },
      { text: "What can you do?", nextNodeId: "journey" },
      { text: "Let's talk", nextNodeId: "future" },
    ],
    keywords: ["hello", "hi", "hey", "start"],
  },

  // ==================== PROBLEM ====================
  problem: {
    id: "problem",
    section: "Problem",
    messages: [
      "Every great journey starts with a problem to solve. 🎯",
      "I started coding because I was frustrated with clunky software that wasted people's time.",
      "I wanted to build things that actually work — fast, intuitive, and beautiful.",
      "What kind of problem are you trying to solve?",
    ],
    suggestedReplies: [
      { text: "Better UI/UX", nextNodeId: "problem-ux" },
      { text: "Faster websites", nextNodeId: "problem-performance" },
      { text: "More conversions", nextNodeId: "problem-conversions" },
      { text: "Just exploring", nextNodeId: "journey" },
    ],
    keywords: ["story", "background", "about", "who"],
  },

  "problem-ux": {
    id: "problem-ux",
    section: "Problem",
    messages: [
      "UI/UX is where magic happens! ✨",
      "I obsess over the little details — micro-interactions, loading states, and that 'just right' feeling.",
      "Good design isn't just about looking pretty. It's about making complex things feel simple.",
      "Want to see how I approach design challenges?",
    ],
    suggestedReplies: [
      { text: "Show me examples", nextNodeId: "proof" },
      { text: "Tell me your approach", nextNodeId: "journey" },
      { text: "What's your stack?", nextNodeId: "journey-skills" },
    ],
  },

  "problem-performance": {
    id: "problem-performance",
    section: "Problem",
    messages: [
      "Speed is a feature! 🚀",
      "Every 100ms of latency costs conversion. I take performance seriously.",
      "From code splitting to edge caching, I know how to make things fly.",
      "Want to see some performance wins?",
    ],
    suggestedReplies: [
      { text: "Show me the metrics", nextNodeId: "proof" },
      { text: "How do you optimize?", nextNodeId: "journey-skills" },
      { text: "Let's work together", nextNodeId: "future" },
    ],
  },

  "problem-conversions": {
    id: "problem-conversions",
    section: "Problem",
    messages: [
      "Conversions are the ultimate metric! 📈",
      "Pretty websites don't matter if they don't drive results.",
      "I build with the user journey in mind — every click should move them closer to the goal.",
      "Want to see real results?",
    ],
    suggestedReplies: [
      { text: "Show me case studies", nextNodeId: "proof" },
      { text: "What's your process?", nextNodeId: "journey" },
      { text: "Let's talk numbers", nextNodeId: "future" },
    ],
  },

  // ==================== JOURNEY ====================
  journey: {
    id: "journey",
    section: "Journey",
    messages: [
      "The journey so far... 🛤️",
      "I've been building for the web for years, starting with curiosity and evolving through real-world challenges.",
      "I've worked with startups moving fast, enterprises needing scale, and everything in between.",
      "What I've learned: the best code is code that solves real problems for real people.",
    ],
    suggestedReplies: [
      { text: "What's your tech stack?", nextNodeId: "journey-skills" },
      { text: "Show me your work", nextNodeId: "proof" },
      { text: "What do you enjoy building?", nextNodeId: "journey-passion" },
    ],
    keywords: ["journey", "experience", "background", "history"],
  },

  "journey-skills": {
    id: "journey-skills",
    section: "Journey",
    messages: [
      "Here's my toolkit: 🛠️",
      "I specialize in modern web technologies that ship fast and scale well.",
      "But tools are just tools — what matters is solving problems elegantly.",
    ],
    showSkills: true,
    suggestedReplies: [
      { text: "See it in action", nextNodeId: "proof" },
      { text: "What's your favorite?", nextNodeId: "journey-passion" },
      { text: "Let's build something", nextNodeId: "future" },
    ],
    keywords: ["skills", "tech", "stack", "technologies", "tools"],
  },

  "journey-passion": {
    id: "journey-passion",
    section: "Journey",
    messages: [
      "What gets me excited? 🔥",
      "I love building products that people actually enjoy using.",
      "There's something special about that moment when complexity disappears and everything just... works.",
      "The intersection of design and engineering is where I thrive.",
    ],
    suggestedReplies: [
      { text: "Show me examples", nextNodeId: "proof" },
      { text: "Let's collaborate", nextNodeId: "future" },
      { text: "View resume", nextNodeId: "resume", action: "navigate", actionPayload: "/resume" },
    ],
    keywords: ["passion", "enjoy", "love", "favorite"],
  },

  // ==================== PROOF ====================
  proof: {
    id: "proof",
    section: "Proof",
    messages: [
      "Let the work speak for itself. 🎨",
      "Here are some projects I'm proud of — each one taught me something new.",
      "Click on any to dive into the full case study.",
    ],
    showProjects: true,
    suggestedReplies: [
      { text: "View all projects", nextNodeId: "proof-all", action: "navigate", actionPayload: "/projects" },
      { text: "Tell me your process", nextNodeId: "proof-process" },
      { text: "Let's work together", nextNodeId: "future" },
    ],
    keywords: ["work", "projects", "portfolio", "examples", "show"],
  },

  "proof-all": {
    id: "proof-all",
    section: "Proof",
    messages: [
      "Taking you to the full portfolio... 🚀",
    ],
    suggestedReplies: [],
  },

  "proof-process": {
    id: "proof-process",
    section: "Proof",
    messages: [
      "My process? It's all about understanding first. 🔍",
      "I start with the 'why' — what problem are we solving? For whom? What does success look like?",
      "Then I move fast: prototype, test, iterate. Ship early, learn often.",
      "The best solutions come from tight feedback loops.",
    ],
    suggestedReplies: [
      { text: "See it in action", nextNodeId: "proof" },
      { text: "Let's start a project", nextNodeId: "future" },
      { text: "View resume", nextNodeId: "resume", action: "navigate", actionPayload: "/resume" },
    ],
    keywords: ["process", "methodology", "approach", "how"],
  },

  // ==================== FUTURE ====================
  future: {
    id: "future",
    section: "Future",
    messages: [
      "What should we build together? 🚀",
      "Whether you have a concrete project or just an idea — I'd love to hear about it.",
      "Drop me a message below, and let's make something great.",
    ],
    showContact: true,
    suggestedReplies: [
      { text: "Download resume", nextNodeId: "future", action: "downloadResume" },
      { text: "View projects", nextNodeId: "proof", action: "navigate", actionPayload: "/projects" },
      { text: "Start over", nextNodeId: "hook" },
    ],
    keywords: ["contact", "hire", "work", "collaborate", "freelance", "project"],
  },

  "contact-success": {
    id: "contact-success",
    section: "Future",
    messages: [
      "Awesome! I got your message. 🎉",
      "I'll get back to you as soon as I can — usually within 24 hours.",
      "In the meantime, feel free to explore more of my work!",
    ],
    suggestedReplies: [
      { text: "View projects", nextNodeId: "proof", action: "navigate", actionPayload: "/projects" },
      { text: "Download resume", nextNodeId: "future", action: "downloadResume" },
      { text: "Start over", nextNodeId: "hook" },
    ],
  },

  // ==================== FALLBACK ====================
  fallback: {
    id: "fallback",
    section: "Hook",
    messages: [
      "Hmm, I'm not sure I understood that. 🤔",
      "Try one of the options below, or ask me about my work, skills, or how to get in touch!",
    ],
    suggestedReplies: [
      { text: "Show me your work", nextNodeId: "proof" },
      { text: "Tell me your story", nextNodeId: "problem" },
      { text: "Let's talk", nextNodeId: "future" },
    ],
  },

  // ==================== RESUME DOWNLOAD ====================
  resume: {
    id: "resume",
    section: "Journey",
    messages: [
      "Taking you to my resume... 📄",
    ],
    suggestedReplies: [],
  },
};

// Get initial node
export function getInitialNode(): ChatNode {
  return chatFlow.hook;
}

// Get node by ID
export function getNodeById(nodeId: string): ChatNode | undefined {
  return chatFlow[nodeId];
}

// Simple keyword matching for free text
export function matchKeywords(text: string): string | null {
  const lowerText = text.toLowerCase();
  
  for (const [nodeId, node] of Object.entries(chatFlow)) {
    if (node.keywords) {
      for (const keyword of node.keywords) {
        if (lowerText.includes(keyword)) {
          return nodeId;
        }
      }
    }
  }
  
  return null;
}
