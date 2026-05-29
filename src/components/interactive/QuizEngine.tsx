// src/components/interactive/QuizEngine.tsx

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
  if (pct === 100) return { label: "Sempurna!",         variant: "success"   as const };
  if (pct >= 80)   return { label: "Hampir Sempurna!",  variant: "secondary" as const };
  if (pct >= 60)   return { label: "Cukup Baik",        variant: "primary"   as const };
  return            { label: "Perlu Belajar Lagi",      variant: "accent"    as const };
}

export default function QuizEngine({ questions, modulId }: QuizEngineProps) {
  const [currentIndex,   setCurrentIndex]   = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isCorrect,      setIsCorrect]      = useState<boolean | null>(null);
  const [score,          setScore]          = useState(0);
  const [wrongAnswers,   setWrongAnswers]   = useState<number[]>([]);
  const [showResult,     setShowResult]     = useState(false);

  const currentQ = questions[currentIndex];

  // ── PROGRESS CALCULATION (FIXED) ─────────────────────────────────────
  // answeredCount naik HANYA ketika selectedAnswer tidak null
  // Ini memastikan progress bar hanya bergerak setelah user menjawab
  const answeredCount  = currentIndex + (selectedAnswer !== null ? 1 : 0);
  const progressPercent = Math.round((answeredCount / questions.length) * 100);

  // percentage untuk layar hasil dihitung dari score final
  const finalPercentage = Math.round((score / questions.length) * 100);
  const result          = getResult(finalPercentage);

  // ── Handlers ──────────────────────────────────────────────────────────

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

  // ── Option style ───────────────────────────────────────────────────────

  function getOptionStyle(option: string) {
    if (selectedAnswer === null) {
      return "border-2 border-black dark:border-white bg-white dark:bg-gray-900 text-black dark:text-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,0.7)] hover:bg-yellow-300 hover:text-black hover:border-black dark:hover:bg-yellow-400 dark:hover:text-black dark:hover:border-yellow-400 cursor-pointer active:translate-x-[4px] active:translate-y-[4px] active:shadow-none";
    }
    if (option === currentQ.correctAnswer) {
      return "border-2 border-black bg-lime-300 text-black cursor-default translate-x-[4px] translate-y-[4px]";
    }
    if (option === selectedAnswer) {
      return "border-2 border-black bg-pink-400 text-black cursor-default translate-x-[4px] translate-y-[4px]";
    }
    return "border border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-gray-800 opacity-40 cursor-not-allowed text-gray-500 dark:text-gray-500";
  }

  // ── RESULT SCREEN ──────────────────────────────────────────────────────

  if (showResult) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: [0.34, 1.56, 0.64, 1] }}
        className="rounded-2xl border-4 border-black dark:border-white bg-white dark:bg-gray-900 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] dark:shadow-[8px_8px_0px_0px_rgba(255,255,255,0.8)] p-8 text-center space-y-6"
      >
        {/* Trophy */}
        <motion.div
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          className="inline-flex p-5 rounded-2xl border-4 border-black dark:border-white bg-yellow-300 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] dark:shadow-[6px_6px_0px_0px_rgba(255,255,255,0.8)]"
        >
          <Award size={40} className="text-black" />
        </motion.div>

        {/* Score */}
        <div className="space-y-2">
          <Badge variant={result.variant}>{result.label}</Badge>
          <p className="text-7xl font-black text-black dark:text-white">
            {finalPercentage}
            <span className="text-3xl text-gray-500 dark:text-gray-400">%</span>
          </p>
          <p className="text-gray-600 dark:text-gray-400 text-sm font-medium">
            Menjawab benar {score} dari {questions.length} soal
          </p>
        </div>

        {/* Score bar — full 100% animasi dari 0 ke finalPercentage */}
        <div className="max-w-xs mx-auto space-y-2">
          <div className="h-6 bg-gray-100 dark:bg-gray-800 border-2 border-black dark:border-white overflow-hidden">
            <motion.div
              initial={{ width: "0%" }}
              animate={{ width: `${finalPercentage}%` }}
              transition={{ duration: 1.2, delay: 0.3, ease: "easeOut" }}
              className="h-full bg-yellow-300"
            />
          </div>
        </div>

        {/* Recap jawaban salah */}
        {wrongAnswers.length > 0 && (
          <div className="rounded-xl border-2 border-black dark:border-white bg-pink-200 dark:bg-pink-900/40 p-4 text-left space-y-2">
            <p className="text-sm font-black text-black dark:text-pink-200 uppercase tracking-tight">
              Perlu dipelajari ulang:
            </p>
            {wrongAnswers.map((idx) => (
              <p key={idx} className="text-xs font-medium text-black/80 dark:text-pink-100">
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

  // ── QUESTION SCREEN ────────────────────────────────────────────────────

  return (
    <div className="space-y-5">

      {/* ── Progress ─────────────────────────────────────────────────────── */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-sm">
          {/* Label modul */}
          <span className="text-black dark:text-white font-black uppercase tracking-wider text-xs border-2 border-black dark:border-white px-3 py-0.5 bg-cyan-300 dark:bg-cyan-400 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:shadow-[2px_2px_0px_0px_rgba(255,255,255,0.7)]">
            {modulId}
          </span>

          {/* Counter soal + persen */}
          <div className="flex items-center gap-2">
            <Badge variant="primary" size="sm">
              {currentIndex + 1} / {questions.length}
            </Badge>
            {/* 
              Tampilkan persen secara live agar user tahu progress naik.
              Nilai ini SAMA persis dengan lebar bar di bawah.
            */}
            <span className="font-black text-xs text-black dark:text-white tabular-nums min-w-[3ch] text-right">
              {progressPercent}%
            </span>
          </div>
        </div>

        {/*
          ─── PROGRESS BAR (FIXED) ───────────────────────────────────────
          
          Sebelumnya:
            initial={{ width: `${(currentIndex / total) * 100}%` }}
            animate={{ width: `${((currentIndex + 1) / total) * 100}%` }}
          
          Masalah: `initial` hanya dibaca SEKALI saat mount, bukan reaktif.
          Framer Motion tidak re-mount saat `currentIndex` berubah, sehingga
          `initial` selalu mengacu ke nilai pertama (saat komponen pertama render).
          Akibatnya bar terlihat tidak bergerak karena `animate` selalu
          menghitung dari baseline yang sudah kadaluarsa.
          
          Solusi: Hapus `initial`. Gunakan SATU nilai `animate` yang reaktif
          terhadap `answeredCount`. Bar akan smooth-animate setiap kali
          `answeredCount` berubah (yaitu saat user memilih jawaban).
        */}
        <div className="h-5 bg-gray-100 dark:bg-gray-800 border-2 border-black dark:border-white overflow-hidden">
          <motion.div
            className="h-full bg-yellow-300"
            animate={{ width: `${progressPercent}%` }}
            transition={{ duration: 0.45, ease: "easeOut" }}
          />
        </div>
      </div>

      {/* ── Question card ─────────────────────────────────────────────────── */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentQ.id}
          initial={{ opacity: 0, x: 32 }}
          animate={{ opacity: 1, x: 0  }}
          exit={{    opacity: 0, x: -32 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="rounded-2xl border-4 border-black dark:border-white bg-white dark:bg-gray-900 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] dark:shadow-[8px_8px_0px_0px_rgba(255,255,255,0.8)] p-6 md:p-8 space-y-6"
        >
          {/* Question */}
          <h2 className="text-xl md:text-2xl font-black text-black dark:text-white leading-relaxed">
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
                  "text-left p-4 rounded-xl transition-all duration-200",
                  "flex items-center justify-between gap-3 text-sm font-bold",
                  getOptionStyle(option)
                )}
              >
                <span>{option}</span>

                {/* Feedback icon — benar */}
                {selectedAnswer !== null && option === currentQ.correctAnswer && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 400, damping: 15 }}
                  >
                    <CheckCircle2 size={18} className="text-black shrink-0" />
                  </motion.span>
                )}

                {/* Feedback icon — salah */}
                {selectedAnswer !== null &&
                  option === selectedAnswer &&
                  option !== currentQ.correctAnswer && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 400, damping: 15 }}
                  >
                    <XCircle size={18} className="text-black shrink-0" />
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
                  "rounded-xl border-2 border-black dark:border-white p-4 text-sm leading-relaxed overflow-hidden",
                  isCorrect
                    ? "bg-lime-300 text-black"
                    : "bg-pink-300 dark:bg-pink-400 text-black"
                )}
              >
                <p className="font-black mb-1 uppercase tracking-tight">
                  {isCorrect ? "✓ Tepat Sekali!" : "✗ Kurang Tepat."}
                </p>
                <p className="text-black/80 font-medium">
                  {currentQ.explanation}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </AnimatePresence>

      {/* ── Next button ───────────────────────────────────────────────────── */}
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