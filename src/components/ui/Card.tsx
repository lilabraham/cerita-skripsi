// C:\Users\LENOVO\Documents\cerita-app\src\components\ui\Card.tsx

"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

type CardVariant = "default" | "elevated" | "outlined" | "brutalist";

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

  // Neo-brutalist: thick solid border + hard drop shadow, no blur
  brutalist: [
    "border-4 border-black",
    "shadow-[6px_6px_0px_0px_#000]",
  ].join(" "),
};

export default function Card({
  children,
  variant = "default",
  hover = false,
  className,
  onClick,
}: CardProps) {
  const isBrutalist = variant === "brutalist";

  return (
    <motion.div
      onClick={onClick}
      whileHover={
        hover
          ? isBrutalist
            ? { x: -2, y: -2 }           // brutalist: shift up-left so shadow "grows"
            : { y: -6, scale: 1.01 }      // default: float up
          : {}
      }
      transition={{ duration: 0.15, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={cn(
        "rounded-2xl p-6 transition-colors duration-200",
        variantStyles[variant],
        hover && !isBrutalist && "cursor-pointer hover:border-[var(--border-strong)] hover:bg-[var(--bg-elevated)]",
        hover && isBrutalist && [
          "cursor-pointer",
          "hover:shadow-[8px_8px_0px_0px_#000]", // shadow grows on hover
        ].join(" "),
        onClick && "cursor-pointer",
        className
      )}
    >
      {children}
    </motion.div>
  );
}