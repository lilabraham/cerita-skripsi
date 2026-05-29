// src/components/interactive/quiz/QuizHeader.tsx

"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Zap } from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────

interface QuizHeaderProps {
  currentIndex:   number;
  totalQuestions: number;
  onQuit:         () => void; // Prop dipertahankan agar tidak break interface, tapi tidak dirender
}

// ─── Segment Bar ─────────────────────────────────────────────────────────────

interface SegmentProps {
  filled:   boolean;
  isActive: boolean;
  index:    number;
}

function Segment({ filled, isActive, index }: SegmentProps) {
  return (
    <motion.div
      className="relative flex-1 h-full overflow-hidden rounded-sm"
      style={{
        border: isActive
          ? "2px solid #000"
          : filled
          ? "2px solid #000"
          : "2px solid rgba(0,0,0,0.2)",
        transition: "border 0.3s, box-shadow 0.3s",
      }}
    >
      {/* Base */}
      <div className="absolute inset-0 bg-black/5 dark:bg-white/5" />

      {/* Filled */}
      <AnimatePresence>
        {filled && (
          <motion.div
            key={`fill-${index}`}
            className="absolute inset-0 bg-[#C4F135]"
            initial={{ scaleX: 0, originX: 0 }}
            animate={{ scaleX: 1 }}
            exit={{ scaleX: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1], delay: index * 0.025 }}
          />
        )}
      </AnimatePresence>

      {/* Active */}
      {isActive && (
        <motion.div
          className="absolute inset-0 bg-yellow-300"
          animate={{ opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
        />
      )}

      {/* Shine on filled */}
      {filled && (
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent"
          initial={{ x: "-100%" }}
          animate={{ x: "250%" }}
          transition={{ duration: 0.5, ease: "easeOut", delay: index * 0.025 + 0.15 }}
        />
      )}
    </motion.div>
  );
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function QuizHeader({
  currentIndex,
  totalQuestions,
  // onQuit prop diterima tapi TIDAK dirender — tombol Keluar sudah ada di page.tsx
}: QuizHeaderProps) {
  const progressPercent = Math.round((currentIndex / totalQuestions) * 100);

  return (
    <div className="space-y-3">

      {/* ── Top row: Counter saja, tanpa tombol Keluar ───────────────────── */}
      <div className="flex items-center justify-between gap-3">

        {/* Soal counter — kiri */}
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, scale: 0.6, y: -8 }}
          animate={{ opacity: 1, scale: 1,   y: 0  }}
          transition={{ type: "spring", stiffness: 520, damping: 22 }}
          className="flex items-baseline gap-1"
        >
          <motion.span
            animate={{ opacity: [1, 0.3, 1] }}
            transition={{ duration: 1.1, repeat: Infinity }}
            className="inline-block w-2 h-2 rounded-full mr-1 bg-black dark:bg-[#C4F135]"
            style={{ boxShadow: "0 0 6px rgba(0,0,0,0.5)" }}
          />
          <span className="text-2xl font-black text-black dark:text-white tabular-nums leading-none">
            {currentIndex + 1}
          </span>
          <span className="text-sm font-black text-black/30 dark:text-white/30 leading-none">
            /{totalQuestions}
          </span>
        </motion.div>

        {/* Status chip — kanan */}
        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border-2 border-black dark:border-white/20 bg-yellow-300 dark:bg-[#C4F135]/10">
          <Zap size={10} className="text-black dark:text-[#C4F135]" />
          <span className="text-[9px] font-black uppercase tracking-[0.2em] text-black dark:text-[#C4F135]">
            Kuis Aktif
          </span>
        </div>
      </div>

      {/* ── Progress bar ────────────────────────────────────────────────────── */}
      <div className="space-y-1.5">
        {totalQuestions <= 10 ? (
          /* Segmented arcade bar */
          <div
            className="flex gap-1.5 h-4"
            role="progressbar"
            aria-valuenow={currentIndex}
            aria-valuemin={0}
            aria-valuemax={totalQuestions}
            aria-label={`Soal ${currentIndex + 1} dari ${totalQuestions}`}
          >
            {Array.from({ length: totalQuestions }).map((_, i) => (
              <Segment
                key={i}
                index={i}
                filled={i < currentIndex}
                isActive={i === currentIndex}
              />
            ))}
          </div>
        ) : (
          /* Solid bar fallback untuk soal > 10 */
          <div
            className="h-4 border-2 border-black dark:border-white/30 overflow-hidden rounded-sm bg-black/5 dark:bg-white/5"
            role="progressbar"
            aria-valuenow={progressPercent}
            aria-valuemin={0}
            aria-valuemax={100}
          >
            <motion.div
              className="h-full bg-[#C4F135] relative"
              animate={{ width: `${progressPercent}%` }}
              transition={{ duration: 0.45, ease: "easeOut" }}
            >
              <div className="absolute inset-y-0 right-0 w-5 bg-gradient-to-r from-transparent to-white/30" />
            </motion.div>
          </div>
        )}

        {/* Persen label */}
        <motion.p
          key={progressPercent}
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-right text-[9px] font-black tabular-nums text-black/40 dark:text-white/30 uppercase tracking-widest"
        >
          {progressPercent}% selesai
        </motion.p>
      </div>
    </div>
  );
}