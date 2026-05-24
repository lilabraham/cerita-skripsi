"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

type CardVariant = "default" | "elevated" | "outlined";

interface CardProps {
  children: React.ReactNode;
  variant?: CardVariant;
  hover?: boolean;
  className?: string;
  onClick?: () => void;
}

const variantStyles: Record<CardVariant, string> = {
  default: [
    "bg-[var(--bg-surface)]",
    "border border-[var(--border-subtle)]",
  ].join(" "),

  elevated: [
    "bg-[var(--bg-elevated)]",
    "border border-[var(--border-default)]",
    "shadow-[var(--shadow-elevation-md)]",
  ].join(" "),

  outlined: [
    "bg-transparent",
    "border border-[var(--border-strong)]",
  ].join(" "),
};

export default function Card({
  children,
  variant = "default",
  hover = false,
  className,
  onClick,
}: CardProps) {
  return (
    <motion.div
      onClick={onClick}
      whileHover={hover ? { y: -6, scale: 1.01 } : {}}
      transition={{ duration: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={cn(
        "rounded-2xl p-6 transition-colors duration-200",
        variantStyles[variant],
        hover && "cursor-pointer hover:border-[var(--border-strong)] hover:bg-[var(--bg-elevated)]",
        onClick && "cursor-pointer",
        className
      )}
    >
      {children}
    </motion.div>
  );
}