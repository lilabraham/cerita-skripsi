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
      <div className="rounded-2xl border border-[var(--border-default)] bg-[var(--bg-surface)] p-8 text-center space-y-3">
        <p className="text-white font-semibold">Kuis belum tersedia</p>
        <p className="text-[var(--text-secondary)] text-sm">
          Materi untuk modul ini sedang disiapkan.
        </p>
        <Link
          href="/edukasi"
          className="inline-block text-sm text-indigo-400 hover:text-indigo-300 transition-colors"
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
    <main className="min-h-screen bg-[var(--bg-base)] pt-24 pb-16 px-6">
      <div className="max-w-2xl mx-auto">

        <Link
          href="/edukasi"
          className="inline-flex items-center gap-2 text-[var(--text-secondary)] hover:text-white text-sm mb-8 transition-colors group"
        >
          <ArrowLeft
            size={16}
            className="group-hover:-translate-x-1 transition-transform"
          />
          Kembali ke Daftar Modul
        </Link>

        <Suspense
          fallback={
            <div className="rounded-2xl border border-[var(--border-default)] bg-[var(--bg-surface)] p-8 text-center text-[var(--text-muted)]">
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