"use client";

import { motion, type Variants } from "framer-motion";
import { ShieldAlert, Activity, AlertTriangle, HeartPulse, Lock, BookOpen } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";

const modules = [
  {
    id: "pengenalan",
    title: "Apa itu HIV/AIDS?",
    desc: "Pahami perbedaan mendasar antara HIV dan AIDS secara medis.",
    icon: Activity,
    color: "text-indigo-400",
    bg: "bg-indigo-500/10",
    border: "border-indigo-500/20",
    glow: "hover:shadow-[0_0_30px_rgba(99,102,241,0.15)]",
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
    glow: "hover:shadow-[0_0_30px_rgba(249,115,22,0.15)]",
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
    glow: "hover:shadow-[0_0_30px_rgba(20,184,166,0.15)]",
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
    glow: "",
    status: "locked",
  },
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.12 } },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

export default function EdukasiPage() {
  return (
    <main className="min-h-screen bg-[var(--bg-base)] pt-24 pb-16 px-6">

      {/* Header */}
      <div className="container-cerita text-center mb-12">
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-sm font-semibold text-indigo-400 uppercase tracking-widest mb-3"
        >
          Mulai Perjalananmu
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl md:text-5xl font-bold text-white mb-4"
        >
          Pusat <span className="text-gradient-primary">Edukasi</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-[var(--text-secondary)] text-lg max-w-xl mx-auto"
        >
          Selesaikan setiap chapter untuk membuka materi selanjutnya.
        </motion.p>

        {/* Progress bar */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-6 max-w-xs mx-auto"
        >
          <div className="flex justify-between text-xs text-[var(--text-muted)] mb-2">
            <span>Progress</span>
            <span>3 / 4 tersedia</span>
          </div>
          <div className="h-1.5 bg-[var(--bg-elevated)] rounded-full overflow-hidden">
            <div className="h-full w-3/4 bg-gradient-to-r from-indigo-500 to-teal-500 rounded-full" />
          </div>
        </motion.div>
      </div>

      {/* Grid Modul */}
      <motion.div
        className="container-cerita grid grid-cols-1 sm:grid-cols-2 gap-5 max-w-3xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        animate="show"
      >
        {modules.map((mod, i) => {
          const isLocked = mod.status === "locked";

          return (
            <motion.div key={mod.id} variants={cardVariants}>
              <Link
                href={isLocked ? "#" : `/edukasi/${mod.id}`}
                onClick={(e) => isLocked && e.preventDefault()}
                className="block"
              >
                <Card
                  variant="default"
                  hover={!isLocked}
                  className={cn(
                    "flex flex-col gap-4 h-full transition-all duration-300",
                    mod.border,
                    mod.bg,
                    mod.glow,
                    isLocked && "opacity-50 cursor-not-allowed"
                  )}
                >
                  {/* Top row: icon + badge */}
                  <div className="flex items-start justify-between">
                    <div className={cn("p-3 rounded-xl", mod.bg)}>
                      <mod.icon size={22} className={mod.color} />
                    </div>

                    {/* ✅ Pakai Badge component */}
                    {isLocked ? (
                      <Badge variant="muted" icon={Lock}>Terkunci</Badge>
                    ) : (
                      <Badge variant="secondary" icon={BookOpen} dot>Tersedia</Badge>
                    )}
                  </div>

                  {/* Chapter label */}
                  <Badge variant="accent" size="sm">Chapter {i + 1}</Badge>

                  {/* Content */}
                  <div className="flex-1">
                    <h2 className="text-white font-semibold text-lg leading-snug mb-1">
                      {mod.title}
                    </h2>
                    <p className="text-[var(--text-secondary)] text-sm leading-relaxed">
                      {mod.desc}
                    </p>
                  </div>

                  {/* Footer */}
                  {isLocked ? (
                    <p className="text-xs text-[var(--text-disabled)] pt-2 border-t border-white/5">
                      Selesaikan chapter sebelumnya untuk membuka ini.
                    </p>
                  ) : (
                    <p className="text-sm font-medium text-indigo-400 pt-2 border-t border-white/5 inline-flex items-center gap-1">
                      Mulai Belajar <span>→</span>
                    </p>
                  )}
                </Card>
              </Link>
            </motion.div>
          );
        })}
      </motion.div>
    </main>
  );
}