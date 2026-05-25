// C:\Users\LENOVO\Documents\cerita-app\src\components\sections\HeroSection.tsx

"use client";

import { motion, type Variants } from "framer-motion";
import { ArrowRight, BookOpen, Shield, Users } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import Image from "next/image";

const floatingCards = [
  {
    icon: Shield,
    label: "Proteksi Diri",
    value: "100%",
    color: "text-indigo-400",
    bg: "bg-indigo-500/10 border-indigo-500/20",
  },
  {
    icon: Users,
    label: "Remaja Teredukasi",
    value: "10K+",
    color: "text-teal-400",
    bg: "bg-teal-500/10 border-teal-500/20",
  },
  {
    icon: BookOpen,
    label: "Materi Tersedia",
    value: "50+",
    color: "text-orange-400",
    bg: "bg-orange-500/10 border-orange-500/20",
  },
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.2 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-white dark:bg-[var(--bg-base)] pt-20 transition-colors duration-300">

      {/* Ambient gradient blobs */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute -top-32 -right-32 w-[680px] h-[680px] rounded-full bg-violet-400/30 dark:bg-violet-600/20 blur-3xl"
          animate={{ scale: [1, 1.15, 1], opacity: [0.4, 0.6, 0.4] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute -bottom-24 -left-24 w-[560px] h-[560px] rounded-full bg-amber-300/35 dark:bg-teal-500/15 blur-3xl"
          animate={{ scale: [1.1, 1, 1.1], opacity: [0.35, 0.55, 0.35] }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full bg-violet-200/20 dark:bg-indigo-500/10 blur-3xl"
          animate={{ scale: [1, 1.2, 1], opacity: [0.15, 0.28, 0.15] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
        />
      </div>

      {/* Grain overlay — light mode only */}
      <div
        className="absolute inset-0 dark:hidden opacity-[0.025] pointer-events-none"
        style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E\")" }}
      />

      {/* Grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.04] dark:opacity-[0.025]"
        style={{
          backgroundImage:
            "linear-gradient(var(--text-primary) 1px, transparent 1px), linear-gradient(90deg, var(--text-primary) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* Main Content */}
      <motion.div
        className="relative z-10 max-w-6xl mx-auto px-6 py-12 w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Kolom Kiri */}
        <div className="lg:col-span-7 text-center lg:text-left space-y-7">

          <motion.div variants={itemVariants} className="flex justify-center lg:justify-start">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-violet-200/80 dark:border-indigo-500/30 bg-violet-50 dark:bg-indigo-500/10 text-violet-700 dark:text-indigo-300 text-sm font-semibold tracking-wide shadow-sm dark:shadow-none transition-colors">
              <span className="w-2 h-2 rounded-full bg-violet-500 dark:bg-indigo-400 animate-pulse" />
              Platform Edukasi #1 untuk Remaja Indonesia
            </span>
          </motion.div>

          <motion.h1
            variants={itemVariants}
            className="text-[2.9rem] md:text-[4.2rem] lg:text-[5rem] font-black tracking-tighter text-gray-900 dark:text-white leading-[0.95] transition-colors"
          >
            Jadilah Generasi{" "}
            <br className="hidden sm:block" />
            <span className="bg-gradient-to-r from-violet-600 via-indigo-500 to-violet-600 dark:from-violet-400 dark:via-indigo-400 dark:to-violet-400 bg-clip-text text-transparent">
              Cerdas &amp; Kuat
            </span>
            <br />
            <span className="text-gray-800 dark:text-gray-100">Lawan HIV/AIDS</span>
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="text-base md:text-lg text-gray-500 dark:text-gray-400 max-w-xl mx-auto lg:mx-0 leading-relaxed transition-colors"
          >
            Informasi akurat, mudah dipahami, dan bebas stigma. Karena pengetahuan
            adalah senjata terbaik untuk melindungi dirimu dan orang-orang yang kamu
            sayangi.
          </motion.p>

          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start pt-1"
          >
            <Link href="/edukasi" className="w-full sm:w-auto">
              <motion.div
                className="group w-full inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-full bg-violet-700 dark:bg-indigo-600 text-white font-bold text-base shadow-[0_8px_32px_rgba(109,40,217,0.35)] dark:shadow-[0_8px_32px_rgba(79,70,229,0.3)] hover:shadow-[0_12px_40px_rgba(109,40,217,0.5)] hover:bg-violet-800 dark:hover:bg-indigo-500 transition-all duration-300 cursor-pointer"
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.97 }}
              >
                Mulai Belajar Sekarang
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </motion.div>
            </Link>

            <Link href="/tentang" className="w-full sm:w-auto">
              <motion.div
                className="w-full inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full border-2 border-gray-300/80 dark:border-white/10 bg-white/60 dark:bg-white/5 text-gray-800 dark:text-white font-bold text-base hover:bg-white hover:border-gray-400 dark:hover:bg-white/10 dark:hover:border-white/20 transition-all duration-300 backdrop-blur-md cursor-pointer shadow-sm dark:shadow-none"
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.97 }}
              >
                Kenali CERITA
              </motion.div>
            </Link>
          </motion.div>
        </div>

        {/* Kolom Kanan: Dokter */}
        <motion.div
          variants={itemVariants}
          className="lg:col-span-5 flex justify-center items-end relative"
        >
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-80 h-80 rounded-full bg-violet-500/15 dark:bg-violet-600/10 blur-3xl pointer-events-none" />
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-64 h-64 rounded-full border border-violet-300/20 dark:border-violet-500/10 pointer-events-none" />

          <div className="relative w-72 h-80 md:w-[380px] md:h-[440px] max-w-full">
            <Image
              src="/images/karakter-dokter.png"
              alt="Karakter Dokter CERITA"
              fill
              className="object-contain object-bottom drop-shadow-[0_20px_50px_rgba(109,40,217,0.3)] dark:drop-shadow-[0_10px_40px_rgba(79,70,229,0.35)] transition-transform duration-500 hover:scale-105"
              priority
            />
          </div>
        </motion.div>

        {/* Stat Cards */}
        <motion.div
          variants={itemVariants}
          className="grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-3xl mx-auto lg:mx-0 w-full lg:col-span-12 pt-4"
        >
          {floatingCards.map((card, i) => {
            const bgClass = card.bg.includes("indigo")
              ? "bg-white/70 dark:bg-indigo-500/10 border-violet-100 dark:border-indigo-500/20"
              : card.bg.includes("teal")
              ? "bg-white/70 dark:bg-teal-500/10 border-teal-100 dark:border-teal-500/20"
              : "bg-white/70 dark:bg-orange-500/10 border-orange-100 dark:border-orange-500/20";

            const iconClass = card.color.includes("indigo")
              ? "text-violet-600 dark:text-indigo-400"
              : card.color.includes("teal")
              ? "text-teal-600 dark:text-teal-400"
              : "text-orange-600 dark:text-orange-400";

            return (
              <motion.div
                key={card.label}
                className={cn(
                  "flex items-center gap-4 p-4 rounded-2xl border backdrop-blur-xl shadow-lg dark:shadow-none transition-colors",
                  bgClass
                )}
                whileHover={{ scale: 1.05, y: -4 }}
                animate={{ y: [0, -6, 0] }}
                transition={{
                  y: {
                    duration: 3 + i * 0.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: i * 0.4,
                  },
                }}
              >
                <div className={cn(
                  "p-2.5 rounded-xl",
                  card.bg.includes("indigo")
                    ? "bg-violet-100 dark:bg-indigo-500/20"
                    : card.bg.includes("teal")
                    ? "bg-teal-100 dark:bg-teal-500/20"
                    : "bg-orange-100 dark:bg-orange-500/20"
                )}>
                  <card.icon size={20} className={iconClass} />
                </div>
                <div className="text-left">
                  <p className="text-gray-900 dark:text-white font-black text-xl leading-none transition-colors">
                    {card.value}
                  </p>
                  <p className="text-gray-500 dark:text-[var(--text-muted)] text-xs mt-0.5 font-medium transition-colors">
                    {card.label}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </motion.div>

      {/* Bottom fade — deep two-stop for seamless blend into StatsSection */}
      <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-white via-white/70 dark:from-[var(--bg-base)] dark:via-[var(--bg-base)]/70 to-transparent pointer-events-none transition-colors duration-300" />
    </section>
  );
}