// src/app/(routes)/edukasi/page.tsx

"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { BookOpen, Zap, Shield, Pill, ChevronRight, Star } from "lucide-react";

// ─────────────────────────────────────────────────────────────────────────────
// DATA MODUL
// ─────────────────────────────────────────────────────────────────────────────

const modules = [
  {
    id: "pengenalan",
    emoji: "🔬",
    title: "Mengenal HIV & AIDS",
    desc: "Apa itu HIV? Apa itu AIDS? Pelajari perbedaan mendasar dan fakta ilmiahnya.",
    color: "bg-yellow-300",
    shadowColor: "shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] dark:shadow-[6px_6px_0px_0px_rgba(250,204,21,0.5)]",
    tag: "Dasar",
    tagColor: "bg-black text-yellow-300",
    icon: BookOpen,
  },
  {
    id: "penularan",
    emoji: "⚠️",
    title: "Cara Penularan",
    desc: "Mitos vs fakta. Bagaimana HIV benar-benar menular — dan apa yang TIDAK menular.",
    color: "bg-cyan-300",
    shadowColor: "shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] dark:shadow-[6px_6px_0px_0px_rgba(103,232,249,0.5)]",
    tag: "Penting",
    tagColor: "bg-black text-cyan-300",
    icon: Zap,
  },
  {
    id: "pencegahan",
    emoji: "🛡️",
    title: "Pencegahan",
    desc: "Cara-cara efektif melindungi diri dan orang-orang yang kamu sayangi.",
    color: "bg-lime-300",
    shadowColor: "shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] dark:shadow-[6px_6px_0px_0px_rgba(163,230,53,0.5)]",
    tag: "Aksi",
    tagColor: "bg-black text-lime-300",
    icon: Shield,
  },
  {
    id: "pengobatan",
    emoji: "💊",
    title: "Pengobatan & ARV",
    desc: "Apa itu ARV? Bagaimana cara kerjanya? ODHA bisa hidup normal — ini faktanya.",
    color: "bg-pink-300",
    shadowColor: "shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] dark:shadow-[6px_6px_0px_0px_rgba(249,168,212,0.5)]",
    tag: "Lanjutan",
    tagColor: "bg-black text-pink-300",
    icon: Pill,
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// DEKORATIF: Kapsul Melayang (Floating Pill)
// Elemen ini berada di z-0 sehingga tidak pernah mengganggu teks.
// ─────────────────────────────────────────────────────────────────────────────

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

function FloatingPill({
  color,
  width,
  height,
  top,
  left,
  rotate,
  delay,
  duration,
}: FloatingPillProps) {
  return (
    <motion.div
      aria-hidden="true"
      className="absolute rounded-full border-2 border-black/20 dark:border-white/15 pointer-events-none select-none"
      style={{
        backgroundColor: color,
        width,
        height,
        top,
        left,
        rotate,
      }}
      animate={{
        y: [0, -18, 0, 14, 0],
        rotate: [rotate, rotate + 12, rotate - 8, rotate + 4, rotate],
        opacity: [0.55, 0.75, 0.55],
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// DEKORATIF: Bintang 4-Sudut (Sparkle Star)
// ─────────────────────────────────────────────────────────────────────────────

interface SparkleStarProps {
  size: number;
  color: string;
  top: string;
  left: string;
  delay: number;
  duration: number;
}

function SparkleStar({
  size,
  color,
  top,
  left,
  delay,
  duration,
}: SparkleStarProps) {
  // Bintang 4-sudut via SVG path
  const half = size / 2;
  const tip  = size * 0.42;   // ujung lengan panjang
  const mid  = size * 0.12;   // lekukan masuk

  const d = `
    M ${half} 0
    L ${half + mid} ${half - tip}
    L ${half} ${half}
    L ${half + tip} ${half + mid}
    L ${half} ${half}
    L ${half + mid} ${half + tip}
    L ${half} ${half}
    L ${half - tip} ${half + mid}
    L ${half} ${half}
    L ${half - mid} ${half + tip}
    L ${half} ${half}
    L ${half - tip} ${half - mid}
    L ${half} ${half}
    L ${half - mid} 0
    Z
  `;

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
        scale:  [1, 1.15, 1, 0.9, 1],
        opacity: [0.5, 0.85, 0.5],
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: "linear",
      }}
    >
      <path d={d} />
    </motion.svg>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// DEKORATIF: Cincin Abstrak (Abstract Ring)
// ─────────────────────────────────────────────────────────────────────────────

interface FloatingRingProps {
  size: number;
  color: string;
  thickness: number;
  top: string;
  left: string;
  delay: number;
  duration: number;
}

function FloatingRing({
  size,
  color,
  thickness,
  top,
  left,
  delay,
  duration,
}: FloatingRingProps) {
  return (
    <motion.div
      aria-hidden="true"
      className="absolute rounded-full pointer-events-none select-none"
      style={{
        width: size,
        height: size,
        border: `${thickness}px solid ${color}`,
        top,
        left,
      }}
      animate={{
        y:       [0, -20, 0],
        x:       [0, 10, 0],
        scale:   [1, 1.08, 1],
        opacity: [0.3, 0.55, 0.3],
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// MODUL CARD
// ─────────────────────────────────────────────────────────────────────────────

interface ModuleCardProps {
  mod: (typeof modules)[number];
  index: number;
}

function ModuleCard({ mod, index }: ModuleCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      animate={{ opacity: 1, y: 0  }}
      transition={{
        duration: 0.45,
        delay: 0.15 + index * 0.08,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      <Link
        href={`/kuis?modul=${mod.id}`}
        className={[
          "group relative flex flex-col gap-4 p-6 rounded-2xl",
          "border-4 border-black dark:border-white",
          mod.color,
          mod.shadowColor,
          "transition-all duration-150",
          "hover:-translate-y-1 hover:shadow-[8px_10px_0px_0px_rgba(0,0,0,1)] dark:hover:shadow-[8px_10px_0px_0px_rgba(255,255,255,0.3)]",
          "active:translate-x-[6px] active:translate-y-[6px] active:shadow-none",
        ].join(" ")}
      >
        {/* Tag + emoji */}
        <div className="flex items-center justify-between">
          <span
            className={[
              "text-xs font-black uppercase tracking-widest px-3 py-0.5",
              "border-2 border-black rounded-full",
              mod.tagColor,
            ].join(" ")}
          >
            {mod.tag}
          </span>
          <span className="text-3xl">{mod.emoji}</span>
        </div>

        {/* Judul & deskripsi */}
        <div>
          <h2 className="text-xl font-black text-black leading-tight mb-1">
            {mod.title}
          </h2>
          <p className="text-black/70 text-sm font-medium leading-relaxed">
            {mod.desc}
          </p>
        </div>

        {/* CTA */}
        <div className="flex items-center gap-2 mt-auto pt-2 border-t-2 border-black/20">
          <span className="text-xs font-black uppercase tracking-widest text-black/60">
            Mulai Kuis
          </span>
          <ChevronRight
            size={16}
            className="text-black/60 group-hover:translate-x-1 transition-transform"
          />
        </div>
      </Link>
    </motion.div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// PAGE UTAMA
// ─────────────────────────────────────────────────────────────────────────────

export default function EdukasiPage() {
  return (
    /*
      BACKGROUND STRATEGY
      ─────────────────────────────────────────────────────────────────
      Light mode : bg-amber-50  (pastel kuning-krem khas Y2K)
                   + dot grid via CSS background-image (radial-gradient)
      Dark mode  : bg-slate-950 (deep indigo, BUKAN hitam total #000)
                   + dot grid dengan warna lebih subtle

      Semua elemen dekoratif (pills, stars, rings) berada di z-0.
      Konten utama berada di z-10 relative sehingga selalu di atas.
    */
    <main
      className={[
        "relative min-h-screen overflow-hidden",
        "pt-24 pb-20 px-6",
        // Light: pastel amber-krem
        "bg-amber-50",
        // Dark: deep indigo slate-950
        "dark:bg-slate-950",
        "transition-colors duration-300",
      ].join(" ")}
      style={{
        // Dot grid texture — reacts to dark mode via CSS variable fallback
        backgroundImage: `
          radial-gradient(
            circle,
            rgba(0,0,0,0.10) 1.2px,
            transparent 1.2px
          )
        `,
        backgroundSize: "22px 22px",
      }}
    >
      {/* 
        ── DARK MODE DOT GRID OVERLAY ────────────────────────────────
        Karena `backgroundImage` tidak bisa di-dark-mode via Tailwind,
        kita tambahkan overlay div khusus dark mode.
      */}
      <div
        aria-hidden="true"
        className={[
          "absolute inset-0 z-0 pointer-events-none",
          "hidden dark:block",
        ].join(" ")}
        style={{
          backgroundImage: `
            radial-gradient(
              circle,
              rgba(255,255,255,0.07) 1.2px,
              transparent 1.2px
            )
          `,
          backgroundSize: "22px 22px",
        }}
      />

      {/* ── ELEMEN DEKORATIF BACKGROUND (z-0) ───────────────────────── */}

      {/* Kapsul / Pills melayang */}
      <FloatingPill color="#fde68a" width={80} height={34}  top="8%"  left="5%"  rotate={-20} delay={0}    duration={5.5} />
      <FloatingPill color="#a5f3fc" width={55} height={24}  top="14%" left="82%" rotate={15}  delay={1.2}  duration={6.2} />
      <FloatingPill color="#bbf7d0" width={100} height={40} top="72%" left="88%" rotate={-35} delay={0.5}  duration={7.0} />
      <FloatingPill color="#fca5a5" width={64} height={28}  top="85%" left="3%"  rotate={25}  delay={2.0}  duration={5.8} />
      <FloatingPill color="#e9d5ff" width={48} height={22}  top="52%" left="92%" rotate={-10} delay={0.8}  duration={6.8} />
      <FloatingPill color="#fde68a" width={36} height={18}  top="40%" left="1%"  rotate={40}  delay={1.8}  duration={4.9} />
      <FloatingPill color="#a5f3fc" width={72} height={30}  top="92%" left="55%" rotate={-8}  delay={3.0}  duration={7.5} />

      {/* Bintang 4-Sudut / Sparkle Stars */}
      <SparkleStar size={28} color="#facc15" top="6%"  left="72%" delay={0}   duration={8}  />
      <SparkleStar size={20} color="#22d3ee" top="22%" left="10%" delay={1.5} duration={10} />
      <SparkleStar size={36} color="#a3e635" top="62%" left="5%"  delay={0.7} duration={9}  />
      <SparkleStar size={24} color="#f472b6" top="78%" left="75%" delay={2.2} duration={7}  />
      <SparkleStar size={18} color="#facc15" top="88%" left="42%" delay={1.0} duration={11} />
      <SparkleStar size={32} color="#c4b5fd" top="32%" left="88%" delay={3.5} duration={8.5}/>
      <SparkleStar size={16} color="#22d3ee" top="48%" left="50%" delay={2.8} duration={9.5}/>

      {/* Cincin abstrak melayang */}
      <FloatingRing size={90}  color="rgba(250,204,21,0.35)"  thickness={4} top="18%" left="75%" delay={0}   duration={7}   />
      <FloatingRing size={140} color="rgba(34,211,238,0.25)"  thickness={5} top="60%" left="2%"  delay={1.5} duration={9}   />
      <FloatingRing size={60}  color="rgba(163,230,53,0.40)"  thickness={3} top="40%" left="60%" delay={0.8} duration={6.5} />
      <FloatingRing size={200} color="rgba(196,181,253,0.15)" thickness={6} top="80%" left="70%" delay={2.5} duration={11}  />
      <FloatingRing size={50}  color="rgba(251,113,133,0.35)" thickness={3} top="10%" left="40%" delay={1.0} duration={8}   />

      {/* ── KONTEN UTAMA (z-10, selalu di atas dekorasi) ─────────────── */}
      <div className="relative z-10 max-w-4xl mx-auto">

        {/* ── HERO SECTION ──────────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: -24 }}
          animate={{ opacity: 1, y: 0  }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="mb-14 text-center"
        >
          {/* Label atas */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1,   opacity: 1 }}
            transition={{ delay: 0.1, duration: 0.4, ease: [0.34, 1.56, 0.64, 1] }}
            className="inline-flex items-center gap-2 mb-5 px-5 py-1.5 rounded-full border-2 border-black dark:border-white bg-yellow-300 dark:bg-yellow-400 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] dark:shadow-[3px_3px_0px_0px_rgba(250,204,21,0.4)]"
          >
            <Star size={13} className="text-black fill-black" />
            <span className="text-black font-black text-xs uppercase tracking-widest">
              Platform Edukasi CERITA
            </span>
            <Star size={13} className="text-black fill-black" />
          </motion.div>

          {/* Judul utama */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-black dark:text-white uppercase leading-[0.92] tracking-tighter mb-6">
            Pilih{" "}
            <span className="relative inline-block">
              <span className="relative z-10">Modulmu</span>
              {/* Stabilo / highlight */}
              <span
                aria-hidden="true"
                className="absolute -bottom-1 left-0 w-full h-4 bg-cyan-300 dark:bg-cyan-500 -z-10 skew-x-2"
              />
            </span>
            <br />
            <span className="text-3xl md:text-4xl lg:text-5xl font-black text-black/50 dark:text-white/40 normal-case tracking-tight">
              & Mulai Belajar
            </span>
          </h1>

          <p className="max-w-xl mx-auto text-black/60 dark:text-white/50 font-medium text-base md:text-lg leading-relaxed">
            Setiap modul berisi materi ringkas + kuis interaktif.
            Selesaikan semua untuk jadi{" "}
            <strong className="text-black dark:text-white font-black">
              HIV Fighter
            </strong>{" "}
            sejati! 💪
          </p>
        </motion.div>

        {/* ── GRID MODUL ────────────────────────────────────────────────── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-16">
          {modules.map((mod, index) => (
            <ModuleCard key={mod.id} mod={mod} index={index} />
          ))}
        </div>

        {/* ── FOOTER NOTE ───────────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.5 }}
          className="text-center"
        >
          <div className="inline-flex items-center gap-3 px-6 py-3 rounded-2xl border-2 border-black/20 dark:border-white/15 bg-white/60 dark:bg-white/5 backdrop-blur-sm">
            <span className="text-lg">🎯</span>
            <p className="text-black/60 dark:text-white/40 text-xs font-medium">
              Jawab semua kuis dengan benar untuk menguji pemahamanmu!
            </p>
          </div>
        </motion.div>
      </div>
    </main>
  );
}