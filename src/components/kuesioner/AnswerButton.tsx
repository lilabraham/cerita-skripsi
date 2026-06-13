// src/components/kuesioner/AnswerButton.tsx

"use client";

import { motion } from "framer-motion";

interface AnswerButtonProps {
  text: string;
  selected: boolean;
  onClick: () => void;
  /** Accent color class applied to bg when selected. Defaults to lime-400. */
  accentClass?: string;
  /** Extra width class, e.g. "flex-1" or "w-full". Defaults to "flex-1". */
  className?: string;
}

export default function AnswerButton({
  text,
  selected,
  onClick,
  accentClass = "bg-lime-400 dark:bg-lime-500",
  className = "flex-1",
}: AnswerButtonProps) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      // Pressed/selected: translate down + shadow collapses
      animate={
        selected
          ? { y: 4, boxShadow: "1px 1px 0px 0px rgba(0,0,0,1)" }
          : { y: 0, boxShadow: "4px 4px 0px 0px rgba(0,0,0,1)" }
      }
      whileHover={
        selected
          ? {}
          : { y: -2, boxShadow: "6px 6px 0px 0px rgba(0,0,0,1)" }
      }
      whileTap={{ y: 4, boxShadow: "1px 1px 0px 0px rgba(0,0,0,1)" }}
      transition={{ type: "spring", stiffness: 400, damping: 20 }}
      className={[
        className,
        "relative py-3 px-4 rounded-xl border-4 border-black dark:border-white",
        "font-black text-sm uppercase tracking-wide transition-colors duration-150",
        "focus:outline-none focus-visible:ring-2 focus-visible:ring-black dark:focus-visible:ring-white",
        selected
          ? `${accentClass} text-black`
          : "bg-white dark:bg-[#0B0F19] text-black dark:text-white",
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {text}
    </motion.button>
  );
}