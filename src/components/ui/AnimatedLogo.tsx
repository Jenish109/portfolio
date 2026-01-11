"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useTheme } from "@/context/ThemeProvider";

interface AnimatedLogoProps {
  name: string;
  href?: string;
}

export function AnimatedLogo({ name, href = "/" }: AnimatedLogoProps) {
  const { theme } = useTheme();
  const [displayText, setDisplayText] = useState("");
  const [showCursor, setShowCursor] = useState(true);
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
    let currentIndex = 0;
    const typingSpeed = 100; // ms per character
    const cursorBlinkSpeed = 500; // ms

    // Typing animation
    const typingInterval = setInterval(() => {
      if (currentIndex < name.length) {
        setDisplayText(name.slice(0, currentIndex + 1));
        currentIndex++;
      } else {
        setIsTyping(false);
        clearInterval(typingInterval);
      }
    }, typingSpeed);

    // Cursor blinking animation
    const cursorInterval = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, cursorBlinkSpeed);

    return () => {
      clearInterval(typingInterval);
      clearInterval(cursorInterval);
    };
  }, [name]);

  const content = (
    <div
      style={{
        display: "inline-flex",
        alignItems: "center",
        fontSize: "20px",
        fontWeight: 700,
        cursor: "pointer",
        fontFamily: "var(--font-anonymous-pro), 'Anonymous Pro', monospace",
        color: theme === "dark" ? "#ffffff" : "#0a0a0a",
        position: "relative",
        textDecoration: "none",
      }}
    >
      <span style={{ color: "#ff4d00" }}>{displayText[0] || ""}</span>
      <span style={{ color: theme === "dark" ? "#ffffff" : "#0a0a0a" }}>
        {displayText.slice(1)}
      </span>
      {(isTyping || showCursor) && (
        <span
          className="logo-cursor"
          style={{
            display: "inline-block",
            width: "2px",
            height: "20px",
            backgroundColor: theme === "dark" ? "rgba(255,255,255,0.75)" : "rgba(0,0,0,0.75)",
            marginLeft: "4px",
            animation: "blink 1s infinite",
            verticalAlign: "middle",
          }}
        />
      )}
    </div>
  );

  if (href) {
    return (
      <Link
        href={href}
        style={{
          textDecoration: "none",
        }}
      >
        {content}
      </Link>
    );
  }

  return content;
}
