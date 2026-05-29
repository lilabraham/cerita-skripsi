// src/components/interactive/quiz/QuestionCard.tsx

"use client";

import { useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, XCircle, Lightbulb } from "lucide-react";
import { cn } from "@/lib/utils";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface QuizQuestion {
  id:            string;
  question:      string;
  options:       string[];
  correctAnswer: string;
  explanation:   string;
}

interface QuestionCardProps {
  question:       QuizQuestion;
  selectedAnswer: string | null;
  isCorrect:      boolean | null;
  onAnswer:       (answer: string) => void;
}

// ─── Option state ─────────────────────────────────────────────────────────────

type OptionState = "idle" | "correct" | "wrong" | "dimmed";

function getOptionState(
  option:        string,
  selected:      string | null,
  correctAnswer: string,
): OptionState {
  if (selected === null) return "idle";
  if (option === correctAnswer)                        return "correct";
  if (option === selected && option !== correctAnswer) return "wrong";
  return "dimmed";
}

// ─── Shake animation ──────────────────────────────────────────────────────────

const shakeVariants = {
  idle:  { x: 0 },
  shake: {
    x: [0, -10, 10, -8, 8, -4, 4, 0],
    transition: { duration: 0.5, ease: [0.42, 0, 0.58, 1] as const },
  },
};

// ─── Option Index Label ───────────────────────────────────────────────────────

const OPTION_LABELS = ["A", "B", "C", "D", "E", "F"] as const;

interface OptionLabelProps {
  idx:   number;
  state: OptionState;
}

function OptionLabel({ idx, state }: OptionLabelProps) {
  const styleMap: Record<OptionState, string> = {
    idle:    "bg-black text-white dark:bg-white dark:text-black border-2 border-black dark:border-white",
    correct: "bg-[#C4F135] text-black border-2 border-black",
    wrong:   "bg-red-500 text-white border-2 border-black",
    dimmed:  "bg-black/10 dark:bg-white/10 text-black/30 dark:text-white/20 border-2 border-black/10 dark:border-white/10",
  };

  return (
    <span
      className={cn(
        "shrink-0 w-7 h-7 rounded-md text-[11px] font-black flex items-center justify-center transition-all duration-200",
        styleMap[state]
      )}
    >
      {OPTION_LABELS[idx] ?? idx + 1}
    </span>
  );
}

// ─── Option Button ────────────────────────────────────────────────────────────

interface OptionButtonProps {
  option:     string;
  idx:        number;
  state:      OptionState;
  isAnswered: boolean;
  onSelect:   () => void;
}

function OptionButton({ option, idx, state, isAnswered, onSelect }: OptionButtonProps) {
  // Kelas dasar neo-brutalist: bg putih, border hitam, shadow offset
  const baseClass = [
    "relative w-full text-left rounded-xl",
    "flex items-center gap-3 min-h-[60px] px-4 py-3.5",
    "text-sm font-bold leading-snug",
    "border-2 border-black dark:border-white",
    "transition-all duration-100",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black",
  ].join(" ");

  // Kelas per state
  const stateClass: Record<OptionState, string> = {
    idle: cn(
      "bg-white dark:bg-[#1A2235] text-black dark:text-white",
      "shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,0.5)]",
      "hover:-translate-y-1 hover:bg-yellow-300 dark:hover:bg-cyan-900",
      "active:translate-x-1 active:translate-y-1 active:shadow-none",
      "cursor-pointer"
    ),
    correct: cn(
      "bg-[#C4F135] dark:bg-[#C4F135]/20 text-black dark:text-[#C4F135]",
      "border-black dark:border-[#C4F135]",
      "translate-x-[4px] translate-y-[4px] shadow-none",
      "cursor-default"
    ),
    wrong: cn(
      "bg-red-100 dark:bg-[#FF2D78]/20 text-red-700 dark:text-[#FF2D78]",
      "border-red-600 dark:border-[#FF2D78]",
      "translate-x-[4px] translate-y-[4px] shadow-none",
      "cursor-default"
    ),
    dimmed: cn(
      "bg-black/5 dark:bg-white/5 text-black/25 dark:text-white/20",
      "border-black/10 dark:border-white/10",
      "shadow-none opacity-40",
      "cursor-not-allowed"
    ),
  };

  return (
    <motion.div
      variants={shakeVariants}
      animate={state === "wrong" ? "shake" : "idle"}
    >
      <motion.button
        onClick={onSelect}
        disabled={isAnswered}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{
          delay: idx * 0.07 + 0.08,
          duration: 0.32,
          ease: [0.22, 1, 0.36, 1],
        }}
        className={cn(baseClass, stateClass[state])}
      >
        {/* Label */}
        <OptionLabel idx={idx} state={state} />

        {/* Text */}
        <span className="flex-1">{option}</span>

        {/* Feedback icon */}
        <AnimatePresence>
          {state === "correct" && (
            <motion.span
              key="check"
              initial={{ scale: 0, rotate: -30 }}
              animate={{ scale: 1, rotate: 0 }}
              exit={{ scale: 0 }}
              transition={{ type: "spring", stiffness: 500, damping: 20 }}
              className="shrink-0"
            >
              <CheckCircle2 size={20} className="text-black" />
            </motion.span>
          )}
          {state === "wrong" && (
            <motion.span
              key="x"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              transition={{ type: "spring", stiffness: 500, damping: 20 }}
              className="shrink-0"
            >
              <XCircle size={20} className="text-red-600 dark:text-[#FF2D78]" />
            </motion.span>
          )}
        </AnimatePresence>
      </motion.button>
    </motion.div>
  );
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function QuestionCard({
  question,
  selectedAnswer,
  isCorrect,
  onAnswer,
}: QuestionCardProps) {

  const handleOptionClick = useCallback(
    (option: string) => {
      if (selectedAnswer !== null) return;
      onAnswer(option);
    },
    [selectedAnswer, onAnswer]
  );

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={question.id}
        initial={{ opacity: 0, x: 56, rotate: 1.5  }}
        animate={{ opacity: 1, x: 0,  rotate: 0    }}
        exit={{    opacity: 0, x: -56, rotate: -1.5 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        // ✅ Neo-Brutalist sejati: bg putih/gelap, border hitam tebal, shadow offset bold
        className="rounded-2xl overflow-hidden border-4 border-black dark:border-white bg-white dark:bg-[#0B0F19] shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] dark:shadow-[8px_8px_0px_0px_rgba(255,255,255,0.8)]"
      >

        {/* ── Question section ─────────────────────────────────────────────── */}
        <div className="p-5 md:p-8 border-b-4 border-black dark:border-white/20 relative bg-yellow-50 dark:bg-[#0B0F19]">
          {/* Corner accent */}
          <div className="absolute top-0 right-0 w-20 h-20 bg-[#C4F135] opacity-30 rounded-bl-full" />

          {/* "Pertanyaan" badge */}
          <div className="mb-3 md:mb-4 inline-flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-[9px] font-black uppercase tracking-[0.2em] text-black bg-[#C4F135] border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
              Pertanyaan
            </span>
          </div>

          <h2 className="text-lg md:text-2xl font-black text-black dark:text-white leading-relaxed tracking-tight">
            {question.question}
          </h2>
        </div>

        {/* ── Options section ───────────────────────────────────────────────── */}
        <div className="p-5 md:p-8 space-y-3 bg-white dark:bg-[#0B0F19]">
          {question.options.map((option, idx) => {
            const state = getOptionState(option, selectedAnswer, question.correctAnswer);
            return (
              <OptionButton
                key={option}
                option={option}
                idx={idx}
                state={state}
                isAnswered={selectedAnswer !== null}
                onSelect={() => handleOptionClick(option)}
              />
            );
          })}
        </div>

        {/* ── Explanation panel ─────────────────────────────────────────────── */}
        <AnimatePresence>
          {selectedAnswer !== null && (
            <motion.div
              initial={{ opacity: 0, height: 0      }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{    opacity: 0, height: 0       }}
              transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
              className="overflow-hidden"
            >
              <div
                className={cn(
                  "mx-4 md:mx-6 mb-5 md:mb-6 rounded-xl border-2 border-black dark:border-white/30 p-4",
                  "flex gap-3 items-start",
                  isCorrect
                    ? "bg-[#C4F135]/20 dark:bg-[#C4F135]/10"
                    : "bg-red-50 dark:bg-[#FF2D78]/10"
                )}
              >
                {/* Icon */}
                <motion.div
                  initial={{ scale: 0, rotate: -20 }}
                  animate={{ scale: 1, rotate: 0   }}
                  transition={{ type: "spring", stiffness: 400, damping: 16, delay: 0.1 }}
                  className="shrink-0 mt-0.5"
                >
                  <Lightbulb
                    size={17}
                    className={isCorrect ? "text-black dark:text-[#C4F135]" : "text-red-600 dark:text-[#FF2D78]"}
                  />
                </motion.div>

                {/* Text */}
                <div className="space-y-1">
                  <p className={cn(
                    "text-[10px] font-black uppercase tracking-[0.15em]",
                    isCorrect ? "text-black dark:text-[#C4F135]" : "text-red-600 dark:text-[#FF2D78]"
                  )}>
                    {isCorrect ? "✓ Tepat Sekali!" : "✗ Kurang Tepat."}
                  </p>
                  <p className="text-xs font-medium leading-relaxed text-black/60 dark:text-white/60">
                    {question.explanation}
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </motion.div>
    </AnimatePresence>
  );
}