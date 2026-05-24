"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, XCircle, Award, RotateCcw, ArrowRight } from "lucide-react";
import Link from "next/link";
import { type QuizItem } from "@/data/quiz-data";
import { cn } from "@/lib/utils";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";

interface QuizEngineProps {
  questions: QuizItem[];
  modulId: string;
}

function getResult(pct: number) {
  if (pct === 100) return { label: "Sempurna!",         color: "text-emerald-400", variant: "success"   as const };
  if (pct >= 80)   return { label: "Hampir Sempurna!",  color: "text-teal-400",    variant: "secondary" as const };
  if (pct >= 60)   return { label: "Cukup Baik",        color: "text-indigo-400",  variant: "primary"   as const };
  return            { label: "Perlu Belajar Lagi",      color: "text-orange-400",  variant: "accent"    as const };
}

export default function QuizEngine({ questions, modulId }: QuizEngineProps) {
  const [currentIndex,   setCurrentIndex]   = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isCorrect,      setIsCorrect]      = useState<boolean | null>(null);
  const [score,          setScore]          = useState(0);
  const [wrongAnswers,   setWrongAnswers]   = useState<number[]>([]);
  const [showResult,     setShowResult]     = useState(false);

  const currentQ   = questions[currentIndex];
  const percentage = Math.round((score / questions.length) * 100);
  const result     = getResult(percentage);

  // ── Handlers ──────────────────────────────────────────

  function handleAnswer(answer: string) {
    if (selectedAnswer !== null) return;
    const correct = answer === currentQ.correctAnswer;
    setSelectedAnswer(answer);
    setIsCorrect(correct);
    if (correct) {
      setScore((s) => s + 1);
    } else {
      setWrongAnswers((w) => [...w, currentIndex]);
    }
  }

  function handleNext() {
    if (currentIndex + 1 < questions.length) {
      setCurrentIndex((i) => i + 1);
      setSelectedAnswer(null);
      setIsCorrect(null);
    } else {
      setShowResult(true);
    }
  }

  function handleReset() {
    setCurrentIndex(0);
    setSelectedAnswer(null);
    setIsCorrect(null);
    setScore(0);
    setWrongAnswers([]);
    setShowResult(false);
  }

  // ── Option style ───────────────────────────────────────

  function getOptionStyle(option: string) {
    if (selectedAnswer === null) {
      return "border-[var(--border-default)] bg-[var(--bg-elevated)] hover:border-indigo-400/50 hover:bg-indigo-500/5 cursor-pointer text-[var(--text-secondary)]";
    }
    if (option === currentQ.correctAnswer) {
      return "border-teal-500/50 bg-teal-500/10 text-teal-300 cursor-default";
    }
    if (option === selectedAnswer) {
      return "border-rose-500/50 bg-rose-500/10 text-rose-300 cursor-default";
    }
    return "border-[var(--border-subtle)] bg-[var(--bg-surface)] opacity-40 cursor-not-allowed text-[var(--text-muted)]";
  }

  // ── RESULT SCREEN ──────────────────────────────────────

  if (showResult) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: [0.34, 1.56, 0.64, 1] }}
        className="rounded-2xl border border-[var(--border-default)] bg-[var(--bg-surface)] p-8 text-center space-y-6"
      >
        {/* Trophy */}
        <motion.div
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          className="inline-flex p-5 rounded-2xl bg-yellow-500/10 border border-yellow-500/20"
        >
          <Award size={40} className="text-yellow-400" />
        </motion.div>

        {/* Score */}
        <div className="space-y-2">
          <Badge variant={result.variant}>{result.label}</Badge>
          <p className={`text-6xl font-black ${result.color}`}>
            {percentage}
            <span className="text-2xl text-[var(--text-muted)]">%</span>
          </p>
          <p className="text-[var(--text-secondary)] text-sm">
            Menjawab benar {score} dari {questions.length} soal
          </p>
        </div>

        {/* Score bar */}
        <div className="max-w-xs mx-auto space-y-2">
          <div className="h-2 bg-[var(--bg-elevated)] rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${percentage}%` }}
              transition={{ duration: 1.2, delay: 0.3, ease: "easeOut" }}
              className="h-full bg-gradient-to-r from-indigo-500 to-teal-500 rounded-full"
            />
          </div>
        </div>

        {/* Recap jawaban salah */}
        {wrongAnswers.length > 0 && (
          <div className="rounded-xl border border-rose-500/20 bg-rose-500/5 p-4 text-left space-y-2">
            <p className="text-sm font-semibold text-rose-300">
              Perlu dipelajari ulang:
            </p>
            {wrongAnswers.map((idx) => (
              <p key={idx} className="text-xs text-[var(--text-secondary)]">
                · {questions[idx].question}
              </p>
            ))}
          </div>
        )}

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button
            variant="secondary"
            icon={RotateCcw}
            iconPosition="left"
            onClick={handleReset}
          >
            Ulangi Kuis
          </Button>
          <Link href="/edukasi">
            <Button variant="primary" icon={ArrowRight}>
              Selesai &amp; Lanjut
            </Button>
          </Link>
        </div>
      </motion.div>
    );
  }

  // ── QUESTION SCREEN ────────────────────────────────────

  return (
    <div className="space-y-5">

      {/* Progress */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-sm">
          <span className="text-indigo-400 font-semibold uppercase tracking-wider text-xs">
            {modulId}
          </span>
          <Badge variant="primary" size="sm">
            {currentIndex + 1} / {questions.length}
          </Badge>
        </div>
        <div className="h-1.5 bg-[var(--bg-elevated)] rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-indigo-500 to-teal-500 rounded-full"
            initial={{ width: `${(currentIndex / questions.length) * 100}%` }}
            animate={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          />
        </div>
      </div>

      {/* Question card */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentQ.id}
          initial={{ opacity: 0, x: 32 }}
          animate={{ opacity: 1, x: 0  }}
          exit={{    opacity: 0, x: -32 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="rounded-2xl border border-[var(--border-default)] bg-[var(--bg-surface)] p-6 md:p-8 space-y-6"
        >
          {/* Question */}
          <h2 className="text-xl font-semibold text-white leading-relaxed">
            {currentQ.question}
          </h2>

          {/* Options */}
          <div className="grid gap-3">
            {currentQ.options.map((option, idx) => (
              <motion.button
                key={idx}
                onClick={() => handleAnswer(option)}
                disabled={selectedAnswer !== null}
                whileHover={selectedAnswer === null ? { scale: 1.01 } : {}}
                whileTap={selectedAnswer  === null ? { scale: 0.99 } : {}}
                className={cn(
                  "text-left p-4 rounded-xl border transition-all duration-200",
                  "flex items-center justify-between gap-3 text-sm font-medium",
                  getOptionStyle(option)
                )}
              >
                <span>{option}</span>

                {/* Feedback icon */}
                {selectedAnswer !== null && option === currentQ.correctAnswer && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 400, damping: 15 }}
                  >
                    <CheckCircle2 size={18} className="text-teal-400 shrink-0" />
                  </motion.span>
                )}
                {selectedAnswer !== null &&
                  option === selectedAnswer &&
                  option !== currentQ.correctAnswer && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 400, damping: 15 }}
                  >
                    <XCircle size={18} className="text-rose-400 shrink-0" />
                  </motion.span>
                )}
              </motion.button>
            ))}
          </div>

          {/* Explanation */}
          <AnimatePresence>
            {selectedAnswer !== null && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{    opacity: 0, height: 0    }}
                transition={{ duration: 0.3 }}
                className={cn(
                  "rounded-xl border p-4 text-sm leading-relaxed overflow-hidden",
                  isCorrect
                    ? "border-teal-500/20   bg-teal-500/5   text-teal-200"
                    : "border-orange-500/20 bg-orange-500/5 text-orange-200"
                )}
              >
                <p className="font-semibold mb-1">
                  {isCorrect ? "✓ Tepat Sekali!" : "✗ Kurang Tepat."}
                </p>
                <p className="text-[var(--text-secondary)]">
                  {currentQ.explanation}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </AnimatePresence>

      {/* Next button */}
      <AnimatePresence>
        {selectedAnswer !== null && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0  }}
            exit={{    opacity: 0, y: 12 }}
            className="flex justify-end"
          >
            <Button variant="primary" icon={ArrowRight} onClick={handleNext}>
              {currentIndex + 1 < questions.length
                ? "Soal Berikutnya"
                : "Lihat Hasil"}
            </Button>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}