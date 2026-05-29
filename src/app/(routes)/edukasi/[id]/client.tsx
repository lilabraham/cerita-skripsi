"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, CheckCircle, BookOpen, Zap } from "lucide-react";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import Badge from "@/components/ui/Badge";

// ─── Framer Motion Variants ─────────────────────────────────────────────────

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring" as const,
      stiffness: 100,
      damping: 12,
    },
  },
};

const buttonHoverVariants = {
  rest: { scale: 1, boxShadow: "0 8px 0 #000" },
  hover: { scale: 1.02, boxShadow: "0 4px 0 #000" },
  tap: { scale: 0.98, boxShadow: "0 0px 0 #000" },
};

const ctaGlowVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      type: "spring" as const,
      stiffness: 80,
      damping: 15,
      delay: 0.4,
    },
  },
};

// ─── Client Component ──────────────────────────────────────────────────────

export default function DetailEdukasiClient({
  materi,
  id,
  paragraphs,
  currentImage,
}: {
  materi: any;
  id: string;
  paragraphs: string[];
  currentImage: string;
}) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  // ─── Background Grid Pattern ─────────────────────────────────────────────

  const gridBackgroundStyle = {
    backgroundImage: `
      linear-gradient(0deg, transparent 24%, rgba(0, 0, 0, 0.06) 25%, rgba(0, 0, 0, 0.06) 26%, transparent 27%, transparent 74%, rgba(0, 0, 0, 0.06) 75%, rgba(0, 0, 0, 0.06) 76%, transparent 77%, transparent),
      linear-gradient(90deg, transparent 24%, rgba(0, 0, 0, 0.06) 25%, rgba(0, 0, 0, 0.06) 26%, transparent 27%, transparent 74%, rgba(0, 0, 0, 0.06) 75%, rgba(0, 0, 0, 0.06) 76%, transparent 77%, transparent)
    `,
    backgroundSize: "50px 50px",
    backgroundColor: "rgb(250, 245, 230)", // Light mode: warm beige
  };

  const gridBackgroundStyleDark = {
    backgroundImage: `
      linear-gradient(0deg, transparent 24%, rgba(255, 255, 255, 0.08) 25%, rgba(255, 255, 255, 0.08) 26%, transparent 27%, transparent 74%, rgba(255, 255, 255, 0.08) 75%, rgba(255, 255, 255, 0.08) 76%, transparent 77%, transparent),
      linear-gradient(90deg, transparent 24%, rgba(255, 255, 255, 0.08) 25%, rgba(255, 255, 255, 0.08) 26%, transparent 27%, transparent 74%, rgba(255, 255, 255, 0.08) 75%, rgba(255, 255, 255, 0.08) 76%, transparent 77%, transparent)
    `,
    backgroundSize: "50px 50px",
    backgroundColor: "#04060A",
  };

  return (
    <motion.main
      className="relative min-h-screen pt-24 pb-16 px-4 sm:px-6 overflow-hidden"
      style={gridBackgroundStyle}
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      {/* Dark mode grid overlay */}
      <div
        className="hidden dark:block absolute inset-0 pointer-events-none"
        style={gridBackgroundStyleDark}
      />

      <div className="max-w-5xl mx-auto relative z-10">
        {/* ── Tombol Kembali (Brutalist Pill) ── */}
        <motion.div variants={itemVariants}>
          <Link
            href="/edukasi"
            className="inline-flex items-center gap-3 px-6 py-3 mb-12 bg-white dark:bg-[#0B0F19] border-3 border-black dark:border-white rounded-full font-bold text-sm uppercase tracking-wider text-black dark:text-white transition-all duration-200 hover:translate-y-[-3px] hover:shadow-[6px_6px_0px_rgba(0,0,0,0.8)] active:translate-y-0 active:shadow-[2px_2px_0px_rgba(0,0,0,0.8)]"
          >
            <ArrowLeft size={18} className="font-black" />
            <span>Kembali</span>
          </Link>
        </motion.div>

        {/* ── Header Section ── */}
        <motion.div variants={itemVariants} className="mb-16">
          {/* Badge */}
          <div className="mb-6">
            <Badge variant="primary" icon={BookOpen} dot>
              Materi Edukasi
            </Badge>
          </div>

          {/* Grid Layout: Judul Besar + Gambar */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-center">
            {/* Judul Raksasa Brutalist */}
            <div className="lg:col-span-2 space-y-4">
              <div className="relative inline-block">
                <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black uppercase text-black dark:text-white tracking-tighter leading-tight break-words">
                  {materi.title}
                </h1>
                {/* Text highlight effect */}
                <motion.div
                  className="absolute -top-2 -left-2 w-full h-full bg-yellow-300 dark:bg-yellow-400 -z-10 opacity-40 blur-sm"
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 0.4 }}
                  transition={{ delay: 0.3, duration: 0.6 }}
                />
              </div>
              <p className="text-lg sm:text-xl font-bold text-indigo-600 dark:text-indigo-300 uppercase tracking-wide">
                {materi.subtitle}
              </p>
            </div>

            {/* Ilustrasi Dinamis */}
            <motion.div
              className="flex justify-center lg:justify-end relative"
              initial={{ opacity: 0, scale: 0.6, rotate: -10 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ type: "spring" as const, stiffness: 80, damping: 12, delay: 0.2 }}
            >
              {/* Glow effect raksasa */}
              <motion.div
                className="absolute w-48 h-48 rounded-full bg-gradient-to-br from-indigo-400 to-purple-500 blur-3xl opacity-20 pointer-events-none"
                animate={{ scale: [1, 1.1, 1], opacity: [0.2, 0.3, 0.2] }}
                transition={{ duration: 3, repeat: Infinity }}
              />

              <div className="relative w-40 h-40 sm:w-48 sm:h-48">
                <Image
                  src={currentImage}
                  alt={materi.title}
                  fill
                  className="object-contain drop-shadow-[0_12px_30px_rgba(79,70,229,0.5)]"
                  priority
                />
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* ── Reading Card Raksasa (Konten) ── */}
        <motion.div
          variants={itemVariants}
          className="mb-12 p-8 sm:p-10 lg:p-12 bg-white dark:bg-[#0B0F19] border-4 border-black dark:border-white rounded-lg shadow-[8px_8px_0px_rgba(0,0,0,0.8)] dark:shadow-[8px_8px_0px_rgba(255,255,255,0.2)]"
        >
          <div className="space-y-6 max-w-3xl">
            {paragraphs.map((paragraph, index) => (
              <motion.p
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true, amount: 0.5 }}
                className="text-base sm:text-lg lg:text-lg text-gray-800 dark:text-gray-200 leading-relaxed font-medium border-l-4 border-transparent hover:border-indigo-500 pl-0 hover:pl-4 transition-all duration-200 cursor-text"
              >
                {paragraph.trim()}
              </motion.p>
            ))}
          </div>
        </motion.div>

        {/* ── CTA Box Neon Raksasa (Stand Out!) ── */}
        <motion.div
          variants={ctaGlowVariants}
          className="mb-12 relative"
        >
          {/* Neon glow background effect */}
          <motion.div
            className="absolute -inset-1 bg-gradient-to-r from-cyan-400 via-yellow-300 to-lime-400 rounded-2xl opacity-50 blur-xl"
            animate={{ opacity: [0.5, 0.8, 0.5], scale: [1, 1.05, 1] }}
            transition={{ duration: 3, repeat: Infinity }}
          />

          {/* Main CTA Card */}
          <div className="relative bg-gradient-to-r from-cyan-300 via-yellow-300 to-lime-400 dark:from-cyan-500 dark:via-yellow-400 dark:to-lime-500 border-4 border-black dark:border-white rounded-2xl p-8 sm:p-10 shadow-[0_12px_0px_rgba(0,0,0,0.8)] dark:shadow-[0_12px_0px_rgba(255,255,255,0.3)]">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-8">
              {/* Left: Message */}
              <motion.div
                className="flex items-center gap-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.5 }}
              >
                <motion.div
                  animate={{ scale: [1, 1.2, 1], rotate: [0, -10, 10, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <CheckCircle
                    size={40}
                    className="text-black dark:text-white flex-shrink-0"
                    strokeWidth={3}
                  />
                </motion.div>
                <div>
                  <p className="text-xl sm:text-2xl font-black uppercase text-black dark:text-white">
                    Materi Selesai!
                  </p>
                  <p className="text-sm sm:text-base font-bold text-black dark:text-white mt-1 uppercase tracking-wide">
                    Uji Pengetahuanmu Sekarang
                  </p>
                </div>
              </motion.div>

              {/* Right: Button */}
              <motion.div
                variants={buttonHoverVariants}
                initial="rest"
                whileHover="hover"
                whileTap="tap"
              >
                <Link
                  href={`/kuis?modul=${id}`}
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-black dark:bg-white text-yellow-300 dark:text-black font-black text-base sm:text-lg uppercase tracking-wider whitespace-nowrap transition-all duration-200"
                >
                  <Zap size={20} strokeWidth={3} />
                  Mulai Kuis
                </Link>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* ── Link Modul Berikutnya ── */}
        {materi.nextModule && (
          <motion.div variants={itemVariants} className="text-center">
            <Link
              href={`/edukasi/${materi.nextModule}`}
              className="inline-block px-6 py-3 font-bold text-sm uppercase tracking-wider text-black dark:text-white border-b-3 border-black dark:border-white hover:translate-y-[-2px] transition-transform"
            >
              Skip Quiz → Next Module
            </Link>
          </motion.div>
        )}
      </div>
    </motion.main>
  );
}
