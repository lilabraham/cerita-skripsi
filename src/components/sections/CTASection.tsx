// src/components/sections/CTASection.tsx
"use client";

import { motion, type Variants } from "framer-motion";
import { ArrowRight, ShieldCheck, Zap, Star } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

/* ── Data ── */
const TRUST_ITEMS = [
  { icon: Zap,          value: "15 Menit", label: "Selesai Belajar" },
  { icon: ShieldCheck,  value: "Gratis",   label: "Tanpa Biaya" },
  { icon: Star,         value: "4 Bab",    label: "Materi Lengkap" },
];

const STICKERS = [
  {
    text: "100% Gratis ✦",
    bg: "bg-[#FF2D78] dark:bg-pink-600",
    textColor: "text-white",
    shadow: "shadow-[4px_4px_0px_0px_#000] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,0.6)]",
    rotate: "-rotate-6",
    pos: "top-6 left-6 md:left-10",
  },
  {
    text: "Info Akurat ★",
    bg: "bg-black dark:bg-slate-900",
    textColor: "text-[#FFF000]",
    shadow: "shadow-[4px_4px_0px_0px_#FF2D78]",
    rotate: "rotate-3",
    pos: "top-6 right-6 md:right-10",
  },
  {
    text: "Untuk Remaja ♥",
    bg: "bg-[#FFF000]",
    textColor: "text-black",
    shadow: "shadow-[4px_4px_0px_0px_#FF2D78]",
    rotate: "rotate-6",
    pos: "bottom-6 left-6 md:left-14",
  },
  {
    text: "No Stigma ✓",
    bg: "bg-white dark:bg-slate-200",
    textColor: "text-black",
    shadow: "shadow-[4px_4px_0px_0px_#000]",
    rotate: "-rotate-3",
    pos: "bottom-6 right-6 md:right-10",
  },
];

const containerVariants: Variants = {
  hidden:  { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};

const itemVariants: Variants = {
  hidden:  { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: "easeOut" } },
};

export default function CTASection() {
  return (
    <section
      className={cn(
        "relative overflow-hidden py-20 px-6",
        // Gradient flow: dari pink-50 (bawah Features) → amber-50
        "bg-gradient-to-b from-pink-50 via-amber-50 to-yellow-100",
        "dark:from-slate-900 dark:via-slate-900 dark:to-slate-900",
      )}
    >
      {/* Dot grid overlay */}
      <div
        className={cn(
          "absolute inset-0 pointer-events-none",
          "[background-image:radial-gradient(circle,rgba(0,0,0,0.07)_1.5px,transparent_1.5px)]",
          "dark:[background-image:radial-gradient(circle,rgba(255,255,255,0.05)_1.5px,transparent_1.5px)]",
          "[background-size:28px_28px]",
        )}
      />

      {/* Hazard diagonal stripe — pojok kiri bawah */}
      <div
        className="absolute bottom-0 left-0 w-56 h-56 pointer-events-none opacity-[0.06] dark:opacity-[0.04]"
        style={{
          background:
            "repeating-linear-gradient(45deg,#000 0px,#000 4px,transparent 4px,transparent 20px)",
        }}
      />
      {/* Hazard diagonal stripe — pojok kanan atas */}
      <div
        className="absolute top-0 right-0 w-56 h-56 pointer-events-none opacity-[0.06] dark:opacity-[0.04]"
        style={{
          background:
            "repeating-linear-gradient(45deg,#FF2D78 0px,#FF2D78 4px,transparent 4px,transparent 20px)",
        }}
      />

      <div className="max-w-5xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.65, ease: "easeOut" }}
          className="relative"
        >
          {/* ── 3D offset shadow ── */}
          <div
            className="absolute inset-0 bg-black dark:bg-white/80"
            style={{ transform: "translate(10px, 12px)" }}
          />

          {/* ── Main Card ── */}
          <div
            className={cn(
              "relative overflow-hidden",
              "bg-[#FFF000] dark:bg-yellow-400",
              "border-4 border-black dark:border-black",
            )}
          >
            {/* Top accent bar — pink stripe */}
            <div className="absolute top-0 left-0 right-0 h-2.5 bg-[#FF2D78]" />

            {/* Bottom accent bar */}
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-black/20" />

            {/* Inner corner cross decorations */}
            <span className="absolute top-5 left-5 font-black text-3xl text-black/10 select-none pointer-events-none">✦</span>
            <span className="absolute bottom-5 right-5 font-black text-3xl text-black/10 select-none pointer-events-none">✦</span>

            {/* Diagonal accent — kanan atas */}
            <div
              className="absolute -top-8 -right-8 w-32 h-32 pointer-events-none opacity-15"
              style={{
                background:
                  "repeating-linear-gradient(45deg,#000 0px,#000 6px,transparent 6px,transparent 18px)",
              }}
            />

            {/* Sticker labels — hidden on mobile */}
            {STICKERS.map((s) => (
              <motion.div
                key={s.text}
                initial={{ opacity: 0, scale: 0.7, rotate: -10 }}
                whileInView={{ opacity: 1, scale: 1, rotate: parseInt(s.rotate) }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, type: "spring", bounce: 0.5 }}
                className={cn(
                  "absolute hidden sm:block z-20",
                  s.pos,
                  "px-3 py-1.5",
                  s.bg,
                  "border-2 border-black",
                  s.textColor,
                  "font-black text-[11px] uppercase tracking-widest",
                  s.shadow,
                  s.rotate,
                )}
              >
                {s.text}
              </motion.div>
            ))}

            {/* ── Content ── */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="relative z-10 px-8 py-16 sm:py-20 md:px-20 md:py-28 text-center"
            >
              {/* Eyebrow badge */}
              <motion.div variants={itemVariants} className="flex justify-center mb-8">
                <span
                  className={cn(
                    "inline-flex items-center gap-2 px-5 py-2.5",
                    "bg-black text-[#FFF000]",
                    "border-2 border-black",
                    "shadow-[4px_4px_0px_0px_#FF2D78]",
                    "font-black text-xs uppercase tracking-widest",
                  )}
                >
                  <Zap size={14} />
                  Mulai Hari Ini — Gratis
                  <Zap size={14} />
                </span>
              </motion.div>

              {/* Headline */}
              <motion.h2
                variants={itemVariants}
                className="text-4xl sm:text-5xl md:text-[5.5rem] font-black tracking-tighter uppercase leading-[0.88] text-black mb-8"
              >
                Pengetahuan
                <br />
                <span
                  className={cn(
                    "relative inline-block my-1",
                    "bg-[#FF2D78] text-white",
                    "px-4 pb-1",
                    "border-2 border-black",
                    "-rotate-1",
                    "shadow-[5px_5px_0px_0px_#000]",
                  )}
                >
                  Adalah Senjata
                </span>
                <br />
                Terbaikmu
              </motion.h2>

              {/* Body */}
              <motion.p
                variants={itemVariants}
                className={cn(
                  "text-base md:text-lg font-semibold max-w-xl mx-auto mb-10 leading-relaxed text-left",
                  "border-l-4 border-black pl-4 py-2",
                  "bg-black/5",
                  "text-black/80",
                )}
              >
                Jangan tunggu sampai terlambat. Mulai edukasi sekarang — gratis,
                mudah, dan bisa diselesaikan dalam 15 menit.
              </motion.p>

              {/* Trust pills */}
              <motion.div
                variants={itemVariants}
                className="flex flex-wrap justify-center gap-3 mb-12"
              >
                {TRUST_ITEMS.map((item) => (
                  <div
                    key={item.label}
                    className={cn(
                      "flex items-center gap-3 px-5 py-3",
                      "bg-black text-white",
                      "border-2 border-black",
                      "shadow-[4px_4px_0px_0px_#FF2D78]",
                      "hover:-translate-y-0.5 hover:shadow-[5px_5px_0px_0px_#FF2D78]",
                      "transition-all duration-150",
                    )}
                  >
                    <item.icon size={16} className="text-[#FFF000] flex-shrink-0" />
                    <div className="text-left">
                      <p className="font-black text-sm leading-none text-[#FFF000]">{item.value}</p>
                      <p className="text-[10px] text-white/60 uppercase tracking-widest mt-0.5">{item.label}</p>
                    </div>
                  </div>
                ))}
              </motion.div>

              {/* CTA Buttons */}
              <motion.div
                variants={itemVariants}
                className="flex flex-col sm:flex-row gap-4 justify-center"
              >
                {/* Primary */}
                <Link href="/edukasi" className="w-full sm:w-auto">
                  <motion.div
                    whileHover={{ scale: 1.03, y: -2 }}
                    whileTap={{ scale: 0.97 }}
                    className={cn(
                      "group w-full inline-flex items-center justify-center gap-2.5 px-8 py-4 cursor-pointer",
                      "bg-black text-[#FFF000]",
                      "border-2 border-black",
                      "font-black text-base uppercase tracking-wider",
                      "shadow-[6px_6px_0px_0px_#FF2D78]",
                      "hover:bg-[#FF2D78] hover:text-white hover:shadow-[6px_6px_0px_0px_#000]",
                      "active:translate-x-[6px] active:translate-y-[6px] active:shadow-none",
                      "transition-all duration-150",
                    )}
                  >
                    Mulai Sekarang — Gratis
                    <ArrowRight
                      size={18}
                      className="group-hover:translate-x-1 transition-transform"
                    />
                  </motion.div>
                </Link>

                {/* Secondary */}
                <Link href="/tentang" className="w-full sm:w-auto">
                  <motion.div
                    whileHover={{ scale: 1.03, y: -2 }}
                    whileTap={{ scale: 0.97 }}
                    className={cn(
                      "w-full inline-flex items-center justify-center gap-2 px-8 py-4 cursor-pointer",
                      "bg-white text-black",
                      "border-2 border-black",
                      "font-black text-base uppercase tracking-wider",
                      "shadow-[6px_6px_0px_0px_#000]",
                      "hover:bg-[#FF2D78] hover:text-white hover:shadow-[6px_6px_0px_0px_#FFF000]",
                      "active:translate-x-[6px] active:translate-y-[6px] active:shadow-none",
                      "transition-all duration-150",
                    )}
                  >
                    Pelajari Lebih Lanjut
                  </motion.div>
                </Link>
              </motion.div>

              {/* Footer note */}
              <motion.p
                variants={itemVariants}
                className="mt-12 text-xs text-black/40 font-bold uppercase tracking-widest"
              >
                Dikembangkan sebagai media intervensi penelitian skripsi kebidanan · 2026
              </motion.p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}