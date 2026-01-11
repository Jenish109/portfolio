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
  Calendar,
  Clock,
  User,
  FolderOpen,
  Tag
} from "lucide-react";
import { getProjectBySlug } from "@/data/projects";
import { TopBar } from "@/components/layout/TopBar";

// Calculate reading time (assuming 200 words per minute)
function calculateReadingTime(text: string): number {
  const words = text.split(/\s+/).length;
  return Math.ceil(words / 200);
}

export default function ProjectPage() {
  const params = useParams();
  const slug = params.slug as string;
  const [project, setProject] = useState<ReturnType<typeof getProjectBySlug>>(undefined);

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

  const readingTime = calculateReadingTime(
    `${project.description} ${project.problem} ${project.solution} ${project.result}`
  );

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "var(--bg-primary)" }}>
      <TopBar />
      
      <article style={{ paddingTop: "112px", paddingBottom: "80px" }}>
        <div style={{ maxWidth: "720px", margin: "0 auto", padding: "0 24px" }}>
          {/* Back Navigation */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            style={{ marginBottom: "40px" }}
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
                padding: "8px 0",
                transition: "all 0.2s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = "var(--accent)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = "var(--text-muted)";
              }}
            >
              <ArrowLeft style={{ width: "16px", height: "16px" }} />
              Back to Projects
            </Link>
          </motion.div>

          {/* Blog Header */}
          <motion.header
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            style={{ marginBottom: "48px" }}
          >
            {/* Category Badge */}
            <div style={{ marginBottom: "20px" }}>
              <div style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                padding: "6px 14px",
                backgroundColor: project.featured ? "rgba(255, 77, 0, 0.15)" : "var(--bg-secondary)",
                border: project.featured ? "none" : "1px solid var(--border-primary)",
                borderRadius: "20px",
              }}>
                {project.featured && <Sparkles style={{ width: "14px", height: "14px", color: "#ff4d00" }} />}
                <FolderOpen style={{ width: "14px", height: "14px", color: project.featured ? "#ff4d00" : "var(--text-muted)" }} />
                <span style={{ 
                  fontSize: "13px", 
                  fontWeight: 600, 
                  color: project.featured ? "#ff4d00" : "var(--text-muted)",
                  textTransform: "capitalize"
                }}>
                  {project.category}
                </span>
              </div>
            </div>

            {/* Title */}
            <h1 style={{ 
              fontSize: "clamp(36px, 5vw, 56px)", 
              fontWeight: 800, 
              color: "var(--text-primary)", 
              marginBottom: "24px",
              lineHeight: 1.1,
              letterSpacing: "-0.02em",
            }}>
              {project.title}
            </h1>
            
            {/* Description */}
            <p style={{ 
              fontSize: "20px", 
              color: "var(--text-muted)", 
              lineHeight: 1.6, 
              marginBottom: "32px",
              fontWeight: 400,
            }}>
              {project.description}
            </p>

            {/* Blog Meta Info */}
            <div style={{ 
              display: "flex",
              flexWrap: "wrap",
              alignItems: "center",
              gap: "24px",
              paddingBottom: "32px",
              borderBottom: "1px solid var(--border-primary)",
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <User style={{ width: "16px", height: "16px", color: "var(--text-dim)" }} />
                <span style={{ fontSize: "14px", color: "var(--text-muted)" }}>{project.role}</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <Clock style={{ width: "16px", height: "16px", color: "var(--text-dim)" }} />
                <span style={{ fontSize: "14px", color: "var(--text-muted)" }}>{readingTime} min read</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "8px", flexWrap: "wrap" }}>
                <Tag style={{ width: "16px", height: "16px", color: "var(--text-dim)" }} />
                <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                  {project.techStack.slice(0, 4).map((tech) => (
                    <span
                      key={tech}
                      style={{
                        fontSize: "13px",
                        color: "var(--text-muted)",
                      }}
                    >
                      {tech}
                    </span>
                  ))}
                  {project.techStack.length > 4 && (
                    <span style={{ fontSize: "13px", color: "var(--text-dim)" }}>
                      +{project.techStack.length - 4} more
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            {(project.links.demo || project.links.github) && (
              <div style={{ display: "flex", flexWrap: "wrap", gap: "12px", marginTop: "32px" }}>
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
                      padding: "12px 24px",
                      fontSize: "14px",
                      fontWeight: 600,
                      backgroundColor: "#ff4d00",
                      color: "#ffffff",
                      borderRadius: "8px",
                      textDecoration: "none",
                      transition: "all 0.2s ease",
                    }}
                  >
                    <ExternalLink style={{ width: "16px", height: "16px" }} />
                    View Live
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
                      padding: "12px 24px",
                      fontSize: "14px",
                      fontWeight: 600,
                      backgroundColor: "transparent",
                      border: "1px solid var(--border-secondary)",
                      color: "var(--text-muted)",
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
                    <Github style={{ width: "16px", height: "16px" }} />
                    Source Code
                  </motion.a>
                )}
              </div>
            )}
          </motion.header>

          {/* Blog Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.5 }}
            style={{
              fontSize: "18px",
              lineHeight: 1.75,
              color: "var(--text-secondary)",
            }}
          >
            {/* Introduction / Problem Section */}
            <section style={{ marginBottom: "48px" }}>
              <h2 style={{ 
                fontSize: "32px", 
                fontWeight: 700, 
                color: "var(--text-primary)", 
                marginBottom: "20px",
                lineHeight: 1.3,
                letterSpacing: "-0.01em",
              }}>
                The Challenge
              </h2>
              <div style={{
                fontSize: "18px",
                lineHeight: 1.75,
                color: "var(--text-secondary)",
              }}>
                {project.problem.split('. ').map((sentence, index, array) => (
                  <p key={index} style={{ marginBottom: index < array.length - 1 ? "16px" : "0" }}>
                    {sentence.trim()}{index < array.length - 1 ? '.' : ''}
                  </p>
                ))}
              </div>
            </section>

            {/* Solution Section */}
            <section style={{ marginBottom: "48px" }}>
              <h2 style={{ 
                fontSize: "32px", 
                fontWeight: 700, 
                color: "var(--text-primary)", 
                marginBottom: "20px",
                lineHeight: 1.3,
                letterSpacing: "-0.01em",
              }}>
                The Approach
              </h2>
              <div style={{
                fontSize: "18px",
                lineHeight: 1.75,
                color: "var(--text-secondary)",
              }}>
                {project.solution.split('. ').map((sentence, index, array) => (
                  <p key={index} style={{ marginBottom: index < array.length - 1 ? "16px" : "0" }}>
                    {sentence.trim()}{index < array.length - 1 ? '.' : ''}
                  </p>
                ))}
              </div>
            </section>

            {/* Key Highlights */}
            {project.highlights.length > 0 && (
              <section style={{ 
                marginBottom: "48px",
                padding: "32px",
                backgroundColor: "var(--bg-secondary)",
                border: "1px solid var(--border-primary)",
                borderRadius: "16px",
              }}>
                <h3 style={{ 
                  fontSize: "24px", 
                  fontWeight: 600, 
                  color: "var(--text-primary)", 
                  marginBottom: "24px",
                }}>
                  Key Achievements
                </h3>
                <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                  {project.highlights.map((h, i) => (
                    <motion.li
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2 + i * 0.05 }}
                      style={{
                        display: "flex",
                        alignItems: "flex-start",
                        gap: "14px",
                        marginBottom: i < project.highlights.length - 1 ? "16px" : "0",
                        fontSize: "16px",
                        color: "var(--text-secondary)",
                        lineHeight: 1.6,
                      }}
                    >
                      <CheckCircle style={{ width: "20px", height: "20px", color: "#10b981", flexShrink: 0, marginTop: "2px" }} />
                      <span>{h}</span>
                    </motion.li>
                  ))}
                </ul>
              </section>
            )}

            {/* Results Section */}
            <section style={{ marginBottom: "48px" }}>
              <h2 style={{ 
                fontSize: "32px", 
                fontWeight: 700, 
                color: "var(--text-primary)", 
                marginBottom: "20px",
                lineHeight: 1.3,
                letterSpacing: "-0.01em",
              }}>
                The Impact
              </h2>
              <div style={{
                fontSize: "18px",
                lineHeight: 1.75,
                color: "var(--text-secondary)",
              }}>
                {project.result.split('. ').map((sentence, index, array) => (
                  <p key={index} style={{ marginBottom: index < array.length - 1 ? "16px" : "0" }}>
                    {sentence.trim()}{index < array.length - 1 ? '.' : ''}
                  </p>
                ))}
              </div>
            </section>

            {/* Metrics - Inline with content */}
            {project.metrics.length > 0 && (
              <section style={{ 
                marginBottom: "48px",
                padding: "32px",
                backgroundColor: "var(--bg-secondary)",
                border: "1px solid var(--border-primary)",
                borderRadius: "16px",
              }}>
                <h3 style={{ 
                  fontSize: "24px", 
                  fontWeight: 600, 
                  color: "var(--text-primary)", 
                  marginBottom: "24px",
                  textAlign: "center",
                }}>
                  Results by the Numbers
                </h3>
                <div style={{ 
                  display: "grid", 
                  gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", 
                  gap: "24px",
                }}>
                  {project.metrics.map((m, index) => (
                    <motion.div
                      key={m.label}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 + index * 0.1 }}
                      style={{
                        textAlign: "center",
                        padding: "20px",
                      }}
                    >
                      <p style={{ 
                        fontSize: "36px", 
                        fontWeight: 800, 
                        color: "#ff4d00",
                        marginBottom: "8px",
                        lineHeight: 1,
                      }}>
                        {m.value}
                      </p>
                      <p style={{ 
                        fontSize: "13px", 
                        textTransform: "uppercase", 
                        color: "var(--text-dim)", 
                        letterSpacing: "0.05em",
                        fontWeight: 500,
                      }}>
                        {m.label}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </section>
            )}

            {/* Tech Stack Section */}
            <section style={{ 
              marginBottom: "48px",
              paddingTop: "32px",
              borderTop: "1px solid var(--border-primary)",
            }}>
              <h3 style={{ 
                fontSize: "20px", 
                fontWeight: 600, 
                color: "var(--text-primary)", 
                marginBottom: "20px",
              }}>
                Technologies Used
              </h3>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
                {project.techStack.map((tech, index) => (
                  <span
                    key={tech}
                    style={{
                      padding: "8px 16px",
                      fontSize: "14px",
                      fontWeight: 500,
                      backgroundColor: "var(--bg-secondary)",
                      border: "1px solid var(--border-primary)",
                      borderRadius: "8px",
                      color: "var(--text-secondary)",
                    }}
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </section>
          </motion.div>

          {/* Blog Footer / CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            style={{
              marginTop: "64px",
              paddingTop: "48px",
              borderTop: "2px solid var(--border-primary)",
            }}
          >
            <div style={{
              padding: "40px",
              backgroundColor: "var(--bg-secondary)",
              border: "1px solid var(--border-primary)",
              borderRadius: "20px",
              textAlign: "center",
            }}>
              <h3 style={{ 
                fontSize: "24px", 
                fontWeight: 700, 
                color: "var(--text-primary)", 
                marginBottom: "12px",
              }}>
                Interested in working together?
              </h3>
              <p style={{ 
                fontSize: "16px", 
                color: "var(--text-muted)", 
                marginBottom: "28px",
                maxWidth: "500px",
                margin: "0 auto 28px",
              }}>
                Let&apos;s discuss your next project and bring your ideas to life.
              </p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "12px", justifyContent: "center" }}>
                <Link
                  href="/"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "8px",
                    padding: "14px 28px",
                    fontSize: "15px",
                    fontWeight: 600,
                    backgroundColor: "#ff4d00",
                    color: "#ffffff",
                    borderRadius: "10px",
                    textDecoration: "none",
                    transition: "all 0.2s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = "#e64500";
                    e.currentTarget.style.transform = "translateY(-2px)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = "#ff4d00";
                    e.currentTarget.style.transform = "translateY(0)";
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
                    padding: "14px 28px",
                    fontSize: "15px",
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
                  View More Projects
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </article>

      <style jsx>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
