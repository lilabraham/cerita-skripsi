// C:\Users\LENOVO\Documents\cerita-app\src\components\sections\FeaturesSection.tsx

"use client";

import { motion } from "framer-motion";
import { BookOpen, Brain, Trophy } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  StarAccent,
  CowboyHat,
  WavyDot,
} from "@/components/decorations/PopArtAccents";

const WAVY_CLIP =
  "polygon(0% 5%, 12.5% 0%, 25% 5%, 37.5% 0%, 50% 5%, 62.5% 0%, 75% 5%, 87.5% 0%, 100% 5%, 100% 95%, 87.5% 100%, 75% 95%, 62.5% 100%, 50% 95%, 37.5% 100%, 25% 95%, 12.5% 100%, 0% 95%)";

// Light + dark bg pair, text/desc pair per card
const steps = [
  {
    number: "01",
    icon: BookOpen,
    title: "Baca Materi",
    desc: "4 chapter edukasi yang ditulis dengan bahasa santai dan mudah dipahami. Bukan ceramah — ini cerita.",
    lightCardBg: "bg-violet-500",
    darkCardBg: "dark:bg-violet-700",
    shadowColor: "shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] dark:shadow-[8px_8px_0px_0px_rgba(255,255,255,0.7)]",
    numColor: "text-violet-200 dark:text-violet-300",
    textColor: "text-white",
    descColor: "text-white/80",
    accentDot: "bg-yellow-300 dark:bg-yellow-400",
    hoverRotate: "hover:-rotate-2",
  },
  {
    number: "02",
    icon: Brain,
    title: "Uji Pengetahuan",
    desc: "Setiap chapter diakhiri kuis interaktif. Jawab dengan benar untuk membuka chapter berikutnya.",
    lightCardBg: "bg-teal-500",
    darkCardBg: "dark:bg-teal-700",
    shadowColor: "shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] dark:shadow-[8px_8px_0px_0px_rgba(255,255,255,0.7)]",
    numColor: "text-teal-200 dark:text-teal-300",
    textColor: "text-white",
    descColor: "text-white/80",
    accentDot: "bg-pink-400 dark:bg-pink-500",
    hoverRotate: "hover:rotate-2",
  },
  {
    number: "03",
    icon: Trophy,
    title: "Raih Pencapaian",
    desc: "Kumpulkan skor tertinggi dan buktikan bahwa kamu sudah siap melindungi diri dan orang-orang sekitarmu.",
    lightCardBg: "bg-amber-400",
    darkCardBg: "dark:bg-amber-600",
    shadowColor: "shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] dark:shadow-[8px_8px_0px_0px_rgba(255,255,255,0.7)]",
    numColor: "text-amber-200 dark:text-amber-300",
    textColor: "text-gray-900 dark:text-white",
    descColor: "text-gray-700 dark:text-white/80",
    accentDot: "bg-violet-500 dark:bg-violet-400",
    hoverRotate: "hover:-rotate-1",
  },
];

const STARS = [
  { size: 20, cls: "top-12 left-[12%] text-yellow-400 dark:text-yellow-300", dur: 10 },
  { size: 14, cls: "top-28 right-[18%] text-pink-500 dark:text-pink-400", dur: 14 },
  { size: 18, cls: "bottom-24 left-[8%] text-teal-400 dark:text-teal-300", dur: 9 },
  { size: 12, cls: "bottom-16 right-[12%] text-violet-500 dark:text-violet-400", dur: 13 },
  { size: 10, cls: "top-[45%] left-[4%] text-amber-400 dark:text-amber-300", dur: 17 },
];

export default function FeaturesSection() {
  return (
    <section
      className={cn(
        "relative section-padding overflow-hidden",
        // Gradient flow: continues from Stats violet-50/slate-900
        "bg-gradient-to-b from-violet-50 via-lavender-50 to-pink-50",
        // Tailwind doesn't have lavender — use fuchsia-50 as midpoint
        "bg-gradient-to-b from-violet-50 via-fuchsia-50 to-pink-50",
        "dark:from-slate-900 dark:via-slate-800 dark:to-slate-900",
      )}
    >
      {/* Corner neon blobs — dark mode toned down */}
      <div className="absolute -top-24 -left-20 w-72 h-72 rounded-full bg-yellow-300/30 dark:bg-yellow-400/5 blur-3xl pointer-events-none" />
      <div className="absolute -top-12 -right-20 w-80 h-80 rounded-full bg-cyan-300/30 dark:bg-cyan-400/5 blur-3xl pointer-events-none" />
      <div className="absolute bottom-8 left-1/3 w-56 h-56 rounded-full bg-violet-300/20 dark:bg-violet-500/10 blur-3xl pointer-events-none" />
      <div className="absolute bottom-16 right-4 w-52 h-52 rounded-full bg-pink-300/20 dark:bg-pink-500/10 blur-3xl pointer-events-none" />

      {/* Floating decorations */}
      {STARS.map((s, i) => (
        <StarAccent key={i} size={s.size} className={s.cls} duration={s.dur} />
      ))}
      <CowboyHat className="top-6 right-[6%] w-16 h-auto" />
      <WavyDot className="top-1/3 right-[22%] w-3 h-3 bg-yellow-400 dark:bg-yellow-300" delay={1} />
      <WavyDot className="bottom-1/3 left-[18%] w-2 h-2 bg-pink-400 dark:bg-pink-300" delay={2} />

      <div className="container-cerita relative z-10">

        {/* Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block mb-5"
          >
            <span
              className={cn(
                "inline-flex items-center gap-2 px-5 py-2.5 rounded-full",
                "bg-gradient-to-r from-lime-300 to-yellow-300 dark:from-lime-700/50 dark:to-yellow-700/50",
                "text-gray-900 dark:text-white",
                "text-xs font-black uppercase tracking-widest",
                "border-2 border-gray-900 dark:border-white/50",
                "shadow-[3px_3px_0px_#000] dark:shadow-[3px_3px_0px_rgba(255,255,255,0.6)]",
              )}
            >
              ✦ Cara Kerja CERITA ✦
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: -16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-black tracking-tight text-gray-900 dark:text-white mb-4"
          >
            Belajar Itu{" "}
            <span className="relative inline-block">
              <span className="text-violet-600 dark:text-violet-400">
                Semudah 3 Langkah
              </span>
              <svg
                className="absolute -bottom-1.5 left-0 w-full"
                viewBox="0 0 300 10"
                preserveAspectRatio="none"
              >
                <path
                  d="M0,5 C37.5,0 75,10 112.5,5 C150,0 187.5,10 225,5 C262.5,0 287.5,10 300,5"
                  stroke="#fbbf24"
                  strokeWidth="3"
                  fill="none"
                  strokeLinecap="round"
                />
              </svg>
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-gray-600 dark:text-gray-400 max-w-lg mx-auto text-base leading-relaxed"
          >
            Dirancang khusus untuk remaja — tidak membosankan, tidak menggurui,
            dan bisa selesai dalam 15 menit.
          </motion.p>
        </div>

        {/* Step Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {steps.map((step, i) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              whileHover={{ y: -8, scale: 1.02 }}
              // CSS hover-rotate applied separately to avoid Framer conflict
              className={cn("relative group cursor-pointer", step.hoverRotate, "transition-transform duration-300")}
            >
              {/* 3D wavy shadow layer */}
              <div
                className={cn("absolute inset-0", step.lightCardBg, step.darkCardBg)}
                style={{
                  clipPath: WAVY_CLIP,
                  transform: "translate(6px, 8px)",
                  filter: "brightness(0.45)",
                }}
              />

              {/* Wavy card body */}
              <div
                className={cn(
                  "relative px-8 pt-14 pb-12",
                  step.lightCardBg, step.darkCardBg,
                  step.shadowColor,
                  "border-2 border-black dark:border-white/20",
                )}
                style={{ clipPath: WAVY_CLIP }}
              >
                {/* Giant ghost number */}
                <div
                  className={cn(
                    "absolute top-5 right-5 font-black leading-none select-none",
                    "text-[7rem] md:text-[7.5rem] opacity-[0.18]",
                    step.numColor,
                  )}
                >
                  {step.number}
                </div>

                {/* Icon box */}
                <div className="relative inline-flex p-3.5 rounded-2xl bg-white/20 dark:bg-black/20 border-2 border-white/40 dark:border-white/20 shadow-[4px_4px_0px_rgba(0,0,0,0.18)] dark:shadow-[4px_4px_0px_rgba(255,255,255,0.12)] mb-5">
                  <step.icon size={26} className={step.textColor} />
                </div>

                <h3 className={cn("font-black text-xl mb-3 leading-tight", step.textColor)}>
                  {step.title}
                </h3>

                <p className={cn("text-sm leading-relaxed mb-7", step.descColor)}>
                  {step.desc}
                </p>

                {/* Step indicator pill */}
                <span
                  className={cn(
                    "inline-flex items-center gap-2 px-4 py-1.5 rounded-full",
                    "text-xs font-black uppercase tracking-wider",
                    "bg-white/25 dark:bg-black/25 border border-white/50 dark:border-white/20",
                    "shadow-[2px_2px_0px_rgba(0,0,0,0.15)] dark:shadow-[2px_2px_0px_rgba(255,255,255,0.1)]",
                    step.textColor,
                  )}
                >
                  <span className={cn("w-2 h-2 rounded-full flex-shrink-0", step.accentDot)} />
                  Langkah {step.number}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

      </div>

      {/* Bottom bridge */}
      <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-pink-50 dark:from-slate-900 to-transparent pointer-events-none" />
    </section>
  );
}