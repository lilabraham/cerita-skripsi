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
    label: "Berbasis Ilmu",
    value: "FAKTA",
    lightBg: "bg-[#FFF000]",
    darkBg: "dark:bg-yellow-400/20",
    lightText: "text-black",
    darkText: "dark:text-white",
    lightIconText: "text-black",
    darkIconText: "dark:text-yellow-300",
  },
  {
    icon: Users,
    label: "Tanpa Stigma",
    value: "EMPATI",
    lightBg: "bg-black",
    darkBg: "dark:bg-slate-700",
    lightText: "text-white",
    darkText: "dark:text-white",
    lightIconText: "text-white",
    darkIconText: "dark:text-white",
  },
  {
    icon: BookOpen,
    label: "Nyata & Relevan",
    value: "AKSI",
    lightBg: "bg-[#FF2D78]",
    darkBg: "dark:bg-pink-600",
    lightText: "text-black",
    darkText: "dark:text-white",
    lightIconText: "text-black",
    darkIconText: "dark:text-white",
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
    <section
      className={cn(
        "relative min-h-screen flex items-center justify-center overflow-hidden pt-20",
        // ── GRADIENT FLOW (Light → section below) ──
        "bg-gradient-to-b from-yellow-300 via-yellow-200 to-cyan-50",
        // ── DARK MODE FLOW ──
        "dark:from-slate-900 dark:via-indigo-950 dark:to-indigo-900",
      )}
    >
      {/* Dot grid overlay — adapts per mode */}
      <div
        className={cn(
          "absolute inset-0 pointer-events-none",
          "[background-image:radial-gradient(circle,rgba(0,0,0,0.55)_1.5px,transparent_1.5px)]",
          "dark:[background-image:radial-gradient(circle,rgba(255,255,255,0.12)_1.5px,transparent_1.5px)]",
          "[background-size:28px_28px]",
        )}
      />

      {/* Noise/grain overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E\")",
        }}
      />

      {/* Diagonal accent stripe — top-right */}
      <div
        className="absolute top-0 right-0 w-64 h-64 pointer-events-none opacity-20 dark:opacity-10"
        style={{
          background:
            "repeating-linear-gradient(45deg, #FF2D78 0px, #FF2D78 8px, transparent 8px, transparent 20px)",
        }}
      />

      {/* Main Content */}
      <motion.div
        className="relative z-10 max-w-6xl mx-auto px-6 py-12 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* ── Left Column ── */}
        <div className="lg:col-span-7 text-center lg:text-left space-y-7">

          {/* Badge */}
          <motion.div variants={itemVariants} className="flex justify-center lg:justify-start">
            <span
              className={cn(
                "inline-flex items-center gap-2 px-4 py-1.5 rounded-none",
                "border-2 border-black dark:border-white",
                "bg-black dark:bg-white",
                "text-[#FFF000] dark:text-black",
                "text-sm font-black tracking-widest uppercase",
                "shadow-[4px_4px_0px_0px_#FF2D78] dark:shadow-[4px_4px_0px_0px_rgba(255,45,120,0.8)]",
              )}
            >
              <span className="w-2 h-2 rounded-full bg-[#FF2D78] animate-pulse" />
              Platform Edukasi untuk Remaja Indonesia
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            variants={itemVariants}
            className="text-[3rem] md:text-[4.5rem] lg:text-[5.5rem] font-black tracking-tighter leading-[0.9] uppercase"
          >
            <span className="text-black dark:text-white">Jadilah Generasi</span>
            <br />
            <span className="relative inline-block">
              <span
                className="relative z-10 text-white bg-[#FF2D78] dark:bg-pink-600 px-3 pb-1 inline-block"
                style={{ WebkitTextStroke: "1px rgba(0,0,0,0.3)" }}
              >
                Cerdas &amp; Kuat
              </span>
            </span>
            <br />
            <span className="text-black dark:text-white">
              Lawan HIV/AIDS
            </span>
          </motion.h1>

          {/* Body */}
          <motion.p
            variants={itemVariants}
            className={cn(
              "text-base md:text-lg font-semibold max-w-xl mx-auto lg:mx-0 leading-relaxed",
              "border-l-4 border-black dark:border-white pl-4 py-2",
              "bg-white/60 dark:bg-white/5",
              "text-black dark:text-white/80",
            )}
          >
            Informasi akurat, mudah dipahami, dan bebas stigma. Karena pengetahuan
            adalah senjata terbaik untuk melindungi dirimu dan orang-orang yang kamu
            sayangi.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-1"
          >
            <Link href="/edukasi" className="w-full sm:w-auto">
              <motion.div
                className={cn(
                  "group w-full inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-none cursor-pointer",
                  "bg-black dark:bg-white",
                  "text-[#FFF000] dark:text-black",
                  "font-black text-base uppercase tracking-wider",
                  "border-2 border-black dark:border-white",
                  "shadow-[6px_6px_0px_0px_#FF2D78] dark:shadow-[6px_6px_0px_0px_rgba(255,45,120,0.9)]",
                  "active:translate-x-[6px] active:translate-y-[6px] active:shadow-none",
                  "hover:bg-[#FF2D78] hover:text-white dark:hover:bg-pink-600 dark:hover:text-white",
                  "hover:shadow-[6px_6px_0px_0px_#000] dark:hover:shadow-[6px_6px_0px_0px_rgba(255,255,255,0.8)]",
                  "transition-all duration-150",
                )}
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.97 }}
              >
                Mulai Belajar Sekarang
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </motion.div>
            </Link>

            <Link href="/tentang" className="w-full sm:w-auto">
              <motion.div
                className={cn(
                  "w-full inline-flex items-center justify-center gap-2 px-8 py-4 rounded-none cursor-pointer",
                  "border-2 border-black dark:border-white",
                  "bg-white dark:bg-transparent",
                  "text-black dark:text-white",
                  "font-black text-base uppercase tracking-wider",
                  "shadow-[6px_6px_0px_0px_#000] dark:shadow-[6px_6px_0px_0px_rgba(255,255,255,0.8)]",
                  "active:translate-x-[6px] active:translate-y-[6px] active:shadow-none",
                  "hover:bg-[#FFF000] dark:hover:bg-yellow-400/20",
                  "hover:shadow-[6px_6px_0px_0px_#FF2D78] dark:hover:shadow-[6px_6px_0px_0px_rgba(255,45,120,0.8)]",
                  "transition-all duration-150",
                )}
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.97 }}
              >
                Kenali CERITA
              </motion.div>
            </Link>
          </motion.div>
        </div>

        {/* ── Right Column: New Illustration ── */}
        <motion.div
          variants={itemVariants}
          className="lg:col-span-5 flex justify-center lg:justify-end items-center relative mt-8 lg:mt-0"
        >
          {/* Layer 1: Pink Backing Frame (The drop shadow base) */}
          <div
            className={cn(
              "absolute -bottom-4 -right-4 md:-bottom-5 md:-right-5",
              "w-full max-w-lg aspect-[4/3] md:aspect-[3/2]",
              "bg-[#FF2D78] dark:bg-pink-700",
              "border-4 border-black dark:border-white",
            )}
          />

          {/* Layer 2: White Background Frame */}
          <div
            className={cn(
              "absolute -top-3 -left-3 md:-top-4 md:-left-4",
              "w-full max-w-lg aspect-[4/3] md:aspect-[3/2]",
              "bg-white dark:bg-slate-800",
              "border-4 border-black dark:border-white",
            )}
          />

          {/* Layer 3: Main Image Container */}
          <div className="relative w-full max-w-lg aspect-[4/3] md:aspect-[3/2] border-4 border-black dark:border-white bg-white overflow-hidden shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] dark:shadow-[8px_8px_0px_0px_rgba(255,255,255,0.8)] z-10 transition-shadow duration-300">
            <Image
              src="/images/hero-illustration.png"
              alt="Edukasi Interaktif HIV/AIDS"
              fill
              className="object-cover object-center"
              priority
            />
          </div>

          {/* Layer 4: Floating Sticker label */}
          <div
            className={cn(
              "absolute -top-1 -right-2 md:top-2 md:-right-6 z-20",
              "bg-[#FF2D78] dark:bg-pink-600",
              "text-white",
              "font-black text-xs md:text-sm uppercase tracking-widest",
              "px-4 py-2",
              "border-2 border-black dark:border-white",
              "shadow-[4px_4px_0px_0px_#000] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,0.8)]",
              "rotate-3",
            )}
          >
            Edukasi Gratis ✦
          </div>
        </motion.div>

        {/* ── Stat Cards ── */}
        <motion.div
          variants={itemVariants}
          className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl mx-auto lg:mx-0 w-full lg:col-span-12 pt-8 lg:pt-4"
        >
          {floatingCards.map((card, i) => (
            <motion.div
              key={card.label}
              className={cn(
                "flex items-center gap-4 p-4",
                "border-2 border-black dark:border-white",
                card.lightBg, card.darkBg,
                "shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] dark:shadow-[6px_6px_0px_0px_rgba(255,255,255,0.8)]",
                "hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] dark:hover:shadow-[8px_8px_0px_0px_rgba(255,255,255,0.9)]",
                "hover:-translate-y-1 transition-all duration-200",
              )}
              whileHover={{ scale: 1.04, y: -4 }}
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
              <div className="p-2.5 border-2 border-black dark:border-white bg-white/20 dark:bg-black/20">
                <card.icon
                  size={20}
                  className={cn(card.lightIconText, card.darkIconText)}
                />
              </div>
              <div className="text-left">
                <p className={cn("font-black text-2xl leading-none", card.lightText, card.darkText)}>
                  {card.value}
                </p>
                <p className={cn("text-xs mt-0.5 font-bold uppercase tracking-wider", card.lightText, card.darkText)}>
                  {card.label}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      {/* Bottom bridge — fade into Stats section */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-cyan-50 dark:from-indigo-900 to-transparent pointer-events-none" />
    </section>
  );
}