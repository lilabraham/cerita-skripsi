// src/components/kuesioner/StepPengetahuan.tsx

"use client";

import { motion } from "framer-motion";
import { Brain } from "lucide-react";
import type { JawabanBS, PengetahuanItem } from "@/types/questionnaire";

interface StepPengetahuanProps {
  questions: PengetahuanItem[];
  answers: Partial<Record<string, JawabanBS>>;
  onChange: (id: string, value: JawabanBS) => void;
  part: 1 | 2;
}

// ─── Variants ─────────────────────────────────────────────────────────────

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
  label: string;
  value: JawabanBS;
  selected: boolean;
  accent: string; // tailwind bg class when selected
  onClick: () => void;
}

function AnswerBtn({ label, value, selected, accent, onClick }: AnswerBtnProps) {
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
        "w-full py-3 rounded-xl border-4 border-black",
        "font-black text-sm uppercase tracking-widest",
        "focus:outline-none transition-colors duration-100",
        selected ? `${accent} text-black` : "bg-white text-black",
      ].join(" ")}
    >
      {label}
    </motion.button>
  );
}

// ─── Question Card ─────────────────────────────────────────────────────────

function QuestionCard({
  item,
  answer,
  onChange,
}: {
  item: PengetahuanItem;
  answer: JawabanBS | undefined;
  onChange: (v: JawabanBS) => void;
}) {
  return (
    <motion.div
      variants={cardVariants}
      className="bg-white border-4 border-black rounded-2xl shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] overflow-hidden"
    >
      {/* Card header */}
      <div className="flex items-center gap-3 px-6 py-3 border-b-4 border-black bg-gray-50">
        <span className="bg-lime-400 border-4 border-black rounded-lg w-8 h-8 flex items-center justify-center font-black text-xs text-black flex-shrink-0">
          {item.no}
        </span>
        <span className="font-bold text-xs text-gray-500 uppercase tracking-widest">
          Soal {item.no}
        </span>
      </div>

      {/* Question text */}
      <div className="px-6 pt-5 pb-4">
        <p className="font-bold text-base sm:text-lg leading-snug text-black">
          {item.pertanyaan}
        </p>
      </div>

      {/* Answer buttons */}
      <div className="grid grid-cols-2 gap-3 px-6 pb-6">
        <AnswerBtn
          label="✓ Benar"
          value="B"
          selected={answer === "B"}
          accent="bg-lime-400"
          onClick={() => onChange("B")}
        />
        <AnswerBtn
          label="✗ Salah"
          value="S"
          selected={answer === "S"}
          accent="bg-rose-400"
          onClick={() => onChange("S")}
        />
      </div>
    </motion.div>
  );
}

// ─── Main Component ────────────────────────────────────────────────────────

export default function StepPengetahuan({ questions, answers, onChange, part }: StepPengetahuanProps) {
  const answered = questions.filter((q) => answers[q.id]).length;

  return (
    <div className="max-w-2xl mx-auto">
      {/* Heading */}
      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 rounded-xl border-4 border-black bg-lime-400 flex items-center justify-center shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
          <Brain size={18} strokeWidth={3} className="text-black" />
        </div>
        <h2 className="font-black text-2xl uppercase tracking-tighter text-black dark:text-white">
          Pengetahuan — Bagian {part}
        </h2>
      </div>

      {/* Progress indicator */}
      <div className="flex items-center justify-between mb-8 ml-[52px]">
        <p className="font-bold text-sm text-gray-500 dark:text-gray-400">
          Jawab setiap pernyataan dengan Benar atau Salah.
        </p>
        <span className="font-black text-xs text-gray-600 dark:text-gray-400 bg-white dark:bg-[#0B0F19] border-2 border-black dark:border-white px-2 py-1 rounded-lg">
          {answered}/{questions.length}
        </span>
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