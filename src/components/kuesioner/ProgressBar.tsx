// src/components/kuesioner/ProgressBar.tsx

"use client";

import { motion } from "framer-motion";
import { STEP_META } from "@/data/questionnaire-data";

interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
}

const SECTION_COLORS: Record<string, string> = {
  identitas:   "bg-yellow-400 dark:bg-yellow-500",
  pengetahuan: "bg-lime-400 dark:bg-lime-500",
  sikap:       "bg-cyan-400 dark:bg-cyan-500",
  perilaku:    "bg-pink-400 dark:bg-pink-500",
  konfirmasi:  "bg-black dark:bg-white",
};

// Derive unique ordered section labels from STEP_META (skip intro)
const SECTION_LABELS = Array.from(
  new Map(
    STEP_META.slice(1).map((m) => [m.section, m.label.replace(/ I+$/, "")])
  ).entries()
).map(([, label]) => label);

export default function ProgressBar({ currentStep, totalSteps }: ProgressBarProps) {
  const steps = STEP_META.slice(1); // skip step 0 (intro/welcome)

  return (
    <div className="max-w-2xl mx-auto mb-8">
      {/* Label row */}
      <div className="flex justify-between items-center mb-3">
        <span className="font-black uppercase tracking-widest text-xs text-black dark:text-white">
          {STEP_META[currentStep]?.label ?? ""}
        </span>
        <span className="font-black text-xs text-gray-600 dark:text-gray-400">
          {currentStep} / {totalSteps}
        </span>
      </div>

      {/* Segmented bar */}
      <div className="flex gap-1.5 h-4 rounded-lg overflow-hidden border-4 border-black dark:border-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,0.2)]">
        {steps.map((meta, i) => {
          const stepIndex = i + 1;
          const filled = stepIndex <= currentStep;
          const colorClass = SECTION_COLORS[meta.section] ?? "bg-gray-400";
          return (
            <motion.div
              key={`${meta.label}-${i}`}
              className={`flex-1 ${filled ? colorClass : "bg-gray-200 dark:bg-gray-700"}`}
              initial={false}
              animate={{ opacity: filled ? 1 : 0.4 }}
              transition={{ duration: 0.3 }}
            />
          );
        })}
      </div>

      {/* Section labels */}
      <div className="flex justify-between mt-2 px-0.5">
        {SECTION_LABELS.map((label) => (
          <span
            key={label}
            className="text-[10px] font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wide"
          >
            {label}
          </span>
        ))}
      </div>
    </div>
  );
}