"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, ChevronLeft, Github, Linkedin, Mail, FolderKanban } from "lucide-react";
import { useChat } from "@/context/ChatProvider";
import { profile } from "@/data/profile";

const sections = ["Hook", "Problem", "Journey", "Proof", "Future"];
const sectionColors: Record<string, string> = {
  Hook: "#3b82f6",
  Problem: "#f59e0b",
  Journey: "#8b5cf6",
  Proof: "#10b981",
  Future: "#ff4d00",
};

export function ContextPanel() {
  const [collapsed, setCollapsed] = useState(false);
  const { sectionName } = useChat();

  return (
    <aside
      style={{
        display: "flex",
        flexDirection: "column",
        borderLeft: "1px solid var(--border-primary)",
        backgroundColor: "var(--bg-secondary)",
        transition: "width 0.3s ease, background-color 0.3s ease",
        width: collapsed ? "56px" : "280px",
        height: "calc(100vh - 64px)",
        position: "sticky",
        top: "64px",
      }}
    >
      {/* Toggle button */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        style={{
          position: "absolute",
          left: "-12px",
          top: "50%",
          transform: "translateY(-50%)",
          zIndex: 10,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "24px",
          height: "24px",
          backgroundColor: "var(--bg-input)",
          border: "1px solid var(--border-secondary)",
          borderRadius: "50%",
          cursor: "pointer",
          transition: "border-color 0.2s ease",
        }}
        aria-label={collapsed ? "Expand panel" : "Collapse panel"}
      >
        {collapsed ? (
          <ChevronLeft style={{ width: "12px", height: "12px", color: "var(--text-muted)" }} />
        ) : (
          <ChevronRight style={{ width: "12px", height: "12px", color: "var(--text-muted)" }} />
        )}
      </button>

      <AnimatePresence>
        {!collapsed && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              display: "flex",
              flexDirection: "column",
              height: "100%",
              padding: "20px",
              overflow: "hidden",
            }}
          >
            {/* Current Section */}
            <div style={{ marginBottom: "24px" }}>
              <p
                style={{
                  fontSize: "10px",
                  fontWeight: 700,
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                  color: "var(--text-dim)",
                  marginBottom: "8px",
                }}
              >
                Current Section
              </p>
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <span
                  style={{
                    width: "10px",
                    height: "10px",
                    borderRadius: "50%",
                    backgroundColor: sectionColors[sectionName] || "var(--text-dim)",
                  }}
                />
                <span style={{ fontWeight: 700, color: "var(--text-primary)" }}>{sectionName}</span>
              </div>
            </div>

            {/* Journey Progress */}
            <div style={{ marginBottom: "24px" }}>
              <p
                style={{
                  fontSize: "10px",
                  fontWeight: 700,
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                  color: "var(--text-dim)",
                  marginBottom: "8px",
                }}
              >
                Journey
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                {sections.map((section) => {
                  const isActive = section === sectionName;
                  const isPast = sections.indexOf(sectionName) > sections.indexOf(section);
                  return (
                    <div
                      key={section}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                        padding: "8px 12px",
                        borderRadius: "8px",
                        fontSize: "14px",
                        backgroundColor: isActive ? "var(--bg-input)" : "transparent",
                        color: isActive ? "var(--text-primary)" : "var(--text-dim)",
                      }}
                    >
                      <span
                        style={{
                          width: "8px",
                          height: "8px",
                          borderRadius: "50%",
                          backgroundColor:
                            isActive || isPast
                              ? sectionColors[section]
                              : "var(--border-secondary)",
                          opacity: isPast && !isActive ? 0.5 : 1,
                        }}
                      />
                      <span>{section}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Quick Links */}
            <div style={{ marginBottom: "24px" }}>
              <p
                style={{
                  fontSize: "10px",
                  fontWeight: 700,
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                  color: "var(--text-dim)",
                  marginBottom: "8px",
                }}
              >
                Quick Links
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                {profile.github && (
                  <a
                    href={profile.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                      padding: "8px 12px",
                      fontSize: "14px",
                      color: "var(--text-muted)",
                      textDecoration: "none",
                      borderRadius: "8px",
                      transition: "all 0.2s ease",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = "var(--text-primary)";
                      e.currentTarget.style.backgroundColor = "var(--bg-input)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = "var(--text-muted)";
                      e.currentTarget.style.backgroundColor = "transparent";
                    }}
                  >
                    <Github style={{ width: "16px", height: "16px" }} />
                    GitHub
                  </a>
                )}
                {profile.linkedin && (
                  <a
                    href={profile.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                      padding: "8px 12px",
                      fontSize: "14px",
                      color: "var(--text-muted)",
                      textDecoration: "none",
                      borderRadius: "8px",
                      transition: "all 0.2s ease",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = "var(--text-primary)";
                      e.currentTarget.style.backgroundColor = "var(--bg-input)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = "var(--text-muted)";
                      e.currentTarget.style.backgroundColor = "transparent";
                    }}
                  >
                    <Linkedin style={{ width: "16px", height: "16px" }} />
                    LinkedIn
                  </a>
                )}
                {profile.email && (
                  <a
                    href={`mailto:${profile.email}`}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                      padding: "8px 12px",
                      fontSize: "14px",
                      color: "var(--text-muted)",
                      textDecoration: "none",
                      borderRadius: "8px",
                      transition: "all 0.2s ease",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = "var(--text-primary)";
                      e.currentTarget.style.backgroundColor = "var(--bg-input)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = "var(--text-muted)";
                      e.currentTarget.style.backgroundColor = "transparent";
                    }}
                  >
                    <Mail style={{ width: "16px", height: "16px" }} />
                    Email
                  </a>
                )}
              </div>
            </div>

            {/* View Projects Button */}
            <div style={{ marginTop: "auto" }}>
              <Link
                href="/projects"
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "8px",
                  width: "100%",
                  padding: "10px 16px",
                  fontSize: "14px",
                  fontWeight: 500,
                  color: "var(--text-muted)",
                  backgroundColor: "transparent",
                  border: "1px solid var(--border-secondary)",
                  borderRadius: "8px",
                  textDecoration: "none",
                  transition: "all 0.2s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "var(--accent)";
                  e.currentTarget.style.color = "var(--accent)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "var(--border-secondary)";
                  e.currentTarget.style.color = "var(--text-muted)";
                }}
              >
                <FolderKanban style={{ width: "16px", height: "16px" }} />
                View All Projects
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </aside>
  );
}
