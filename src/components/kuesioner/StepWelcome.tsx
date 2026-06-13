"use client";

import { motion } from "framer-motion";
import { BookOpen, Clock, Shield, ChevronRight } from "lucide-react";

interface StepWelcomeProps {
    onStart: () => void;
}

const STATS = [
    { icon: BookOpen, label: "47 Pertanyaan", sub: "2 bagian utama" },
    { icon: Clock, label: "±10 Menit", sub: "Santai, tidak buru-buru" },
    { icon: Shield, label: "Anonim", sub: "Data dirahasiakan" },
];

const SECTIONS = [
    { color: "bg-yellow-400 dark:bg-yellow-500", label: "A", title: "Pengetahuan", desc: "24 soal Benar/Salah tentang HIV/AIDS" },
    { color: "bg-pink-400 dark:bg-pink-500", label: "B", title: "Sikap", desc: "23 soal skala pendapat (SS–STS)" },
];

// ─── Variants ─────────────────────────────────────────────────────────────

const containerVariants = {
    hidden: {},
    visible: {
        transition: { staggerChildren: 0.09, delayChildren: 0.1 },
    },
};

const itemVariants = {
    hidden: { opacity: 0, y: 28, scale: 0.97 },
    visible: {
        opacity: 1, y: 0, scale: 1,
        transition: { type: "spring" as const, stiffness: 180, damping: 16 },
    },
};

// CTA button gets its own tighter spring for punchy feel
const ctaVariants = {
    hidden: { opacity: 0, y: 28, scale: 0.95 },
    visible: {
        opacity: 1, y: 0, scale: 1,
        transition: { type: "spring" as const, stiffness: 220, damping: 14 },
    },
};

// ─── Component ─────────────────────────────────────────────────────────────

export default function StepWelcome({ onStart }: StepWelcomeProps) {
    return (
        <motion.div
            className="max-w-2xl mx-auto"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
        >
            {/* Hero Badge */}
            <motion.div variants={itemVariants} className="flex justify-center mb-6">
                <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full border-4 border-black dark:border-white bg-yellow-400 dark:bg-yellow-500 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,0.3)] font-black uppercase tracking-widest text-sm text-black">
                    Penelitian Skripsi
                </span>
            </motion.div>

            {/* Main Heading */}
            <motion.div variants={itemVariants} className="text-center mb-8">
                <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black uppercase tracking-tighter leading-none text-black dark:text-white mb-3">
                    KUESIONER
                    <br />
                    <span className="relative inline-block">
                        <span className="bg-lime-400 dark:bg-lime-500 px-2">CERITA</span>
                    </span>
                </h1>
                <p className="text-base sm:text-lg font-bold text-gray-700 dark:text-gray-300 mt-4 max-w-lg mx-auto leading-relaxed">
                    Kuesioner tentang <strong>pengetahuan dan sikap</strong> remaja terhadap pencegahan HIV/AIDS.
                </p>
            </motion.div>

            {/* Stats Row */}
            <motion.div variants={itemVariants} className="grid grid-cols-3 gap-3 mb-6">
                {STATS.map(({ icon: Icon, label, sub }) => (
                    <div
                        key={label}
                        className="flex flex-col items-center gap-1 p-4 rounded-xl border-4 border-black dark:border-white bg-white dark:bg-[#0B0F19] shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,0.2)]"
                    >
                        <Icon size={22} strokeWidth={3} className="text-black dark:text-white" />
                        <span className="font-black text-sm text-black dark:text-white text-center leading-tight">{label}</span>
                        <span className="font-medium text-xs text-gray-500 dark:text-gray-400 text-center leading-tight">{sub}</span>
                    </div>
                ))}
            </motion.div>

            {/* Section Overview */}
            <motion.div variants={itemVariants} className="space-y-3 mb-8">
                {SECTIONS.map(({ color, label, title, desc }) => (
                    <div
                        key={label}
                        className="flex items-center gap-4 p-4 rounded-xl border-4 border-black dark:border-white bg-white dark:bg-[#0B0F19] shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,0.2)]"
                    >
                        <div className={`${color} w-10 h-10 rounded-lg border-4 border-black dark:border-white flex items-center justify-center flex-shrink-0 font-black text-base text-black`}>
                            {label}
                        </div>
                        <div>
                            <p className="font-black text-black dark:text-white text-sm uppercase tracking-wide">{title}</p>
                            <p className="font-medium text-gray-600 dark:text-gray-400 text-xs">{desc}</p>
                        </div>
                    </div>
                ))}
            </motion.div>

            {/* Disclaimer */}
            <motion.div
                variants={itemVariants}
                className="p-4 mb-8 rounded-xl border-4 border-black dark:border-white bg-yellow-50 dark:bg-yellow-500/10 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,0.15)]"
            >
                <p className="text-xs sm:text-sm font-bold text-black dark:text-yellow-300 leading-relaxed">
                    📌 Data yang kamu isi bersifat <strong>rahasia</strong> dan hanya digunakan untuk keperluan penelitian. Jawab dengan <strong>jujur</strong> — tidak ada jawaban benar atau salah. Tidak ada pengaruhnya terhadap nilai di sekolah.
                </p>
            </motion.div>

            {/* CTA Button */}
            <motion.div variants={ctaVariants}>
                <motion.button
                    onClick={onStart}
                    whileHover={{
                        y: -4,
                        x: -2,
                        boxShadow: "10px 10px 0px 0px rgba(0,0,0,1)",
                        scale: 1.02,
                    }}
                    whileTap={{
                        y: 4,
                        x: 2,
                        scale: 0.98,
                        boxShadow: "1px 1px 0px 0px rgba(0,0,0,1)",
                    }}
                    transition={{ type: "spring", stiffness: 400, damping: 18 }}
                    className="w-full py-5 px-8 rounded-2xl border-4 border-black bg-lime-400 text-black font-black text-xl uppercase tracking-widest flex items-center justify-center gap-3 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]"
                >
                    Mulai Kuesioner
                    <ChevronRight size={24} strokeWidth={3} />
                </motion.button>
            </motion.div>

            {/* Footer */}
            <motion.p
                variants={itemVariants}
                className="text-center text-xs font-medium text-gray-500 dark:text-gray-400 mt-6"
            >
                Platform Edukasi CERITA · SMA Mardisiswa Semarang
            </motion.p>
        </motion.div>
    );
}