"use client";

import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { useChat } from "@/context/ChatProvider";

export function TypingIndicator() {
  const { isAIMode } = useChat();

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.2 }}
      style={{
        display: "flex",
        justifyContent: "flex-start",
        marginBottom: "16px",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "10px",
          backgroundColor: "var(--bg-tertiary)",
          border: "1px solid var(--border-primary)",
          padding: "12px 18px",
          borderRadius: "16px",
          borderBottomLeftRadius: "4px",
        }}
      >
        {isAIMode && (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "6px",
              marginRight: "4px",
            }}
          >
            <Sparkles style={{ width: "12px", height: "12px", color: "var(--accent)" }} />
            <span style={{ fontSize: "11px", fontWeight: 600, color: "var(--accent)" }}>
              AI thinking...
            </span>
          </div>
        )}
        {!isAIMode && (
          <div style={{ display: "flex", gap: "4px" }}>
            {[0, 1, 2].map((i) => (
              <motion.span
                key={i}
                animate={{
                  opacity: [0.3, 1, 0.3],
                  scale: [0.85, 1, 0.85],
                }}
                transition={{
                  duration: 1.2,
                  repeat: Infinity,
                  delay: i * 0.15,
                  ease: "easeInOut",
                }}
                style={{
                  width: "8px",
                  height: "8px",
                  borderRadius: "50%",
                  backgroundColor: "var(--accent)",
                }}
              />
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
}
