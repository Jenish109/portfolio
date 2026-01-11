"use client";

import {
  createContext,
  useContext,
  useCallback,
  useEffect,
  useReducer,
  useRef,
  type ReactNode,
} from "react";
import {
  chatFlow,
  getInitialNode,
  getNodeById,
  matchKeywords,
  type ChatNode,
  type SuggestedReply,
  type SectionName,
} from "@/data/chatFlow";
import { profile } from "@/data/profile";
import { getStorageItem, setStorageItem, removeStorageItem, STORAGE_KEYS } from "@/lib/storage";

// Message structure
export interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  isAI?: boolean; // Flag for AI-generated messages
}

// Chat state
interface ChatState {
  messages: Message[];
  currentNodeId: string;
  sectionName: SectionName;
  isTyping: boolean;
  suggestedReplies: SuggestedReply[] | undefined;
  showSkills: boolean;
  showProjects: boolean;
  showContact: boolean;
  isAIMode: boolean; // Flag to indicate if we're in AI conversation mode
}

// Initial state
const getInitialState = (): ChatState => ({
  messages: [],
  currentNodeId: "hook",
  sectionName: "Hook",
  isTyping: false,
  suggestedReplies: undefined,
  showSkills: false,
  showProjects: false,
  showContact: false,
  isAIMode: false,
});

// Action types
type ChatAction =
  | { type: "ADD_MESSAGE"; message: Message }
  | { type: "SET_TYPING"; isTyping: boolean }
  | { type: "SET_NODE"; node: ChatNode }
  | { type: "SET_SUGGESTED_REPLIES"; replies: SuggestedReply[] | undefined }
  | { type: "SET_SHOW_SKILLS"; show: boolean }
  | { type: "SET_SHOW_PROJECTS"; show: boolean }
  | { type: "SET_SHOW_CONTACT"; show: boolean }
  | { type: "SET_AI_MODE"; isAIMode: boolean }
  | { type: "RESET" }
  | { type: "LOAD_STATE"; state: Partial<ChatState> };

// Reducer
function chatReducer(state: ChatState, action: ChatAction): ChatState {
  switch (action.type) {
    case "ADD_MESSAGE":
      return {
        ...state,
        messages: [...state.messages, action.message],
      };
    case "SET_TYPING":
      return {
        ...state,
        isTyping: action.isTyping,
      };
    case "SET_NODE":
      return {
        ...state,
        currentNodeId: action.node.id,
        sectionName: action.node.section,
        suggestedReplies: action.node.suggestedReplies,
        showSkills: action.node.showSkills || false,
        showProjects: action.node.showProjects || false,
        showContact: action.node.showContact || false,
      };
    case "SET_SUGGESTED_REPLIES":
      return {
        ...state,
        suggestedReplies: action.replies,
      };
    case "SET_SHOW_SKILLS":
      return { ...state, showSkills: action.show };
    case "SET_SHOW_PROJECTS":
      return { ...state, showProjects: action.show };
    case "SET_SHOW_CONTACT":
      return { ...state, showContact: action.show };
    case "SET_AI_MODE":
      return { ...state, isAIMode: action.isAIMode };
    case "RESET":
      return getInitialState();
    case "LOAD_STATE":
      return { ...state, ...action.state };
    default:
      return state;
  }
}

// Context value type
interface ChatContextValue {
  messages: Message[];
  isTyping: boolean;
  sectionName: SectionName;
  suggestedReplies: SuggestedReply[] | undefined;
  showSkills: boolean;
  showProjects: boolean;
  showContact: boolean;
  isAIMode: boolean;
  sendReply: (text: string, nextNodeId: string) => void;
  sendFreeText: (text: string) => void;
  goToNode: (nodeId: string) => void;
  restart: () => void;
}

const ChatContext = createContext<ChatContextValue | undefined>(undefined);

// Generate unique message ID
let messageIdCounter = 0;
const generateMessageId = () => `msg-${Date.now()}-${messageIdCounter++}`;

interface ChatProviderProps {
  children: ReactNode;
}

export function ChatProvider({ children }: ChatProviderProps) {
  const [state, dispatch] = useReducer(chatReducer, getInitialState());
  const messagesRef = useRef<Message[]>([]);

  // Keep ref in sync
  useEffect(() => {
    messagesRef.current = state.messages;
  }, [state.messages]);

  // Add assistant messages with typing effect
  const addAssistantMessages = useCallback(
    async (node: ChatNode) => {
      // Clear previous special states
      dispatch({ type: "SET_SHOW_SKILLS", show: false });
      dispatch({ type: "SET_SHOW_PROJECTS", show: false });
      dispatch({ type: "SET_SHOW_CONTACT", show: false });
      dispatch({ type: "SET_SUGGESTED_REPLIES", replies: undefined });
      dispatch({ type: "SET_TYPING", isTyping: true });
      dispatch({ type: "SET_AI_MODE", isAIMode: false });

      // Add each message with a delay
      for (let i = 0; i < node.messages.length; i++) {
        const messageContent = node.messages[i];
        
        // Random delay for natural feel (400-900ms)
        const delay = Math.random() * 500 + 400;
        await new Promise((resolve) => setTimeout(resolve, delay));

        dispatch({
          type: "ADD_MESSAGE",
          message: {
            id: generateMessageId(),
            role: "assistant",
            content: messageContent,
          },
        });
      }

      // Small delay before showing UI elements
      await new Promise((resolve) => setTimeout(resolve, 200));

      dispatch({ type: "SET_TYPING", isTyping: false });
      dispatch({ type: "SET_NODE", node });
    },
    []
  );

  // Send message to AI API
  const sendToAI = useCallback(
    async (userMessage: string) => {
      dispatch({ type: "SET_TYPING", isTyping: true });
      dispatch({ type: "SET_AI_MODE", isAIMode: true });
      dispatch({ type: "SET_SUGGESTED_REPLIES", replies: undefined });
      dispatch({ type: "SET_SHOW_SKILLS", show: false });
      dispatch({ type: "SET_SHOW_PROJECTS", show: false });
      dispatch({ type: "SET_SHOW_CONTACT", show: false });

      try {
        const response = await fetch("/api/chat", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            message: userMessage,
            conversationHistory: messagesRef.current.slice(-10),
          }),
        });

        const data = await response.json();
        
        // Small delay to feel natural
        await new Promise((resolve) => setTimeout(resolve, 500));

        dispatch({
          type: "ADD_MESSAGE",
          message: {
            id: generateMessageId(),
            role: "assistant",
            content: data.response || "I'm having trouble responding right now. Please try again!",
            isAI: true,
          },
        });

        // Show some suggested actions after AI response
        dispatch({
          type: "SET_SUGGESTED_REPLIES",
          replies: [
            { text: "Show me your work", nextNodeId: "proof" },
            { text: "What's your tech stack?", nextNodeId: "journey-skills" },
            { text: "Let's talk", nextNodeId: "future" },
          ],
        });

      } catch (error) {
        console.error("AI Chat Error:", error);
        dispatch({
          type: "ADD_MESSAGE",
          message: {
            id: generateMessageId(),
            role: "assistant",
            content: "I'm having connection issues right now. Feel free to reach out directly at jenisvaghasiya09@gmail.com! 📧",
            isAI: true,
          },
        });
      } finally {
        dispatch({ type: "SET_TYPING", isTyping: false });
      }
    },
    []
  );

  // Initialize chat on mount
  useEffect(() => {
    const savedState = getStorageItem<Partial<ChatState> | null>(
      STORAGE_KEYS.CHAT_STATE,
      null
    );

    if (savedState && savedState.messages && savedState.messages.length > 0) {
      // Restore saved state
      dispatch({ type: "LOAD_STATE", state: savedState });
      
      // Restore current node's UI elements
      const node = getNodeById(savedState.currentNodeId || "hook");
      if (node) {
        dispatch({ type: "SET_NODE", node });
      }
    } else {
      // Start fresh
      const initialNode = getInitialNode();
      addAssistantMessages(initialNode);
    }
  }, [addAssistantMessages]);

  // Save state to localStorage when it changes
  useEffect(() => {
    if (state.messages.length > 0) {
      setStorageItem(STORAGE_KEYS.CHAT_STATE, {
        messages: state.messages,
        currentNodeId: state.currentNodeId,
        sectionName: state.sectionName,
      });
    }
  }, [state.messages, state.currentNodeId, state.sectionName]);

  // Send a suggested reply
  const sendReply = useCallback(
    (text: string, nextNodeId: string) => {
      if (state.isTyping) return;

      // Handle special actions
      const node = getNodeById(state.currentNodeId);
      const reply = node?.suggestedReplies?.find(
        (r) => r.text === text && r.nextNodeId === nextNodeId
      );

      // Handle download resume action
      if (reply?.action === "downloadResume") {
        window.open(profile.resumeUrl, "_blank");
        return;
      }

      // Add user message
      dispatch({
        type: "ADD_MESSAGE",
        message: {
          id: generateMessageId(),
          role: "user",
          content: text,
        },
      });

      // Navigate to next node
      const nextNode = getNodeById(nextNodeId);
      if (nextNode) {
        addAssistantMessages(nextNode);
      }
    },
    [state.isTyping, state.currentNodeId, addAssistantMessages]
  );

  // Send free text - now uses AI!
  const sendFreeText = useCallback(
    (text: string) => {
      if (state.isTyping || !text.trim()) return;

      // Add user message
      dispatch({
        type: "ADD_MESSAGE",
        message: {
          id: generateMessageId(),
          role: "user",
          content: text,
        },
      });

      // First, try to match keywords for common navigational queries
      const lowerText = text.toLowerCase();
      
      // Check for specific navigation keywords
      if (lowerText.includes("project") || lowerText.includes("work") || lowerText.includes("portfolio")) {
        const node = getNodeById("proof");
        if (node) {
          addAssistantMessages(node);
          return;
        }
      }
      
      if (lowerText.includes("skill") || lowerText.includes("tech") || lowerText.includes("stack")) {
        const node = getNodeById("journey-skills");
        if (node) {
          addAssistantMessages(node);
          return;
        }
      }
      
      if (lowerText.includes("contact") || lowerText.includes("hire") || lowerText.includes("reach")) {
        const node = getNodeById("future");
        if (node) {
          addAssistantMessages(node);
          return;
        }
      }
      
      if (lowerText.includes("resume") || lowerText.includes("cv")) {
        window.open(profile.resumeUrl, "_blank");
        dispatch({
          type: "ADD_MESSAGE",
          message: {
            id: generateMessageId(),
            role: "assistant",
            content: "I've opened my resume for you! 📄 Is there anything specific you'd like to know about my experience?",
          },
        });
        dispatch({
          type: "SET_SUGGESTED_REPLIES",
          replies: [
            { text: "Show me your work", nextNodeId: "proof" },
            { text: "What's your experience?", nextNodeId: "journey" },
            { text: "Let's talk", nextNodeId: "future" },
          ],
        });
        return;
      }

      // For other queries, use AI
      sendToAI(text);
    },
    [state.isTyping, addAssistantMessages, sendToAI]
  );

  // Go to a specific node
  const goToNode = useCallback(
    (nodeId: string) => {
      const node = getNodeById(nodeId);
      if (node) {
        addAssistantMessages(node);
      }
    },
    [addAssistantMessages]
  );

  // Restart chat
  const restart = useCallback(() => {
    removeStorageItem(STORAGE_KEYS.CHAT_STATE);
    dispatch({ type: "RESET" });
    const initialNode = getInitialNode();
    addAssistantMessages(initialNode);
  }, [addAssistantMessages]);

  const value: ChatContextValue = {
    messages: state.messages,
    isTyping: state.isTyping,
    sectionName: state.sectionName,
    suggestedReplies: state.suggestedReplies,
    showSkills: state.showSkills,
    showProjects: state.showProjects,
    showContact: state.showContact,
    isAIMode: state.isAIMode,
    sendReply,
    sendFreeText,
    goToNode,
    restart,
  };

  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
}

export function useChat() {
  const context = useContext(ChatContext);
  if (context === undefined) {
    throw new Error("useChat must be used within a ChatProvider");
  }
  return context;
}
