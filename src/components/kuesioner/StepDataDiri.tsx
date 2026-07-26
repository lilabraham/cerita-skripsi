// src/components/kuesioner/StepDataDiri.tsx

"use client";

import { useId } from "react";
import { motion } from "framer-motion";
import { User } from "lucide-react";
import type { DataDiri, JenisKelamin } from "@/types/questionnaire";

interface StepDataDiriProps {
  data: DataDiri;
  onChange: (payload: Partial<DataDiri>) => void;
}

// ─── Variants ─────────────────────────────────────────────────────────────

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 220, damping: 22 } },
};

// ─── Sub-components ────────────────────────────────────────────────────────

function FieldLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="font-black uppercase tracking-widest text-xs text-black dark:text-white mb-3">
      {children}
    </p>
  );
}

interface ToggleOption<T extends string> {
  value: T;
  label: string;
  accent: string;
}

interface ToggleGridProps<T extends string> {
  options: ToggleOption<T>[];
  selected: T | "";
  onSelect: (v: T) => void;
  cols?: "grid-cols-2" | "grid-cols-3";
}

function ToggleGrid<T extends string>({
  options,
  selected,
  onSelect,
  cols = "grid-cols-2",
}: ToggleGridProps<T>) {
  return (
    <div className={`grid ${cols} gap-3`}>
      {options.map(({ value, label, accent }) => {
        const isSelected = selected === value;
        return (
          <motion.button
            key={value}
            type="button"
            onClick={() => onSelect(value)}
            whileHover={isSelected ? {} : { y: -2, boxShadow: "6px 6px 0px 0px rgba(0,0,0,1)" }}
            whileTap={{ y: 3, boxShadow: "1px 1px 0px 0px rgba(0,0,0,1)" }}
            animate={
              isSelected
                ? { y: 4, x: 4, boxShadow: "0px 0px 0px 0px rgba(0,0,0,1)" }
                : { y: 0, x: 0, boxShadow: "4px 4px 0px 0px rgba(0,0,0,1)" }
            }
            transition={{ type: "spring", stiffness: 400, damping: 20 }}
            className={[
              "py-3 px-4 rounded-xl border-4 border-black dark:border-white",
              "font-black text-sm uppercase tracking-widest text-center",
              "focus:outline-none focus-visible:ring-2 focus-visible:ring-black dark:focus-visible:ring-white",
              "transition-colors duration-100",
              isSelected ? `${accent} text-black` : "bg-white dark:bg-[#0B0F19] text-black dark:text-white",
            ].join(" ")}
          >
            {label}
          </motion.button>
        );
      })}
    </div>
  );
}

// ─── Option configs ────────────────────────────────────────────────────────

const JENIS_KELAMIN_OPTIONS: ToggleOption<JenisKelamin>[] = [
  { value: "L", label: "Laki-laki", accent: "bg-cyan-400 dark:bg-cyan-500" },
  { value: "P", label: "Perempuan", accent: "bg-pink-400 dark:bg-pink-500" },
];

// ─── Main Component ────────────────────────────────────────────────────────

export default function StepDataDiri({ data, onChange }: StepDataDiriProps) {
  const uid = useId();

  return (
    <motion.div
      className="max-w-2xl mx-auto"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Heading */}
      <motion.div variants={itemVariants} className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-xl border-4 border-black dark:border-white bg-yellow-400 dark:bg-yellow-500 flex items-center justify-center shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            <User size={18} strokeWidth={3} className="text-black" />
          </div>
          <h2 className="font-black text-2xl uppercase tracking-tighter text-black dark:text-white">
            Data Diri
          </h2>
        </div>
        <p className="font-bold text-sm text-gray-500 dark:text-gray-400 ml-[52px]">
          Isi dengan inisial atau nama panggilan — data ini anonim.
        </p>
      </motion.div>

      <div className="space-y-7">
        {/* Nama */}
        <motion.div variants={itemVariants}>
          <FieldLabel>Nama / Inisial</FieldLabel>
          <input
            id={`${uid}-nama`}
            type="text"
            value={data.nama}
            onChange={(e) => onChange({ nama: e.target.value })}
            placeholder="Contoh: FLN atau Falen"
            maxLength={60}
            autoComplete="off"
            className={[
              "w-full py-4 px-5 rounded-xl border-4 border-black dark:border-white",
              "bg-white dark:bg-[#0B0F19] text-black dark:text-white",
              "font-bold text-base placeholder:text-gray-400 dark:placeholder:text-gray-600",
              "shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,0.2)]",
              "focus:outline-none focus:ring-0",
              "focus:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] focus:translate-x-[3px] focus:translate-y-[3px]",
              "transition-all duration-150",
            ].join(" ")}
          />
        </motion.div>

        {/* Umur */}
        <motion.div variants={itemVariants}>
          <FieldLabel>Umur</FieldLabel>
          <input
            id={`${uid}-umur`}
            type="number"
            min={10}
            max={25}
            value={data.umur}
            onChange={(e) => onChange({ umur: e.target.value })}
            placeholder="Contoh: 17"
            className={[
              "w-full py-4 px-5 rounded-xl border-4 border-black dark:border-white",
              "bg-white dark:bg-[#0B0F19] text-black dark:text-white",
              "font-bold text-base placeholder:text-gray-400 dark:placeholder:text-gray-600",
              "shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,0.2)]",
              "focus:outline-none focus:ring-0",
              "focus:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] focus:translate-x-[3px] focus:translate-y-[3px]",
              "transition-all duration-150",
            ].join(" ")}
          />
        </motion.div>

        {/* Jenis Kelamin */}
        <motion.div variants={itemVariants}>
          <FieldLabel>Jenis Kelamin</FieldLabel>
          <ToggleGrid<JenisKelamin>
            options={JENIS_KELAMIN_OPTIONS}
            selected={data.jenisKelamin}
            onSelect={(v) => onChange({ jenisKelamin: v })}
          />
        </motion.div>

        {/* Kelas — free text input */}
        <motion.div variants={itemVariants}>
          <FieldLabel>Kelas</FieldLabel>
          <input
            id={`${uid}-kelas`}
            type="text"
            value={data.kelas}
            onChange={(e) => onChange({ kelas: e.target.value })}
            placeholder="Contoh: 11 IPA 2"
            maxLength={30}
            autoComplete="off"
            className={[
              "w-full py-4 px-5 rounded-xl border-4 border-black dark:border-white",
              "bg-white dark:bg-[#0B0F19] text-black dark:text-white",
              "font-bold text-base placeholder:text-gray-400 dark:placeholder:text-gray-600",
              "shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,0.2)]",
              "focus:outline-none focus:ring-0",
              "focus:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] focus:translate-x-[3px] focus:translate-y-[3px]",
              "transition-all duration-150",
            ].join(" ")}
          />
        </motion.div>
      </div>
    </motion.div>
  );
}