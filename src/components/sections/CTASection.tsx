"use client";

import { motion } from "framer-motion";
import { ArrowRight, ShieldAlert } from "lucide-react";
import Link from "next/link";
import Button from "@/components/ui/Button";

export default function CTASection() {
  return (
    <section className="section-padding bg-[var(--bg-base)]">
      <div className="container-cerita">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="relative overflow-hidden rounded-3xl border border-indigo-500/20 bg-[var(--bg-surface)] p-10 md:p-16 text-center"
        >
          {/* Background blobs */}
          <div className="absolute -top-24 -left-24 w-72 h-72 rounded-full bg-indigo-600/15 blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -right-24 w-72 h-72 rounded-full bg-teal-500/10 blur-3xl pointer-events-none" />

          {/* Icon */}
          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="inline-flex p-4 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 mb-6"
          >
            <ShieldAlert size={32} className="text-indigo-400" />
          </motion.div>

          {/* Text */}
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4 relative z-10">
            Pengetahuan adalah{" "}
            <span className="text-gradient-animated">
              Senjata Terbaik
            </span>
          </h2>
          <p className="text-[var(--text-secondary)] text-lg max-w-xl mx-auto mb-10 relative z-10">
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
          <p className="mt-8 text-xs text-[var(--text-disabled)] relative z-10">
            Dikembangkan sebagai media intervensi penelitian skripsi kebidanan · 2026
          </p>
        </motion.div>
      </div>
    </section>
  );
}