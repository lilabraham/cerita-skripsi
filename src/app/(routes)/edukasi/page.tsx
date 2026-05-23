"use client";

import { motion, type Variants } from "framer-motion";
import { ShieldAlert, Activity, AlertTriangle, HeartPulse, Lock, BookOpen } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

const modules = [
  {
    id: "pengenalan",
    title: "Apa itu HIV/AIDS?",
    desc: "Pahami perbedaan mendasar antara HIV dan AIDS secara medis.",
    icon: Activity,
    color: "text-indigo-400",
    bg: "bg-indigo-500/10",
    border: "border-indigo-500/20",
    status: "unlocked",
  },
  {
    id: "penularan",
    title: "Mitos vs Fakta Penularan",
    desc: "Ketahui cara penularan yang sebenarnya dan hapus stigma negatif.",
    icon: AlertTriangle,
    color: "text-orange-400",
    bg: "bg-orange-500/10",
    border: "border-orange-500/20",
    status: "unlocked",
  },
  {
    id: "pencegahan",
    title: "Benteng Pertahanan (Pencegahan)",
    desc: "Langkah-langkah efektif untuk melindungi diri dan masa depanmu.",
    icon: ShieldAlert,
    color: "text-teal-400",
    bg: "bg-teal-500/10",
    border: "border-teal-500/20",
    status: "unlocked",
  },
  {
    id: "pengobatan",
    title: "Harapan & Pengobatan",
    desc: "Mengenal ARV dan bagaimana ODHIV bisa hidup sehat.",
    icon: HeartPulse,
    color: "text-rose-400",
    bg: "bg-rose-500/10",
    border: "border-rose-500/20",
    status: "locked",
  },
];

// ✅ Fix: eksplisit type Variants
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

export default function EdukasiPage() {
  return (
    <main className="min-h-screen bg-[#0a0a0f] pt-24 pb-16 px-6">
      {/* Header */}
      <div className="max-w-4xl mx-auto text-center mb-12">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl font-bold text-white mb-4"
        >
          Pusat{" "}
          <span className="bg-gradient-to-r from-indigo-400 to-teal-400 bg-clip-text text-transparent">
            Edukasi
          </span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="text-gray-400 text-lg max-w-2xl mx-auto"
        >
          Pilih modul pembelajaran di bawah ini. Selesaikan kuis di setiap akhir
          modul untuk membuka materi selanjutnya!
        </motion.p>
      </div>

      {/* Grid Modul */}
      <motion.div
        className="max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-5"
        variants={containerVariants}
        initial="hidden"
        animate="show"
      >
        {/* ✅ Fix: rename loop var dari `modul` → `mod` */}
        {modules.map((mod) => {
          const isLocked = mod.status === "locked";

          return (
            <motion.div key={mod.id} variants={cardVariants}>
              <Link
                href={isLocked ? "#" : `/edukasi/${mod.id}`}
                className={cn(
                  "group relative flex flex-col gap-4 p-6 rounded-2xl border transition-all duration-300",
                  mod.bg,
                  mod.border,
                  isLocked
                    ? "opacity-60 cursor-not-allowed"
                    : "hover:scale-[1.02] hover:shadow-lg hover:shadow-black/30"
                )}
                onClick={(e) => isLocked && e.preventDefault()}
              >
                {/* Icon + Lock badge */}
                <div className="flex items-start justify-between">
                  <div className={cn("p-3 rounded-xl", mod.bg)}>
                    <mod.icon size={24} className={mod.color} />
                  </div>

                  {isLocked ? (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-gray-400 text-xs font-medium">
                      <Lock size={12} />
                      Terkunci
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-500/10 border border-teal-500/20 text-teal-400 text-xs font-medium">
                      <BookOpen size={12} />
                      Tersedia
                    </span>
                  )}
                </div>

                {/* Content */}
                <div>
                  <h2 className="text-white font-semibold text-lg mb-1">{mod.title}</h2>
                  <p className="text-gray-400 text-sm leading-relaxed">{mod.desc}</p>
                </div>

                {/* CTA */}
                {isLocked ? (
                  <p className="text-xs text-gray-500 mt-auto">
                    Selesaikan modul sebelumnya untuk membuka ini.
                  </p>
                ) : (
                  <span className="mt-auto inline-flex items-center gap-1 text-sm font-medium text-indigo-400 group-hover:gap-2 transition-all duration-200">
                    Mulai Belajar
                    <span className="group-hover:translate-x-1 transition-transform">→</span>
                  </span>
                )}
              </Link>
            </motion.div>
          );
        })}
      </motion.div>
    </main>
  );
}