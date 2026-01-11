"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { FolderKanban, FileText, RotateCcw, Menu, X, Moon, Sun } from "lucide-react";
import { useChat } from "@/context/ChatProvider";
import { useTheme } from "@/context/ThemeProvider";
import { profile } from "@/data/profile";
import { AnimatedLogo } from "@/components/ui/AnimatedLogo";

export function TopBar() {
  const { restart } = useChat();
  const { theme, toggleTheme } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    
    // Initial check
    handleResize();
    
    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
  }, []);

  return (
    <>
      <header
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 50,
          height: "64px",
          backgroundColor: scrolled 
            ? theme === "dark" ? "rgba(5, 5, 5, 0.95)" : "rgba(255, 255, 255, 0.95)"
            : theme === "dark" ? "rgba(5, 5, 5, 0.8)" : "rgba(255, 255, 255, 0.8)",
          backdropFilter: "blur(10px)",
          borderBottom: scrolled 
            ? `1px solid ${theme === "dark" ? "#1a1a1a" : "#e5e5e5"}` 
            : "1px solid transparent",
          transition: "all 0.3s ease",
        }}
      >
        <nav
          style={{
            maxWidth: "1400px",
            margin: "0 auto",
            height: "64px",
            padding: "0 24px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          {/* Logo */}
          <AnimatedLogo name={profile.name} href="/" />

          {/* Desktop Nav */}
          {!isMobile && (
            <div 
              style={{
                display: "flex",
                alignItems: "center",
                gap: "4px",
              }}
            >
              <Link
                href="/projects"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  padding: "8px 12px",
                  fontSize: "14px",
                  color: theme === "dark" ? "#a0a0a0" : "#666666",
                  textDecoration: "none",
                  borderRadius: "8px",
                  transition: "all 0.2s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = theme === "dark" ? "#ffffff" : "#0a0a0a";
                  e.currentTarget.style.backgroundColor = theme === "dark" ? "#1a1a1a" : "#f0f0f0";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = theme === "dark" ? "#a0a0a0" : "#666666";
                  e.currentTarget.style.backgroundColor = "transparent";
                }}
              >
                <FolderKanban style={{ width: "16px", height: "16px" }} />
                Projects
              </Link>
              <Link
                href="/resume"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  padding: "8px 12px",
                  fontSize: "14px",
                  color: theme === "dark" ? "#a0a0a0" : "#666666",
                  textDecoration: "none",
                  borderRadius: "8px",
                  transition: "all 0.2s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = theme === "dark" ? "#ffffff" : "#0a0a0a";
                  e.currentTarget.style.backgroundColor = theme === "dark" ? "#1a1a1a" : "#f0f0f0";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = theme === "dark" ? "#a0a0a0" : "#666666";
                  e.currentTarget.style.backgroundColor = "transparent";
                }}
              >
                <FileText style={{ width: "16px", height: "16px" }} />
                Resume
              </Link>
              <button
                onClick={restart}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  padding: "8px 12px",
                  fontSize: "14px",
                  color: theme === "dark" ? "#a0a0a0" : "#666666",
                  backgroundColor: "transparent",
                  border: "none",
                  borderRadius: "8px",
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = theme === "dark" ? "#ffffff" : "#0a0a0a";
                  e.currentTarget.style.backgroundColor = theme === "dark" ? "#1a1a1a" : "#f0f0f0";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = theme === "dark" ? "#a0a0a0" : "#666666";
                  e.currentTarget.style.backgroundColor = "transparent";
                }}
              >
                <RotateCcw style={{ width: "16px", height: "16px" }} />
                Restart
              </button>
              <div 
                style={{
                  width: "1px",
                  height: "20px",
                  backgroundColor: theme === "dark" ? "#2a2a2a" : "#e5e5e5",
                  margin: "0 8px",
                }}
              />
              <button
                onClick={toggleTheme}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "36px",
                  height: "36px",
                  backgroundColor: theme === "dark" ? "#1a1a1a" : "#f0f0f0",
                  border: "none",
                  borderRadius: "8px",
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = theme === "dark" ? "#2a2a2a" : "#e0e0e0";
                  e.currentTarget.style.transform = "scale(1.05)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = theme === "dark" ? "#1a1a1a" : "#f0f0f0";
                  e.currentTarget.style.transform = "scale(1)";
                }}
                aria-label="Toggle theme"
              >
                {theme === "dark" ? (
                  <Sun style={{ width: "18px", height: "18px", color: "#ff4d00" }} />
                ) : (
                  <Moon style={{ width: "18px", height: "18px", color: "#ff4d00" }} />
                )}
              </button>
            </div>
          )}

          {/* Mobile menu buttons */}
          {isMobile && (
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <button
                onClick={toggleTheme}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "40px",
                  height: "40px",
                  backgroundColor: theme === "dark" ? "#1a1a1a" : "#f0f0f0",
                  border: "none",
                  borderRadius: "10px",
                  cursor: "pointer",
                }}
                aria-label="Toggle theme"
              >
                {theme === "dark" ? (
                  <Sun style={{ width: "20px", height: "20px", color: "#ff4d00" }} />
                ) : (
                  <Moon style={{ width: "20px", height: "20px", color: "#ff4d00" }} />
                )}
              </button>
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "40px",
                  height: "40px",
                  backgroundColor: theme === "dark" ? "#1a1a1a" : "#f0f0f0",
                  border: "none",
                  borderRadius: "10px",
                  cursor: "pointer",
                }}
                aria-label="Toggle menu"
              >
                {mobileOpen ? (
                  <X style={{ width: "22px", height: "22px", color: theme === "dark" ? "#ffffff" : "#0a0a0a" }} />
                ) : (
                  <Menu style={{ width: "22px", height: "22px", color: theme === "dark" ? "#ffffff" : "#0a0a0a" }} />
                )}
              </button>
            </div>
          )}
        </nav>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileOpen && isMobile && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            style={{
              position: "fixed",
              top: "64px",
              left: 0,
              right: 0,
              bottom: 0,
              zIndex: 40,
              backgroundColor: theme === "dark" ? "#050505" : "#ffffff",
              padding: "20px",
              overflowY: "auto",
            }}
          >
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              <Link
                href="/projects"
                onClick={() => setMobileOpen(false)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "14px",
                  padding: "18px 20px",
                  fontSize: "17px",
                  fontWeight: 500,
                  color: theme === "dark" ? "#ffffff" : "#0a0a0a",
                  backgroundColor: theme === "dark" ? "#0f0f0f" : "#f5f5f5",
                  borderRadius: "14px",
                  textDecoration: "none",
                  border: `1px solid ${theme === "dark" ? "#1a1a1a" : "#e5e5e5"}`,
                }}
              >
                <FolderKanban style={{ width: "22px", height: "22px", color: "#ff4d00" }} />
                Projects
              </Link>
              <Link
                href="/resume"
                onClick={() => setMobileOpen(false)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "14px",
                  padding: "18px 20px",
                  fontSize: "17px",
                  fontWeight: 500,
                  color: theme === "dark" ? "#ffffff" : "#0a0a0a",
                  backgroundColor: theme === "dark" ? "#0f0f0f" : "#f5f5f5",
                  borderRadius: "14px",
                  textDecoration: "none",
                  border: `1px solid ${theme === "dark" ? "#1a1a1a" : "#e5e5e5"}`,
                }}
              >
                <FileText style={{ width: "22px", height: "22px", color: "#ff4d00" }} />
                Resume
              </Link>
              <button
                onClick={() => {
                  restart();
                  setMobileOpen(false);
                }}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "14px",
                  padding: "18px 20px",
                  fontSize: "17px",
                  fontWeight: 500,
                  color: theme === "dark" ? "#ffffff" : "#0a0a0a",
                  backgroundColor: theme === "dark" ? "#0f0f0f" : "#f5f5f5",
                  borderRadius: "14px",
                  border: `1px solid ${theme === "dark" ? "#1a1a1a" : "#e5e5e5"}`,
                  cursor: "pointer",
                  textAlign: "left",
                  width: "100%",
                }}
              >
                <RotateCcw style={{ width: "22px", height: "22px", color: "#ff4d00" }} />
                Restart Chat
              </button>
            </div>
            
            {/* Quick contact info */}
            <div style={{ 
              marginTop: "32px", 
              padding: "20px",
              backgroundColor: theme === "dark" ? "#0a0a0a" : "#fafafa",
              borderRadius: "14px",
              border: `1px solid ${theme === "dark" ? "#1a1a1a" : "#e5e5e5"}`,
            }}>
              <p style={{ 
                fontSize: "12px", 
                textTransform: "uppercase", 
                letterSpacing: "0.05em",
                color: theme === "dark" ? "#666" : "#888",
                marginBottom: "12px",
              }}>
                Quick Contact
              </p>
              <a 
                href={`mailto:${profile.email}`}
                style={{
                  display: "block",
                  color: "#ff4d00",
                  fontSize: "15px",
                  marginBottom: "8px",
                  textDecoration: "none",
                }}
              >
                {profile.email}
              </a>
              {profile.phone && (
                <a 
                  href={`tel:${profile.phone}`}
                  style={{
                    display: "block",
                    color: theme === "dark" ? "#888" : "#666",
                    fontSize: "15px",
                    textDecoration: "none",
                  }}
                >
                  {profile.phone}
                </a>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
