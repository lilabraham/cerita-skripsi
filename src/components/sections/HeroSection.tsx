"use client";

import { motion, type Variants } from "framer-motion";
import { ArrowRight, BookOpen, Shield, Users } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import Image from "next/image";

// ─── Data ────────────────────────────────────────────────────────────────────

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

// ─── Animation Variants ───────────────────────────────────────────────────────

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

// ─── Component ────────────────────────────────────────────────────────────────

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[var(--bg-base)] pt-20 transition-colors duration-300">

      {/* Animated background blobs */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-indigo-500/20 dark:bg-indigo-600/20 blur-3xl"
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-teal-400/20 dark:bg-teal-500/15 blur-3xl"
          animate={{ scale: [1.2, 1, 1.2], opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        {/* Blob ketiga — orange accent */}
        <motion.div
          className="absolute top-1/2 right-1/3 w-64 h-64 rounded-full bg-orange-500/10 blur-3xl"
          animate={{ scale: [1, 1.3, 1], opacity: [0.2, 0.35, 0.2] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        />
      </div>

      {/* Grid Overlay — warna adaptif, opacity berbeda di tiap mode */}
      <div
        className="absolute inset-0 opacity-[0.05] dark:opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(var(--text-primary) 1px, transparent 1px), linear-gradient(90deg, var(--text-primary) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* Main Content */}
      <motion.div
        className="relative z-10 max-w-6xl mx-auto px-6 py-12 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >

        {/* ── Kolom Kiri: Teks & CTA (7 kolom) ── */}
        <div className="lg:col-span-7 text-center lg:text-left space-y-6">

          {/* Badge */}
          <motion.div variants={itemVariants} className="flex justify-center lg:justify-start">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-indigo-200 dark:border-indigo-500/30 bg-indigo-50 dark:bg-indigo-500/10 text-indigo-700 dark:text-indigo-300 text-sm font-medium transition-colors">
              <span className="w-2 h-2 rounded-full bg-indigo-500 dark:bg-indigo-400 animate-pulse" />
              Platform Edukasi #1 untuk Remaja Indonesia
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            variants={itemVariants}
            className="text-4xl md:text-6xl font-bold tracking-tight text-gray-900 dark:text-white leading-[1.1] transition-colors"
          >
            Jadilah Generasi{" "}
            <span className="bg-gradient-to-r from-indigo-600 via-teal-500 to-indigo-600 dark:from-indigo-400 dark:via-teal-400 dark:to-indigo-400 bg-clip-text text-transparent">
              Cerdas &amp; Kuat
            </span>
            <br />
            Lawan HIV/AIDS
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            variants={itemVariants}
            className="text-base md:text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto lg:mx-0 leading-relaxed transition-colors"
          >
            Informasi akurat, mudah dipahami, dan bebas stigma. Karena pengetahuan
            adalah senjata terbaik untuk melindungi dirimu dan orang-orang yang kamu
            sayangi.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-2"
          >
            {/* Tombol Utama */}
            <Link href="/edukasi" className="w-full sm:w-auto">
              <motion.div
                className="group w-full inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl bg-gradient-to-r from-indigo-600 to-indigo-500 text-white font-semibold text-base shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 transition-all duration-300 cursor-pointer"
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.97 }}
              >
                Mulai Belajar Sekarang
                <ArrowRight
                  size={18}
                  className="group-hover:translate-x-1 transition-transform"
                />
              </motion.div>
            </Link>

            {/* Tombol Sekunder */}
            <Link href="/tentang" className="w-full sm:w-auto">
              <motion.div
                className="w-full inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl border border-gray-300 dark:border-white/10 bg-white/50 dark:bg-white/5 text-gray-700 dark:text-white font-semibold text-base hover:bg-gray-100 dark:hover:bg-white/10 hover:border-gray-400 dark:hover:border-white/20 transition-all duration-300 backdrop-blur-sm cursor-pointer shadow-sm dark:shadow-none"
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.97 }}
              >
                Kenali CERITA
              </motion.div>
            </Link>
          </motion.div>
        </div>

        {/* ── Kolom Kanan: Gambar Karakter Dokter (5 kolom) ── */}
        <motion.div
          variants={itemVariants}
          className="lg:col-span-5 flex justify-center items-center relative"
        >
          {/* Glow effect di belakang gambar */}
          <div className="absolute w-72 h-72 rounded-full bg-indigo-500/10 blur-3xl pointer-events-none" />

          <div className="relative w-72 h-72 md:w-96 md:h-96 aspect-square max-w-full">
            <Image
              src="/images/karakter-dokter.png"
              alt="Karakter Dokter CERITA"
              fill
              className="object-contain drop-shadow-[0_10px_30px_rgba(79,70,229,0.35)] transition-transform duration-500 hover:scale-105"
              priority
            />
          </div>
        </motion.div>

        {/* ── Baris Bawah: Stat Cards (full width) ── */}
        <motion.div
          variants={itemVariants}
          className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl mx-auto lg:mx-0 w-full lg:col-span-12 pt-8"
        >
          {floatingCards.map((card, i) => {
            // Pisahkan warna bg & border untuk dark mode yang tepat
            const bgClass = card.bg.includes("indigo")
              ? "bg-indigo-50 dark:bg-indigo-500/10 border-indigo-200 dark:border-indigo-500/20"
              : card.bg.includes("teal")
              ? "bg-teal-50 dark:bg-teal-500/10 border-teal-200 dark:border-teal-500/20"
              : "bg-orange-50 dark:bg-orange-500/10 border-orange-200 dark:border-orange-500/20";

            const iconClass = card.color.includes("indigo")
              ? "text-indigo-600 dark:text-indigo-400"
              : card.color.includes("teal")
              ? "text-teal-600 dark:text-teal-400"
              : "text-orange-600 dark:text-orange-400";

            return (
              <motion.div
                key={card.label}
                className={cn(
                  "flex items-center gap-3 p-4 rounded-2xl border backdrop-blur-sm transition-colors shadow-sm dark:shadow-none",
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
                <card.icon size={22} className={iconClass} />
                <div className="text-left">
                  <p className="text-gray-900 dark:text-white font-bold text-lg leading-none transition-colors">
                    {card.value}
                  </p>
                  <p className="text-[var(--text-muted)] text-xs mt-0.5 transition-colors">
                    {card.label}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </motion.div>

      {/* Bottom Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[var(--bg-base)] to-transparent pointer-events-none transition-colors duration-300" />
    </section>
  );
}