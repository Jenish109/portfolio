"use client";

import { useRef, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import { MessageBubble } from "./MessageBubble";
import { TypingIndicator } from "./TypingIndicator";
import { SuggestedReplies } from "./SuggestedReplies";
import { ProjectCards } from "./ProjectCards";
import { ContactCard } from "./ContactCard";
import { SkillsCard } from "./SkillsCard";
import { ChatInput } from "./ChatInput";
import { useChat } from "@/context/ChatProvider";

export function ChatContainer() {
  const {
    messages,
    isTyping,
    suggestedReplies,
    showSkills,
    showProjects,
    showContact,
  } = useChat();

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping, showSkills, showProjects, showContact]);

  return (
    <div className="flex flex-col h-full">
      {/* Messages area */}
      <div className="flex-1 overflow-y-auto">
        <div 
          style={{
            maxWidth: "800px",
            margin: "0 auto",
            padding: "48px 24px 32px 24px",
          }}
        >
          {/* Messages */}
          <AnimatePresence initial={false}>
            {messages.map((message) => (
              <MessageBubble key={message.id} message={message} />
            ))}
          </AnimatePresence>

          {/* Typing indicator */}
          <AnimatePresence>
            {isTyping && <TypingIndicator />}
          </AnimatePresence>

          {/* Skills Card */}
          {showSkills && !isTyping && <SkillsCard />}

          {/* Project Cards */}
          {showProjects && !isTyping && <ProjectCards />}

          {/* Contact Card */}
          {showContact && !isTyping && <ContactCard />}

          {/* Suggested Replies */}
          {suggestedReplies && suggestedReplies.length > 0 && !isTyping && (
            <SuggestedReplies replies={suggestedReplies} />
          )}

          <div ref={messagesEndRef} style={{ height: "20px" }} />
        </div>
      </div>

      {/* Input */}
      <ChatInput />
    </div>
  );
}
