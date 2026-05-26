// src/app/(routes)/kuis/page.tsx

"use client";

import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { quizData } from "@/data/quiz-data";
import QuizEngine from "@/components/interactive/QuizEngine";

function QuizBoard() {
  const searchParams = useSearchParams();
  const modulId      = searchParams.get("modul") ?? "pengenalan";
  const questions    = quizData[modulId];

  if (!questions || questions.length === 0) {
    return (
      <div className="rounded-2xl border-4 border-black dark:border-white bg-yellow-300 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] dark:shadow-[8px_8px_0px_0px_rgba(255,255,255,0.8)] p-8 text-center space-y-4">
        <p className="text-black font-black text-xl uppercase tracking-tight">
          Kuis Belum Tersedia
        </p>
        <p className="text-black/70 text-sm font-medium">
          Materi untuk modul ini sedang disiapkan.
        </p>
        <Link
          href="/edukasi"
          className="inline-block px-5 py-2 rounded-full border-2 border-black bg-black text-yellow-300 font-black text-sm uppercase tracking-tight hover:bg-yellow-300 hover:text-black transition-all shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] active:translate-x-[3px] active:translate-y-[3px] active:shadow-none"
        >
          ← Kembali ke Edukasi
        </Link>
      </div>
    );
  }

  return <QuizEngine questions={questions} modulId={modulId} />;
}

export default function KuisPage() {
  return (
    <main className="min-h-screen bg-[var(--bg-base)] pt-24 pb-16 px-6 transition-colors duration-300">
      <div className="max-w-2xl mx-auto">

        <Link
          href="/edukasi"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full border-2 border-black dark:border-white bg-white dark:bg-gray-900 text-black dark:text-white font-bold text-sm mb-8 transition-all hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] dark:shadow-[3px_3px_0px_0px_rgba(255,255,255,0.8)] active:translate-x-[3px] active:translate-y-[3px] active:shadow-none group"
        >
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
          Kembali ke Daftar Modul
        </Link>

        <Suspense
          fallback={
            <div className="rounded-2xl border-4 border-black dark:border-white bg-white dark:bg-gray-900 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] dark:shadow-[6px_6px_0px_0px_rgba(255,255,255,0.8)] p-8 text-center font-black text-black dark:text-white uppercase tracking-tight">
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