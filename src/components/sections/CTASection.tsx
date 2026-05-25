// C:\Users\LENOVO\Documents\cerita-app\src\components\sections\CTASection.tsx

"use client";

import { motion } from "framer-motion";
import { ArrowRight, ShieldCheck } from "lucide-react";
import Link from "next/link";
import Button from "@/components/ui/Button";

export default function CTASection() {
  return (
    // ✅ FIX 1: Transisi warna halus saat berganti mode
    <section className="section-padding bg-[var(--bg-base)] transition-colors duration-300">
      <div className="container-cerita">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          // ✅ FIX 2: Background kartu menjadi putih murni dengan border abu halus + shadow besar di Light Mode
          className="relative overflow-hidden rounded-3xl border border-gray-200/60 dark:border-indigo-500/20 bg-white dark:bg-[var(--bg-surface)] shadow-[0_12px_56px_-10px_rgba(99,102,241,0.16),0_2px_16px_-4px_rgba(0,0,0,0.06)] dark:shadow-none p-12 md:p-20 text-center transition-all duration-300"
        >
          {/* Background blobs - Opacity dikurangi di light mode agar tidak "kotor" */}
          <div className="absolute -top-36 -left-20 w-[420px] h-[420px] rounded-full bg-indigo-500/[0.07] dark:bg-indigo-600/20 blur-[110px] pointer-events-none transition-colors" />
<div className="absolute -bottom-16 -right-16 w-56 h-56 rounded-full bg-rose-400/[0.07] dark:bg-rose-500/14 blur-3xl pointer-events-none transition-colors" />

          {/* Icon */}
          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            // ✅ FIX 3: Icon Box diperjelas di Light Mode
            className="inline-flex p-4 rounded-2xl bg-indigo-50 dark:bg-indigo-500/10 border border-indigo-100 dark:border-indigo-500/20 mb-6 transition-colors"
          >
            <ShieldCheck size={32} className="text-indigo-600 dark:text-indigo-400" />
          </motion.div>

          {/* Text */}
          {/* ✅ FIX 4: Teks "Pengetahuan adalah" tidak lagi menghilang (text-white -> text-gray-900) */}
          <h2 className="font-[family-name:var(--font-display)] text-3xl md:text-5xl font-light tracking-tight text-gray-900 dark:text-white mb-6 relative z-10 transition-colors"
>
            Pengetahuan adalah{" "}
            <span className="text-gradient-animated">
              Senjata Terbaik
            </span>
          </h2>
          <p className="text-[var(--text-secondary)] text-lg max-w-md mx-auto mb-12 relative z-10 transition-colors leading-relaxed"
>
            Jangan tunggu sampai terlambat. Mulai edukasi sekarang —
            gratis, mudah, dan bisa diselesaikan dalam 15 menit.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center relative z-10">
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

          {/* Social proof */}
          <p className="mt-8 text-xs text-[var(--text-disabled)] relative z-10 transition-colors">
            Dikembangkan sebagai media intervensi penelitian skripsi kebidanan · 2026
          </p>
        </motion.div>
      </div>
    </section>
  );
}