// src/components/kuesioner/StepSikap.tsx
"use client";

import { motion } from "framer-motion";
import { HeartHandshake } from "lucide-react";
import type { JawabanSikap, SikapItem } from "@/types/questionnaire";

interface StepSikapProps {
    questions: SikapItem[];
    answers: Partial<Record<string, JawabanSikap>>;
    onChange: (id: string, value: JawabanSikap) => void;
    part: 1 | 2;
}

// ─── Config ────────────────────────────────────────────────────────────────

const JAWABAN_OPTIONS: {
    value: JawabanSikap;
    label: string;
    short: string;
    accent: string;       // bg when selected
    headerBg: string;     // card header bg when this option is active
}[] = [
    { value: "SS", label: "Sangat Setuju",      short: "SS", accent: "bg-cyan-400",   headerBg: "bg-cyan-50  dark:bg-cyan-950" },
    { value: "S",  label: "Setuju",             short: "S",  accent: "bg-lime-400",   headerBg: "bg-lime-50  dark:bg-lime-950" },
    { value: "TS", label: "Tidak Setuju",       short: "TS", accent: "bg-orange-400", headerBg: "bg-orange-50 dark:bg-orange-950" },
    { value: "STS",label: "Sangat Tidak Setuju",short: "STS",accent: "bg-pink-400",   headerBg: "bg-pink-50  dark:bg-pink-950" },
];

// ─── Animation variants ────────────────────────────────────────────────────

const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.07, delayChildren: 0.05 } },
};

const cardVariants = {
    hidden:  { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 200, damping: 22 } },
};

// ─── Answer Button ─────────────────────────────────────────────────────────

interface AnswerBtnProps {
    option: (typeof JAWABAN_OPTIONS)[number];
    selected: boolean;
    onClick: () => void;
}

function AnswerBtn({ option, selected, onClick }: AnswerBtnProps) {
    return (
        <motion.button
            type="button"
            onClick={onClick}
            animate={
                selected
                    ? { x: 4, y: 4, boxShadow: "0px 0px 0px 0px rgba(0,0,0,1)" }
                    : { x: 0, y: 0, boxShadow: "4px 4px 0px 0px rgba(0,0,0,1)" }
            }
            whileHover={selected ? {} : { y: -2, boxShadow: "6px 6px 0px 0px rgba(0,0,0,1)" }}
            whileTap={{ x: 4, y: 4, boxShadow: "0px 0px 0px 0px rgba(0,0,0,1)" }}
            transition={{ type: "spring", stiffness: 400, damping: 20 }}
            className={[
                "w-full py-3 px-2 rounded-xl border-4 border-black",
                "font-black text-xs uppercase tracking-wider leading-tight",
                "focus:outline-none transition-colors duration-100",
                "flex flex-col items-center gap-0.5",
                selected ? `${option.accent} text-black` : "bg-white text-black",
            ].join(" ")}
        >
            {/* Short code badge */}
            <span className="text-base leading-none">{option.short}</span>
            {/* Full label — hidden on very small screens */}
            <span className="hidden sm:block text-[9px] font-bold tracking-widest opacity-70 text-center leading-tight">
                {option.label}
            </span>
        </motion.button>
    );
}

// ─── Question Card ─────────────────────────────────────────────────────────

function QuestionCard({
    item,
    answer,
    onChange,
}: {
    item: SikapItem;
    answer: JawabanSikap | undefined;
    onChange: (v: JawabanSikap) => void;
}) {
    const activeOption = JAWABAN_OPTIONS.find((o) => o.value === answer);

    return (
        <motion.div
            variants={cardVariants}
            className="bg-white border-4 border-black rounded-2xl shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] overflow-hidden"
        >
            {/* Card header */}
            <div
                className={[
                    "flex items-center gap-3 px-6 py-3 border-b-4 border-black transition-colors duration-200",
                    activeOption ? activeOption.headerBg : "bg-gray-50 dark:bg-gray-900",
                ].join(" ")}
            >
                <span className="bg-cyan-400 border-4 border-black rounded-lg w-8 h-8 flex items-center justify-center font-black text-xs text-black flex-shrink-0">
                    {item.no}
                </span>
                <span className="font-bold text-xs text-gray-500 dark:text-gray-400 uppercase tracking-widest">
                    Soal {item.no}
                </span>
                {/* Selected indicator */}
                {activeOption && (
                    <span className={`ml-auto font-black text-xs px-2 py-0.5 rounded-md border-2 border-black ${activeOption.accent}`}>
                        {activeOption.short}
                    </span>
                )}
            </div>

            {/* Question text */}
            <div className="px-6 pt-5 pb-4">
                <p className="font-bold text-base sm:text-lg leading-snug text-black dark:text-white">
                    {item.pertanyaan}
                </p>
            </div>

            {/* Answer buttons — 4 cols on sm+, 2×2 on mobile */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 px-6 pb-6">
                {JAWABAN_OPTIONS.map((opt) => (
                    <AnswerBtn
                        key={opt.value}
                        option={opt}
                        selected={answer === opt.value}
                        onClick={() => onChange(opt.value)}
                    />
                ))}
            </div>
        </motion.div>
    );
}

// ─── Main Component ────────────────────────────────────────────────────────

export default function StepSikap({ questions, answers, onChange, part }: StepSikapProps) {
    const answered = questions.filter((q) => answers[q.id] !== undefined).length;

    return (
        <div className="max-w-2xl mx-auto">
            {/* Heading */}
            <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-xl border-4 border-black bg-cyan-400 flex items-center justify-center shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                    <HeartHandshake size={18} strokeWidth={3} className="text-black" />
                </div>
                <h2 className="font-black text-2xl uppercase tracking-tighter text-black dark:text-white">
                    Sikap — Bagian {part}
                </h2>
            </div>

            {/* Progress indicator */}
            <div className="flex items-center justify-between mb-8 ml-[52px]">
                <p className="font-bold text-sm text-gray-500 dark:text-gray-400">
                    Pilih salah satu: SS / S / TS / STS.
                </p>
                <span className="font-black text-xs text-gray-600 dark:text-gray-400 bg-white dark:bg-[#0B0F19] border-2 border-black dark:border-white px-2 py-1 rounded-lg">
                    {answered}/{questions.length}
                </span>
            </div>

            {/* Legend — compact, mobile-friendly */}
            <div className="flex flex-wrap gap-2 mb-6 ml-[52px]">
                {JAWABAN_OPTIONS.map((opt) => (
                    <span
                        key={opt.value}
                        className={`${opt.accent} border-2 border-black rounded-md px-2 py-0.5 font-black text-[10px] uppercase tracking-widest`}
                    >
                        {opt.short} = {opt.label}
                    </span>
                ))}
            </div>

            {/* Question cards */}
            <motion.div
                className="space-y-6"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                {questions.map((item) => (
                    <QuestionCard
                        key={item.id}
                        item={item}
                        answer={answers[item.id]}
                        onChange={(v) => onChange(item.id, v)}
                    />
                ))}
            </motion.div>
        </div>
    );
}