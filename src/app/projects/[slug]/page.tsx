"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { notFound, useParams } from "next/navigation";
import { motion } from "framer-motion";
import { 
  ArrowLeft, 
  ExternalLink, 
  Github, 
  MessageCircle, 
  CheckCircle, 
  Sparkles,
  TrendingUp,
  Layers,
  Target,
  Zap,
  Award
} from "lucide-react";
import { getProjectBySlug } from "@/data/projects";
import { TopBar } from "@/components/layout/TopBar";

export default function ProjectPage() {
  const params = useParams();
  const slug = params.slug as string;
  const [project, setProject] = useState<ReturnType<typeof getProjectBySlug>>(null);

  useEffect(() => {
    const p = getProjectBySlug(slug);
    if (!p) {
      notFound();
    }
    setProject(p);
  }, [slug]);

  if (!project) {
    return (
      <div style={{ minHeight: "100vh", backgroundColor: "var(--bg-primary)", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ width: "40px", height: "40px", border: `3px solid var(--border-primary)`, borderTopColor: "var(--accent)", borderRadius: "50%", animation: "spin 1s linear infinite" }} />
      </div>
    );
  }

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "var(--bg-primary)" }}>
      <TopBar />
      
      <main style={{ paddingTop: "80px", paddingBottom: "60px" }}>
        <div style={{ maxWidth: "900px", margin: "0 auto", padding: "0 20px" }}>
          {/* Navigation */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: "32px",
            }}
          >
            <Link
              href="/projects"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                fontSize: "14px",
                color: "var(--text-muted)",
                textDecoration: "none",
                padding: "8px 12px",
                borderRadius: "8px",
                transition: "all 0.2s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = "var(--accent)";
                e.currentTarget.style.backgroundColor = "var(--accent-glow)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = "var(--text-muted)";
                e.currentTarget.style.backgroundColor = "transparent";
              }}
            >
              <ArrowLeft style={{ width: "16px", height: "16px" }} />
              All Projects
            </Link>
            <Link
              href="/"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                fontSize: "14px",
                color: "var(--text-muted)",
                textDecoration: "none",
                padding: "8px 12px",
                borderRadius: "8px",
                transition: "all 0.2s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = "var(--accent)";
                e.currentTarget.style.backgroundColor = "var(--accent-glow)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = "var(--text-muted)";
                e.currentTarget.style.backgroundColor = "transparent";
              }}
            >
              <MessageCircle style={{ width: "16px", height: "16px" }} />
              Back to Chat
            </Link>
          </motion.div>

          {/* Hero Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            style={{
              background: "linear-gradient(135deg, var(--bg-secondary) 0%, var(--bg-primary) 100%)",
              border: "1px solid var(--border-primary)",
              borderRadius: "24px",
              padding: "40px",
              marginBottom: "24px",
              position: "relative",
              overflow: "hidden",
            }}
          >
            {/* Gradient accent */}
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                height: "4px",
                background: "linear-gradient(90deg, #ff4d00, #ff6b2e, #ff4d00)",
              }}
            />

            {project.featured && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "6px",
                  padding: "6px 12px",
                  backgroundColor: "rgba(255, 77, 0, 0.15)",
                  borderRadius: "20px",
                  marginBottom: "20px",
                }}
              >
                <Sparkles style={{ width: "14px", height: "14px", color: "#ff4d00" }} />
                <span style={{ fontSize: "12px", fontWeight: 600, color: "#ff4d00", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                  Featured Project
                </span>
              </motion.div>
            )}

            <h1 style={{ 
              fontSize: "clamp(28px, 5vw, 42px)", 
              fontWeight: 800, 
              color: "var(--text-primary)", 
              marginBottom: "16px",
              lineHeight: 1.2,
            }}>
              {project.title}
            </h1>
            
            <p style={{ 
              fontSize: "17px", 
              color: "var(--text-muted)", 
              lineHeight: 1.6, 
              marginBottom: "28px",
              maxWidth: "600px",
            }}>
              {project.description}
            </p>

            {/* Meta info */}
            <div style={{ 
              display: "grid", 
              gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))", 
              gap: "20px", 
              marginBottom: "28px",
              paddingBottom: "28px",
              borderBottom: "1px solid var(--border-primary)",
            }}>
              <div>
                <p style={{ fontSize: "11px", textTransform: "uppercase", color: "var(--text-dim)", marginBottom: "6px", letterSpacing: "0.05em" }}>
                  Role
                </p>
                <p style={{ fontSize: "15px", color: "var(--text-primary)", fontWeight: 500 }}>{project.role}</p>
              </div>
              <div>
                <p style={{ fontSize: "11px", textTransform: "uppercase", color: "var(--text-dim)", marginBottom: "6px", letterSpacing: "0.05em" }}>
                  Category
                </p>
                <p style={{ fontSize: "15px", color: "var(--text-primary)", fontWeight: 500 }}>{project.category}</p>
              </div>
            </div>

            {/* Tech Stack */}
            <div style={{ marginBottom: "28px" }}>
              <p style={{ fontSize: "11px", textTransform: "uppercase", color: "var(--text-dim)", marginBottom: "12px", letterSpacing: "0.05em" }}>
                Tech Stack
              </p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                {project.techStack.map((tech, index) => (
                  <motion.span
                    key={tech}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.05 }}
                    style={{
                      padding: "8px 14px",
                      fontSize: "13px",
                      fontWeight: 500,
                      backgroundColor: "var(--bg-input)",
                      border: "1px solid var(--border-secondary)",
                      borderRadius: "8px",
                      color: "var(--text-secondary)",
                    }}
                  >
                    {tech}
                  </motion.span>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div style={{ display: "flex", flexWrap: "wrap", gap: "12px" }}>
              {project.links.demo && (
                <motion.a
                  href={project.links.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "8px",
                    padding: "12px 20px",
                    fontSize: "14px",
                    fontWeight: 600,
                    backgroundColor: "#ff4d00",
                    color: "var(--text-primary)",
                    borderRadius: "10px",
                    textDecoration: "none",
                    transition: "all 0.2s ease",
                  }}
                >
                  <ExternalLink style={{ width: "16px", height: "16px" }} />
                  Live Demo
                </motion.a>
              )}
              {project.links.github && (
                <motion.a
                  href={project.links.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "8px",
                    padding: "12px 20px",
                    fontSize: "14px",
                    fontWeight: 600,
                    backgroundColor: "transparent",
                    border: "1px solid var(--border-secondary)",
                    color: "var(--text-muted)",
                    borderRadius: "10px",
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
                  <Github style={{ width: "16px", height: "16px" }} />
                  View Code
                </motion.a>
              )}
            </div>
          </motion.div>

          {/* Metrics */}
          {project.metrics.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.5 }}
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
                gap: "16px",
                marginBottom: "24px",
              }}
            >
              {project.metrics.map((m, index) => (
                <motion.div
                  key={m.label}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + index * 0.1 }}
                  style={{
                    textAlign: "center",
                    padding: "24px 20px",
                    backgroundColor: "var(--bg-secondary)",
                    border: "1px solid var(--border-primary)",
                    borderRadius: "16px",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", marginBottom: "8px" }}>
                    <TrendingUp style={{ width: "18px", height: "18px", color: "#ff4d00" }} />
                    <p style={{ fontSize: "28px", fontWeight: 800, color: "#ff4d00" }}>{m.value}</p>
                  </div>
                  <p style={{ fontSize: "12px", textTransform: "uppercase", color: "var(--text-dim)", letterSpacing: "0.05em" }}>{m.label}</p>
                </motion.div>
              ))}
            </motion.div>
          )}

          {/* Main Content Sections */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            style={{
              backgroundColor: "var(--bg-secondary)",
              border: "1px solid var(--border-primary)",
              borderRadius: "24px",
              padding: "40px",
              marginBottom: "24px",
            }}
          >
            {/* Problem */}
            <section style={{ marginBottom: "40px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "14px", marginBottom: "16px" }}>
                <div
                  style={{
                    width: "40px",
                    height: "40px",
                    backgroundColor: "rgba(255, 77, 0, 0.15)",
                    borderRadius: "12px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Target style={{ width: "20px", height: "20px", color: "#ff4d00" }} />
                </div>
                <h2 style={{ fontSize: "22px", fontWeight: 700, color: "var(--text-primary)" }}>The Problem</h2>
              </div>
              <p style={{ fontSize: "16px", color: "var(--text-muted)", lineHeight: 1.7, paddingLeft: "54px" }}>
                {project.problem}
              </p>
            </section>

            {/* Solution */}
            <section style={{ marginBottom: "40px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "14px", marginBottom: "16px" }}>
                <div
                  style={{
                    width: "40px",
                    height: "40px",
                    backgroundColor: "rgba(99, 102, 241, 0.15)",
                    borderRadius: "12px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Layers style={{ width: "20px", height: "20px", color: "#6366f1" }} />
                </div>
                <h2 style={{ fontSize: "22px", fontWeight: 700, color: "var(--text-primary)" }}>The Solution</h2>
              </div>
              <p style={{ fontSize: "16px", color: "var(--text-muted)", lineHeight: 1.7, paddingLeft: "54px" }}>
                {project.solution}
              </p>
            </section>

            {/* Result */}
            <section style={{ marginBottom: project.highlights.length > 0 ? "40px" : "0" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "14px", marginBottom: "16px" }}>
                <div
                  style={{
                    width: "40px",
                    height: "40px",
                    backgroundColor: "rgba(16, 185, 129, 0.15)",
                    borderRadius: "12px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Zap style={{ width: "20px", height: "20px", color: "#10b981" }} />
                </div>
                <h2 style={{ fontSize: "22px", fontWeight: 700, color: "var(--text-primary)" }}>The Result</h2>
              </div>
              <p style={{ fontSize: "16px", color: "var(--text-muted)", lineHeight: 1.7, paddingLeft: "54px" }}>
                {project.result}
              </p>
            </section>

            {/* Highlights */}
            {project.highlights.length > 0 && (
              <section>
                <div style={{ display: "flex", alignItems: "center", gap: "14px", marginBottom: "20px" }}>
                  <div
                    style={{
                      width: "40px",
                      height: "40px",
                      backgroundColor: "rgba(245, 158, 11, 0.15)",
                      borderRadius: "12px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Award style={{ width: "20px", height: "20px", color: "#f59e0b" }} />
                  </div>
                  <h2 style={{ fontSize: "22px", fontWeight: 700, color: "var(--text-primary)" }}>Key Highlights</h2>
                </div>
                <ul style={{ listStyle: "none", padding: 0, paddingLeft: "54px" }}>
                  {project.highlights.map((h, i) => (
                    <motion.li
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 + i * 0.1 }}
                      style={{
                        display: "flex",
                        alignItems: "flex-start",
                        gap: "12px",
                        marginBottom: "14px",
                        fontSize: "15px",
                        color: "var(--text-muted)",
                        lineHeight: 1.6,
                      }}
                    >
                      <CheckCircle style={{ width: "18px", height: "18px", color: "#10b981", flexShrink: 0, marginTop: "2px" }} />
                      {h}
                    </motion.li>
                  ))}
                </ul>
              </section>
            )}
          </motion.div>

          {/* CTA Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            style={{
              background: "linear-gradient(135deg, var(--bg-tertiary) 0%, var(--bg-secondary) 100%)",
              border: "1px solid var(--border-primary)",
              borderRadius: "24px",
              padding: "48px 40px",
              textAlign: "center",
            }}
          >
            <h2 style={{ fontSize: "26px", fontWeight: 700, color: "var(--text-primary)", marginBottom: "12px" }}>
              Interested in working together?
            </h2>
            <p style={{ fontSize: "16px", color: "var(--text-muted)", marginBottom: "28px", maxWidth: "400px", margin: "0 auto 28px" }}>
              Let&apos;s chat about your next project and bring your ideas to life.
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "12px", justifyContent: "center" }}>
              <Link
                href="/"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  padding: "14px 24px",
                  fontSize: "15px",
                  fontWeight: 600,
                  backgroundColor: "#ff4d00",
                  color: "var(--text-primary)",
                  borderRadius: "12px",
                  textDecoration: "none",
                  transition: "all 0.2s ease",
                }}
              >
                <MessageCircle style={{ width: "18px", height: "18px" }} />
                Start a Conversation
              </Link>
              <Link
                href="/projects"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  padding: "14px 24px",
                  fontSize: "15px",
                  fontWeight: 600,
                  backgroundColor: "transparent",
                  border: "1px solid var(--border-secondary)",
                  color: "var(--text-muted)",
                  borderRadius: "12px",
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
                View More Projects
              </Link>
            </div>
          </motion.div>
        </div>
      </main>

      <style jsx>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
