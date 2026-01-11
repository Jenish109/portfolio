"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { 
  ArrowLeft, 
  Download, 
  Github, 
  Linkedin, 
  Mail, 
  MapPin, 
  MessageCircle, 
  Phone,
  Briefcase,
  GraduationCap,
  Award,
  Calendar,
  ExternalLink
} from "lucide-react";
import { TopBar } from "@/components/layout/TopBar";
import { profile, experience, education, certifications } from "@/data/profile";
import { skills } from "@/data/chatFlow";

const skillCategories = [
  { key: "frontend" as const, label: "Frontend", color: "#ff4d00" },
  { key: "backend" as const, label: "Backend", color: "#10b981" },
  { key: "tools" as const, label: "Tools & Libraries", color: "#8b5cf6" },
  { key: "soft" as const, label: "Soft Skills", color: "#f59e0b" },
];

export default function ResumePage() {
  return (
    <div style={{ minHeight: "100vh", backgroundColor: "var(--bg-primary)", transition: "background-color 0.3s ease" }}>
      <TopBar />
      
      <main style={{ paddingTop: "100px", paddingBottom: "60px", paddingLeft: "24px", paddingRight: "24px" }}>
        <div style={{ maxWidth: "900px", margin: "0 auto" }}>
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            style={{ 
              display: "flex", 
              alignItems: "center", 
              justifyContent: "space-between", 
              marginBottom: "32px",
              flexWrap: "wrap",
              gap: "16px",
            }}
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
                transition: "color 0.2s ease",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.color = "#ff4d00"; }}
              onMouseLeave={(e) => { e.currentTarget.style.color = "#888888"; }}
            >
              <ArrowLeft style={{ width: "16px", height: "16px" }} />
              Back to Chat
            </Link>
            <a
              href={profile.resumeUrl}
              download="Jenish_Vaghasiya_Resume.pdf"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "10px",
                padding: "14px 24px",
                fontSize: "14px",
                fontWeight: 600,
                backgroundColor: "#ff4d00",
                color: "var(--text-primary)",
                borderRadius: "12px",
                textDecoration: "none",
                transition: "all 0.2s ease",
                boxShadow: "0 4px 20px rgba(255, 77, 0, 0.3)",
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
              <Download style={{ width: "18px", height: "18px" }} />
              Download Resume
            </a>
          </motion.div>

          {/* Profile Card */}
          <motion.article
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            style={{
              backgroundColor: "var(--bg-secondary)",
              border: "1px solid var(--border-primary)",
              borderRadius: "24px",
              overflow: "hidden",
            }}
          >
            {/* Hero Section */}
            <div style={{
              background: "linear-gradient(135deg, var(--bg-tertiary) 0%, var(--bg-input) 100%)",
              padding: "48px 40px",
              textAlign: "center",
              borderBottom: "1px solid var(--border-primary)",
              position: "relative",
            }}>
              {/* Decorative elements */}
              <div style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                height: "4px",
                background: "linear-gradient(90deg, #ff4d00, #ff6b2e, #ff4d00)",
              }} />
              
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                style={{
                  fontSize: "clamp(2rem, 5vw, 3rem)",
                  fontWeight: 800,
                  color: "var(--text-primary)",
                  marginBottom: "8px",
                }}
              >
                {profile.name}
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                style={{
                  fontSize: "20px",
                  color: "#ff4d00",
                  fontWeight: 600,
                  marginBottom: "20px",
                }}
              >
                {profile.role}
              </motion.p>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                style={{
                  fontSize: "16px",
                  color: "var(--text-muted)",
                  maxWidth: "600px",
                  margin: "0 auto 28px",
                  lineHeight: 1.7,
                }}
              >
                {profile.bio}
              </motion.p>

              {/* Contact Links */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "20px",
                }}
              >
                <span style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "14px", color: "#888888" }}>
                  <MapPin style={{ width: "16px", height: "16px", color: "#ff4d00" }} />
                  {profile.location}
                </span>
                {profile.phone && (
                  <span style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "14px", color: "#888888" }}>
                    <Phone style={{ width: "16px", height: "16px", color: "#ff4d00" }} />
                    {profile.phone}
                  </span>
                )}
                {profile.email && (
                  <a
                    href={`mailto:${profile.email}`}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "6px",
                      fontSize: "14px",
                      color: "var(--text-muted)",
                      textDecoration: "none",
                      transition: "color 0.2s ease",
                    }}
                    onMouseEnter={(e) => { e.currentTarget.style.color = "#ff4d00"; }}
                    onMouseLeave={(e) => { e.currentTarget.style.color = "#888888"; }}
                  >
                    <Mail style={{ width: "16px", height: "16px" }} />
                    Email
                  </a>
                )}
                {profile.github && (
                  <a
                    href={profile.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "6px",
                      fontSize: "14px",
                      color: "var(--text-muted)",
                      textDecoration: "none",
                      transition: "color 0.2s ease",
                    }}
                    onMouseEnter={(e) => { e.currentTarget.style.color = "#ff4d00"; }}
                    onMouseLeave={(e) => { e.currentTarget.style.color = "#888888"; }}
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
                      gap: "6px",
                      fontSize: "14px",
                      color: "var(--text-muted)",
                      textDecoration: "none",
                      transition: "color 0.2s ease",
                    }}
                    onMouseEnter={(e) => { e.currentTarget.style.color = "#ff4d00"; }}
                    onMouseLeave={(e) => { e.currentTarget.style.color = "#888888"; }}
                  >
                    <Linkedin style={{ width: "16px", height: "16px" }} />
                    LinkedIn
                  </a>
                )}
              </motion.div>
            </div>

            {/* Stats */}
            {profile.stats && (
              <div style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(120px, 1fr))",
                gap: "1px",
                backgroundColor: "var(--border-primary)",
              }}>
                {profile.stats.map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 + index * 0.1 }}
                    style={{
                      backgroundColor: "var(--bg-secondary)",
                      padding: "28px 20px",
                      textAlign: "center",
                    }}
                  >
                    <p style={{ fontSize: "28px", fontWeight: 800, color: "#ff4d00", marginBottom: "4px" }}>
                      {stat.value}
                    </p>
                    <p style={{ fontSize: "11px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.1em", color: "#666666" }}>
                      {stat.label}
                    </p>
                  </motion.div>
                ))}
              </div>
            )}

            {/* Content Sections */}
            <div style={{ padding: "40px" }}>
              {/* Experience */}
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
                style={{ marginBottom: "40px" }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "24px" }}>
                  <Briefcase style={{ width: "24px", height: "24px", color: "#ff4d00" }} />
                  <h2 style={{ fontSize: "22px", fontWeight: 700, color: "#ffffff" }}>Experience</h2>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                  {experience.map((exp, index) => (
                    <div
                      key={index}
                      style={{
                        padding: "24px",
                        backgroundColor: "var(--bg-card)",
                        border: "1px solid var(--border-primary)",
                        borderRadius: "16px",
                        transition: "border-color 0.2s ease",
                      }}
                      onMouseEnter={(e) => { e.currentTarget.style.borderColor = "#2a2a2a"; }}
                      onMouseLeave={(e) => { e.currentTarget.style.borderColor = "#1a1a1a"; }}
                    >
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "8px", marginBottom: "12px" }}>
                        <div>
                          <h3 style={{ fontSize: "18px", fontWeight: 700, color: "var(--text-primary)", marginBottom: "4px" }}>{exp.title}</h3>
                          <p style={{ fontSize: "14px", color: "#ff4d00", fontWeight: 500 }}>{exp.company}</p>
                        </div>
                        <span style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "13px", color: "#666666" }}>
                          <Calendar style={{ width: "14px", height: "14px" }} />
                          {exp.period}
                        </span>
                      </div>
                      <p style={{ fontSize: "14px", color: "var(--text-muted)", lineHeight: 1.7, marginBottom: "16px" }}>{exp.description}</p>
                      <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                        {exp.technologies.map((tech) => (
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
                      </div>
                    </div>
                  ))}
                </div>
              </motion.section>

              {/* Skills */}
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                style={{ marginBottom: "40px" }}
              >
                <h2 style={{ fontSize: "22px", fontWeight: 700, color: "var(--text-primary)", marginBottom: "24px" }}>
                  Skills & Technologies
                </h2>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "20px" }}>
                  {skillCategories.map((cat) => (
                    <div key={cat.key}>
                      <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "14px" }}>
                        <span style={{ width: "10px", height: "10px", borderRadius: "50%", backgroundColor: cat.color }} />
                        <span style={{ fontSize: "14px", fontWeight: 600, color: cat.color }}>{cat.label}</span>
                      </div>
                      <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                        {skills[cat.key].map((skill) => (
                          <span
                            key={skill}
                            style={{
                              padding: "8px 14px",
                              fontSize: "12px",
                              fontWeight: 500,
                              backgroundColor: "var(--bg-input)",
                              border: "1px solid var(--border-secondary)",
                              borderRadius: "8px",
                              color: "var(--text-secondary)",
                            }}
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </motion.section>

              {/* Education */}
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9 }}
                style={{ marginBottom: "40px" }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "24px" }}>
                  <GraduationCap style={{ width: "24px", height: "24px", color: "#ff4d00" }} />
                  <h2 style={{ fontSize: "22px", fontWeight: 700, color: "#ffffff" }}>Education</h2>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                  {education.map((edu, index) => (
                    <div
                      key={index}
                      style={{
                        padding: "20px 24px",
                        backgroundColor: "var(--bg-card)",
                        border: "1px solid var(--border-primary)",
                        borderRadius: "12px",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        flexWrap: "wrap",
                        gap: "12px",
                      }}
                    >
                      <div>
                        <h3 style={{ fontSize: "16px", fontWeight: 600, color: "var(--text-primary)", marginBottom: "4px" }}>{edu.degree}</h3>
                        <p style={{ fontSize: "14px", color: "#888888" }}>{edu.institution}, {edu.location}</p>
                      </div>
                      <span style={{ fontSize: "13px", color: "#666666" }}>{edu.period}</span>
                    </div>
                  ))}
                </div>
              </motion.section>

              {/* Certifications */}
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.0 }}
                style={{ marginBottom: "40px" }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "24px" }}>
                  <Award style={{ width: "24px", height: "24px", color: "#ff4d00" }} />
                  <h2 style={{ fontSize: "22px", fontWeight: 700, color: "#ffffff" }}>Certifications</h2>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                  {certifications.map((cert, index) => (
                    <div
                      key={index}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "12px",
                        padding: "16px 20px",
                        backgroundColor: "var(--bg-card)",
                        border: "1px solid var(--border-primary)",
                        borderRadius: "12px",
                      }}
                    >
                      <ExternalLink style={{ width: "16px", height: "16px", color: "#ff4d00", flexShrink: 0 }} />
                      <span style={{ fontSize: "14px", color: "#b0b0b0" }}>{cert}</span>
                    </div>
                  ))}
                </div>
              </motion.section>

              {/* CTA */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.1 }}
                style={{
                  textAlign: "center",
                  paddingTop: "40px",
                  borderTop: "1px solid var(--border-primary)",
                }}
              >
                <h2 style={{ fontSize: "24px", fontWeight: 700, color: "var(--text-primary)", marginBottom: "12px" }}>
                  Let&apos;s build something together
                </h2>
                <p style={{ fontSize: "16px", color: "var(--text-muted)", marginBottom: "28px" }}>
                  I&apos;m always open to discussing new opportunities
                </p>
                <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "16px" }}>
                  <Link
                    href="/"
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "10px",
                      padding: "14px 28px",
                      fontSize: "14px",
                      fontWeight: 600,
                      backgroundColor: "#ff4d00",
                      color: "var(--text-primary)",
                      borderRadius: "12px",
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
                      gap: "10px",
                      padding: "14px 28px",
                      fontSize: "14px",
                      fontWeight: 600,
                      backgroundColor: "transparent",
                      color: "var(--text-muted)",
                      border: "1px solid var(--border-secondary)",
                      borderRadius: "12px",
                      textDecoration: "none",
                      transition: "all 0.2s ease",
                    }}
                    onMouseEnter={(e) => { 
                      e.currentTarget.style.borderColor = "#ff4d00"; 
                      e.currentTarget.style.color = "#ff4d00";
                    }}
                    onMouseLeave={(e) => { 
                      e.currentTarget.style.borderColor = "#2a2a2a"; 
                      e.currentTarget.style.color = "#a0a0a0";
                    }}
                  >
                    View Projects
                  </Link>
                </div>
              </motion.div>
            </div>
          </motion.article>
        </div>
      </main>
    </div>
  );
}
