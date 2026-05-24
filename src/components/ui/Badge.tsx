import { type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

type BadgeVariant = "primary" | "secondary" | "accent" | "success" | "danger" | "warning" | "muted";
type BadgeSize    = "sm" | "md";

interface BadgeProps {
  children: React.ReactNode;
  variant?: BadgeVariant;
  size?: BadgeSize;
  icon?: LucideIcon;
  dot?: boolean;         // dot animasi pulse
  className?: string;
}

const variantStyles: Record<BadgeVariant, string> = {
  primary:   "bg-indigo-500/10 border-indigo-500/20 text-indigo-300",
  secondary: "bg-teal-500/10   border-teal-500/20   text-teal-300",
  accent:    "bg-orange-500/10 border-orange-500/20 text-orange-300",
  success:   "bg-emerald-500/10 border-emerald-500/20 text-emerald-300",
  danger:    "bg-rose-500/10   border-rose-500/20   text-rose-300",
  warning:   "bg-yellow-500/10 border-yellow-500/20 text-yellow-300",
  muted:     "bg-white/5       border-white/10      text-[var(--text-muted)]",
};

const dotColors: Record<BadgeVariant, string> = {
  primary:   "bg-indigo-400",
  secondary: "bg-teal-400",
  accent:    "bg-orange-400",
  success:   "bg-emerald-400",
  danger:    "bg-rose-400",
  warning:   "bg-yellow-400",
  muted:     "bg-gray-500",
};

const sizeStyles: Record<BadgeSize, string> = {
  sm: "px-2   py-0.5 text-xs gap-1",
  md: "px-3   py-1   text-xs gap-1.5",
};

export default function Badge({
  children,
  variant = "primary",
  size = "md",
  icon: Icon,
  dot = false,
  className,
}: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center font-medium rounded-full border",
        variantStyles[variant],
        sizeStyles[size],
        className
      )}
    >
      {/* Animated dot */}
      {dot && (
        <span className="relative flex h-1.5 w-1.5">
          <span className={cn(
            "animate-ping absolute inline-flex h-full w-full rounded-full opacity-60",
            dotColors[variant]
          )} />
          <span className={cn(
            "relative inline-flex h-1.5 w-1.5 rounded-full",
            dotColors[variant]
          )} />
        </span>
      )}

      {/* Icon */}
      {Icon && !dot && <Icon size={11} />}

      {children}
    </span>
  );
}