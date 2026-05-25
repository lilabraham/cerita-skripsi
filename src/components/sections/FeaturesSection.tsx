"use client";

import { motion } from "framer-motion";
import { BookOpen, Brain, Trophy } from "lucide-react";
import { cn } from "@/lib/utils";

// ✅ FIX 1: Menambahkan kelas warna khusus Light Mode ke dalam data array
const steps = [
  {
    number: "01",
    icon: BookOpen,
    title: "Baca Materi",
    desc: "4 chapter edukasi yang ditulis dengan bahasa santai dan mudah dipahami. Bukan ceramah — ini cerita.",
    color: "text-indigo-600 dark:text-indigo-400",
    bg: "bg-indigo-50 dark:bg-indigo-500/10",
    border: "border-indigo-100 dark:border-indigo-500/20",
    shadow: "shadow-indigo-500/5 hover:shadow-indigo-500/10",
  },
  {
    number: "02",
    icon: Brain,
    title: "Uji Pengetahuan",
    desc: "Setiap chapter diakhiri kuis interaktif. Jawab dengan benar untuk membuka chapter berikutnya.",
    color: "text-teal-600 dark:text-teal-400",
    bg: "bg-teal-50 dark:bg-teal-500/10",
    border: "border-teal-100 dark:border-teal-500/20",
    shadow: "shadow-teal-500/5 hover:shadow-teal-500/10",
  },
  {
    number: "03",
    icon: Trophy,
    title: "Raih Pencapaian",
    desc: "Kumpulkan skor tertinggi dan buktikan bahwa kamu sudah siap melindungi diri dan orang-orang sekitarmu.",
    color: "text-orange-600 dark:text-orange-400",
    bg: "bg-orange-50 dark:bg-orange-500/10",
    border: "border-orange-100 dark:border-orange-500/20",
    shadow: "shadow-orange-500/5 hover:shadow-orange-500/10",
  },
];

export default function FeaturesSection() {
  return (
    <section className="section-padding bg-[var(--bg-surface)] transition-colors duration-300">
      <div className="container-cerita">

        {/* Header */}
        <div className="text-center mb-14">
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            // ✅ FIX 2: Warna label atas lebih tajam
            className="text-sm font-semibold text-teal-600 dark:text-teal-400 uppercase tracking-widest mb-3 transition-colors"
          >
            Cara Kerja CERITA
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: -16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            // ✅ FIX 3: Teks judul "Belajar Itu" bisa dibaca sekarang
            className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4 transition-colors"
          >
            Belajar Itu{" "}
            <span className="text-gradient-primary">Semudah 3 Langkah</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-[var(--text-secondary)] max-w-lg mx-auto transition-colors"
          >
            Dirancang khusus untuk remaja — tidak membosankan, tidak menggurui,
            dan bisa selesai dalam 15 menit.
          </motion.p>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">

          {/* Connector line — desktop only */}
          <div className="hidden md:block absolute top-10 left-[calc(16.66%+24px)] right-[calc(16.66%+24px)] h-px bg-gradient-to-r from-indigo-500/10 via-teal-500/20 to-orange-500/10 dark:from-indigo-500/30 dark:via-teal-500/30 dark:to-orange-500/30 transition-colors" />

          {/* ✅ FIX 4: Kartu kini menjadi putih murni dengan bayangan, dan kembali transparan di Dark Mode */}
          {steps.map((step, i) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.15, ease: "easeOut" }}
              whileHover={{ y: -6 }}
              className={cn(
                "relative flex flex-col gap-5 p-6 rounded-2xl border transition-all duration-300",
                "bg-white dark:bg-transparent shadow-lg dark:shadow-none", // Kombinasi kunci untuk dual-mode
                step.border,
                step.shadow, // Efek hover shadow khusus light mode
                "dark:" + step.bg // Paksa background pastel hanya muncul di dark mode
              )}
            >
              {/* Number badge */}
              <div className="flex items-center justify-between">
                <div className={cn("p-3 rounded-xl border", step.bg, step.border)}>
                  <step.icon size={22} className={step.color} />
                </div>
                {/* ✅ FIX 5: Opacity angka besar diperjelas di light mode (10% -> 20%) agar terlihat */}
                <span className={cn("text-5xl font-black opacity-20 dark:opacity-10", step.color)}>
                  {step.number}
                </span>
              </div>

              <div>
                {/* ✅ FIX 6: Judul kartu bisa terbaca jelas (text-gray-900) */}
                <h3 className="text-gray-900 dark:text-white font-semibold text-xl mb-2 transition-colors">
                  {step.title}
                </h3>
                <p className="text-[var(--text-secondary)] text-sm leading-relaxed transition-colors">
                  {step.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}