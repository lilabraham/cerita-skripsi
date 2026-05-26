// C:\Users\LENOVO\Documents\cerita-app\src\components\sections\CTASection.tsx

"use client";

import { motion } from "framer-motion";
import { ArrowRight, ShieldCheck } from "lucide-react";
import Link from "next/link";
import Button from "@/components/ui/Button";
import {
  StarAccent,
  CowboyHat,
  WavyDot,
} from "@/components/decorations/PopArtAccents";

// Fewer, larger waves → more dramatic on wide card
const WAVY_CARD =
  "polygon(0% 3%, 16.66% 0%, 33.33% 3%, 50% 0%, 66.66% 3%, 83.33% 0%, 100% 3%, 100% 97%, 83.33% 100%, 66.66% 97%, 50% 100%, 33.33% 97%, 16.66% 100%, 0% 97%)";

// Tight waves on pill badge
const WAVY_PILL =
  "polygon(0% 15%, 10% 0%, 20% 15%, 30% 0%, 40% 15%, 50% 0%, 60% 15%, 70% 0%, 80% 15%, 90% 0%, 100% 15%, 100% 85%, 90% 100%, 80% 85%, 70% 100%, 60% 85%, 50% 100%, 40% 85%, 30% 100%, 20% 85%, 10% 100%, 0% 85%)";

const STARS = [
  { size: 16, cls: "top-8 left-[6%] text-yellow-400", dur: 11 },
  { size: 12, cls: "top-16 right-[8%] text-pink-400", dur: 15 },
  { size: 18, cls: "bottom-12 left-[12%] text-violet-400", dur: 9 },
  { size: 14, cls: "bottom-16 right-[6%] text-teal-400", dur: 13 },
];

export default function CTASection() {
  return (
    <section className="relative section-padding overflow-hidden bg-transparent dark:bg-[var(--bg-base)]">

      {/* Ambient section blobs */}
      <div className="absolute -top-32 left-1/4 w-[500px] h-[500px] rounded-full bg-violet-200/15 dark:bg-violet-600/10 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-20 right-1/4 w-[400px] h-[400px] rounded-full bg-cyan-200/15 dark:bg-teal-500/5 blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 -left-20 w-64 h-64 rounded-full bg-yellow-200/20 dark:bg-yellow-400/5 blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-0 w-48 h-48 rounded-full bg-pink-200/20 dark:bg-pink-500/5 blur-3xl pointer-events-none" />

      {/* Floating decorations */}
      {STARS.map((s, i) => (
        <StarAccent key={i} size={s.size} className={s.cls} duration={s.dur} />
      ))}
      <CowboyHat className="bottom-10 right-[5%] w-14 h-auto" />
      <WavyDot className="top-1/4 left-[8%] w-3 h-3 bg-lime-400" delay={0.5} />
      <WavyDot className="bottom-1/3 right-[15%] w-2 h-2 bg-pink-400" delay={1.5} />

      <div className="container-cerita relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="relative"
        >
          {/* 3D wavy shadow */}
          <div
            className="absolute inset-0 bg-sky-400 dark:bg-indigo-700"
            style={{
              clipPath: WAVY_CARD,
              transform: "translate(8px, 10px)",
              filter: "brightness(0.6)",
            }}
          />

          {/* Main wavy card */}
          <div
            className="relative bg-sky-50 dark:bg-[var(--bg-surface)]"
            style={{ clipPath: WAVY_CARD }}
          >
            {/* Gradient top strip */}
            <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-violet-500 via-pink-500 to-yellow-400" />

            {/* Inner ambient blobs */}
            <div className="absolute -top-40 -left-24 w-[380px] h-[380px] rounded-full bg-violet-400/[0.06] dark:bg-indigo-600/20 blur-[100px] pointer-events-none" />
            <div className="absolute -bottom-20 -right-16 w-56 h-56 rounded-full bg-cyan-400/[0.08] dark:bg-teal-500/10 blur-3xl pointer-events-none" />

            {/* Content */}
            <div className="relative z-10 px-10 py-20 md:py-28 md:px-20 text-center">

              {/* Floating shield icon */}
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="inline-flex p-4 rounded-2xl bg-white dark:bg-indigo-500/10 border-2 border-gray-900 dark:border-indigo-500/40 shadow-[4px_4px_0px_#000] dark:shadow-[4px_4px_0px_rgba(99,102,241,0.4)] mb-8 transition-colors"
              >
                <ShieldCheck size={32} className="text-indigo-600 dark:text-indigo-400" />
              </motion.div>

              {/* Wavy pill eyebrow */}
              <div className="flex justify-center mb-7">
                <span
                  className="inline-flex items-center gap-2 px-7 py-3 text-xs font-black uppercase tracking-widest text-gray-900 bg-gradient-to-r from-lime-300 to-yellow-300 border-2 border-gray-900 shadow-[3px_3px_0px_#000]"
                  style={{ clipPath: WAVY_PILL }}
                >
                  ✦ Mulai Hari Ini ✦
                </span>
              </div>

              {/* Headline */}
              <h2 className="font-[family-name:var(--font-display)] text-3xl md:text-5xl font-black tracking-tight text-gray-900 dark:text-white mb-5 leading-[1.1]">
                Pengetahuan adalah{" "}
                <span className="text-pink-500 dark:text-pink-400">
                  Senjata Terbaik
                </span>
              </h2>

              <p className="text-gray-600 dark:text-[var(--text-secondary)] text-lg max-w-md mx-auto mb-12 leading-relaxed">
                Jangan tunggu sampai terlambat. Mulai edukasi sekarang —
                gratis, mudah, dan bisa diselesaikan dalam 15 menit.
              </p>

              {/* Trust signals */}
              <div className="flex flex-wrap items-center justify-center gap-8 mb-12">
                {[
                  { value: "15 mnt", label: "Selesai belajar" },
                  { value: "Gratis", label: "Tanpa biaya" },
                  { value: "4 bab", label: "Materi lengkap" },
                ].map((item) => (
                  <div key={item.label} className="flex items-center gap-3">
                    <div className="w-1 h-10 rounded-full bg-gradient-to-b from-violet-500 to-pink-500 flex-shrink-0" />
                    <div className="text-left">
                      <p className="text-base font-black text-gray-900 dark:text-white leading-none">
                        {item.value}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-[var(--text-disabled)] mt-0.5">
                        {item.label}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/edukasi">
                  <Button variant="primary" size="lg" icon={ArrowRight}>
                    Mulai Sekarang — Gratis
                  </Button>
                </Link>
                <Link href="/tentang">
                  <Button variant="ghost" size="lg">
                    Pelajari Lebih Lanjut
                  </Button>
                </Link>
              </div>

              <p className="mt-12 text-xs text-gray-400 dark:text-[var(--text-disabled)]">
                Dikembangkan sebagai media intervensi penelitian skripsi kebidanan · 2026
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}