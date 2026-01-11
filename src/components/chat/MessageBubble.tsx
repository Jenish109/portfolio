"use client";

import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import type { Message } from "@/context/ChatProvider";

interface MessageBubbleProps {
  message: Message;
}

export function MessageBubble({ message }: MessageBubbleProps) {
  const isUser = message.role === "user";
  const isAI = message.isAI;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.4,
        ease: [0.22, 1, 0.36, 1],
      }}
      style={{
        display: "flex",
        width: "100%",
        marginBottom: "16px",
        justifyContent: isUser ? "flex-end" : "flex-start",
      }}
    >
      <div
        style={{
          maxWidth: "80%",
          padding: isUser ? "12px 18px" : "0",
          borderRadius: isUser ? "18px 18px 4px 18px" : "0",
          backgroundColor: isUser ? "var(--accent)" : "transparent",
          color: isUser ? "#ffffff" : "var(--text-secondary)",
          fontSize: "15px",
          lineHeight: "1.6",
          position: "relative",
        }}
      >
        {/* AI indicator for AI-generated messages */}
        {isAI && !isUser && (
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "4px",
              marginBottom: "6px",
              padding: "3px 8px",
              backgroundColor: "var(--accent-glow)",
              borderRadius: "10px",
              marginRight: "8px",
            }}
          >
            <Sparkles style={{ width: "10px", height: "10px", color: "var(--accent)" }} />
            <span style={{ fontSize: "9px", fontWeight: 600, color: "var(--accent)", textTransform: "uppercase", letterSpacing: "0.05em" }}>
              AI
            </span>
          </div>
        )}
        <span>{message.content}</span>
      </div>
    </motion.div>
  );
}
