// C:\Users\LENOVO\Documents\cerita-app\src\components\sections\StatsSection.tsx

"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, type Variants } from "framer-motion";
import { cn } from "@/lib/utils";

// ── Stat data with explicit light/dark token pairs ──
const stats = [
  {
    value: 526,
    suffix: "K+",
    label: "ODHIV di Indonesia",
    desc: "Per 2023, Indonesia masuk 10 besar negara dengan kasus HIV tertinggi di Asia.",
    // Light
    cardBg: "bg-[#FFF000]",
    numColor: "text-black",
    labelColor: "text-black",
    descColor: "text-black/70",
    shadow: "shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]",
    bar: "bg-black",
    accentBg: "bg-black",
    accentText: "text-[#FFF000]",
    // Dark
    dCardBg: "dark:bg-yellow-400/20",
    dNumColor: "dark:text-yellow-300",
    dLabelColor: "dark:text-white",
    dDescColor: "dark:text-white/60",
    dShadow: "dark:shadow-[8px_8px_0px_0px_rgba(255,255,255,0.8)]",
    dBar: "dark:bg-yellow-400",
    dAccentBg: "dark:bg-yellow-400/30",
    dAccentText: "dark:text-yellow-300",
  },
  {
    value: 35,
    suffix: "%",
    label: "Kasus baru adalah remaja",
    desc: "1 dari 3 infeksi HIV baru di Indonesia terjadi pada kelompok usia 15–24 tahun.",
    cardBg: "bg-black",
    numColor: "text-white",
    labelColor: "text-white",
    descColor: "text-white/60",
    shadow: "shadow-[8px_8px_0px_0px_#FF2D78]",
    bar: "bg-[#FF2D78]",
    accentBg: "bg-[#FF2D78]",
    accentText: "text-white",
    dCardBg: "dark:bg-slate-800",
    dNumColor: "dark:text-white",
    dLabelColor: "dark:text-white",
    dDescColor: "dark:text-white/50",
    dShadow: "dark:shadow-[8px_8px_0px_0px_rgba(255,45,120,0.8)]",
    dBar: "dark:bg-pink-500",
    dAccentBg: "dark:bg-pink-600",
    dAccentText: "dark:text-white",
  },
  {
    value: 76,
    suffix: "%",
    label: "Tidak sadar terinfeksi",
    desc: "Mayoritas remaja yang terinfeksi HIV tidak mengetahui status mereka sendiri.",
    cardBg: "bg-[#FF2D78]",
    numColor: "text-black",
    labelColor: "text-black",
    descColor: "text-black/70",
    shadow: "shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]",
    bar: "bg-black",
    accentBg: "bg-black",
    accentText: "text-white",
    dCardBg: "dark:bg-pink-700",
    dNumColor: "dark:text-white",
    dLabelColor: "dark:text-white",
    dDescColor: "dark:text-white/70",
    dShadow: "dark:shadow-[8px_8px_0px_0px_rgba(255,255,255,0.8)]",
    dBar: "dark:bg-white",
    dAccentBg: "dark:bg-white/20",
    dAccentText: "dark:text-white",
  },
  {
    value: 95,
    suffix: "%",
    label: "Kasus bisa dicegah",
    desc: "Dengan pengetahuan yang benar, hampir semua kasus penularan HIV bisa dihindari.",
    cardBg: "bg-white",
    numColor: "text-[#FF2D78]",
    labelColor: "text-black",
    descColor: "text-black/60",
    shadow: "shadow-[8px_8px_0px_0px_#FF2D78]",
    bar: "bg-[#FF2D78]",
    accentBg: "bg-[#FF2D78]",
    accentText: "text-white",
    dCardBg: "dark:bg-slate-700",
    dNumColor: "dark:text-pink-400",
    dLabelColor: "dark:text-white",
    dDescColor: "dark:text-white/60",
    dShadow: "dark:shadow-[8px_8px_0px_0px_rgba(255,45,120,0.8)]",
    dBar: "dark:bg-pink-500",
    dAccentBg: "dark:bg-pink-600",
    dAccentText: "dark:text-white",
  },
];

function useCounter(target: number, duration = 2000, startCounting: boolean) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!startCounting) return;
    let current = 0;
    const step = target / (duration / 16);
    const timer = setInterval(() => {
      current += step;
      if (current >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
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
  cardBg, numColor, labelColor, descColor, shadow, bar, accentBg, accentText,
  dCardBg, dNumColor, dLabelColor, dDescColor, dShadow, dBar, dAccentBg, dAccentText,
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
      whileHover={{ y: -6, scale: 1.015 }}
      className={cn(
        "group relative flex flex-col gap-4 p-7",
        "border-2 border-black dark:border-white/20",
        cardBg, dCardBg,
        shadow, dShadow,
        "transition-all duration-200 overflow-hidden",
      )}
    >
      {/* Top accent bar */}
      <div className={cn("absolute top-0 left-0 right-0 h-[5px]", bar, dBar)} />

      {/* Accent pill */}
      <div
        className={cn(
          "inline-flex self-start px-3 py-1.5",
          "border-2 border-black dark:border-white/30",
          "text-xs font-black tracking-widest uppercase",
          accentBg, dAccentBg, accentText, dAccentText,
        )}
      >
        {suffix === "%" ? "Persentase" : "Jumlah"}
      </div>

      {/* Number */}
      <div>
        <p className={cn("text-6xl md:text-7xl font-black tracking-tighter leading-none", numColor, dNumColor)}>
          {count}
          <span className="text-4xl md:text-5xl">{suffix}</span>
        </p>
        <p className={cn("font-black text-sm mt-3 uppercase tracking-widest leading-snug", labelColor, dLabelColor)}>
          {label}
        </p>
      </div>

      {/* Divider */}
      <div className="h-[2px] bg-black/20 dark:bg-white/20" />

      {/* Description */}
      <p className={cn("text-sm leading-relaxed font-semibold", descColor, dDescColor)}>
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
    <section
      className={cn(
        "relative overflow-hidden py-20 px-6",
        // Gradient flow: continues from Hero's cyan-50/indigo-900
        "bg-gradient-to-b from-cyan-50 via-sky-50 to-violet-50",
        "dark:from-indigo-900 dark:via-indigo-950 dark:to-slate-900",
      )}
    >
      {/* Grid lines overlay — adapts per mode */}
      <div
        className={cn(
          "absolute inset-0 pointer-events-none",
          "[background-image:repeating-linear-gradient(90deg,transparent,transparent_59px,rgba(0,0,0,0.04)_59px,rgba(0,0,0,0.04)_60px),repeating-linear-gradient(0deg,transparent,transparent_59px,rgba(0,0,0,0.04)_59px,rgba(0,0,0,0.04)_60px)]",
          "dark:[background-image:repeating-linear-gradient(90deg,transparent,transparent_59px,rgba(255,255,255,0.04)_59px,rgba(255,255,255,0.04)_60px),repeating-linear-gradient(0deg,transparent,transparent_59px,rgba(255,255,255,0.04)_59px,rgba(255,255,255,0.04)_60px)]",
        )}
      />

      {/* Top bridge continuation */}
      <div className="absolute top-0 inset-x-0 h-8 bg-gradient-to-b from-cyan-50 dark:from-indigo-900 to-transparent pointer-events-none z-0" />

      {/* Decorative diagonal stripes */}
      <div
        className="absolute -top-10 -left-10 w-48 h-48 pointer-events-none opacity-10 dark:opacity-5"
        style={{
          background:
            "repeating-linear-gradient(45deg, #FFF000 0px, #FFF000 10px, transparent 10px, transparent 24px)",
        }}
      />
      <div
        className="absolute -bottom-10 -right-10 w-48 h-48 pointer-events-none opacity-10 dark:opacity-5"
        style={{
          background:
            "repeating-linear-gradient(45deg, #FF2D78 0px, #FF2D78 10px, transparent 10px, transparent 24px)",
        }}
      />

      <div className="max-w-6xl mx-auto relative z-10">

        {/* Section Header */}
        <motion.div
          className="text-center mb-14"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.span
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className={cn(
              "inline-block px-4 py-1.5 mb-5",
              "border-2 border-black dark:border-white",
              "bg-[#FFF000] dark:bg-yellow-400/20",
              "text-black dark:text-yellow-300",
              "text-xs font-black uppercase tracking-widest",
              "shadow-[4px_4px_0px_0px_#000] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,0.7)]",
            )}
          >
            Fakta yang Harus Kamu Tahu
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: -16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-5xl font-black tracking-tighter text-black dark:text-white mb-4 uppercase leading-[0.95]"
          >
            HIV/AIDS di Indonesia{" "}
            <span className="relative inline-block">
              <span className="relative z-10 bg-[#FF2D78] dark:bg-pink-600 text-white px-2">
                Lebih Dekat
              </span>
            </span>{" "}
            dari yang Kamu Kira
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className={cn(
              "max-w-[36rem] mx-auto text-base leading-relaxed font-semibold text-left",
              "border-l-4 border-black dark:border-white/50 pl-4",
              "text-black/60 dark:text-white/60",
            )}
          >
            Data resmi Kementerian Kesehatan RI yang jarang dibahas di sekolah —
            tapi sangat penting untuk kamu ketahui.
          </motion.p>
        </motion.div>

        {/* Stats Grid — outer neo-brutalist frame */}
        <div
          className={cn(
            "border-2 border-black dark:border-white/30",
            "shadow-[10px_10px_0px_0px_#FF2D78] dark:shadow-[10px_10px_0px_0px_rgba(255,45,120,0.7)]",
          )}
        >
          <div
            ref={ref}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-y-2 sm:divide-y-0 sm:divide-x-2 divide-black dark:divide-white/20"
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
        </div>

        {/* Source note */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="text-center text-xs text-black/40 dark:text-white/30 mt-8 font-bold uppercase tracking-widest"
        >
          Sumber: Kementerian Kesehatan RI, UNAIDS 2023
        </motion.p>
      </div>

      {/* Bottom bridge */}
      <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-violet-50 dark:from-slate-900 to-transparent pointer-events-none" />
    </section>
  );
}