// C:\Users\LENOVO\Documents\cerita-app\src\components\ui\Button.tsx

"use client";

import { motion } from "framer-motion";
import { type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

type ButtonVariant = "primary" | "secondary" | "ghost";
type ButtonSize    = "sm" | "md" | "lg";

interface ButtonProps {
  children: React.ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  icon?: LucideIcon;
  iconPosition?: "left" | "right";
  disabled?: boolean;
  loading?: boolean;
  fullWidth?: boolean;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  className?: string;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary: [
    "bg-gradient-to-r from-indigo-600 to-indigo-500",
    "text-white",
    "border border-indigo-500/0",
    "shadow-lg shadow-indigo-500/20",
    "hover:shadow-indigo-500/40",
    "hover:from-indigo-500 hover:to-indigo-400",
  ].join(" "),

  secondary: [
    "bg-transparent",
    "text-indigo-300",
    "border border-indigo-500/30",
    "hover:bg-indigo-500/10",
    "hover:border-indigo-400/50",
    "hover:text-indigo-200",
  ].join(" "),

  ghost: "text-[var(--text-primary)] border border-gray-200 dark:border-white/10 hover:bg-gray-50 dark:hover:bg-white/5"
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: "h-8  px-4  text-xs  gap-1.5 rounded-xl",
  md: "h-11 px-6  text-sm  gap-2   rounded-xl",
  lg: "h-13 px-8  text-base gap-2  rounded-2xl",
};

export default function Button({
  children,
  variant = "primary",
  size = "md",
  icon: Icon,
  iconPosition = "right",
  disabled = false,
  loading = false,
  fullWidth = false,
  onClick,
  type = "button",
  className,
}: ButtonProps) {
  const isDisabled = disabled || loading;

  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={isDisabled}
      whileHover={isDisabled ? {} : { scale: 1.02, y: -1 }}
      whileTap={isDisabled  ? {} : { scale: 0.97  }}
      transition={{ duration: 0.15, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={cn(
        // Base
        "relative inline-flex items-center justify-center font-semibold",
        "transition-all duration-200 cursor-pointer select-none",
        "focus-visible:outline-none focus-visible:ring-2",
        "focus-visible:ring-indigo-400 focus-visible:ring-offset-2",
        "focus-visible:ring-offset-[#0a0a0f]",
        // Variant
        variantStyles[variant],
        // Size
        sizeStyles[size],
        // States
        fullWidth && "w-full",
        isDisabled && "opacity-40 cursor-not-allowed pointer-events-none",
        className
      )}
    >
      {/* Loading spinner */}
      {loading && (
        <svg
          className="absolute left-1/2 -translate-x-1/2 w-4 h-4 animate-spin text-current"
          viewBox="0 0 24 24"
          fill="none"
        >
          <circle
            className="opacity-25"
            cx="12" cy="12" r="10"
            stroke="currentColor" strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
          />
        </svg>
      )}

      {/* Content — hidden saat loading agar spinner centered */}
      <span className={cn("inline-flex items-center gap-2", loading && "invisible")}>
        {Icon && iconPosition === "left" && (
          <Icon size={size === "sm" ? 14 : size === "lg" ? 18 : 16} />
        )}
        {children}
        {Icon && iconPosition === "right" && (
          <Icon size={size === "sm" ? 14 : size === "lg" ? 18 : 16} />
        )}
      </span>
    </motion.button>
  );
}