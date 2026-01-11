"use client";

import { motion } from "framer-motion";
import { skills } from "@/data/chatFlow";

const categoryColors: Record<string, string> = {
  frontend: "#ff4d00",
  backend: "#10b981",
  tools: "#6366f1",
  soft: "#f59e0b",
};

const categoryLabels: Record<string, string> = {
  frontend: "Frontend",
  backend: "Backend",
  tools: "Tools",
  soft: "Soft Skills",
};

export function SkillsCard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="my-6"
    >
      <div 
        style={{
          background: "linear-gradient(135deg, var(--bg-tertiary), var(--bg-secondary))",
          border: "1px solid var(--border-primary)",
          borderRadius: "16px",
          padding: "24px",
          boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
        }}
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {Object.entries(skills).map(([category, items], categoryIndex) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: categoryIndex * 0.1, duration: 0.4 }}
            >
              <div className="flex items-center gap-2 mb-3">
                <div
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: categoryColors[category] }}
                />
                <span 
                  style={{ 
                    fontSize: "11px", 
                    fontWeight: 600, 
                    textTransform: "uppercase", 
                    letterSpacing: "0.05em",
                    color: "var(--text-muted)",
                  }}
                >
                  {categoryLabels[category]}
                </span>
              </div>
              <div className="flex flex-wrap gap-2">
                {items.map((skill, skillIndex) => (
                  <motion.span
                    key={skill}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ 
                      delay: categoryIndex * 0.1 + skillIndex * 0.03,
                      duration: 0.3 
                    }}
                    style={{
                      padding: "6px 12px",
                      fontSize: "12px",
                      fontWeight: 500,
                      backgroundColor: "var(--bg-input)",
                      color: "var(--text-secondary)",
                      borderRadius: "8px",
                      border: "1px solid var(--border-secondary)",
                      cursor: "default",
                      transition: "all 0.2s ease",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = "var(--accent)";
                      e.currentTarget.style.color = "var(--text-primary)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = "var(--border-secondary)";
                      e.currentTarget.style.color = "var(--text-secondary)";
                    }}
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
