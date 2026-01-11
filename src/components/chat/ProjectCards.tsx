"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ExternalLink, Github, ArrowRight, Sparkles, TrendingUp } from "lucide-react";
import { getFeaturedProjects } from "@/data/projects";

export function ProjectCards() {
  const projects = getFeaturedProjects();

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      style={{
        marginTop: "20px",
        marginBottom: "20px",
        display: "flex",
        flexDirection: "column",
        gap: "16px",
        maxWidth: "100%",
      }}
    >
      {projects.map((project, index) => (
        <motion.div
          key={project.slug}
          initial={{ opacity: 0, y: 20, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ delay: index * 0.15, duration: 0.4 }}
          style={{
            backgroundColor: "var(--bg-secondary)",
            border: "1px solid var(--border-primary)",
            borderRadius: "16px",
            padding: "20px",
            cursor: "pointer",
            transition: "all 0.3s ease",
            position: "relative",
            overflow: "hidden",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = "#ff4d00";
            e.currentTarget.style.transform = "translateY(-2px)";
            e.currentTarget.style.boxShadow = "0 8px 30px rgba(255, 77, 0, 0.15)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = "#1f1f1f";
            e.currentTarget.style.transform = "translateY(0)";
            e.currentTarget.style.boxShadow = "none";
          }}
        >
          {/* Gradient accent line */}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              height: "3px",
              background: project.featured 
                ? "linear-gradient(90deg, #ff4d00, #ff6b2e)" 
                : "linear-gradient(90deg, #333, #444)",
              opacity: project.featured ? 1 : 0.5,
            }}
          />

          {/* Header */}
          <div style={{ 
            display: "flex", 
            alignItems: "flex-start", 
            justifyContent: "space-between", 
            marginBottom: "12px",
            gap: "12px",
          }}>
            <h3 style={{ 
              fontSize: "17px", 
              fontWeight: 700, 
              color: "var(--text-primary)",
              lineHeight: 1.3,
            }}>
              {project.title}
            </h3>
            {project.featured && (
              <span style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "4px",
                padding: "4px 10px",
                backgroundColor: "rgba(255, 77, 0, 0.15)",
                borderRadius: "20px",
                flexShrink: 0,
              }}>
                <Sparkles style={{ width: "10px", height: "10px", color: "#ff4d00" }} />
                <span style={{ fontSize: "10px", fontWeight: 600, color: "#ff4d00", textTransform: "uppercase", letterSpacing: "0.03em" }}>
                  Featured
                </span>
              </span>
            )}
          </div>

          {/* Description */}
          <p style={{
            fontSize: "13px",
            color: "var(--text-muted)",
            marginBottom: "16px",
            lineHeight: 1.6,
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}>
            {project.description}
          </p>

          {/* Tech Stack */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", marginBottom: "16px" }}>
            {project.techStack.slice(0, 4).map((tech) => (
              <span
                key={tech}
                style={{
                  padding: "5px 10px",
                  fontSize: "10px",
                  fontWeight: 500,
                  backgroundColor: "var(--bg-input)",
                  border: "1px solid var(--border-secondary)",
                  borderRadius: "6px",
                  color: "var(--text-muted)",
                }}
              >
                {tech}
              </span>
            ))}
            {project.techStack.length > 4 && (
              <span style={{ fontSize: "11px", color: "var(--text-dim)", alignSelf: "center", marginLeft: "4px" }}>
                +{project.techStack.length - 4}
              </span>
            )}
          </div>

          {/* Metrics */}
          {project.metrics.length > 0 && (
            <div style={{
              display: "flex",
              gap: "20px",
              marginBottom: "16px",
              paddingBottom: "16px",
              borderBottom: "1px solid var(--border-primary)",
            }}>
              {project.metrics.slice(0, 2).map((metric) => (
                <div key={metric.label} style={{ display: "flex", alignItems: "baseline", gap: "6px" }}>
                  <TrendingUp style={{ width: "12px", height: "12px", color: "#ff4d00" }} />
                  <span style={{ fontSize: "16px", fontWeight: 700, color: "#ff4d00" }}>
                    {metric.value}
                  </span>
                  <span style={{ fontSize: "11px", color: "#666666" }}>
                    {metric.label}
                  </span>
                </div>
              ))}
            </div>
          )}

          {/* Actions */}
          <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
            <Link href={`/projects/${project.slug}`} style={{ textDecoration: "none" }}>
              <button
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                  padding: "10px 16px",
                  fontSize: "12px",
                  fontWeight: 600,
                  backgroundColor: "#ff4d00",
                  color: "var(--text-primary)",
                  border: "none",
                  borderRadius: "8px",
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "#e64500";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "#ff4d00";
                }}
              >
                View Case Study
                <ArrowRight style={{ width: "12px", height: "12px" }} />
              </button>
            </Link>
            {project.links.demo && (
              <a href={project.links.demo} target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none" }}>
                <button
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: "36px",
                    height: "36px",
                    backgroundColor: "transparent",
                    border: "1px solid var(--border-secondary)",
                    borderRadius: "8px",
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
                  <ExternalLink style={{ width: "14px", height: "14px" }} />
                </button>
              </a>
            )}
            {project.links.github && (
              <a href={project.links.github} target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none" }}>
                <button
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: "36px",
                    height: "36px",
                    backgroundColor: "transparent",
                    border: "1px solid var(--border-secondary)",
                    borderRadius: "8px",
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
                  <Github style={{ width: "14px", height: "14px" }} />
                </button>
              </a>
            )}
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
}
