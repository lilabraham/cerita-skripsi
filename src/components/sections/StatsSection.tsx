// C:\Users\LENOVO\Documents\cerita-app\src\components\sections\StatsSection.tsx

"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, type Variants } from "framer-motion";

const stats = [
  {
    value: 526,
    suffix: "K+",
    label: "ODHIV di Indonesia",
    desc: "Per 2023, Indonesia masuk 10 besar negara dengan kasus HIV tertinggi di Asia.",
    color: "text-indigo-600 dark:text-indigo-400",
    accent: "bg-indigo-50 dark:bg-indigo-500/10 border-indigo-100 dark:border-indigo-500/20",
    bar: "bg-indigo-500",
    glow: "rgba(99,102,241,0.10)",
  },
  {
    value: 35,
    suffix: "%",
    label: "Kasus baru adalah remaja",
    desc: "1 dari 3 infeksi HIV baru di Indonesia terjadi pada kelompok usia 15–24 tahun.",
    color: "text-orange-500 dark:text-orange-400",
    accent: "bg-orange-50 dark:bg-orange-500/10 border-orange-100 dark:border-orange-500/20",
    bar: "bg-orange-500",
    glow: "rgba(249,115,22,0.10)",
  },
  {
    value: 76,
    suffix: "%",
    label: "Tidak sadar terinfeksi",
    desc: "Mayoritas remaja yang terinfeksi HIV tidak mengetahui status mereka sendiri.",
    color: "text-rose-600 dark:text-rose-400",
    accent: "bg-rose-50 dark:bg-rose-500/10 border-rose-100 dark:border-rose-500/20",
    bar: "bg-rose-500",
    glow: "rgba(244,63,94,0.10)",
  },
  {
    value: 95,
    suffix: "%",
    label: "Kasus bisa dicegah",
    desc: "Dengan pengetahuan yang benar, hampir semua kasus penularan HIV bisa dihindari.",
    color: "text-teal-600 dark:text-teal-400",
    accent: "bg-teal-50 dark:bg-teal-500/10 border-teal-100 dark:border-teal-500/20",
    bar: "bg-teal-500",
    glow: "rgba(20,184,166,0.10)",
  },
];

function useCounter(target: number, duration = 2000, startCounting: boolean) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!startCounting) return;
    let start = 0;
    const step = target / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [target, duration, startCounting]);

  return count;
}

function StatCard({
  value,
  suffix,
  label,
  desc,
  color,
  accent,
  bar,
  glow,
  index,
  startCounting,
}: (typeof stats)[0] & { index: number; startCounting: boolean }) {
  const count = useCounter(value, 1800, startCounting);

  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.55, delay: index * 0.1, ease: "easeOut" }}
      whileHover={{ y: -5, scale: 1.015 }}
      className="group relative flex flex-col gap-4 p-7 rounded-3xl border border-gray-100/80 dark:border-[var(--border-subtle)] bg-white/80 dark:bg-[var(--bg-surface)] backdrop-blur-sm transition-all duration-300 overflow-hidden"
      style={{
        boxShadow: startCounting
          ? `0 4px 24px ${glow}, 0 1px 3px rgba(0,0,0,0.04)`
          : "0 1px 3px rgba(0,0,0,0.04), 0 4px 16px rgba(0,0,0,0.04)",
      }}
    >
      {/* Top accent stripe */}
      <div className={`absolute top-0 left-6 right-6 h-[2px] rounded-b-full ${bar} opacity-60 group-hover:opacity-90 transition-opacity`} />

      {/* Background glow */}
      <div
        className="absolute -top-10 -right-10 w-36 h-36 rounded-full blur-3xl opacity-30 dark:opacity-20 pointer-events-none transition-opacity"
        style={{ background: glow.replace("0.10", "1") }}
      />

      {/* Accent pill */}
      <div className={`inline-flex self-start px-3 py-1.5 rounded-xl border text-xs font-semibold tracking-wide ${accent} ${color} transition-colors`}>
        {suffix === "%" ? "Persentase" : "Jumlah"}
      </div>

      {/* Number */}
      <div>
        <p className={`text-5xl md:text-6xl font-black tracking-tight leading-none transition-colors ${color}`}>
          {count}
          <span className="text-3xl md:text-4xl">{suffix}</span>
        </p>
        <p className="text-gray-900 dark:text-white font-semibold text-sm mt-2.5 transition-colors leading-snug">
          {label}
        </p>
      </div>

      <div className="h-px bg-gray-100 dark:bg-white/5" />

      <p className="text-gray-500 dark:text-[var(--text-secondary)] text-sm leading-relaxed transition-colors">
        {desc}
      </p>
    </motion.div>
  );
}

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

export default function StatsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="relative section-padding bg-white/50 dark:bg-[var(--bg-base)] overflow-hidden transition-colors duration-300">

      {/* Top bridge — blends seamlessly from HeroSection */}
      <div className="absolute top-0 inset-x-0 h-32 bg-gradient-to-b from-white dark:from-[var(--bg-base)] to-transparent pointer-events-none z-0" />

      {/* Ambient blobs — echo Hero's palette */}
      <div className="absolute top-1/3 -right-24 w-[400px] h-[400px] rounded-full bg-orange-200/15 dark:bg-orange-500/5 blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 -left-16 w-[320px] h-[320px] rounded-full bg-indigo-200/15 dark:bg-indigo-500/5 blur-3xl pointer-events-none" />

      {/* Bottom bridge — blends into FeaturesSection */}
      <div className="absolute bottom-0 inset-x-0 h-24 bg-gradient-to-t from-white dark:from-[var(--bg-surface)] to-transparent pointer-events-none z-0" />

      <div className="container-cerita relative z-10">

        {/* Header */}
        <motion.div
          className="text-center mb-16"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.span
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block px-4 py-1.5 rounded-full bg-orange-50 dark:bg-orange-500/10 border border-orange-100 dark:border-orange-500/20 text-xs font-bold text-orange-600 dark:text-orange-400 uppercase tracking-widest mb-5 transition-colors"
          >
            Fakta yang Harus Kamu Tahu
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: -16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-4xl font-black tracking-tight text-gray-900 dark:text-white mb-4 transition-colors"
          >
            HIV/AIDS di Indonesia{" "}
            <span className="text-gradient-warm">Lebih Dekat</span>{" "}
            dari yang Kamu Kira
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-gray-500 dark:text-[var(--text-secondary)] max-w-xl mx-auto text-base leading-relaxed transition-colors"
          >
            Data resmi Kementerian Kesehatan RI yang jarang dibahas di sekolah —
            tapi sangat penting untuk kamu ketahui.
          </motion.p>
        </motion.div>

        {/* Stats grid */}
        <div
          ref={ref}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
        >
          {stats.map((stat, i) => (
            <StatCard
              key={stat.label}
              {...stat}
              index={i}
              startCounting={isInView}
            />
          ))}
        </div>

        {/* Source note */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="text-center text-xs text-gray-400 dark:text-[var(--text-disabled)] mt-10 transition-colors"
        >
          Sumber: Kementerian Kesehatan RI, UNAIDS 2023
        </motion.p>

      </div>
    </section>
  );
}