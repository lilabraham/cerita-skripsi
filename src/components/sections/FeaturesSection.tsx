// C:\Users\LENOVO\Documents\cerita-app\src\components\sections\FeaturesSection.tsx

"use client";

import { motion } from "framer-motion";
import { BookOpen, Brain, Trophy } from "lucide-react";
import { cn } from "@/lib/utils";

const steps = [
  {
    number: "01",
    icon: BookOpen,
    title: "Baca Materi",
    desc: "4 chapter edukasi yang ditulis dengan bahasa santai dan mudah dipahami. Bukan ceramah — ini cerita.",
    color: "text-indigo-600 dark:text-indigo-400",
    bg: "bg-indigo-50 dark:bg-indigo-500/10",
    border: "border-indigo-100 dark:border-indigo-500/20",
    numberColor: "text-indigo-500 dark:text-indigo-500",
    barColor: "bg-indigo-500",
    shadowHover: "hover:shadow-[0_12px_40px_rgba(99,102,241,0.12)]",
  },
  {
    number: "02",
    icon: Brain,
    title: "Uji Pengetahuan",
    desc: "Setiap chapter diakhiri kuis interaktif. Jawab dengan benar untuk membuka chapter berikutnya.",
    color: "text-teal-600 dark:text-teal-400",
    bg: "bg-teal-50 dark:bg-teal-500/10",
    border: "border-teal-100 dark:border-teal-500/20",
    numberColor: "text-teal-500 dark:text-teal-500",
    barColor: "bg-teal-500",
    shadowHover: "hover:shadow-[0_12px_40px_rgba(20,184,166,0.12)]",
  },
  {
    number: "03",
    icon: Trophy,
    title: "Raih Pencapaian",
    desc: "Kumpulkan skor tertinggi dan buktikan bahwa kamu sudah siap melindungi diri dan orang-orang sekitarmu.",
    color: "text-orange-600 dark:text-orange-400",
    bg: "bg-orange-50 dark:bg-orange-500/10",
    border: "border-orange-100 dark:border-orange-500/20",
    numberColor: "text-orange-500 dark:text-orange-500",
    barColor: "bg-orange-500",
    shadowHover: "hover:shadow-[0_12px_40px_rgba(249,115,22,0.12)]",
  },
];

export default function FeaturesSection() {
  return (
    <section className="relative section-padding bg-white/60 dark:bg-[var(--bg-surface)] overflow-hidden transition-colors duration-300">

      {/* Top bridge — from StatsSection white */}
      <div className="absolute top-0 inset-x-0 h-24 bg-gradient-to-b from-white dark:from-[var(--bg-surface)] to-transparent pointer-events-none z-0" />

      {/* Ambient blobs — teal-dominant matching step 02 */}
      <div className="absolute top-1/4 -right-20 w-[360px] h-[360px] rounded-full bg-teal-200/10 dark:bg-teal-500/5 blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/3 left-1/4 w-[280px] h-[280px] rounded-full bg-violet-200/10 dark:bg-violet-500/5 blur-3xl pointer-events-none" />

      {/* Bottom bridge — into CTASection */}
      <div className="absolute bottom-0 inset-x-0 h-24 bg-gradient-to-t from-white/80 dark:from-[var(--bg-base)] to-transparent pointer-events-none z-0" />

      <div className="container-cerita relative z-10">

        {/* Header */}
        <div className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block px-4 py-1.5 rounded-full bg-teal-50 dark:bg-teal-500/10 border border-teal-100 dark:border-teal-500/20 text-xs font-bold text-teal-600 dark:text-teal-400 uppercase tracking-widest mb-5 transition-colors"
          >
            Cara Kerja CERITA
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: -16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-4xl font-black tracking-tight text-gray-900 dark:text-white mb-4 transition-colors"
          >
            Belajar Itu{" "}
            <span className="text-gradient-primary">Semudah 3 Langkah</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-gray-500 dark:text-[var(--text-secondary)] max-w-lg mx-auto text-base leading-relaxed transition-colors"
          >
            Dirancang khusus untuk remaja — tidak membosankan, tidak menggurui,
            dan bisa selesai dalam 15 menit.
          </motion.p>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">

          {/* Connector line */}
          <div className="hidden md:block absolute top-[3.25rem] left-[calc(16.66%+48px)] right-[calc(16.66%+48px)] h-px">
            <div className="w-full h-full bg-gradient-to-r from-indigo-200/80 via-teal-200/60 to-orange-200/80 dark:from-indigo-500/30 dark:via-teal-500/30 dark:to-orange-500/30 transition-colors" />
            <motion.div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-teal-400 dark:bg-teal-500"
              animate={{ scale: [1, 1.6, 1], opacity: [0.6, 1, 0.6] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>

          {steps.map((step, i) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: i * 0.15, ease: "easeOut" }}
              whileHover={{ y: -6 }}
              className={cn(
                "group relative flex flex-col gap-5 p-8 rounded-3xl border transition-all duration-300",
                "bg-white/80 dark:bg-transparent backdrop-blur-sm",
                "shadow-[0_2px_16px_rgba(0,0,0,0.05),0_1px_3px_rgba(0,0,0,0.04)] dark:shadow-none",
                step.shadowHover,
                step.border,
              )}
            >
              {/* Top accent bar */}
              <div className={cn(
                "absolute top-0 left-8 right-8 h-[2px] rounded-b-full opacity-0 group-hover:opacity-100 transition-opacity duration-300",
                step.barColor
              )} />

              {/* Header row */}
              <div className="flex items-center justify-between">
                <div className={cn(
                  "p-3.5 rounded-2xl border shadow-sm dark:shadow-none transition-colors",
                  step.bg,
                  step.border
                )}>
                  <step.icon size={22} className={step.color} />
                </div>
                <span className={cn(
                  "text-6xl font-black opacity-[0.12] dark:opacity-[0.08] tracking-tighter leading-none transition-opacity group-hover:opacity-[0.18] dark:group-hover:opacity-[0.12]",
                  step.numberColor
                )}>
                  {step.number}
                </span>
              </div>

              <div className="h-px bg-gray-100 dark:bg-white/5" />

              <div className="space-y-2.5">
                <h3 className="text-gray-900 dark:text-white font-bold text-lg leading-tight transition-colors">
                  {step.title}
                </h3>
                <p className="text-gray-500 dark:text-[var(--text-secondary)] text-sm leading-relaxed transition-colors">
                  {step.desc}
                </p>
              </div>

              {/* Step indicator pill */}
              <div className={cn(
                "inline-flex self-start items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border transition-colors",
                step.bg,
                step.border,
                step.color
              )}>
                <span className={cn("w-1 h-1 rounded-full", step.barColor)} />
                Langkah {step.number}
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}