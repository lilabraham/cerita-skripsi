"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, type Variants } from "framer-motion";

const stats = [
  {
    value: 526,
    suffix: "K+",
    label: "ODHIV di Indonesia",
    desc: "Per 2023, Indonesia masuk 10 besar negara dengan kasus HIV tertinggi di Asia.",
    color: "text-indigo-400",
    glow: "rgba(99,102,241,0.15)",
  },
  {
    value: 35,
    suffix: "%",
    label: "Kasus baru adalah remaja",
    desc: "1 dari 3 infeksi HIV baru di Indonesia terjadi pada kelompok usia 15–24 tahun.",
    color: "text-orange-400",
    glow: "rgba(249,115,22,0.15)",
  },
  {
    value: 76,
    suffix: "%",
    label: "Tidak sadar terinfeksi",
    desc: "Mayoritas remaja yang terinfeksi HIV tidak mengetahui status mereka sendiri.",
    color: "text-rose-400",
    glow: "rgba(244,63,94,0.15)",
  },
  {
    value: 95,
    suffix: "%",
    label: "Kasus bisa dicegah",
    desc: "Dengan pengetahuan yang benar, hampir semua kasus penularan HIV bisa dihindari.",
    color: "text-teal-400",
    glow: "rgba(20,184,166,0.15)",
  },
];

// Hook animated counter
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
      transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" }}
      whileHover={{ y: -6, scale: 1.02 }}
      className="relative flex flex-col gap-3 p-6 rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] transition-all duration-300 hover:border-[var(--border-default)] overflow-hidden"
      style={{
        boxShadow: startCounting
          ? `0 0 40px ${glow}`
          : undefined,
      }}
    >
      {/* Background glow blob */}
      <div
        className="absolute -top-8 -right-8 w-32 h-32 rounded-full blur-3xl opacity-20 pointer-events-none"
        style={{ background: glow.replace("0.15", "1") }}
      />

      <p className={`text-4xl md:text-5xl font-black tracking-tight ${color}`}>
        {count}
        {suffix}
      </p>
      <p className="text-white font-semibold text-base">{label}</p>
      <p className="text-[var(--text-secondary)] text-sm leading-relaxed">
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
    <section className="section-padding bg-[var(--bg-base)]">
      <div className="container-cerita">

        {/* Header */}
        <motion.div
          className="text-center mb-14"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-sm font-semibold text-orange-400 uppercase tracking-widest mb-3"
          >
            Fakta yang Harus Kamu Tahu
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: -16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-4xl font-bold text-white mb-4"
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
            className="text-[var(--text-secondary)] max-w-xl mx-auto"
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
          className="text-center text-xs text-[var(--text-disabled)] mt-8"
        >
          Sumber: Kementerian Kesehatan RI, UNAIDS 2023
        </motion.p>

      </div>
    </section>
  );
}