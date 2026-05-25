// C:\Users\LENOVO\Documents\cerita-app\src\components\sections\CTASection.tsx

"use client";

import { motion } from "framer-motion";
import { ArrowRight, ShieldCheck } from "lucide-react";
import Link from "next/link";
import Button from "@/components/ui/Button";

export default function CTASection() {
  return (
    <section className="relative section-padding bg-transparent dark:bg-[var(--bg-base)] overflow-hidden transition-colors duration-300">

      {/* Page-level ambient blobs — visible through transparent bg */}
      <div className="absolute -top-32 left-1/4 w-[500px] h-[500px] rounded-full bg-violet-200/15 dark:bg-violet-600/10 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-20 right-1/4 w-[400px] h-[400px] rounded-full bg-teal-200/15 dark:bg-teal-500/8 blur-3xl pointer-events-none" />

      <div className="container-cerita relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="relative overflow-hidden rounded-[2rem] border border-gray-100/90 dark:border-indigo-500/20 bg-white/85 dark:bg-[var(--bg-surface)] backdrop-blur-xl transition-all duration-300"
          style={{
            boxShadow:
              "0 8px 48px rgba(99,102,241,0.10), 0 2px 12px rgba(0,0,0,0.05)",
          }}
        >
          {/* Top gradient strip */}
          <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-violet-500 via-indigo-500 to-teal-400 dark:from-indigo-600 dark:via-violet-500 dark:to-teal-500 opacity-80" />

          {/* Inner ambient blobs */}
          <div className="absolute -top-40 -left-24 w-[420px] h-[420px] rounded-full bg-violet-400/[0.05] dark:bg-indigo-600/20 blur-[120px] pointer-events-none transition-colors" />
          <div className="absolute -bottom-20 -right-20 w-64 h-64 rounded-full bg-teal-400/[0.05] dark:bg-teal-500/10 blur-3xl pointer-events-none transition-colors" />

          {/* Content */}
          <div className="relative z-10 px-10 py-16 md:py-24 md:px-20 text-center">

            {/* Floating icon */}
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="inline-flex p-4 rounded-2xl bg-indigo-50 dark:bg-indigo-500/10 border border-indigo-100 dark:border-indigo-500/20 mb-8 shadow-[0_4px_20px_rgba(99,102,241,0.15)] dark:shadow-none transition-colors"
            >
              <ShieldCheck size={32} className="text-indigo-600 dark:text-indigo-400" />
            </motion.div>

            {/* Eyebrow */}
            <motion.span
              initial={{ opacity: 0, y: -8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-block px-4 py-1.5 rounded-full bg-indigo-50 dark:bg-indigo-500/10 border border-indigo-100 dark:border-indigo-500/20 text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-widest mb-6 transition-colors"
            >
              Mulai Hari Ini
            </motion.span>

            {/* Headline */}
            <h2 className="font-[family-name:var(--font-display)] text-3xl md:text-5xl font-black tracking-tight text-gray-900 dark:text-white mb-5 transition-colors leading-[1.1]">
              Pengetahuan adalah{" "}
              <span className="text-gradient-animated">
                Senjata Terbaik
              </span>
            </h2>

            <p className="text-gray-500 dark:text-[var(--text-secondary)] text-lg max-w-md mx-auto mb-12 transition-colors leading-relaxed">
              Jangan tunggu sampai terlambat. Mulai edukasi sekarang —
              gratis, mudah, dan bisa diselesaikan dalam 15 menit.
            </p>

            {/* Trust signals */}
            <div className="flex flex-wrap items-center justify-center gap-6 mb-10">
              {[
                { value: "15 mnt", label: "Selesai belajar" },
                { value: "Gratis", label: "Tanpa biaya" },
                { value: "4 bab", label: "Materi lengkap" },
              ].map((item) => (
                <div key={item.label} className="flex items-center gap-2.5">
                  <div className="w-1 h-6 rounded-full bg-gradient-to-b from-indigo-400 to-teal-400 dark:from-indigo-500 dark:to-teal-500" />
                  <div className="text-left">
                    <p className="text-sm font-black text-gray-900 dark:text-white leading-none">{item.value}</p>
                    <p className="text-xs text-gray-400 dark:text-[var(--text-disabled)] mt-0.5">{item.label}</p>
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

            <p className="mt-10 text-xs text-gray-400 dark:text-[var(--text-disabled)] transition-colors">
              Dikembangkan sebagai media intervensi penelitian skripsi kebidanan · 2026
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}