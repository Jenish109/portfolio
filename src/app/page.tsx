"use client";

import { TopBar } from "@/components/layout/TopBar";
import { ChatContainer } from "@/components/chat/ChatContainer";
import { ContextPanel } from "@/components/layout/ContextPanel";

export default function ChatPage() {
  return (
    <div 
      className="min-h-screen flex flex-col transition-colors duration-300"
      style={{ backgroundColor: "var(--bg-primary)" }}
    >
      <TopBar />
      
      {/* Main content with proper spacing below fixed header */}
      <main 
        className="flex flex-1" 
        style={{ 
          marginTop: "64px",
          height: "calc(100vh - 64px)",
          overflow: "hidden",
        }}
      >
        {/* Chat area */}
        <div className="flex-1" style={{ height: "100%", overflow: "hidden" }}>
          <ChatContainer />
        </div>

        {/* Context panel - desktop only */}
        <div className="relative hidden lg:block" style={{ height: "100%", overflow: "hidden" }}>
          <ContextPanel />
        </div>
      </main>
    </div>
  );
}
