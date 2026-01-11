"use client";

import { useState, FormEvent, KeyboardEvent } from "react";
import { Send } from "lucide-react";
import { useChat } from "@/context/ChatProvider";

export function ChatInput() {
  const [input, setInput] = useState("");
  const { sendFreeText, isTyping } = useChat();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (input.trim() && !isTyping) {
      sendFreeText(input.trim());
      setInput("");
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e as unknown as FormEvent);
    }
  };

  return (
    <div
      style={{
        position: "sticky",
        bottom: 0,
        background: "linear-gradient(to top, var(--bg-primary) 80%, transparent)",
        paddingTop: "24px",
        paddingBottom: "16px",
        paddingLeft: "24px",
        paddingRight: "24px",
      }}
    >
      <form
        onSubmit={handleSubmit}
        style={{
          maxWidth: "800px",
          margin: "0 auto",
          display: "flex",
          alignItems: "center",
          gap: "12px",
        }}
      >
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type your message..."
          disabled={isTyping}
          style={{
            flex: 1,
            padding: "14px 20px",
            fontSize: "14px",
            backgroundColor: "var(--bg-tertiary)",
            color: "var(--text-primary)",
            border: "1px solid var(--border-secondary)",
            borderRadius: "12px",
            outline: "none",
            transition: "border-color 0.2s ease, background-color 0.2s ease",
          }}
          onFocus={(e) => {
            e.currentTarget.style.borderColor = "var(--accent)";
          }}
          onBlur={(e) => {
            e.currentTarget.style.borderColor = "var(--border-secondary)";
          }}
          aria-label="Type your message"
        />
        <button
          type="submit"
          disabled={!input.trim() || isTyping}
          style={{
            padding: "14px",
            backgroundColor: input.trim() && !isTyping ? "var(--accent)" : "var(--bg-hover)",
            color: "#ffffff",
            border: "none",
            borderRadius: "12px",
            cursor: input.trim() && !isTyping ? "pointer" : "not-allowed",
            opacity: input.trim() && !isTyping ? 1 : 0.5,
            transition: "all 0.2s ease",
          }}
          aria-label="Send message"
        >
          <Send style={{ width: "20px", height: "20px" }} />
        </button>
      </form>
    </div>
  );
}
