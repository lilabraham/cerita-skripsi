// src/components/kuesioner/QuestionCard.tsx

"use client";

import { motion } from "framer-motion";

interface QuestionCardProps {
  no: number;
  total: number;
  pertanyaan: string;
  children: React.ReactNode;
  /** Accent dot color class. Defaults to lime-400. */
  accentClass?: string;
}

const cardVariants = {
  hidden:  { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 220, damping: 22 } },
};

export default function QuestionCard({
  no,
  total,
  pertanyaan,
  children,
  accentClass = "bg-lime-400 dark:bg-lime-500",
}: QuestionCardProps) {
  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      className="rounded-2xl border-4 border-black dark:border-white bg-white dark:bg-[#0B0F19] shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] dark:shadow-[6px_6px_0px_0px_rgba(255,255,255,0.2)] overflow-hidden"
    >
      {/* Header bar */}
      <div className="flex items-center gap-3 px-5 py-3 border-b-4 border-black dark:border-white bg-gray-50 dark:bg-[#080B12]">
        <span
          className={`${accentClass} w-8 h-8 rounded-lg border-4 border-black dark:border-white flex items-center justify-center font-black text-xs text-black flex-shrink-0`}
        >
          {no}
        </span>
        <span className="font-bold text-xs text-gray-500 dark:text-gray-400 uppercase tracking-widest">
          Soal {no} / {total}
        </span>
      </div>

      {/* Question text */}
      <div className="px-5 pt-5 pb-4">
        <p className="font-black text-base sm:text-lg leading-snug text-black dark:text-white">
          {pertanyaan}
        </p>
      </div>

      {/* Answer slot */}
      <div className="px-5 pb-5">{children}</div>
    </motion.div>
  );
}