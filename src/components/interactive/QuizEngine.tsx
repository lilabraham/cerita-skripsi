// src/components/interactive/QuizEngine.tsx

"use client";

import { useCallback, useReducer } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { RotateCcw, ArrowRight } from "lucide-react";
import Link from "next/link";
import { type QuizItem } from "@/data/quiz-data";
import { useQuizStore, type ModulId } from "@/store/quizStore";
import QuizHeader from "@/components/interactive/quiz/QuizHeader";
import QuestionCard, { type QuizQuestion } from "@/components/interactive/quiz/QuestionCard";

// ─── Types ────────────────────────────────────────────────────────────────────

interface QuizEngineProps {
  questions: QuizItem[];
  modulId: ModulId;
}

// ─── Result helper ────────────────────────────────────────────────────────────

function getResult(pct: number) {
  if (pct === 100) return { label: "Sempurna!",        variant: "success"   as const, neon: "#C4F135", emoji: "🏆" };
  if (pct >= 80)   return { label: "Hampir Sempurna!", variant: "secondary" as const, neon: "#C4F135", emoji: "⚡" };
  if (pct >= 60)   return { label: "Cukup Baik",       variant: "primary"   as const, neon: "#FFD600", emoji: "👍" };
  return            { label: "Perlu Belajar Lagi",     variant: "accent"    as const, neon: "#FF2D78", emoji: "💪" };
}

// ─── Session State (useReducer) ───────────────────────────────────────────────

interface SessionState {
  currentIndex:   number;
  selectedAnswer: string | null;
  isCorrect:      boolean | null;
  score:          number;
  wrongIndices:   number[];
  phase:          "quiz" | "result";
  finalPercentage: number; // ← disimpan di state agar konsisten
  isAnswering:    boolean; // ← NEW: lock untuk mencegah spam-click
}

type SessionAction =
  | { type: "ANSWER"; answer: string; isCorrect: boolean; questionIndex: number }
  | { type: "NEXT";   isLast: boolean; totalQuestions: number }
  | { type: "FINISH"; finalPercentage: number }
  | { type: "RESTART" };

const initialState = (): SessionState => ({
  currentIndex:    0,
  selectedAnswer:  null,
  isCorrect:       null,
  score:           0,
  wrongIndices:    [],
  phase:           "quiz",
  finalPercentage: 0,
  isAnswering:     false,
});

function sessionReducer(state: SessionState, action: SessionAction): SessionState {
  switch (action.type) {
    case "ANSWER":
      // ✅ Extra safety: ignore if already answering
      if (state.isAnswering) return state;
      return {
        ...state,
        selectedAnswer: action.answer,
        isCorrect:      action.isCorrect,
        isAnswering:    true, // ← lock aktif setelah jawab
        score:          action.isCorrect ? state.score + 1 : state.score,
        wrongIndices:   action.isCorrect
          ? state.wrongIndices
          : [...state.wrongIndices, action.questionIndex],
      };
    case "NEXT": {
      if (action.isLast) return state;
      return {
        ...state,
        currentIndex:   state.currentIndex + 1,
        selectedAnswer: null,
        isCorrect:      null,
        isAnswering:    false, // ← unlock untuk soal berikutnya
      };
    }
    case "FINISH":
      return { ...state, phase: "result", finalPercentage: action.finalPercentage };
    case "RESTART":
      return initialState();
    default:
      return state;
  }
}

// ─── Adapter: QuizItem → QuizQuestion ─────────────────────────────────────────

function toQuizQuestion(item: QuizItem): QuizQuestion {
  return {
    ...item,
    id: String(item.id),
  };
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function QuizEngine({ questions, modulId }: QuizEngineProps) {
  // Ambil updateProgress dari Zustand store
  const updateProgress = useQuizStore((s) => s.updateProgress);

  const [session, dispatch] = useReducer(sessionReducer, undefined, initialState);

  const totalQuestions = questions.length;
  const currentQ       = questions[session.currentIndex];

  // Gunakan finalPercentage dari state (sudah dikalkulasi saat FINISH)
  // Fallback ke kalkulasi langsung untuk tampilan progress bar saat di phase "quiz"
  const displayPercentage = session.phase === "result"
    ? session.finalPercentage
    : Math.round((session.score / totalQuestions) * 100);

  const result = getResult(displayPercentage);

  // ── Handlers ────────────────────────────────────────────────────────────────

  const handleAnswer = useCallback(
    (answer: string) => {
      // ✅ Double guard: selectedAnswer AND isAnswering lock
      if (session.selectedAnswer !== null || session.isAnswering) return;
      const isCorrect = answer === currentQ.correctAnswer;
      dispatch({ type: "ANSWER", answer, isCorrect, questionIndex: session.currentIndex });
    },
    [session.selectedAnswer, session.isAnswering, session.currentIndex, currentQ.correctAnswer]
  );

  const handleNext = useCallback(() => {
    const isLast = session.currentIndex + 1 >= totalQuestions;

    if (isLast) {
      // ✅ Safety net: clamp score ke [0, totalQuestions]
      const clampedScore = Math.min(
        Math.max(session.score + (session.isCorrect ? 1 : 0), 0),
        totalQuestions
      );
      const finalPct = Math.min(
        Math.round((clampedScore / totalQuestions) * 100),
        100
      );

      // ✅ Simpan ke Zustand store dengan nilai yang aman
      updateProgress(modulId, finalPct);

      dispatch({ type: "FINISH", finalPercentage: finalPct });
    } else {
      dispatch({ type: "NEXT", isLast, totalQuestions });
    }
  }, [
    session.currentIndex,
    session.score,
    session.isCorrect,
    totalQuestions,
    modulId,
    updateProgress,
  ]);

  const handleRestart = useCallback(() => {
    dispatch({ type: "RESTART" });
  }, []);

  // ── Guard ────────────────────────────────────────────────────────────────────

  if (!totalQuestions) {
    return (
      <div className="flex items-center justify-center py-20">
        <p className="text-xl font-black uppercase tracking-tighter border-4 border-black dark:border-[#FF2D78] text-black dark:text-white px-6 py-4 shadow-[6px_6px_0px_rgba(0,0,0,1)] dark:shadow-[6px_6px_0px_#FF2D78]">
          Data kuis tidak tersedia.
        </p>
      </div>
    );
  }

  // ── RESULT SCREEN ────────────────────────────────────────────────────────────

  if (session.phase === "result") {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.92, y: 24 }}
        animate={{ opacity: 1, scale: 1,    y: 0  }}
        transition={{ duration: 0.5, ease: [0.34, 1.56, 0.64, 1] }}
        className="w-full"
      >
        {/* Card */}
        <div className="rounded-2xl border-4 border-black dark:border-white bg-white dark:bg-[#0B0F19] p-6 md:p-10 text-center space-y-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] dark:shadow-[8px_8px_0px_0px_rgba(255,255,255,0.8)]">

          {/* Trophy */}
          <motion.div
            animate={{ y: [0, -10, 0], rotate: [0, -4, 4, 0] }}
            transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
            className="inline-flex"
          >
            <div className="p-5 rounded-2xl border-4 border-black dark:border-white text-5xl bg-yellow-300 dark:bg-[#1A2235] shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] dark:shadow-[6px_6px_0px_0px_rgba(255,255,255,0.5)]">
              {result.emoji}
            </div>
          </motion.div>

          {/* Score display */}
          <div className="space-y-1">
            <p
              className="text-8xl font-black leading-none tabular-nums text-black dark:text-[#C4F135]"
              style={{ textShadow: `0 0 40px ${result.neon}40` }}
            >
              {displayPercentage}
              <span className="text-4xl text-black/30 dark:text-white/30">%</span>
            </p>
            <p className="text-xs font-black uppercase tracking-[0.25em] mt-2 text-black dark:text-[#C4F135]">
              {result.label}
            </p>
            <p className="text-black/50 dark:text-white/50 text-sm font-bold mt-1">
              {/* Tampilkan skor final yang sudah tersimpan */}
              {Math.round((displayPercentage / 100) * totalQuestions)} dari {totalQuestions} soal benar
            </p>
          </div>

          {/* Score bar */}
          <div className="space-y-1.5">
            <div className="h-5 bg-black/5 dark:bg-white/5 border-2 border-black dark:border-white/20 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: "0%" }}
                animate={{ width: `${displayPercentage}%` }}
                transition={{ duration: 1.4, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="h-full rounded-full bg-[#C4F135]"
              />
            </div>
          </div>

          {/* Jawaban salah recap */}
          {session.wrongIndices.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0  }}
              transition={{ delay: 0.8 }}
              className="rounded-xl border-2 border-black dark:border-[#FF2D78]/50 bg-red-50 dark:bg-[#FF2D78]/10 p-4 text-left space-y-2"
            >
              <p className="text-[10px] font-black text-red-600 dark:text-[#FF2D78] uppercase tracking-[0.2em]">
                ⚠ Perlu dipelajari ulang
              </p>
              {session.wrongIndices.map((idx: number) => {
                // ✅ Safety check: idx harus valid dan < totalQuestions
                if (idx < 0 || idx >= totalQuestions) return null;
                return (
                  <p key={idx} className="text-xs font-medium text-black/60 dark:text-white/60 leading-relaxed">
                    · {questions[idx].question}
                  </p>
                );
              })}
            </motion.div>
          )}

          {/* Action buttons */}
          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <motion.button
              onClick={handleRestart}
              whileHover={{ y: -2 }}
              whileTap={{ translateX: 4, translateY: 4, boxShadow: "0px 0px 0px 0px rgba(0,0,0,1)" }}
              className="flex-1 flex items-center justify-center gap-2 py-3.5 px-5 rounded-xl border-2 border-black dark:border-white bg-white dark:bg-transparent text-black dark:text-white font-black uppercase tracking-widest text-xs transition-all duration-100 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,0.5)]"
            >
              <RotateCcw size={14} />
              Ulangi
            </motion.button>
            <Link href="/edukasi" className="flex-1">
              <motion.button
                whileHover={{ y: -2 }}
                whileTap={{ translateX: 4, translateY: 4, boxShadow: "0px 0px 0px 0px rgba(0,0,0,1)" }}
                className="w-full flex items-center justify-center gap-2 py-3.5 px-5 rounded-xl border-2 border-black dark:border-black bg-[#C4F135] text-black font-black uppercase tracking-widest text-xs transition-all duration-100 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
              >
                Selesai
                <ArrowRight size={14} />
              </motion.button>
            </Link>
          </div>
        </div>
      </motion.div>
    );
  }

  // ── QUESTION SCREEN ───────────────────────────────────────────────────────────

  return (
    <div className="w-full flex flex-col gap-5">

      {/* ── Header ────────────────────────────────────────────────────────── */}
      <QuizHeader
        currentIndex={session.currentIndex}
        totalQuestions={totalQuestions}
        onQuit={handleRestart}
      />

      {/* ── Question card ─────────────────────────────────────────────────── */}
      <QuestionCard
        question={toQuizQuestion(currentQ)}
        selectedAnswer={session.selectedAnswer}
        isCorrect={session.isCorrect}
        onAnswer={handleAnswer}
      />

      {/* ── Next button ───────────────────────────────────────────────────── */}
      <AnimatePresence>
        {session.selectedAnswer !== null && (
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.95 }}
            animate={{ opacity: 1, y: 0,  scale: 1    }}
            exit={{    opacity: 0, y: 16, scale: 0.95 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="flex justify-end"
          >
            <motion.button
              onClick={handleNext}
              whileHover={{ y: -3 }}
              whileTap={{ translateX: 4, translateY: 4, boxShadow: "0px 0px 0px 0px rgba(0,0,0,1)" }}
              className="flex items-center gap-2.5 py-3.5 px-7 rounded-xl border-2 border-black dark:border-black bg-[#C4F135] text-black font-black uppercase tracking-widest text-sm transition-all duration-100 shadow-[5px_5px_0px_0px_rgba(0,0,0,1)]"
            >
              {session.currentIndex + 1 < totalQuestions ? "Soal Berikutnya" : "Lihat Hasil"}
              <ArrowRight size={16} />
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}