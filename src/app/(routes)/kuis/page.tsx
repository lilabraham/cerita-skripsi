// src/app/(routes)/kuis/page.tsx

"use client";

import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import Link from "next/link";
import { ArrowLeft, AlertCircle } from "lucide-react";
import { motion } from "framer-motion";

import { quizData } from "@/data/quiz-data";
import QuizEngine from "@/components/interactive/QuizEngine";

// ─── Dekoratif: Floating Pill ─────────────────────────────────────────────────

interface FloatingPillProps {
  text: string;
  top?: string; right?: string; bottom?: string; left?: string;
  rotate?: number;
  color?: string;
  delay?: number;
  duration?: number;
}

function FloatingPill({
  text, top, right, bottom, left,
  rotate = -12,
  color = "#C4F135",
  delay = 0,
  duration = 5,
}: FloatingPillProps) {
  return (
    <motion.div
      className="absolute select-none pointer-events-none"
      style={{ top, right, bottom, left }}
      animate={{ y: [0, -14, 0], rotate: [rotate, rotate + 4, rotate] }}
      transition={{ duration, repeat: Infinity, ease: "easeInOut", delay }}
    >
      <span
        className="inline-block px-4 py-1.5 rounded-full border-2 border-black font-black text-black text-xs uppercase tracking-widest shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]"
        style={{ background: color }}
      >
        {text}
      </span>
    </motion.div>
  );
}

// ─── Dekoratif: Sparkle Star ──────────────────────────────────────────────────

interface SparkleStarProps {
  size?: number;
  top?: string; right?: string; bottom?: string; left?: string;
  color?: string;
  delay?: number;
  duration?: number;
}

function SparkleStar({
  size = 28,
  top, right, bottom, left,
  color = "#FF2D78",
  delay = 0,
  duration = 4,
}: SparkleStarProps) {
  return (
    <motion.div
      className="absolute select-none pointer-events-none"
      style={{ top, right, bottom, left, color, width: size, height: size }}
      animate={{ scale: [1, 1.35, 1], rotate: [0, 180, 360], opacity: [0.7, 1, 0.7] }}
      transition={{ duration, repeat: Infinity, ease: "easeInOut", delay }}
    >
      <svg viewBox="0 0 24 24" fill="currentColor" width={size} height={size}>
        <path d="M12 2 L13.5 9.5 L21 12 L13.5 14.5 L12 22 L10.5 14.5 L3 12 L10.5 9.5 Z" />
      </svg>
    </motion.div>
  );
}

// ─── Dekoratif: Floating Ring ─────────────────────────────────────────────────

interface FloatingRingProps {
  size?: number;
  top?: string; right?: string; bottom?: string; left?: string;
  color?: string;
  delay?: number;
  duration?: number;
}

function FloatingRing({
  size = 64,
  top, right, bottom, left,
  color = "#7B00FF",
  delay = 0,
  duration = 7,
}: FloatingRingProps) {
  return (
    <motion.div
      className="absolute select-none pointer-events-none rounded-full border-4"
      style={{
        top, right, bottom, left,
        width: size,
        height: size,
        borderColor: color,
        opacity: 0.25,
      }}
      animate={{ y: [0, -20, 0], rotate: [0, 360], scale: [1, 1.1, 1] }}
      transition={{ duration, repeat: Infinity, ease: "easeInOut", delay }}
    />
  );
}

// ─── Quiz Board (logic TIDAK diubah) ─────────────────────────────────────────

function QuizBoard() {
  const searchParams = useSearchParams();
  const modulId = searchParams.get("modul") ?? "pengenalan";
  const questions = quizData[modulId as keyof typeof quizData];

  if (!questions || questions.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md mx-auto mt-20 p-8 rounded-2xl border-4 border-black bg-yellow-300 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] text-center space-y-4"
      >
        <AlertCircle size={48} className="mx-auto text-black" />
        <h2 className="text-black font-black text-2xl uppercase tracking-tight">
          Modul Tidak Tersedia
        </h2>
        <p className="text-black/80 font-bold">
          Maaf, soal kuis untuk modul ini belum dibuat atau sedang dalam perbaikan.
        </p>
        <Link
          href="/edukasi"
          className="inline-block mt-4 px-6 py-3 rounded-full border-4 border-black bg-black text-yellow-300 font-black text-sm uppercase tracking-widest hover:bg-white hover:text-black hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
        >
          Kembali ke Edukasi
        </Link>
      </motion.div>
    );
  }

  return <QuizEngine questions={questions} modulId={modulId} />;
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function KuisPage() {
  return (
    <main
      className="relative min-h-screen bg-amber-50 dark:bg-[#04060A] transition-colors duration-300 pt-24 pb-16 px-4 sm:px-6 flex flex-col items-center overflow-hidden"
      style={{
        backgroundImage:
          "radial-gradient(circle, rgba(0,0,0,0.07) 1.5px, transparent 1.5px)",
        backgroundSize: "28px 28px",
      }}
    >

      {/* ── Dark mode dot grid overlay ─────────────────────────────────────── */}
      <div
        className="pointer-events-none absolute inset-0 z-0 hidden dark:block opacity-100"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(255,255,255,0.06) 1.5px, transparent 1.5px)",
          backgroundSize: "28px 28px",
        }}
      />

      {/* ── Ambient glow blobs (dark mode only) ───────────────────────────── */}
      <div className="pointer-events-none absolute top-0 left-1/4 w-[480px] h-[320px] rounded-full opacity-0 dark:opacity-[0.06] blur-[100px] z-0 bg-[#FF2D78]" />
      <div className="pointer-events-none absolute bottom-0 right-1/4 w-[400px] h-[280px] rounded-full opacity-0 dark:opacity-[0.05] blur-[100px] z-0 bg-[#7B00FF]" />

      {/* ── Floating Pills ─────────────────────────────────────────────────── */}
      <FloatingPill text="✦ Quiz"     top="6%"  left="3%"  rotate={-8}  color="#C4F135" delay={0}   duration={5.5} />
      <FloatingPill text="Semangat!"  top="12%" right="4%" rotate={10}  color="#FFD600" delay={1.2} duration={6}   />
      <FloatingPill text="⚡ GO!"     bottom="18%" left="5%"  rotate={-14} color="#FF2D78" delay={0.7} duration={7}   />
      <FloatingPill text="✓ Fokus"    bottom="12%" right="3%" rotate={8}  color="#00E5FF" delay={2}   duration={5}   />

      {/* ── Sparkle Stars ──────────────────────────────────────────────────── */}
      <SparkleStar size={22} top="8%"  left="18%"  color="#FF2D78" delay={0}   duration={3.5} />
      <SparkleStar size={16} top="15%" right="20%" color="#C4F135" delay={1.4} duration={4.2} />
      <SparkleStar size={28} bottom="22%" left="12%"  color="#FFD600" delay={0.6} duration={5}   />
      <SparkleStar size={18} bottom="10%" right="15%" color="#7B00FF" delay={2.1} duration={3.8} />
      <SparkleStar size={12} top="40%" left="6%"   color="#00E5FF" delay={1}   duration={4.5} />
      <SparkleStar size={20} top="55%" right="5%"  color="#FF2D78" delay={1.8} duration={4}   />

      {/* ── Floating Rings ─────────────────────────────────────────────────── */}
      <FloatingRing size={72}  top="5%"    left="8%"    color="#C4F135" delay={0}   duration={8}  />
      <FloatingRing size={48}  top="20%"   right="8%"   color="#FF2D78" delay={1.5} duration={6}  />
      <FloatingRing size={96}  bottom="15%" left="6%"   color="#FFD600" delay={0.8} duration={9}  />
      <FloatingRing size={56}  bottom="8%"  right="10%"  color="#7B00FF" delay={2.2} duration={7}  />
      <FloatingRing size={36}  top="45%"   left="2%"    color="#00E5FF" delay={1}   duration={10} />

      {/* ── TOMBOL KEMBALI ─────────────────────────────────────────────────── */}
      <div className="w-full max-w-3xl mb-8 flex justify-start relative z-10">
        <Link
          href="/edukasi"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border-4 border-black dark:border-white bg-white dark:bg-[#0B0F19] text-black dark:text-white font-black text-xs uppercase tracking-widest transition-all hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,0.8)] active:translate-x-1 active:translate-y-1 active:shadow-none group"
        >
          <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
          Batal & Keluar
        </Link>
      </div>

      {/* ── SUSPENSE + QUIZ BOARD ───────────────────────────────────────────── */}
      <Suspense
        fallback={
          <div className="flex flex-col items-center justify-center mt-32 space-y-4">
            <div className="w-12 h-12 border-4 border-black dark:border-white border-t-[#FF2D78] rounded-full animate-spin" />
            <p className="font-black uppercase tracking-widest text-black dark:text-white">
              Menyiapkan Kuis...
            </p>
          </div>
        }
      >
        <div className="w-full max-w-3xl relative z-10">
          <QuizBoard />
        </div>
      </Suspense>

    </main>
  );
}