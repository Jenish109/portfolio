/**
 * Simple keyword-based router for free-text chat input
 * Maps user input to appropriate chat node IDs
 */

type KeywordMap = {
  keywords: string[];
  nodeId: string;
};

const keywordMappings: KeywordMap[] = [
  {
    keywords: ["work", "project", "portfolio", "show", "see", "demo", "example"],
    nodeId: "proof",
  },
  {
    keywords: ["story", "about", "who", "background", "journey", "experience"],
    nodeId: "journey",
  },
  {
    keywords: ["skill", "can", "do", "offer", "service", "help", "capable"],
    nodeId: "skills",
  },
  {
    keywords: ["contact", "hire", "email", "reach", "talk", "chat", "message"],
    nodeId: "future",
  },
  {
    keywords: ["ui", "ux", "design", "interface", "user"],
    nodeId: "problem-ui",
  },
  {
    keywords: ["fast", "speed", "performance", "slow", "optimize"],
    nodeId: "problem-speed",
  },
  {
    keywords: ["convert", "conversion", "sales", "growth", "revenue"],
    nodeId: "problem-conversion",
  },
  {
    keywords: ["start", "restart", "begin", "reset", "hello", "hi", "hey"],
    nodeId: "hook",
  },
];

/**
 * Routes free-text input to a chat node based on keyword matching
 * @param input - User's free-text input
 * @returns The node ID to navigate to, or null if no match
 */
export function routeByKeywords(input: string): string | null {
  const normalizedInput = input.toLowerCase().trim();
  
  if (!normalizedInput) {
    return null;
  }

  for (const mapping of keywordMappings) {
    for (const keyword of mapping.keywords) {
      if (normalizedInput.includes(keyword)) {
        return mapping.nodeId;
      }
    }
  }

  return null;
}

/**
 * Get a fallback response when no keywords match
 */
export function getFallbackResponse(): string {
  const responses = [
    "I'm not sure I understood that. Try clicking one of the suggested options!",
    "Hmm, could you try one of the buttons below?",
    "Let me help you navigate — pick an option below!",
  ];
  return responses[Math.floor(Math.random() * responses.length)];
}

