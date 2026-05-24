"use client";

import { motion } from "framer-motion";
import { BookOpen, Brain, Trophy } from "lucide-react";

const steps = [
  {
    number: "01",
    icon: BookOpen,
    title: "Baca Materi",
    desc: "4 chapter edukasi yang ditulis dengan bahasa santai dan mudah dipahami. Bukan ceramah — ini cerita.",
    color: "text-indigo-400",
    bg: "bg-indigo-500/10",
    border: "border-indigo-500/20",
  },
  {
    number: "02",
    icon: Brain,
    title: "Uji Pengetahuan",
    desc: "Setiap chapter diakhiri kuis interaktif. Jawab dengan benar untuk membuka chapter berikutnya.",
    color: "text-teal-400",
    bg: "bg-teal-500/10",
    border: "border-teal-500/20",
  },
  {
    number: "03",
    icon: Trophy,
    title: "Raih Pencapaian",
    desc: "Kumpulkan skor tertinggi dan buktikan bahwa kamu sudah siap melindungi diri dan orang-orang sekitarmu.",
    color: "text-orange-400",
    bg: "bg-orange-500/10",
    border: "border-orange-500/20",
  },
];

export default function FeaturesSection() {
  return (
    <section className="section-padding bg-[var(--bg-surface)]">
      <div className="container-cerita">

        {/* Header */}
        <div className="text-center mb-14">
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-sm font-semibold text-teal-400 uppercase tracking-widest mb-3"
          >
            Cara Kerja CERITA
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: -16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-4xl font-bold text-white mb-4"
          >
            Belajar Itu{" "}
            <span className="text-gradient-primary">Semudah 3 Langkah</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-[var(--text-secondary)] max-w-lg mx-auto"
          >
            Dirancang khusus untuk remaja — tidak membosankan, tidak menggurui,
            dan bisa selesai dalam 15 menit.
          </motion.p>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">

          {/* Connector line — desktop only */}
          <div className="hidden md:block absolute top-10 left-[calc(16.66%+24px)] right-[calc(16.66%+24px)] h-px bg-gradient-to-r from-indigo-500/30 via-teal-500/30 to-orange-500/30" />

          {steps.map((step, i) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.15, ease: "easeOut" }}
              whileHover={{ y: -6 }}
              className={`relative flex flex-col gap-5 p-6 rounded-2xl border ${step.border} ${step.bg} transition-all duration-300`}
            >
              {/* Number badge */}
              <div className="flex items-center justify-between">
                <div className={`p-3 rounded-xl ${step.bg} border ${step.border}`}>
                  <step.icon size={22} className={step.color} />
                </div>
                <span className={`text-5xl font-black opacity-10 ${step.color}`}>
                  {step.number}
                </span>
              </div>

              <div>
                <h3 className="text-white font-semibold text-xl mb-2">
                  {step.title}
                </h3>
                <p className="text-[var(--text-secondary)] text-sm leading-relaxed">
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