"use client";

import { forwardRef, type ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "outline" | "ghost" | "accent";
  size?: "sm" | "md" | "lg";
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "md", ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          // Base styles
          "inline-flex items-center justify-center rounded-lg font-medium transition-all duration-200",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
          "disabled:pointer-events-none disabled:opacity-50",
          // Variants
          {
            default:
              "bg-[rgb(var(--color-accent))] text-[rgb(var(--color-accent-foreground))] hover:opacity-90 focus-visible:ring-[rgb(var(--color-ring))]",
            outline:
              "border border-[rgb(var(--color-border))] bg-transparent hover:bg-[rgb(var(--color-muted))] focus-visible:ring-[rgb(var(--color-ring))]",
            ghost:
              "bg-transparent hover:bg-[rgb(var(--color-muted))] focus-visible:ring-[rgb(var(--color-ring))]",
            accent:
              "bg-[rgb(var(--color-accent))] text-[rgb(var(--color-accent-foreground))] hover:opacity-90 shadow-lg shadow-[rgb(var(--color-accent)/0.25)] focus-visible:ring-[rgb(var(--color-ring))]",
          }[variant],
          // Sizes
          {
            sm: "h-8 px-3 text-sm",
            md: "h-10 px-4 text-sm",
            lg: "h-12 px-6 text-base",
          }[size],
          className
        )}
        {...props}
      />
    );
  }
);

Button.displayName = "Button";

export { Button };

