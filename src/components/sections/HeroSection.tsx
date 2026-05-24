"use client";

import { motion, type Variants } from "framer-motion";
import { ArrowRight, BookOpen, Shield, Users } from "lucide-react";
import { cn } from "@/lib/utils";
import Button from "@/components/ui/Button";
import Link from "next/link";

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
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[var(--bg-base)]">

      {/* Animated background blobs */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-indigo-600/20 blur-3xl"
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-teal-500/15 blur-3xl"
          animate={{ scale: [1.2, 1, 1.2], opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute top-1/2 right-1/3 w-64 h-64 rounded-full bg-orange-500/10 blur-3xl"
          animate={{ scale: [1, 1.3, 1], opacity: [0.2, 0.35, 0.2] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        />
      </div>

      {/* Grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* Main content */}
      <motion.div
        className="relative z-10 container-cerita text-center"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Badge */}
        <motion.div variants={itemVariants} className="flex justify-center mb-6">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-indigo-500/30 bg-indigo-500/10 text-indigo-300 text-sm font-medium">
            <span className="w-2 h-2 rounded-full bg-indigo-400 animate-pulse" />
            Platform Edukasi untuk Remaja Indonesia
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          variants={itemVariants}
          className="text-5xl md:text-7xl font-bold tracking-tight text-white leading-[1.1] mb-6"
        >
          Jadilah Generasi{" "}
          {/* ✅ Pakai utility class dari globals.css */}
          <span className="text-gradient-animated">
            Cerdas &amp; Kuat
          </span>
          <br />
          Lawan HIV/AIDS
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          variants={itemVariants}
          className="text-lg md:text-xl text-[var(--text-secondary)] max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          Informasi akurat, mudah dipahami, dan bebas stigma. Karena pengetahuan
          adalah senjata terbaik untuk melindungi dirimu dan orang-orang yang kamu
          sayangi.
        </motion.p>

        {/* ✅ CTA Buttons — sekarang pakai Button component */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
        >
          <Link href="/edukasi">
            <Button variant="primary" size="lg" icon={ArrowRight}>
              Mulai Belajar Sekarang
            </Button>
          </Link>

          <Link href="/tentang">
            <Button variant="secondary" size="lg">
              Kenali CERITA
            </Button>
          </Link>
        </motion.div>

        {/* Floating stat cards */}
        <motion.div
          variants={itemVariants}
          className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-2xl mx-auto"
        >
          {floatingCards.map((card, i) => (
            <motion.div
              key={card.label}
              className={cn(
                "flex items-center gap-3 p-4 rounded-2xl border backdrop-blur-sm",
                card.bg
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
              <card.icon size={22} className={card.color} />
              <div className="text-left">
                <p className="text-white font-bold text-lg leading-none">{card.value}</p>
                <p className="text-[var(--text-muted)] text-xs mt-0.5">{card.label}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[var(--bg-base)] to-transparent pointer-events-none" />
    </section>
  );
}