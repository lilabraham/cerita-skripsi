"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export function StarAccent({
  size = 20,
  duration = 12,
  className,
}: {
  size?: number;
  duration?: number;
  className?: string;
}) {
  return (
    <motion.svg
      width={size}
      height={size}
      viewBox="0 0 20 20"
      className={cn("absolute pointer-events-none", className)}
      animate={{ rotate: 360 }}
      transition={{ duration, repeat: Infinity, ease: "linear" }}
    >
      <path
        d="M10 1.5L11.8 7.5L18 10L11.8 12.5L10 18.5L8.2 12.5L2 10L8.2 7.5Z"
        fill="currentColor"
      />
    </motion.svg>
  );
}

export function CowboyHat({ className }: { className?: string }) {
  return (
    <motion.svg
      viewBox="0 0 60 40"
      className={cn("absolute pointer-events-none", className)}
      animate={{ rotate: [-8, 8, -8], y: [0, -8, 0] }}
      transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
    >
      <ellipse cx="30" cy="36" rx="27" ry="4" fill="#000" opacity="0.12" />
      <ellipse cx="30" cy="32" rx="27" ry="6" fill="#4c1d95" />
      <path d="M10,30 Q14,10 30,8 Q46,10 50,30" fill="#5b21b6" />
      <ellipse cx="30" cy="8" rx="11" ry="4" fill="#6d28d9" />
      <path
        d="M19,30 Q30,25 41,30"
        stroke="#a78bfa"
        strokeWidth="2"
        fill="none"
        strokeLinecap="round"
      />
      <polygon
        points="30,4 31,7 33.5,7 31.5,8.5 32.5,11 30,9.5 27.5,11 28.5,8.5 26.5,7 29,7"
        fill="#fbbf24"
      />
    </motion.svg>
  );
}

export function WavyDot({
  className,
  delay = 0,
}: {
  className?: string;
  delay?: number;
}) {
  return (
    <motion.div
      className={cn("absolute rounded-full pointer-events-none", className)}
      animate={{ y: [0, -10, 0], scale: [1, 1.2, 1] }}
      transition={{ duration: 4, delay, repeat: Infinity, ease: "easeInOut" }}
    />
  );
}