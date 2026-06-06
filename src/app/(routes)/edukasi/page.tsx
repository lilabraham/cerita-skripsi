// src/app/(routes)/edukasi/page.tsx

"use client";

import { motion, type Variants } from "framer-motion";
import {
  ShieldAlert,
  Activity,
  AlertTriangle,
  HeartPulse,
  Lock,
  ArrowRight,
  Star,
  ShieldCheck,
  Pill,
  Heart,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { useQuizStore } from "@/store/quizStore";

// ─── Types ────────────────────────────────────────────────────────────────────

interface ModuleData {
  id: string;
  title: string;
  desc: string;
  icon: React.ElementType;
  imageSrc: string;
  cardBg: string;
  accentBg: string;
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const modules: ModuleData[] = [
  {
    id: "pengenalan",
    title: "Apa Itu HIV dan AIDS?",
    desc: "Mengenal virus yang menyerang sistem kekebalan tubuh dan perbedaannya dengan AIDS.",
    icon: Activity,
    imageSrc: "/images/virus-hiv.png",
    cardBg: "#A8D8FF",
    accentBg: "#FFE566",
  },
  {
    id: "cara_kerja",
    title: "Bagaimana HIV Menyerang Tubuh?",
    desc: "Pahami proses bertahap bagaimana virus HIV menginfeksi dan menghancurkan sel CD4.",
    icon: AlertTriangle,
    imageSrc: "/images/remaja-sehat.png",
    cardBg: "#FFE566",
    accentBg: "#FF8DC7",
  },
  {
    id: "gejala",
    title: "Gejala HIV Per Fase",
    desc: "Ketahui ciri-ciri dan gejala yang muncul pada fase akut, laten, hingga AIDS.",
    icon: ShieldAlert,
    imageSrc: "/images/remaja-demam.png",
    cardBg: "#B5F5A0",
    accentBg: "#A8D8FF",
  },
  {
    id: "penularan",
    title: "Cara Penularan HIV",
    desc: "Fakta medis tentang bagaimana HIV dapat dan tidak dapat ditularkan.",
    icon: HeartPulse,
    imageSrc: "/images/botol-arv.png",
    cardBg: "#D4D4D4",
    accentBg: "#9CA3AF",
  },
  {
    id: "pencegahan",
    title: "Cara Mencegah HIV",
    desc: "Terapkan prinsip ABCDE untuk melindungi diri dari risiko penularan HIV.",
    icon: ShieldCheck,
    imageSrc: "/images/pencegahan-hiv.png",
    cardBg: "#FF8DC7",
    accentBg: "#FFF000",
  },
  {
    id: "pengobatan",
    title: "Pengobatan HIV",
    desc: "Kenali terapi ARV dan bagaimana ODHA bisa hidup sehat dan produktif.",
    icon: Pill,
    imageSrc: "/images/pengobatan-arv.png",
    cardBg: "#C4F135",
    accentBg: "#A8D8FF",
  },
  {
  id:       "stigma",
  title:    "Stop Stigma terhadap ODHA",
  desc:     "Pahami hak ODHA dan peran kita dalam menghapus diskriminasi di masyarakat.",
  icon:     Heart,
  imageSrc: "/images/stop-stigma.png",
  cardBg:   "#FDBA74",
  accentBg: "#C4F135",
},
];

// Modul yang harus 100% untuk membuka chapter 4 ("penularan")
const LOCK_RULES: Record<string, string[]> = {
  penularan:  ["pengenalan", "cara_kerja", "gejala"],
  pencegahan: ["pengenalan", "cara_kerja", "gejala", "penularan"],
  pengobatan: ["pengenalan", "cara_kerja", "gejala", "penularan", "pencegahan"],
  stigma:     ["pengenalan", "cara_kerja", "gejala", "penularan", "pencegahan", "pengobatan"],
};

// ─── Stripe patterns ──────────────────────────────────────────────────────────

const STRIPE_LIGHT =
  "repeating-linear-gradient(-45deg, rgba(0,0,0,0.07) 0px, rgba(0,0,0,0.07) 10px, rgba(0,0,0,0.02) 10px, rgba(0,0,0,0.02) 20px)";
const STRIPE_DARK =
  "repeating-linear-gradient(-45deg, #1e293b 0px, #1e293b 10px, #0d1117 10px, #0d1117 20px)";

// ─── Decorative: Floating Pill ────────────────────────────────────────────────

interface FloatingPillProps {
  color: string;
  width: number;
  height: number;
  top: string;
  left: string;
  rotate: number;
  delay: number;
  duration: number;
}

function FloatingPill({ color, width, height, top, left, rotate, delay, duration }: FloatingPillProps) {
  return (
    <motion.div
      aria-hidden="true"
      className="absolute rounded-full border-2 border-black/10 dark:border-white/20 pointer-events-none select-none"
      style={{ backgroundColor: color, width, height, top, left, rotate }}
      animate={{
        y: [0, -18, 0, 14, 0],
        rotate: [rotate, rotate + 12, rotate - 8, rotate + 4, rotate],
        opacity: [0.55, 0.80, 0.55],
      }}
      transition={{ duration, delay, repeat: Infinity, ease: "easeInOut" }}
    />
  );
}

// ─── Decorative: Sparkle Star ─────────────────────────────────────────────────

interface SparkleStarProps {
  size: number;
  color: string;
  top: string;
  left: string;
  delay: number;
  duration: number;
}

function SparkleStar({ size, color, top, left, delay, duration }: SparkleStarProps) {
  const half = size / 2;
  const tip = size * 0.42;
  const mid = size * 0.12;
  const d = [
    `M ${half} 0`,
    `L ${half + mid} ${half - tip} L ${half} ${half}`,
    `L ${half + tip} ${half + mid} L ${half} ${half}`,
    `L ${half + mid} ${half + tip} L ${half} ${half}`,
    `L ${half - tip} ${half + mid} L ${half} ${half}`,
    `L ${half - mid} ${half + tip} L ${half} ${half}`,
    `L ${half - tip} ${half - mid} L ${half} ${half}`,
    `L ${half - mid} 0 Z`,
  ].join(" ");

  return (
    <motion.svg
      aria-hidden="true"
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      fill={color}
      className="absolute pointer-events-none select-none"
      style={{ top, left }}
      animate={{
        rotate: [0, 90, 180, 270, 360],
        scale: [1, 1.15, 1, 0.9, 1],
        opacity: [0.45, 0.85, 0.45],
      }}
      transition={{ duration, delay, repeat: Infinity, ease: "linear" }}
    />
  );
}

// ─── Decorative: Floating Ring ────────────────────────────────────────────────

interface FloatingRingProps {
  size: number;
  color: string;
  thickness: number;
  top: string;
  left: string;
  delay: number;
  duration: number;
}

function FloatingRing({ size, color, thickness, top, left, delay, duration }: FloatingRingProps) {
  return (
    <motion.div
      aria-hidden="true"
      className="absolute rounded-full pointer-events-none select-none opacity-60 dark:opacity-100"
      style={{ width: size, height: size, border: `${thickness}px solid ${color}`, top, left }}
      animate={{
        y: [0, -20, 0],
        x: [0, 10, 0],
        scale: [1, 1.08, 1],
        opacity: [0.35, 0.65, 0.35],
      }}
      transition={{ duration, delay, repeat: Infinity, ease: "easeInOut" }}
    />
  );
}

// ─── Animation variants ───────────────────────────────────────────────────────

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.12 } },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] } },
};

// ─── UnlockedCard ─────────────────────────────────────────────────────────────

function UnlockedCard({ mod, index, progress }: { mod: ModuleData; index: number; progress: number }) {
  return (
    <div
      className={cn(
        "relative flex flex-col gap-4 p-5 rounded-2xl",
        "bg-white dark:bg-[#0B0F19]",
        "border-2 border-black/15 dark:border-white/15",
        "shadow-[6px_6px_0px_0px_rgba(0,0,0,0.12)] dark:shadow-[6px_6px_0px_0px_rgba(255,255,255,0.08)]",
        "transition-all duration-150 ease-out",
        "group-hover:-translate-x-0.5 group-hover:-translate-y-1",
        "group-hover:border-black/35 dark:group-hover:border-white/45",
        "group-hover:shadow-[8px_10px_0px_0px_rgba(0,0,0,0.18)] dark:group-hover:shadow-[8px_10px_0px_0px_rgba(255,255,255,0.15)]",
      )}
    >
      {/* Accent glow strip */}
      <div
        className="absolute top-0 left-5 right-5 h-0.5 rounded-full opacity-80"
        style={{ backgroundColor: mod.cardBg }}
      />

      {/* Top row: image box + status pill */}
      <div className="flex items-start justify-between gap-2 mt-1">
        <div
          className="w-16 h-16 shrink-0 rounded-xl border-2 flex items-center justify-center overflow-hidden"
          style={{ borderColor: mod.cardBg, backgroundColor: `${mod.cardBg}33` }}
        >
          <Image
            src={mod.imageSrc}
            alt={mod.title}
            width={52}
            height={52}
            className="object-contain transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3"
          />
        </div>

        {/* Status pill */}
        <div
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border-2 border-black/20 shrink-0"
          style={{ backgroundColor: mod.accentBg }}
        >
          <span className="w-2 h-2 rounded-full bg-black animate-pulse" />
          <span className="text-black text-[11px] font-black uppercase tracking-widest">
            Tersedia
          </span>
        </div>
      </div>

      {/* Chapter badge */}
      <span
        className="inline-block w-fit px-3 py-1 rounded-full border-2 border-black/20 text-[11px] font-black uppercase tracking-wider text-black"
        style={{ backgroundColor: mod.cardBg }}
      >
        Chapter {index + 1}
      </span>

      {/* Title & description */}
      <div className="flex-1">
        <h2 className="text-black dark:text-white font-black text-xl leading-tight mb-1.5">
          {mod.title}
        </h2>
        <p className="text-black/60 dark:text-white/50 text-sm leading-relaxed">
          {mod.desc}
        </p>
      </div>

      {/* ── Progress bar (live dari store) ── */}
      <div>
        <div className="flex justify-between text-[11px] font-black text-black/60 dark:text-white/55 mb-1.5">
          <span>Progress</span>
          <span>{progress}%</span>
        </div>
        <div className="h-3 rounded-full bg-black/10 dark:bg-white/10 border border-black/15 dark:border-white/15 overflow-hidden">
          <div
            className="h-full rounded-full transition-all duration-1000"
            style={{
              width: `${progress}%`,
              backgroundColor: mod.cardBg,
              boxShadow: `0 0 8px ${mod.cardBg}88`,
            }}
          />
        </div>
      </div>

      {/* CTA */}
      <div className="pt-3 border-t border-black/10 dark:border-white/10">
        <span
          className={cn(
            "inline-flex items-center gap-2",
            "px-5 py-2.5 rounded-full",
            "text-black text-sm font-black",
            "border-2 border-black/20",
            "transition-all duration-150 group-hover:scale-105",
          )}
          style={{
            backgroundColor: mod.accentBg,
            boxShadow: "3px 3px 0px 0px rgba(0,0,0,0.25)",
          }}
        >
          {progress === 100 ? "Ulangi Kuis" : "Mulai Belajar"}
          <ArrowRight
            size={14}
            className="transition-transform duration-150 group-hover:translate-x-1"
          />
        </span>
      </div>
    </div>
  );
}

// ─── LockedCard ───────────────────────────────────────────────────────────────

function LockedCard({ mod, index }: { mod: ModuleData; index: number }) {
  return (
    <div
      className={cn(
        "relative flex flex-col rounded-2xl overflow-hidden cursor-not-allowed",
        "bg-stone-100 dark:bg-slate-950",
        "border-2 border-black/12 dark:border-slate-700",
        "shadow-[6px_6px_0px_0px_rgba(0,0,0,0.08)] dark:shadow-[6px_6px_0px_0px_rgba(100,116,139,0.25)]",
      )}
    >
      {/* Police tape top — light mode */}
      <div className="h-6 w-full shrink-0 dark:hidden" style={{ background: STRIPE_LIGHT }} />
      {/* Police tape top — dark mode */}
      <div className="hidden dark:block h-6 w-full shrink-0" style={{ background: STRIPE_DARK }} />

      <div className="flex flex-col gap-3 p-5">
        {/* Top row */}
        <div className="flex items-start justify-between gap-2">
          <div
            className={cn(
              "w-16 h-16 shrink-0 rounded-xl border-2 flex items-center justify-center overflow-hidden",
              "border-black/15 dark:border-slate-700",
              "bg-black/5 dark:bg-slate-800",
            )}
          >
            <Image
              src={mod.imageSrc}
              alt={mod.title}
              width={52}
              height={52}
              className="object-contain grayscale opacity-20"
            />
          </div>

          {/* Lock pill */}
          <div
            className={cn(
              "flex items-center gap-1.5 px-3 py-1.5 rounded-full border-2 shrink-0",
              "border-black/20 bg-black/8 dark:border-slate-600 dark:bg-slate-800",
            )}
          >
            <Lock size={11} className="text-black/40 dark:text-slate-400" />
            <span className="text-black/40 dark:text-slate-400 text-[11px] font-black uppercase tracking-widest">
              Terkunci
            </span>
          </div>
        </div>

        {/* Chapter badge — muted */}
        <span
          className={cn(
            "inline-block w-fit px-3 py-1 rounded-full border-2 text-[11px] font-black uppercase tracking-wider",
            "border-black/15 bg-black/6 text-black/35",
            "dark:border-slate-700 dark:bg-slate-800 dark:text-slate-500",
          )}
        >
          Chapter {index + 1}
        </span>

        {/* Title — struck through */}
        <div>
          <h2
            className={cn(
              "font-black text-xl leading-tight mb-1 line-through decoration-2",
              "text-black/30 decoration-black/30",
              "dark:text-slate-600 dark:decoration-slate-600",
            )}
          >
            {mod.title}
          </h2>
          <p className="text-black/40 dark:text-slate-600 text-sm leading-relaxed">
            {mod.desc}
          </p>
        </div>

        {/* Big lock icon */}
        <div className="flex justify-center py-1">
          <div
            className={cn(
              "w-14 h-14 rounded-2xl border-2 flex items-center justify-center",
              "border-black/15 bg-black/6 shadow-[4px_4px_0px_0px_rgba(0,0,0,0.08)]",
              "dark:border-slate-700 dark:bg-slate-800 dark:shadow-[4px_4px_0px_0px_rgba(100,116,139,0.3)]",
            )}
          >
            <Lock
              size={26}
              strokeWidth={2.5}
              className="text-black/30 dark:text-slate-600"
            />
          </div>
        </div>

        {/* Footer note */}
        <p
          className={cn(
            "text-[11px] font-bold pt-2 border-t border-dashed",
            "text-black/40 border-black/15",
            "dark:text-slate-600 dark:border-slate-700",
          )}
        >
          🔒 Selesaikan chapter sebelumnya untuk membuka ini.
        </p>
      </div>

      {/* Police tape bottom — light mode */}
      <div className="h-6 w-full shrink-0 dark:hidden" style={{ background: STRIPE_LIGHT }} />
      {/* Police tape bottom — dark mode */}
      <div className="hidden dark:block h-6 w-full shrink-0" style={{ background: STRIPE_DARK }} />
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function EdukasiPage() {
  const progressMap = useQuizStore((s) => s.progress);

  // Helper: cek apakah modul terkunci berdasarkan LOCK_RULES
  const isModuleLocked = (id: string): boolean =>
    id in LOCK_RULES &&
    !LOCK_RULES[id].every((req) => (progressMap[req]?.score ?? 0) === 100);

  // Jumlah modul yang sudah terbuka (untuk hero bar label)
  const unlockedCount = modules.filter((m) => !isModuleLocked(m.id)).length;

  // Rata-rata progress semua chapter → hero progress bar
  const heroProgress = Math.round(
    modules.reduce((acc, m) => acc + (progressMap[m.id]?.score ?? 0), 0) /
    modules.length
  );

  return (
    <main
      className={cn(
        "relative min-h-screen overflow-hidden",
        "pt-24 pb-16 px-6",
        "transition-colors duration-300",
        "bg-amber-50 dark:bg-[#04060A]",
      )}
    >
      {/* Light mode dot grid */}
      <div
        aria-hidden="true"
        className="absolute inset-0 z-0 pointer-events-none dark:hidden"
        style={{
          backgroundImage: `radial-gradient(circle, rgba(0,0,0,0.09) 1.2px, transparent 1.2px)`,
          backgroundSize: "22px 22px",
        }}
      />
      {/* Dark mode dot grid */}
      <div
        aria-hidden="true"
        className="absolute inset-0 z-0 pointer-events-none hidden dark:block"
        style={{
          backgroundImage: `radial-gradient(circle, rgba(255,255,255,0.06) 1.2px, transparent 1.2px)`,
          backgroundSize: "22px 22px",
        }}
      />

      {/* ── DECORATIVE ELEMENTS ──────────────────────────────────────────── */}

      <FloatingPill color="#fde68a" width={80} height={34} top="8%" left="5%" rotate={-20} delay={0} duration={5.5} />
      <FloatingPill color="#a5f3fc" width={55} height={24} top="14%" left="82%" rotate={15} delay={1.2} duration={6.2} />
      <FloatingPill color="#bbf7d0" width={100} height={40} top="72%" left="88%" rotate={-35} delay={0.5} duration={7.0} />
      <FloatingPill color="#fca5a5" width={64} height={28} top="85%" left="3%" rotate={25} delay={2.0} duration={5.8} />
      <FloatingPill color="#e9d5ff" width={48} height={22} top="52%" left="92%" rotate={-10} delay={0.8} duration={6.8} />
      <FloatingPill color="#fde68a" width={36} height={18} top="40%" left="1%" rotate={40} delay={1.8} duration={4.9} />
      <FloatingPill color="#a5f3fc" width={72} height={30} top="92%" left="55%" rotate={-8} delay={3.0} duration={7.5} />

      <SparkleStar size={28} color="#facc15" top="6%" left="72%" delay={0} duration={8} />
      <SparkleStar size={20} color="#22d3ee" top="22%" left="10%" delay={1.5} duration={10} />
      <SparkleStar size={36} color="#a3e635" top="62%" left="5%" delay={0.7} duration={9} />
      <SparkleStar size={24} color="#f472b6" top="78%" left="75%" delay={2.2} duration={7} />
      <SparkleStar size={18} color="#facc15" top="88%" left="42%" delay={1.0} duration={11} />
      <SparkleStar size={32} color="#c4b5fd" top="32%" left="88%" delay={3.5} duration={8.5} />
      <SparkleStar size={16} color="#22d3ee" top="48%" left="50%" delay={2.8} duration={9.5} />

      <FloatingRing size={90} color="rgba(250,204,21,0.35)" thickness={4} top="18%" left="75%" delay={0} duration={7} />
      <FloatingRing size={140} color="rgba(34,211,238,0.25)" thickness={5} top="60%" left="2%" delay={1.5} duration={9} />
      <FloatingRing size={60} color="rgba(163,230,53,0.40)" thickness={3} top="40%" left="60%" delay={0.8} duration={6.5} />
      <FloatingRing size={200} color="rgba(196,181,253,0.20)" thickness={6} top="80%" left="70%" delay={2.5} duration={11} />
      <FloatingRing size={50} color="rgba(251,113,133,0.35)" thickness={3} top="10%" left="40%" delay={1.0} duration={8} />

      {/* ── MAIN CONTENT ─────────────────────────────────────────────────── */}
      <div className="relative z-10 max-w-3xl mx-auto">

        {/* ── HERO ─────────────────────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: -24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="mb-14 text-center"
        >
          {/* Label pill */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.1, duration: 0.4, ease: [0.34, 1.56, 0.64, 1] }}
            className="inline-flex items-center gap-2 mb-5 px-5 py-1.5 rounded-full border-2 border-black/25 dark:border-yellow-400/40 bg-yellow-300 shadow-[3px_3px_0px_0px_rgba(0,0,0,0.2)] dark:shadow-[3px_3px_0px_0px_rgba(250,204,21,0.3)]"
          >
            <Star size={13} className="text-black fill-black" />
            <span className="text-black font-black text-xs uppercase tracking-widest">
              Mulai Perjalananmu
            </span>
            <Star size={13} className="text-black fill-black" />
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-5xl md:text-7xl font-black tracking-tight leading-none mb-4 flex items-center justify-center gap-4 flex-wrap"
          >
            <span className="text-black dark:text-white">Pusat</span>
            <span
              className="inline-block px-4 py-1 rounded-2xl border-4 border-black/25 dark:border-white/20 -rotate-[1.5deg]"
              style={{
                backgroundColor: "#A8D8FF",
                color: "#000",
                boxShadow: "6px 6px 0px 0px rgba(0,0,0,0.15)",
              }}
            >
              Edukasi
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-black/60 dark:text-white/50 text-base md:text-lg max-w-xl mx-auto mt-5"
          >
            Selesaikan setiap chapter untuk membuka materi selanjutnya.
          </motion.p>

          {/* ── Overall progress bar (live dari store) ── */}
          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ duration: 0.8, delay: 0.35 }}
            className="mt-8 max-w-xs mx-auto"
          >
            <div className="flex justify-between text-xs font-black text-black/60 dark:text-white/55 mb-2 uppercase tracking-wider">
              <span>Progress</span>
              <span>{unlockedCount} / {modules.length} tersedia</span>
            </div>
            <div
              className={cn(
                "h-5 rounded-full overflow-hidden",
                "bg-black/10 dark:bg-white/10",
                "border border-black/15 dark:border-white/20",
                "shadow-[3px_3px_0px_0px_rgba(0,0,0,0.1)] dark:shadow-[3px_3px_0px_0px_rgba(255,255,255,0.05)]",
              )}
            >
              <div
                className="h-full rounded-full transition-all duration-1000"
                style={{
                  width: `${heroProgress}%`,
                  background: "linear-gradient(90deg, #FF8DC7 0%, #FFE566 50%, #A8D8FF 100%)",
                }}
              />
            </div>
          </motion.div>
        </motion.div>

        {/* ── MODULE GRID ──────────────────────────────────────────────────── */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 gap-6"
          variants={containerVariants}
          initial="hidden"
          animate="show"
        >
          {modules.map((mod, i) => {
            const score = progressMap[mod.id]?.score ?? 0;
            const isLocked = isModuleLocked(mod.id); // ← satu baris ini menggantikan semua logika lama

            return (
              <motion.div key={mod.id} variants={cardVariants}>
                <Link
                  href={isLocked ? "#" : `/edukasi/${mod.id}`}
                  onClick={(e) => isLocked && e.preventDefault()}
                  className="block group"
                >
                  {isLocked ? (
                    <LockedCard mod={mod} index={i} />
                  ) : (
                    <UnlockedCard mod={mod} index={i} progress={score} />
                  )}
                </Link>
              </motion.div>
            );
          })}
        </motion.div>

        {/* ── FOOTER NOTE ──────────────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.5 }}
          className="text-center mt-14"
        >
          <div
            className={cn(
              "inline-flex items-center gap-3 px-6 py-3 rounded-2xl backdrop-blur-sm",
              "border border-black/12 bg-black/5",
              "dark:border-white/10 dark:bg-white/5",
            )}
          >
            <span className="text-lg">🎯</span>
            <p className="text-black/55 dark:text-white/40 text-xs font-medium">
              Selesaikan semua chapter untuk membuka seluruh materi!
            </p>
          </div>
        </motion.div>
      </div>
    </main>
  );
}