"use client";

import { motion, type Variants } from "framer-motion";
import {
  ShieldAlert,
  Activity,
  AlertTriangle,
  HeartPulse,
  Lock,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";

// ─── Types ────────────────────────────────────────────────────────────────────

interface ModuleData {
  id: string;
  title: string;
  desc: string;
  icon: React.ElementType;
  imageSrc: string;
  cardBg: string;      // hex — vibrant card background
  accentBg: string;    // hex — chapter badge + status pill background
  progress: number;    // 0–100, visual only
  status: "unlocked" | "locked";
}

// ─── Data ────────────────────────────────────────────────────────────────────
// NOTE: Logika status lock/unlock tidak diubah sama sekali.
// `progress` adalah nilai visual statis — bukan state React.

const modules: ModuleData[] = [
  {
    id:        "pengenalan",
    title:     "Apa itu HIV/AIDS?",
    desc:      "Pahami perbedaan mendasar antara HIV dan AIDS secara medis.",
    icon:      Activity,
    imageSrc:  "/images/virus-hiv.png",
    cardBg:    "#A8D8FF",
    accentBg:  "#FFE566",
    progress:  100,
    status:    "unlocked",
  },
  {
    id:        "penularan",
    title:     "Mitos vs Fakta Penularan",
    desc:      "Ketahui cara penularan yang sebenarnya dan hapus stigma negatif.",
    icon:      AlertTriangle,
    imageSrc:  "/images/remaja-sehat.png",
    cardBg:    "#FFE566",
    accentBg:  "#FF8DC7",
    progress:  75,
    status:    "unlocked",
  },
  {
    id:        "pencegahan",
    title:     "Benteng Pertahanan",
    desc:      "Langkah-langkah efektif untuk melindungi diri dan masa depanmu.",
    icon:      ShieldAlert,
    imageSrc:  "/images/remaja-demam.png",
    cardBg:    "#B5F5A0",
    accentBg:  "#A8D8FF",
    progress:  40,
    status:    "unlocked",
  },
  {
    id:        "pengobatan",
    title:     "Harapan & Pengobatan",
    desc:      "Mengenal ARV dan bagaimana ODHIV bisa hidup sehat.",
    icon:      HeartPulse,
    imageSrc:  "/images/botol-arv.png",
    cardBg:    "#D4D4D4",
    accentBg:  "#9CA3AF",
    progress:  0,
    status:    "locked",
  },
];

// ─── Police-tape SVG stripe (inline style, no Tailwind arbitrary bg) ─────────
const STRIPE_UNLOCKED =
  "repeating-linear-gradient(-45deg, #FFE566 0px, #FFE566 10px, #1a1a1a 10px, #1a1a1a 20px)";
const STRIPE_LOCKED =
  "repeating-linear-gradient(-45deg, #6B7280 0px, #6B7280 10px, #374151 10px, #374151 20px)";

// ─── Animation variants ───────────────────────────────────────────────────────

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show:   { opacity: 1, transition: { staggerChildren: 0.12 } },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

// ─── Sub-components ───────────────────────────────────────────────────────────

function UnlockedCard({ mod, index }: { mod: ModuleData; index: number }) {
  return (
    <div
      className={cn(
        "relative flex flex-col gap-4 p-5 rounded-2xl",
        "border-4 border-black",
        "shadow-[6px_6px_0px_0px_#000]",
        "transition-all duration-150 ease-out",
        // Group hover: card shifts up-left; shadow appears to grow
        "group-hover:-translate-x-0.5 group-hover:-translate-y-0.5",
        "group-hover:shadow-[8px_8px_0px_0px_#000]",
      )}
      style={{ backgroundColor: mod.cardBg }}
    >
      {/* Top row: image box + status pill */}
      <div className="flex items-start justify-between gap-2">

        {/* Image box */}
        <div className="w-16 h-16 shrink-0 rounded-xl border-4 border-black bg-white shadow-[3px_3px_0px_0px_#000] flex items-center justify-center overflow-hidden">
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
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border-2 border-black shadow-[2px_2px_0px_0px_#000] shrink-0"
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
        className="inline-block w-fit px-3 py-1 rounded-full border-2 border-black text-[11px] font-black uppercase tracking-wider text-black shadow-[2px_2px_0px_0px_#000]"
        style={{ backgroundColor: mod.accentBg }}
      >
        Chapter {index + 1}
      </span>

      {/* Title & description */}
      <div className="flex-1">
        <h2 className="text-black font-black text-xl leading-tight mb-1.5">
          {mod.title}
        </h2>
        <p className="text-black/70 text-sm leading-relaxed">{mod.desc}</p>
      </div>

      {/* Internal progress bar */}
      <div>
        <div className="flex justify-between text-[11px] font-black text-black mb-1.5">
          <span>Progress</span>
          <span>{mod.progress}%</span>
        </div>
        <div className="h-3 rounded-full bg-white/60 border-2 border-black shadow-[2px_2px_0px_0px_#000] overflow-hidden">
          <div
            className="h-full bg-black rounded-full"
            style={{ width: `${mod.progress}%` }}
          />
        </div>
      </div>

      {/* CTA — solid pill button */}
      <div className="pt-3 border-t-2 border-black">
        <span
          className={cn(
            "inline-flex items-center gap-2",
            "px-5 py-2.5 rounded-full",
            "bg-black text-white text-sm font-black",
            "border-2 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,0.25)]",
            "transition-all duration-150",
            "group-hover:bg-white group-hover:text-black group-hover:scale-105",
          )}
        >
          Mulai Belajar
          <ArrowRight
            size={14}
            className="transition-transform duration-150 group-hover:translate-x-1"
          />
        </span>
      </div>
    </div>
  );
}

function LockedCard({ mod, index }: { mod: ModuleData; index: number }) {
  return (
    <div
      className={cn(
        "relative flex flex-col rounded-2xl overflow-hidden",
        "border-4 border-neutral-500",
        "shadow-[6px_6px_0px_0px_#6B7280]",
        "cursor-not-allowed",
      )}
      style={{ backgroundColor: mod.cardBg }}
    >
      {/* Police tape — top */}
      <div className="h-7 w-full shrink-0" style={{ background: STRIPE_LOCKED }} />

      <div className="flex flex-col gap-3 p-5">
        {/* Top row: grayscale image + lock badge */}
        <div className="flex items-start justify-between gap-2">

          {/* Image box — grayscale */}
          <div className="w-16 h-16 shrink-0 rounded-xl border-4 border-neutral-500 bg-neutral-300 flex items-center justify-center overflow-hidden">
            <Image
              src={mod.imageSrc}
              alt={mod.title}
              width={52}
              height={52}
              className="object-contain grayscale opacity-30"
            />
          </div>

          {/* Lock pill */}
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border-2 border-neutral-600 bg-neutral-700 shadow-[2px_2px_0px_0px_#4B5563] shrink-0">
            <Lock size={11} className="text-neutral-300" />
            <span className="text-neutral-300 text-[11px] font-black uppercase tracking-widest">
              Terkunci
            </span>
          </div>
        </div>

        {/* Chapter badge — muted */}
        <span className="inline-block w-fit px-3 py-1 rounded-full border-2 border-neutral-500 bg-neutral-400 text-[11px] font-black uppercase tracking-wider text-neutral-700 shadow-[2px_2px_0px_0px_#9CA3AF]">
          Chapter {index + 1}
        </span>

        {/* Title — struck through */}
        <div>
          <h2 className="text-neutral-500 font-black text-xl leading-tight mb-1 line-through decoration-2 decoration-neutral-500">
            {mod.title}
          </h2>
          <p className="text-neutral-400 text-sm leading-relaxed">{mod.desc}</p>
        </div>

        {/* Big lock icon — decorative, flat bold */}
        <div className="flex justify-center py-1">
          <div className="w-14 h-14 rounded-2xl border-4 border-neutral-500 bg-neutral-400 flex items-center justify-center shadow-[4px_4px_0px_0px_#6B7280]">
            <Lock size={26} className="text-neutral-700" strokeWidth={3} />
          </div>
        </div>

        {/* Footer note */}
        <p className="text-[11px] text-neutral-500 font-bold pt-2 border-t-2 border-dashed border-neutral-400">
          🔒 Selesaikan chapter sebelumnya untuk membuka ini.
        </p>
      </div>

      {/* Police tape — bottom */}
      <div className="h-7 w-full shrink-0" style={{ background: STRIPE_LOCKED }} />
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function EdukasiPage() {
  return (
    <main className="min-h-screen bg-[var(--bg-base)] pt-24 pb-16 px-6">

      {/* ── Header ── */}
      <div className="container-cerita text-center mb-14">

        {/* Tag pill — rotated brutalist */}
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="inline-block mb-6"
        >
          <span
            className={cn(
              "inline-block px-5 py-2 rounded-full",
              "bg-[#FFE566] text-black",
              "border-2 border-black shadow-[3px_3px_0px_0px_#000]",
              "text-[11px] font-black uppercase tracking-[0.25em]",
              "-rotate-1",
            )}
          >
            Mulai Perjalananmu
          </span>
        </motion.div>

        {/* Title — chunky display, word-level color blocks */}
        <motion.h1
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-5xl md:text-7xl font-black tracking-tight leading-none mb-4 flex items-center justify-center gap-4 flex-wrap"
        >
          <span className="text-black dark:text-white">Pusat</span>
          {/* "Edukasi" word in a neon block — signature Y2K move */}
          <span
            className={cn(
              "inline-block px-4 py-1 rounded-2xl",
              "bg-[#A8D8FF] text-black",
              "border-4 border-black shadow-[6px_6px_0px_0px_#000]",
              "rotate-[-1.5deg]",
            )}
          >
            Edukasi
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-[var(--text-secondary)] text-base md:text-lg max-w-xl mx-auto mt-5"
        >
          Selesaikan setiap chapter untuk membuka materi selanjutnya.
        </motion.p>

        {/* Progress bar — chunky neo-brutalist */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 0.8, delay: 0.35 }}
          className="mt-8 max-w-xs mx-auto"
        >
          <div className="flex justify-between text-xs font-black text-black dark:text-white mb-2 uppercase tracking-wider">
            <span>Progress</span>
            <span>3 / 4 tersedia</span>
          </div>
          <div
            className={cn(
              "h-5 rounded-full overflow-hidden",
              "bg-white dark:bg-neutral-800",
              "border-2 border-black shadow-[3px_3px_0px_0px_#000]",
            )}
          >
            <div
              className="h-full rounded-full transition-all duration-1000"
              style={{
                width: "75%",
                background: "linear-gradient(90deg, #FF8DC7 0%, #FFE566 50%, #A8D8FF 100%)",
              }}
            />
          </div>
        </motion.div>
      </div>

      {/* ── Grid Modul ── */}
      <motion.div
        className="container-cerita grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-3xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        animate="show"
      >
        {modules.map((mod, i) => {
          const isLocked = mod.status === "locked";

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
                  <UnlockedCard mod={mod} index={i} />
                )}
              </Link>
            </motion.div>
          );
        })}
      </motion.div>
    </main>
  );
}