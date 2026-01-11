"use client";

import { motion } from "framer-motion";
import { useChat } from "@/context/ChatProvider";
import type { SuggestedReply } from "@/data/chatFlow";

interface SuggestedRepliesProps {
  replies: SuggestedReply[];
}

export function SuggestedReplies({ replies }: SuggestedRepliesProps) {
  const { sendReply } = useChat();

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.1 }}
      className="flex flex-wrap gap-3 mt-6 mb-4"
    >
      {replies.map((reply, index) => (
        <motion.button
          key={`${reply.text}-${index}`}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ 
            delay: index * 0.05 + 0.15,
            duration: 0.3,
          }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => sendReply(reply.text, reply.nextNodeId)}
          style={{
            padding: "12px 20px",
            fontSize: "14px",
            fontWeight: 500,
            color: "var(--text-primary)",
            backgroundColor: "var(--bg-input)",
            border: "1px solid var(--border-secondary)",
            borderRadius: "12px",
            cursor: "pointer",
            transition: "all 0.2s ease",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = "var(--bg-hover)";
            e.currentTarget.style.borderColor = "var(--accent)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = "var(--bg-input)";
            e.currentTarget.style.borderColor = "var(--border-secondary)";
          }}
        >
          {reply.text}
        </motion.button>
      ))}
    </motion.div>
  );
}
