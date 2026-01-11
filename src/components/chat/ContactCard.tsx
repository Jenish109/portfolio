"use client";

import { useState, useCallback } from "react";
import { motion } from "framer-motion";
import { Send, Loader2, CheckCircle, User, Mail, MessageSquare, Sparkles } from "lucide-react";
import { useChat } from "@/context/ChatProvider";
import { getStorageItem, setStorageItem, STORAGE_KEYS } from "@/lib/storage";

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}

export function ContactCard() {
  const { goToNode } = useChat();
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const validate = useCallback((): boolean => {
    const newErrors: FormErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
      newErrors.email = "Please enter a valid email";
    if (!formData.message.trim()) newErrors.message = "Message is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [formData]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        const leads = getStorageItem<unknown[]>(STORAGE_KEYS.LEADS, []);
        leads.push({ ...formData, timestamp: Date.now() });
        setStorageItem(STORAGE_KEYS.LEADS, leads);
        setIsSuccess(true);
        setTimeout(() => goToNode("contact-success"), 1500);
      }
    } catch (err) {
      console.error(err);
      setErrors({ message: "Failed to send. Please try again." });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        style={{
          background: "linear-gradient(135deg, rgba(16, 185, 129, 0.05) 0%, var(--bg-secondary) 100%)",
          border: "1px solid rgba(16, 185, 129, 0.3)",
          borderRadius: "20px",
          padding: "40px 32px",
          marginTop: "16px",
          marginBottom: "16px",
          maxWidth: "400px",
          textAlign: "center",
        }}
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          style={{
            width: "64px",
            height: "64px",
            backgroundColor: "rgba(16, 185, 129, 0.2)",
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "0 auto 16px",
          }}
        >
          <CheckCircle style={{ width: "32px", height: "32px", color: "#10b981" }} />
        </motion.div>
        <h3 style={{ fontSize: "20px", fontWeight: 700, color: "var(--text-primary)", marginBottom: "8px" }}>
          Message Sent! 🎉
        </h3>
        <p style={{ fontSize: "14px", color: "var(--text-muted)" }}>
          I&apos;ll get back to you within 24 hours.
        </p>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      style={{
        background: "linear-gradient(135deg, var(--bg-card) 0%, var(--bg-secondary) 100%)",
        border: "1px solid var(--border-primary)",
        borderRadius: "20px",
        padding: "28px",
        marginTop: "16px",
        marginBottom: "16px",
        maxWidth: "420px",
        boxShadow: "0 8px 32px rgba(0, 0, 0, 0.3)",
      }}
    >
      {/* Header */}
      <div style={{ marginBottom: "24px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "8px" }}>
          <div
            style={{
              width: "32px",
              height: "32px",
              backgroundColor: "rgba(255, 77, 0, 0.15)",
              borderRadius: "8px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Sparkles style={{ width: "16px", height: "16px", color: "#ff4d00" }} />
          </div>
          <h3 style={{ fontSize: "18px", fontWeight: 700, color: "var(--text-primary)" }}>
            Get in Touch
          </h3>
        </div>
        <p style={{ fontSize: "13px", color: "var(--text-muted)", lineHeight: 1.5 }}>
          Drop me a message and let&apos;s create something amazing together.
        </p>
      </div>

      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
        {/* Name Field */}
        <div>
          <div
            style={{
              position: "relative",
              display: "flex",
              alignItems: "center",
              backgroundColor: focusedField === "name" ? "var(--bg-hover)" : "var(--bg-tertiary)",
              border: `1px solid ${errors.name ? "#ef4444" : focusedField === "name" ? "var(--accent)" : "var(--border-secondary)"}`,
              borderRadius: "12px",
              transition: "all 0.2s ease",
            }}
          >
            <div
              style={{
                padding: "0 14px",
                display: "flex",
                alignItems: "center",
              }}
            >
              <User style={{ width: "16px", height: "16px", color: focusedField === "name" ? "var(--accent)" : "var(--text-dim)" }} />
            </div>
            <input
              type="text"
              placeholder="Your name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              onFocus={() => setFocusedField("name")}
              onBlur={() => setFocusedField(null)}
              style={{
                flex: 1,
                padding: "14px 14px 14px 0",
                fontSize: "14px",
                backgroundColor: "transparent",
                border: "none",
                color: "var(--text-primary)",
                outline: "none",
              }}
            />
          </div>
          {errors.name && (
            <p style={{ fontSize: "12px", color: "#ef4444", marginTop: "6px", marginLeft: "4px" }}>{errors.name}</p>
          )}
        </div>

        {/* Email Field */}
        <div>
          <div
            style={{
              position: "relative",
              display: "flex",
              alignItems: "center",
              backgroundColor: focusedField === "email" ? "var(--bg-hover)" : "var(--bg-tertiary)",
              border: `1px solid ${errors.email ? "#ef4444" : focusedField === "email" ? "var(--accent)" : "var(--border-secondary)"}`,
              borderRadius: "12px",
              transition: "all 0.2s ease",
            }}
          >
            <div
              style={{
                padding: "0 14px",
                display: "flex",
                alignItems: "center",
              }}
            >
              <Mail style={{ width: "16px", height: "16px", color: focusedField === "email" ? "var(--accent)" : "var(--text-dim)" }} />
            </div>
            <input
              type="email"
              placeholder="Email address"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              onFocus={() => setFocusedField("email")}
              onBlur={() => setFocusedField(null)}
              style={{
                flex: 1,
                padding: "14px 14px 14px 0",
                fontSize: "14px",
                backgroundColor: "transparent",
                border: "none",
                color: "var(--text-primary)",
                outline: "none",
              }}
            />
          </div>
          {errors.email && (
            <p style={{ fontSize: "12px", color: "#ef4444", marginTop: "6px", marginLeft: "4px" }}>{errors.email}</p>
          )}
        </div>

        {/* Message Field */}
        <div>
          <div
            style={{
              position: "relative",
              display: "flex",
              alignItems: "flex-start",
              backgroundColor: focusedField === "message" ? "var(--bg-hover)" : "var(--bg-tertiary)",
              border: `1px solid ${errors.message ? "#ef4444" : focusedField === "message" ? "var(--accent)" : "var(--border-secondary)"}`,
              borderRadius: "12px",
              transition: "all 0.2s ease",
            }}
          >
            <div
              style={{
                padding: "14px 14px 0",
                display: "flex",
                alignItems: "flex-start",
              }}
            >
              <MessageSquare style={{ width: "16px", height: "16px", color: focusedField === "message" ? "var(--accent)" : "var(--text-dim)" }} />
            </div>
            <textarea
              placeholder="Your message..."
              rows={4}
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              onFocus={() => setFocusedField("message")}
              onBlur={() => setFocusedField(null)}
              style={{
                flex: 1,
                padding: "14px 14px 14px 0",
                fontSize: "14px",
                backgroundColor: "transparent",
                border: "none",
                color: "var(--text-primary)",
                outline: "none",
                resize: "none",
                lineHeight: 1.5,
              }}
            />
          </div>
          {errors.message && (
            <p style={{ fontSize: "12px", color: "#ef4444", marginTop: "6px", marginLeft: "4px" }}>{errors.message}</p>
          )}
        </div>

        {/* Submit Button */}
        <motion.button
          type="submit"
          disabled={isSubmitting}
          whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
          whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "10px",
            padding: "14px 24px",
            fontSize: "14px",
            fontWeight: 600,
            backgroundColor: isSubmitting ? "#333333" : "#ff4d00",
            color: "#ffffff",
            border: "none",
            borderRadius: "12px",
            cursor: isSubmitting ? "not-allowed" : "pointer",
            transition: "all 0.2s ease",
            marginTop: "8px",
          }}
        >
          {isSubmitting ? (
            <>
              <Loader2 style={{ width: "18px", height: "18px", animation: "spin 1s linear infinite" }} />
              Sending...
            </>
          ) : (
            <>
              <Send style={{ width: "18px", height: "18px" }} />
              Send Message
            </>
          )}
        </motion.button>
      </form>

      <style jsx>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </motion.div>
  );
}
