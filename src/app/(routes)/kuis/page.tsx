"use client";

import { useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";
import Link from "next/link";
import { ArrowLeft, CheckCircle2, XCircle, Award, RotateCcw } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { quizData } from "@/data/quiz-data";
import { cn } from "@/lib/utils";

function QuizBoard() {
  const searchParams = useSearchParams();
  const modulId = searchParams.get("modul");

  // 1. Validasi Modul
  const questions = modulId ? quizData[modulId] : null;

  // 2. State Management untuk Logika Game
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [score, setScore] = useState<number>(0);
  const [showResult, setShowResult] = useState<boolean>(false);

  // Jika URL tidak valid atau data kuis belum dibuat
  if (!questions || questions.length === 0) {
    return (
      <div className="rounded-2xl border border-red-500/20 bg-red-500/5 p-8 text-center">
        <p className="text-red-400 font-medium">Kuis untuk modul ini tidak ditemukan.</p>
        <Link href="/edukasi" className="text-sm text-red-300 underline mt-2 block">
          Kembali ke daftar modul
        </Link>
      </div>
    );
  }

  const currentQ = questions[currentIndex];

  // 3. Fungsi Menjawab Soal
  const handleAnswer = (answer: string) => {
    // Kunci tombol jika user sudah menjawab
    if (selectedAnswer !== null) return;

    const correct = answer === currentQ.correctAnswer;
    setSelectedAnswer(answer);
    setIsCorrect(correct);

    if (correct) {
      setScore((prev) => prev + 1);
    }
  };

  // 4. Fungsi Lanjut ke Soal Berikutnya / Selesai
  const handleNext = () => {
    if (currentIndex + 1 < questions.length) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedAnswer(null);
      setIsCorrect(null);
    } else {
      setShowResult(true);
    }
  };

  // 5. Tampilan Jika Kuis Selesai
  if (showResult) {
    const percentage = Math.round((score / questions.length) * 100);
    const passed = percentage >= 70;

    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="rounded-3xl border border-white/10 bg-white/5 p-8 text-center shadow-2xl"
      >
        <Award size={64} className={cn("mx-auto mb-4", passed ? "text-teal-400" : "text-orange-400")} />
        <h2 className="text-3xl font-bold text-white mb-2">Kuis Selesai!</h2>
        <p className="text-gray-400 mb-6">Kamu telah menyelesaikan modul {modulId?.toUpperCase()}</p>
        
        <div className="text-6xl font-black mb-2 text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-teal-400">
          {percentage}%
        </div>
        <p className="text-gray-400 mb-8">Menjawab benar {score} dari {questions.length} soal</p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => {
              setCurrentIndex(0);
              setSelectedAnswer(null);
              setIsCorrect(null);
              setScore(0);
              setShowResult(false);
            }}
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl border border-white/10 hover:bg-white/5 text-white transition-colors"
          >
            <RotateCcw size={18} />
            Ulangi Kuis
          </button>
          <Link
            href="/edukasi"
            className="inline-flex items-center justify-center px-6 py-3 rounded-xl bg-teal-500 hover:bg-teal-400 text-white font-semibold transition-colors shadow-lg shadow-teal-500/20"
          >
            Selesai & Lanjut
          </Link>
        </div>
      </motion.div>
    );
  }

  // 6. Tampilan Saat Kuis Berlangsung
  return (
    <div className="space-y-6">
      {/* Progress Bar & Info */}
      <div className="flex items-center justify-between text-sm font-medium mb-2">
        <span className="text-indigo-400 uppercase tracking-wider">{modulId}</span>
        <span className="text-gray-400">
          Soal {currentIndex + 1} dari {questions.length}
        </span>
      </div>
      <div className="w-full bg-white/5 h-2 rounded-full overflow-hidden">
        <motion.div 
          className="bg-indigo-500 h-full rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }}
        />
      </div>

      {/* Pertanyaan & Pilihan Ganda */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentQ.id}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
          className="rounded-3xl border border-white/10 bg-white/5 p-6 md:p-8"
        >
          <h2 className="text-xl md:text-2xl font-semibold text-white mb-8 leading-relaxed">
            {currentQ.question}
          </h2>

          <div className="grid gap-3">
            {currentQ.options.map((option, idx) => {
              const isSelected = selectedAnswer === option;
              const isTheCorrectOne = option === currentQ.correctAnswer;
              
              // Logika pewarnaan state jawaban
              let btnStyle = "border-white/10 hover:bg-white/5 hover:border-indigo-500/50 text-gray-300";
              if (selectedAnswer !== null) {
                if (isTheCorrectOne) {
                  btnStyle = "bg-teal-500/20 border-teal-500/50 text-teal-300"; // Hijau jika benar
                } else if (isSelected && !isTheCorrectOne) {
                  btnStyle = "bg-red-500/20 border-red-500/50 text-red-300"; // Merah jika salah tebak
                } else {
                  btnStyle = "border-white/5 opacity-50 cursor-not-allowed"; // Redupkan yang lain
                }
              }

              return (
                <button
                  key={idx}
                  onClick={() => handleAnswer(option)}
                  disabled={selectedAnswer !== null}
                  className={cn(
                    "text-left p-4 rounded-xl border transition-all duration-300",
                    btnStyle
                  )}
                >
                  <div className="flex items-center justify-between">
                    <span>{option}</span>
                    {selectedAnswer !== null && isTheCorrectOne && <CheckCircle2 size={20} className="text-teal-400 shrink-0" />}
                    {selectedAnswer !== null && isSelected && !isTheCorrectOne && <XCircle size={20} className="text-red-400 shrink-0" />}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Penjelasan Muncul Setelah Menjawab */}
          {selectedAnswer !== null && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={cn(
                "mt-6 p-5 rounded-xl border",
                isCorrect ? "bg-teal-500/10 border-teal-500/20" : "bg-orange-500/10 border-orange-500/20"
              )}
            >
              <p className="font-semibold mb-1 flex items-center gap-2">
                {isCorrect ? (
                  <span className="text-teal-400">Tepat Sekali!</span>
                ) : (
                  <span className="text-orange-400">Kurang Tepat.</span>
                )}
              </p>
              <p className="text-gray-300 text-sm leading-relaxed">
                {currentQ.explanation}
              </p>

              <div className="mt-6 flex justify-end">
                <button
                  onClick={handleNext}
                  className="px-6 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg font-medium transition-colors"
                >
                  {currentIndex + 1 < questions.length ? "Soal Berikutnya →" : "Lihat Hasil"}
                </button>
              </div>
            </motion.div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

export default function KuisPage() {
  return (
    <main className="min-h-screen bg-[#0a0a0f] pt-24 pb-16 px-6">
      <div className="max-w-3xl mx-auto">
        <Link
          href="/edukasi"
          className="inline-flex items-center gap-2 text-gray-400 hover:text-white text-sm mb-8 transition-colors group"
        >
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
          Kembali ke Daftar Modul
        </Link>

        <Suspense
          fallback={
            <div className="rounded-2xl border border-white/10 bg-white/5 p-8 text-center text-gray-500">
              Memuat kuis...
            </div>
          }
        >
          <QuizBoard />
        </Suspense>
      </div>
    </main>
  );
}