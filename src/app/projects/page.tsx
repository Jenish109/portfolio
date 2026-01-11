"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, ExternalLink, Github, ArrowRight, Sparkles } from "lucide-react";
import { TopBar } from "@/components/layout/TopBar";
import { projects, getAllTech } from "@/data/projects";

export default function ProjectsPage() {
  const [filter, setFilter] = useState<string | null>(null);
  const allTech = useMemo(() => getAllTech(), []);

  const filtered = useMemo(() => {
    if (!filter) return projects;
    return projects.filter((p) => p.techStack.includes(filter));
  }, [filter]);

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "var(--bg-primary)", transition: "background-color 0.3s ease" }}>
      <TopBar />
      
      <main style={{ paddingTop: "100px", paddingBottom: "60px", paddingLeft: "24px", paddingRight: "24px" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            style={{ marginBottom: "48px" }}
          >
            <Link
              href="/"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                fontSize: "14px",
                color: "var(--text-muted)",
                textDecoration: "none",
                marginBottom: "24px",
                transition: "color 0.2s ease",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.color = "#ff4d00"; }}
              onMouseLeave={(e) => { e.currentTarget.style.color = "#888888"; }}
            >
              <ArrowLeft style={{ width: "16px", height: "16px" }} />
              Back to Chat
            </Link>
            <h1 style={{
              fontSize: "clamp(2.5rem, 8vw, 4rem)",
              fontWeight: 800,
              color: "var(--text-primary)",
              marginBottom: "16px",
              lineHeight: 1.1,
            }}>
              <span style={{ color: "#ff4d00" }}>Featured</span> Projects
            </h1>
            <p style={{ fontSize: "18px", color: "var(--text-muted)", maxWidth: "600px", lineHeight: 1.6 }}>
              A curated collection of work I&apos;m proud of. Each project represents a unique challenge and learning experience.
            </p>
          </motion.div>

          {/* Filter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            style={{ marginBottom: "40px" }}
          >
            <div style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              marginBottom: "16px",
            }}>
              <Sparkles style={{ width: "14px", height: "14px", color: "#ff4d00" }} />
              <span style={{ fontSize: "12px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.1em", color: "#666666" }}>
                Filter by technology
              </span>
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
              <button
                onClick={() => setFilter(null)}
                style={{
                  padding: "10px 18px",
                  fontSize: "13px",
                  fontWeight: 500,
                  borderRadius: "10px",
                  border: !filter ? "1px solid #ff4d00" : "1px solid #2a2a2a",
                  backgroundColor: !filter ? "rgba(255, 77, 0, 0.1)" : "transparent",
                  color: !filter ? "#ff4d00" : "#888888",
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                }}
                onMouseEnter={(e) => {
                  if (filter) {
                    e.currentTarget.style.borderColor = "#ff4d00";
                    e.currentTarget.style.color = "#ff4d00";
                  }
                }}
                onMouseLeave={(e) => {
                  if (filter) {
                    e.currentTarget.style.borderColor = "#2a2a2a";
                    e.currentTarget.style.color = "#888888";
                  }
                }}
              >
                All Projects
              </button>
              {allTech.slice(0, 12).map((tech) => (
                <button
                  key={tech}
                  onClick={() => setFilter(tech)}
                  style={{
                    padding: "10px 18px",
                    fontSize: "13px",
                    fontWeight: 500,
                    borderRadius: "10px",
                    border: filter === tech ? "1px solid #ff4d00" : "1px solid #2a2a2a",
                    backgroundColor: filter === tech ? "rgba(255, 77, 0, 0.1)" : "transparent",
                    color: filter === tech ? "#ff4d00" : "#888888",
                    cursor: "pointer",
                    transition: "all 0.2s ease",
                  }}
                  onMouseEnter={(e) => {
                    if (filter !== tech) {
                      e.currentTarget.style.borderColor = "#ff4d00";
                      e.currentTarget.style.color = "#ff4d00";
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (filter !== tech) {
                      e.currentTarget.style.borderColor = "#2a2a2a";
                      e.currentTarget.style.color = "#888888";
                    }
                  }}
                >
                  {tech}
                </button>
              ))}
            </div>
          </motion.div>

          {/* Grid */}
          <div style={{
            display: "grid",
            gap: "24px",
            gridTemplateColumns: "repeat(auto-fill, minmax(350px, 1fr))",
          }}>
            {filtered.map((project, index) => (
              <motion.article
                key={project.slug}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                style={{
                  backgroundColor: "var(--bg-secondary)",
                  border: "1px solid var(--border-primary)",
                  borderRadius: "20px",
                  padding: "28px",
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                  position: "relative",
                  overflow: "hidden",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "#ff4d00";
                  e.currentTarget.style.transform = "translateY(-4px)";
                  e.currentTarget.style.boxShadow = "0 20px 40px rgba(255, 77, 0, 0.1)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "#1a1a1a";
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                {/* Featured Badge */}
                {project.featured && (
                  <div style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "6px",
                    marginBottom: "16px",
                    padding: "6px 12px",
                    backgroundColor: "rgba(255, 77, 0, 0.15)",
                    borderRadius: "20px",
                  }}>
                    <Sparkles style={{ width: "12px", height: "12px", color: "#ff4d00" }} />
                    <span style={{ fontSize: "11px", fontWeight: 600, color: "#ff4d00", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                      Featured
                    </span>
                  </div>
                )}

                {/* Title */}
                <h2 style={{
                  fontSize: "22px",
                  fontWeight: 700,
                  color: "var(--text-primary)",
                  marginBottom: "12px",
                  lineHeight: 1.3,
                }}>
                  {project.title}
                </h2>

                {/* Description */}
                <p style={{
                  fontSize: "14px",
                  color: "var(--text-muted)",
                  marginBottom: "20px",
                  lineHeight: 1.6,
                  display: "-webkit-box",
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: "vertical",
                  overflow: "hidden",
                }}>
                  {project.description}
                </p>

                {/* Tech Stack */}
                <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginBottom: "20px" }}>
                  {project.techStack.slice(0, 4).map((tech) => (
                    <span
                      key={tech}
                      style={{
                        padding: "6px 12px",
                        fontSize: "11px",
                        fontWeight: 500,
                        backgroundColor: "var(--bg-input)",
                        border: "1px solid var(--border-secondary)",
                        borderRadius: "8px",
                        color: "var(--text-muted)",
                      }}
                    >
                      {tech}
                    </span>
                  ))}
                  {project.techStack.length > 4 && (
                    <span style={{ fontSize: "12px", color: "var(--text-dim)", alignSelf: "center" }}>
                      +{project.techStack.length - 4} more
                    </span>
                  )}
                </div>

                {/* Metrics */}
                {project.metrics.length > 0 && (
                  <div style={{
                    display: "flex",
                    gap: "24px",
                    marginBottom: "24px",
                    paddingTop: "20px",
                    borderTop: "1px solid #1a1a1a",
                  }}>
                    {project.metrics.slice(0, 2).map((m) => (
                      <div key={m.label}>
                        <span style={{ fontSize: "20px", fontWeight: 700, color: "#ff4d00" }}>{m.value}</span>
                        <span style={{ fontSize: "12px", color: "var(--text-dim)", marginLeft: "6px" }}>{m.label}</span>
                      </div>
                    ))}
                  </div>
                )}

                {/* Actions */}
                <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
                  <Link href={`/projects/${project.slug}`} style={{ textDecoration: "none" }}>
                    <button
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                        padding: "12px 20px",
                        fontSize: "13px",
                        fontWeight: 600,
                        backgroundColor: "#ff4d00",
                        color: "var(--text-primary)",
                        border: "none",
                        borderRadius: "10px",
                        cursor: "pointer",
                        transition: "all 0.2s ease",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = "#e64500";
                        e.currentTarget.style.transform = "scale(1.02)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = "#ff4d00";
                        e.currentTarget.style.transform = "scale(1)";
                      }}
                    >
                      View Case Study
                      <ArrowRight style={{ width: "14px", height: "14px" }} />
                    </button>
                  </Link>
                  {project.links.demo && (
                    <a href={project.links.demo} target="_blank" rel="noopener noreferrer">
                      <button
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          width: "44px",
                          height: "44px",
                          backgroundColor: "transparent",
                          border: "1px solid var(--border-secondary)",
                          borderRadius: "10px",
                          color: "var(--text-muted)",
                          cursor: "pointer",
                          transition: "all 0.2s ease",
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.borderColor = "#ff4d00";
                          e.currentTarget.style.color = "#ff4d00";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.borderColor = "#2a2a2a";
                          e.currentTarget.style.color = "#888888";
                        }}
                      >
                        <ExternalLink style={{ width: "18px", height: "18px" }} />
                      </button>
                    </a>
                  )}
                  {project.links.github && (
                    <a href={project.links.github} target="_blank" rel="noopener noreferrer">
                      <button
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          width: "44px",
                          height: "44px",
                          backgroundColor: "transparent",
                          border: "1px solid var(--border-secondary)",
                          borderRadius: "10px",
                          color: "var(--text-muted)",
                          cursor: "pointer",
                          transition: "all 0.2s ease",
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.borderColor = "#ff4d00";
                          e.currentTarget.style.color = "#ff4d00";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.borderColor = "#2a2a2a";
                          e.currentTarget.style.color = "#888888";
                        }}
                      >
                        <Github style={{ width: "18px", height: "18px" }} />
                      </button>
                    </a>
                  )}
                </div>
              </motion.article>
            ))}
          </div>

          {/* Empty State */}
          {filtered.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              style={{
                textAlign: "center",
                padding: "80px 20px",
              }}
            >
              <p style={{ fontSize: "18px", color: "var(--text-muted)", marginBottom: "16px" }}>
                No projects found with that technology.
              </p>
              <button
                onClick={() => setFilter(null)}
                style={{
                  fontSize: "14px",
                  color: "#ff4d00",
                  backgroundColor: "transparent",
                  border: "none",
                  cursor: "pointer",
                  textDecoration: "underline",
                }}
              >
                Clear filter
              </button>
            </motion.div>
          )}
        </div>
      </main>
    </div>
  );
}
