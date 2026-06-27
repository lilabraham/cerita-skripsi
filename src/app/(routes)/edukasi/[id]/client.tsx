// D:\Project coding\cerita-app\src\app\(routes)\edukasi\[id]\client.tsx

"use client";

import Link from "next/link";
import Image from "next/image";
import {
  ArrowLeft, CheckCircle, BookOpen, Zap,
  Thermometer, Activity, AlertTriangle, Droplets,
  Heart, Wind, Bug, Syringe, Baby, Users,
  HeartHandshake, Handshake, Coffee, Shirt,
  Toilet, Utensils, ChevronRight,
} from "lucide-react";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import ScrollIndicator from "@/components/ui/ScrollIndicator";

// ─── Motion Variants ─────────────────────────────────────────────────────────

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
};
const itemVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 300, damping: 20 } },
};
const cardVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.98 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { type: "spring" as const, stiffness: 260, damping: 18 } },
};
const imageVariants = {
  hidden: { opacity: 0, scale: 0.7, rotate: -8 },
  visible: { opacity: 1, scale: 1, rotate: -2, transition: { type: "spring" as const, stiffness: 350, damping: 18, delay: 0.15 } },
};

// ─── Grid Background Styles ──────────────────────────────────────────────────

const gridBg = {
  backgroundImage: `
    linear-gradient(0deg,transparent 24%,rgba(0,0,0,.055) 25%,rgba(0,0,0,.055) 26%,transparent 27%,transparent 74%,rgba(0,0,0,.055) 75%,rgba(0,0,0,.055) 76%,transparent 77%),
    linear-gradient(90deg,transparent 24%,rgba(0,0,0,.055) 25%,rgba(0,0,0,.055) 26%,transparent 27%,transparent 74%,rgba(0,0,0,.055) 75%,rgba(0,0,0,.055) 76%,transparent 77%)
  `,
  backgroundSize: "50px 50px",
  backgroundColor: "rgb(250,245,230)",
};
const gridBgDark = {
  backgroundImage: `
    linear-gradient(0deg,transparent 24%,rgba(255,255,255,.06) 25%,rgba(255,255,255,.06) 26%,transparent 27%,transparent 74%,rgba(255,255,255,.06) 75%,rgba(255,255,255,.06) 76%,transparent 77%),
    linear-gradient(90deg,transparent 24%,rgba(255,255,255,.06) 25%,rgba(255,255,255,.06) 26%,transparent 27%,transparent 74%,rgba(255,255,255,.06) 75%,rgba(255,255,255,.06) 76%,transparent 77%)
  `,
  backgroundSize: "50px 50px",
  backgroundColor: "#04060A",
};

// ─── Neobrutalism Shared Classes ─────────────────────────────────────────────

const neo = "border-4 border-black dark:border-white";
const neoShadow = "shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] dark:shadow-[6px_6px_0px_0px_rgba(255,255,255,1)]";
const neoShadowLg = "shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] dark:shadow-[8px_8px_0px_0px_rgba(255,255,255,1)]";

// ─── MODULE 1: Pengenalan — Comparison Layout ────────────────────────────────

const hivPoints = [
  "Virus yang menyerang sistem imun",
  "Tidak selalu menunjukkan gejala",
  "Dapat dikendalikan dengan ARV",
  "Belum tentu berkembang jadi AIDS",
  "Menular melalui cairan tubuh tertentu",
];
const aidsPoints = [
  "Stadium akhir infeksi HIV",
  "CD4 < 200 sel/mm³",
  "Rentan infeksi oportunistik",
  "Gejala berat & sistemik",
  "Perlu penanganan intensif",
];

function PengenalanLayout() {
  return (
    <motion.div variants={cardVariants} className="mb-10">
      {/* Card Header */}
      <div className={`${neo} ${neoShadowLg} rounded-xl overflow-hidden bg-white dark:bg-[#0B0F19]`}>
        <div className="bg-black dark:bg-white px-6 py-3 flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-red-400 border border-black" />
          <div className="w-3 h-3 rounded-full bg-yellow-300 border border-black" />
          <div className="w-3 h-3 rounded-full bg-lime-400 border border-black" />
          <span className="ml-3 font-black text-xs uppercase tracking-widest text-white dark:text-black">
            HIV vs AIDS — Apa Bedanya?
          </span>
        </div>

        {/* Intro strip */}
        <div className="bg-yellow-200 dark:bg-yellow-800 border-b-4 border-black dark:border-white px-6 py-3">
          <p className="font-black text-sm uppercase tracking-wide text-black dark:text-white">
            ⚡ HIV dan AIDS adalah dua hal BERBEDA. Pahami perbedaannya di sini.
          </p>
        </div>

        {/* 2-Column Comparison */}
        <div className="grid grid-cols-1 sm:grid-cols-2">
          {/* HIV Column */}
          <div className="bg-cyan-100 dark:bg-cyan-950 border-b-4 sm:border-b-0 sm:border-r-4 border-black dark:border-white p-6">
            <div className="inline-block mb-4">
              <span className={`${neo} bg-cyan-400 dark:bg-cyan-600 px-4 py-1.5 rounded-full font-black text-xl uppercase tracking-widest text-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]`}>
                HIV
              </span>
            </div>
            <p className="font-bold text-xs uppercase tracking-widest text-cyan-800 dark:text-cyan-300 mb-4">
              Human Immunodeficiency Virus
            </p>
            <ul className="space-y-3">
              {hivPoints.map((pt, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: -12 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.07, type: "spring", stiffness: 300, damping: 20 }}
                  viewport={{ once: true }}
                  className="flex items-start gap-3"
                >
                  <span className={`mt-0.5 flex-shrink-0 w-6 h-6 rounded-full bg-cyan-500 border-2 border-black flex items-center justify-center font-black text-xs text-white`}>
                    {i + 1}
                  </span>
                  <span className="font-semibold text-sm text-black dark:text-white leading-snug">{pt}</span>
                </motion.li>
              ))}
            </ul>
          </div>

          {/* AIDS Column */}
          <div className="bg-rose-100 dark:bg-rose-950 p-6">
            <div className="inline-block mb-4">
              <span className={`${neo} bg-rose-400 dark:bg-rose-600 px-4 py-1.5 rounded-full font-black text-xl uppercase tracking-widest text-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]`}>
                AIDS
              </span>
            </div>
            <p className="font-bold text-xs uppercase tracking-widest text-rose-800 dark:text-rose-300 mb-4">
              Acquired Immunodeficiency Syndrome
            </p>
            <ul className="space-y-3">
              {aidsPoints.map((pt, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: 12 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.07, type: "spring", stiffness: 300, damping: 20 }}
                  viewport={{ once: true }}
                  className="flex items-start gap-3"
                >
                  <span className="mt-0.5 flex-shrink-0 w-6 h-6 rounded-full bg-rose-500 border-2 border-black flex items-center justify-center font-black text-xs text-white">
                    {i + 1}
                  </span>
                  <span className="font-semibold text-sm text-black dark:text-white leading-snug">{pt}</span>
                </motion.li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom fact strip */}
        <div className="border-t-4 border-black dark:border-white bg-lime-200 dark:bg-lime-900 px-6 py-4">
          <p className="font-black text-sm text-black dark:text-white uppercase tracking-wide">
            💡 Fakta: Penderita HIV BISA hidup puluhan tahun tanpa berkembang jadi AIDS jika mendapat pengobatan ARV tepat waktu.
          </p>
        </div>
      </div>
    </motion.div>
  );
}

// ─── MODULE 2: Cara Kerja — Timeline Langkah-Langkah ─────────────────────────

const caraKerjaSteps = [
  { num: 1, label: "HIV Masuk", desc: "Virus memasuki aliran darah via cairan tubuh", color: "bg-violet-300 dark:bg-violet-700" },
  { num: 2, label: "Temukan CD4", desc: "HIV mencari dan menempel pada sel CD4 (T-helper)", color: "bg-blue-300 dark:bg-blue-700" },
  { num: 3, label: "Injeksi RNA", desc: "HIV menyuntikkan materi genetiknya ke dalam sel", color: "bg-cyan-300 dark:bg-cyan-700" },
  { num: 4, label: "Replikasi", desc: "DNA HIV terbentuk & bergabung dengan DNA sel inang", color: "bg-yellow-300 dark:bg-yellow-700" },
  { num: 5, label: "Produksi Massal", desc: "Sel CD4 memproduksi ribuan salinan HIV baru", color: "bg-orange-300 dark:bg-orange-700" },
  { num: 6, label: "Sel Hancur", desc: "CD4 mati, imunitas melemah drastis", color: "bg-red-300 dark:bg-red-700" },
];

function CaraKerjaLayout() {
  return (
    <motion.div variants={cardVariants} className="mb-10">
      <div className={`${neo} ${neoShadowLg} rounded-xl overflow-hidden bg-white dark:bg-[#0B0F19]`}>
        {/* Header */}
        <div className="bg-black dark:bg-white px-6 py-3 flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-red-400 border border-black" />
          <div className="w-3 h-3 rounded-full bg-yellow-300 border border-black" />
          <div className="w-3 h-3 rounded-full bg-lime-400 border border-black" />
          <span className="ml-3 font-black text-xs uppercase tracking-widest text-white dark:text-black">
            Cara HIV Menyerang Tubuh — 6 Tahap
          </span>
        </div>

        <div className="p-6 sm:p-8">
          {/* Step Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-8">
            {caraKerjaSteps.map((step, i) => (
              <motion.div
                key={step.num}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08, type: "spring", stiffness: 280, damping: 18 }}
                viewport={{ once: true }}
                whileHover={{ y: -4, boxShadow: "8px 8px 0px 0px rgba(0,0,0,1)" }}
                className={`relative ${neo} rounded-xl p-4 ${step.color} shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] transition-all duration-100 cursor-default`}
              >
                {/* Number badge */}
                <span className="absolute -top-3 -left-3 w-8 h-8 rounded-full bg-black text-white dark:bg-white dark:text-black border-2 border-black flex items-center justify-center font-black text-sm">
                  {step.num}
                </span>
                {/* Arrow for non-last items */}
                {i < caraKerjaSteps.length - 1 && (
                  <span className="absolute -right-3 top-1/2 -translate-y-1/2 z-10 hidden sm:flex w-6 h-6 bg-black text-white rounded-full items-center justify-center">
                    <ChevronRight size={14} strokeWidth={3} />
                  </span>
                )}
                <p className="font-black text-sm uppercase tracking-tight text-black mt-2 mb-1">{step.label}</p>
                <p className="text-xs font-medium text-black/80 leading-snug">{step.desc}</p>
              </motion.div>
            ))}
          </div>

          {/* Divider label */}
          <div className={`${neo} bg-indigo-600 dark:bg-indigo-500 rounded-lg px-4 py-2 mb-4 inline-block shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]`}>
            <span className="font-black text-xs uppercase tracking-widest text-white">
              📊 Ilustrasi: Alur HIV Menyerang Tubuh
            </span>
          </div>

          {/* Infographic Image */}
          <div className={`${neo} rounded-xl overflow-hidden ${neoShadow} bg-slate-50 dark:bg-[#111827]`}>
            <div className="relative w-full aspect-[16/7]">
              <Image
                src="/images/cara-menyerang-placeholder.png"
                alt="Ilustrasi alur HIV menyerang tubuh"
                fill
                className="object-contain p-4"
              />
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// ─── MODULE 3: Gejala — 3 Fase Layout ────────────────────────────────────────

const faseData = [
  {
    label: "Fase Akut",
    subtitle: "2–4 Minggu Pertama",
    color: "bg-emerald-200 dark:bg-emerald-900",
    accent: "bg-emerald-500",
    headerBg: "bg-emerald-500",
    gejala: [
      { icon: Thermometer, text: "Demam tinggi mendadak" },
      { icon: Activity, text: "Kelelahan ekstrem" },
      { icon: Wind, text: "Sakit tenggorokan" },
      { icon: Bug, text: "Ruam kulit" },
      { icon: Heart, text: "Pembengkakan kelenjar" },
    ],
  },
  {
    label: "Fase Laten",
    subtitle: "Bisa Bertahun-Tahun",
    color: "bg-amber-200 dark:bg-amber-900",
    accent: "bg-amber-500",
    headerBg: "bg-amber-500",
    gejala: [
      { icon: Activity, text: "Hampir tanpa gejala" },
      { icon: Bug, text: "Infeksi minor berulang" },
      { icon: Thermometer, text: "Keringat malam" },
      { icon: Heart, text: "Penurunan BB bertahap" },
      { icon: Wind, text: "Batuk ringan persisten" },
    ],
  },
  {
    label: "Fase AIDS",
    subtitle: "Stadium Akhir",
    color: "bg-rose-200 dark:bg-rose-950",
    accent: "bg-rose-500",
    headerBg: "bg-rose-500",
    gejala: [
      { icon: AlertTriangle, text: "Infeksi oportunistik berat" },
      { icon: Thermometer, text: "Demam persisten > 38°C" },
      { icon: Activity, text: "Penurunan BB drastis" },
      { icon: Wind, text: "Pneumonia berulang" },
      { icon: Bug, text: "Kanker terkait (KS, dll)" },
    ],
  },
];

function GejalaLayout() {
  return (
    <motion.div variants={cardVariants} className="mb-10">
      <div className={`${neo} ${neoShadowLg} rounded-xl overflow-hidden bg-white dark:bg-[#0B0F19]`}>
        {/* Header */}
        <div className="bg-black dark:bg-white px-6 py-3 flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-red-400 border border-black" />
          <div className="w-3 h-3 rounded-full bg-yellow-300 border border-black" />
          <div className="w-3 h-3 rounded-full bg-lime-400 border border-black" />
          <span className="ml-3 font-black text-xs uppercase tracking-widest text-white dark:text-black">
            Gejala HIV — 3 Fase Perjalanan Penyakit
          </span>
        </div>

        {/* Fase strip label */}
        <div className="bg-yellow-200 dark:bg-yellow-800 border-b-4 border-black dark:border-white px-6 py-3">
          <p className="font-black text-sm uppercase tracking-wide text-black dark:text-white">
            ⚡ Tiap fase punya karakteristik berbeda — kenali sebelum terlambat.
          </p>
        </div>

        {/* 3 Columns */}
        <div className="grid grid-cols-1 sm:grid-cols-3 divide-y-4 sm:divide-y-0 sm:divide-x-4 divide-black dark:divide-white">
          {faseData.map((fase, fi) => (
            <motion.div
              key={fase.label}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: fi * 0.1, type: "spring", stiffness: 280, damping: 18 }}
              viewport={{ once: true }}
              className={`${fase.color} p-5`}
            >
              {/* Phase label */}
              <div className={`inline-block mb-3 px-3 py-1 ${fase.accent} border-2 border-black rounded-full`}>
                <span className="font-black text-sm uppercase tracking-widest text-black">{fase.label}</span>
              </div>
              <p className="font-bold text-xs uppercase tracking-widest text-black/60 dark:text-white/60 mb-4">
                {fase.subtitle}
              </p>

              {/* Gejala list with icons */}
              <ul className="space-y-3">
                {fase.gejala.map((g, gi) => (
                  <motion.li
                    key={gi}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: fi * 0.08 + gi * 0.06, type: "spring", stiffness: 300, damping: 22 }}
                    viewport={{ once: true }}
                    className="flex items-center gap-3"
                  >
                    <span className="flex-shrink-0 w-8 h-8 rounded-lg bg-black dark:bg-white border-2 border-black flex items-center justify-center">
                      <g.icon size={15} strokeWidth={2.5} className="text-white dark:text-black" />
                    </span>
                    <span className="font-semibold text-sm text-black dark:text-white leading-snug">{g.text}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Bottom note */}
        <div className="border-t-4 border-black dark:border-white bg-slate-100 dark:bg-slate-900 px-6 py-4">
          <p className="font-black text-sm text-black dark:text-white uppercase tracking-wide">
            🔎 Ingat: Banyak penderita HIV tidak menyadari dirinya terinfeksi. Tes dini = kunci pengobatan efektif.
          </p>
        </div>
      </div>
    </motion.div>
  );
}

// ─── MODULE 4: Penularan — Do's & Don'ts Layout ───────────────────────────────

const menularMelalui = [
  { icon: Droplets, label: "Hubungan Seksual Tanpa Kondom", bg: "bg-rose-200 dark:bg-rose-900" },
  { icon: Syringe, label: "Berbagi Jarum Suntik", bg: "bg-rose-300 dark:bg-rose-800" },
  { icon: Baby, label: "Ibu ke Bayi (Kehamilan/ASI)", bg: "bg-rose-200 dark:bg-rose-900" },
  { icon: Droplets, label: "Transfusi Darah Tercemar", bg: "bg-rose-300 dark:bg-rose-800" },
];

const tidakMenularMelalui = [
  { icon: Handshake, label: "Jabat Tangan" },
  { icon: Coffee, label: "Berbagi Makanan" },
  { icon: Shirt, label: "Berbagi Pakaian" },
  { icon: Toilet, label: "Toilet Umum" },
  { icon: Wind, label: "Bersin / Batuk" },
  { icon: HeartHandshake, label: "Pelukan" },
  { icon: Users, label: "Kontak Sosial Biasa" },
  { icon: Utensils, label: "Peralatan Makan" },
];

function PenularanLayout() {
  return (
    <motion.div variants={cardVariants} className="mb-10">
      <div className={`${neo} ${neoShadowLg} rounded-xl overflow-hidden bg-white dark:bg-[#0B0F19]`}>
        {/* Header */}
        <div className="bg-black dark:bg-white px-6 py-3 flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-red-400 border border-black" />
          <div className="w-3 h-3 rounded-full bg-yellow-300 border border-black" />
          <div className="w-3 h-3 rounded-full bg-lime-400 border border-black" />
          <span className="ml-3 font-black text-xs uppercase tracking-widest text-white dark:text-black">
            Cara Penularan HIV — Fakta vs Mitos
          </span>
        </div>

        {/* ── MENULAR Section ── */}
        <div className="border-b-4 border-black dark:border-white">
          {/* Section header */}
          <div className="bg-rose-500 border-b-4 border-black dark:border-white px-6 py-3 flex items-center gap-3">
            <span className="text-2xl">⚠️</span>
            <div>
              <p className="font-black text-lg uppercase tracking-widest text-white">MENULAR MELALUI</p>
              <p className="font-bold text-xs uppercase tracking-widest text-rose-100">4 jalur transmisi utama</p>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 divide-x-0 sm:divide-x-4 divide-y-4 sm:divide-y-0 divide-black dark:divide-white bg-rose-50 dark:bg-rose-950">
            {menularMelalui.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.08, type: "spring", stiffness: 300, damping: 18 }}
                viewport={{ once: true }}
                whileHover={{ y: -3 }}
                className={`${item.bg} p-5 flex flex-col items-center text-center gap-3 cursor-default transition-transform duration-100`}
              >
                <div className="w-14 h-14 rounded-xl bg-rose-600 border-4 border-black flex items-center justify-center shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
                  <item.icon size={26} strokeWidth={2.5} className="text-white" />
                </div>
                <p className="font-black text-xs uppercase tracking-tight text-black dark:text-white leading-snug">{item.label}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* ── TIDAK MENULAR Section ── */}
        <div>
          {/* Section header */}
          <div className="bg-cyan-500 border-b-4 border-black dark:border-white px-6 py-3 flex items-center gap-3">
            <span className="text-2xl">✅</span>
            <div>
              <p className="font-black text-lg uppercase tracking-widest text-white">TIDAK MENULAR MELALUI</p>
              <p className="font-bold text-xs uppercase tracking-widest text-cyan-100">Aman untuk dilakukan sehari-hari</p>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-6 bg-cyan-50 dark:bg-cyan-950">
            {tidakMenularMelalui.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.06, type: "spring", stiffness: 300, damping: 20 }}
                viewport={{ once: true }}
                whileHover={{ y: -3, boxShadow: "6px 6px 0px 0px rgba(0,0,0,1)" }}
                className={`${neo} rounded-xl p-3 bg-white dark:bg-cyan-900 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex items-center gap-3 transition-all duration-100 cursor-default`}
              >
                {/* Checkmark + icon */}
                <div className="relative flex-shrink-0">
                  <div className="w-10 h-10 rounded-lg bg-cyan-100 dark:bg-cyan-800 border-2 border-black flex items-center justify-center">
                    <item.icon size={18} strokeWidth={2.5} className="text-black dark:text-white" />
                  </div>
                  <span className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-lime-400 border-2 border-black rounded-full flex items-center justify-center text-[9px] font-black text-black">✓</span>
                </div>
                <p className="font-black text-xs uppercase tracking-tight text-black dark:text-white leading-tight">{item.label}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Bottom strip */}
        <div className="border-t-4 border-black dark:border-white bg-lime-200 dark:bg-lime-900 px-6 py-4">
          <p className="font-black text-sm text-black dark:text-white uppercase tracking-wide">
            🤝 HIV TIDAK menular melalui kontak sehari-hari. Hapus stigma, dukung sesama.
          </p>
        </div>
      </div>
    </motion.div>
  );
}

// ─── MODULE 5: Pencegahan — ABCDE Cards ──────────────────────────────────────

const abcdeData = [
  {
    letter: "A",
    label: "Abstinence",
    desc: "Menghindari hubungan seksual berisiko — cara paling efektif mencegah HIV.",
    color: "bg-violet-300 dark:bg-violet-800",
    accent: "bg-violet-600",
  },
  {
    letter: "B",
    label: "Be Faithful",
    desc: "Setia pada satu pasangan, hindari berganti-ganti pasangan.",
    color: "bg-cyan-300 dark:bg-cyan-800",
    accent: "bg-cyan-600",
  },
  {
    letter: "C",
    label: "Condom",
    desc: "Penggunaan kondom yang benar & konsisten mengurangi risiko penularan.",
    color: "bg-yellow-300 dark:bg-yellow-700",
    accent: "bg-yellow-500",
  },
  {
    letter: "D",
    label: "No Drugs",
    desc: "Hindari narkoba suntik. Jangan pernah berbagi jarum suntik.",
    color: "bg-rose-300 dark:bg-rose-800",
    accent: "bg-rose-600",
  },
  {
    letter: "E",
    label: "Education",
    desc: "Informasi yang benar tentang HIV = keputusan yang sehat & aman.",
    color: "bg-lime-300 dark:bg-lime-700",
    accent: "bg-lime-600",
  },
] as const;

function PencegahanLayout() {
  return (
    <motion.div variants={cardVariants} className="mb-10">
      <div className={`${neo} ${neoShadowLg} rounded-xl overflow-hidden bg-white dark:bg-[#0B0F19]`}>
        {/* Header bar */}
        <div className="bg-black dark:bg-white px-6 py-3 flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-red-400 border border-black" />
          <div className="w-3 h-3 rounded-full bg-yellow-300 border border-black" />
          <div className="w-3 h-3 rounded-full bg-lime-400 border border-black" />
          <span className="ml-3 font-black text-xs uppercase tracking-widest text-white dark:text-black">
            Prinsip ABCDE — 5 Cara Mencegah HIV
          </span>
        </div>

        {/* Intro strip */}
        <div className="bg-violet-200 dark:bg-violet-900 border-b-4 border-black dark:border-white px-6 py-3">
          <p className="font-black text-sm uppercase tracking-wide text-black dark:text-white">
            🛡️ Pencegahan HIV dimulai dari diri sendiri. Terapkan prinsip ABCDE berikut.
          </p>
        </div>

        {/* ABCDE Cards */}
        <div className="p-6 grid grid-cols-1 sm:grid-cols-5 gap-4">
          {abcdeData.map((item, i) => (
            <motion.div
              key={item.letter}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.09, type: "spring", stiffness: 280, damping: 18 }}
              viewport={{ once: true }}
              whileHover={{ y: -4, boxShadow: "8px 8px 0px 0px rgba(0,0,0,1)" }}
              className={`${neo} ${item.color} rounded-xl p-5 shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] transition-all duration-100 flex flex-col gap-3 cursor-default`}
            >
              <span
                className={`w-12 h-12 ${item.accent} border-4 border-black rounded-xl flex items-center justify-center font-black text-2xl text-white shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]`}
              >
                {item.letter}
              </span>
              <div>
                <p className="font-black text-sm uppercase tracking-tight text-black">{item.label}</p>
                <p className="text-xs font-medium text-black/75 leading-snug mt-1">{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Image placeholder */}
        <div className="px-6 pb-6">
          <div className={`${neo} ${neoShadow} rounded-xl overflow-hidden bg-slate-50 dark:bg-[#111827]`}>
            <div className="bg-violet-600 border-b-4 border-black dark:border-white px-4 py-2">
              <span className="font-black text-xs uppercase tracking-widest text-white">
                🖼️ Infografis ABCDE
              </span>
            </div>
            <div className="relative w-full aspect-[16/7]">
              <Image
                src="/images/infografis-abcde.png"
                alt="Infografis prinsip ABCDE pencegahan HIV"
                fill
                className="object-contain p-4"
              />
            </div>
          </div>
        </div>

        {/* Bottom strip */}
        <div className="border-t-4 border-black dark:border-white bg-lime-200 dark:bg-lime-900 px-6 py-4">
          <p className="font-black text-sm text-black dark:text-white uppercase tracking-wide">
            💡 Pencegahan lebih baik dari pengobatan — lindungi diri & orang yang kamu cintai.
          </p>
        </div>
      </div>
    </motion.div>
  );
}

// ─── MODULE 6: Pengobatan — ARV Two-Panel ────────────────────────────────────

const arvBenefits = [
  { label: "Menekan perkembangan virus HIV", color: "bg-cyan-200 dark:bg-cyan-900" },
  { label: "Menjaga daya tahan tubuh tetap optimal", color: "bg-yellow-200 dark:bg-yellow-900" },
  { label: "Mengurangi risiko infeksi oportunistik", color: "bg-lime-200 dark:bg-lime-900" },
  { label: "Membantu ODHA hidup sehat & produktif", color: "bg-pink-200 dark:bg-pink-900" },
];

function PengobatanLayout() {
  return (
    <motion.div variants={cardVariants} className="mb-10">
      <div className={`${neo} ${neoShadowLg} rounded-xl overflow-hidden bg-white dark:bg-[#0B0F19]`}>
        <div className="bg-black dark:bg-white px-6 py-3 flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-red-400 border border-black" />
          <div className="w-3 h-3 rounded-full bg-yellow-300 border border-black" />
          <div className="w-3 h-3 rounded-full bg-lime-400 border border-black" />
          <span className="ml-3 font-black text-xs uppercase tracking-widest text-white dark:text-black">
            Pengobatan HIV — Terapi Antiretroviral (ARV)
          </span>
        </div>

        {/* Vertical stack */}
        <div className="flex flex-col bg-indigo-100 dark:bg-indigo-950 p-6 sm:p-8 gap-6">
          <span className={`${neo} bg-indigo-500 text-white font-black text-2xl uppercase tracking-widest px-5 py-2 rounded-full shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] w-fit`}>
            ARV
          </span>
          <p className="font-bold text-xs uppercase tracking-widest text-indigo-700 dark:text-indigo-300">
            Antiretroviral Therapy
          </p>
          <p className="font-semibold text-base sm:text-lg text-black dark:text-white leading-relaxed">
            Saat ini HIV <strong>belum bisa disembuhkan total</strong>. Namun, terapi ARV mampu
            menekan jumlah virus sehingga sistem kekebalan tubuh tetap terjaga.
          </p>

          <div className={`${neo} bg-white dark:bg-indigo-900 rounded-xl p-5 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]`}>
            <p className="font-black text-sm uppercase tracking-widest text-black dark:text-white mb-2">
              ⚙️ Cara Kerja ARV
            </p>
            <p className="text-base sm:text-lg font-medium text-black/80 dark:text-white/80 leading-relaxed">
              ARV menghambat replikasi HIV sehingga <em>viral load</em> (jumlah virus dalam darah)
              dapat ditekan hingga tidak terdeteksi.
            </p>
          </div>

          {/* Image — full width, below text */}
          <div className={`${neo} ${neoShadow} rounded-xl overflow-hidden bg-slate-50 dark:bg-[#111827]`}>
            <div className="relative w-full aspect-[16/9]">
              <Image src="/images/pengobatan-arv.png" alt="Ilustrasi terapi ARV" fill className="object-contain p-4" />
            </div>
          </div>

          {/* Benefits */}
          <div className={`${neo} bg-yellow-300 dark:bg-yellow-700 px-4 py-2 rounded-lg shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] w-fit`}>
            <p className="font-black text-xs uppercase tracking-widest text-black">✅ Manfaat Terapi ARV</p>
          </div>

          <div className="flex flex-col gap-3">
            {arvBenefits.map((b, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: 16 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.09, type: "spring", stiffness: 300, damping: 20 }}
                viewport={{ once: true }}
                whileHover={{ x: 4, boxShadow: "6px 6px 0px 0px rgba(0,0,0,1)" }}
                className={`${neo} ${b.color} rounded-xl p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex items-center gap-3 transition-all duration-100 cursor-default`}
              >
                <span className="w-8 h-8 bg-black dark:bg-white rounded-lg border-2 border-black flex items-center justify-center text-white dark:text-black font-black text-sm flex-shrink-0">
                  {i + 1}
                </span>
                <p className="font-black text-sm uppercase tracking-tight text-black dark:text-white leading-snug">
                  {b.label}
                </p>
              </motion.div>
            ))}
          </div>

          <div className={`${neo} bg-black dark:bg-white rounded-xl p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,0.5)]`}>
            <p className="font-black text-base text-white dark:text-black uppercase tracking-wide leading-snug">
              ⏱️ Semakin cepat terdeteksi & diobati → semakin baik kualitas hidup penderita.
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// ─── MODULE 7: Stigma — Two-Column Action Layout ──────────────────────────────

const stigmaImpacts = [
  "ODHA enggan memeriksakan diri",
  "Penundaan pengobatan ARV",
  "Isolasi sosial & depresi",
  "Penyebaran virus makin sulit dikontrol",
];

const antiStigmaActions = [
  { label: "Menghargai & menghormati ODHA", color: "bg-lime-300 dark:bg-lime-800" },
  { label: "Tidak mengucilkan atau membully", color: "bg-cyan-300 dark:bg-cyan-800" },
  { label: "Memberikan dukungan sosial nyata", color: "bg-yellow-300 dark:bg-yellow-700" },
  { label: "Menyebarkan informasi HIV yang benar", color: "bg-pink-300 dark:bg-pink-800" },
];

function StigmaLayout() {
  return (
    <motion.div variants={cardVariants} className="mb-10">
      <div className={`${neo} ${neoShadowLg} rounded-xl overflow-hidden bg-white dark:bg-[#0B0F19]`}>
        <div className="bg-black dark:bg-white px-6 py-3 flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-red-400 border border-black" />
          <div className="w-3 h-3 rounded-full bg-yellow-300 border border-black" />
          <div className="w-3 h-3 rounded-full bg-lime-400 border border-black" />
          <span className="ml-3 font-black text-xs uppercase tracking-widest text-white dark:text-black">
            Stop Stigma — ODHA Punya Hak yang Sama
          </span>
        </div>

        <div className="bg-orange-200 dark:bg-orange-900 border-b-4 border-black dark:border-white px-6 py-4">
          <p className="font-black text-sm uppercase tracking-wide text-black dark:text-white mb-1">👤 Apa itu ODHA?</p>
          <p className="font-semibold text-base sm:text-lg text-black/80 dark:text-white/80 leading-relaxed">
            <strong>Orang Dengan HIV/AIDS</strong> — individu yang tetap memiliki hak yang sama
            untuk belajar, bekerja, bergaul, dan hidup di masyarakat.
          </p>
        </div>

        {/* Vertical stack */}
        <div className="flex flex-col bg-rose-50 dark:bg-rose-950 p-6 sm:p-8 gap-6">
          <div className={`${neo} bg-rose-500 px-4 py-2 rounded-lg shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] w-fit`}>
            <p className="font-black text-xs uppercase tracking-widest text-white">⚠️ Dampak Stigma & Diskriminasi</p>
          </div>

          <ul className="flex flex-col gap-3">
            {stigmaImpacts.map((item, i) => (
              <motion.li
                key={i}
                initial={{ opacity: 0, x: -12 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.08, type: "spring", stiffness: 300, damping: 20 }}
                viewport={{ once: true }}
                className={`${neo} bg-white dark:bg-rose-900 rounded-xl p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex items-center gap-3`}
              >
                <span className="w-8 h-8 flex-shrink-0 bg-rose-500 border-2 border-black rounded-lg flex items-center justify-center font-black text-white text-sm">✗</span>
                <p className="font-black text-sm uppercase tracking-tight text-black dark:text-white leading-snug">{item}</p>
              </motion.li>
            ))}
          </ul>

          {/* Image — full width, below */}
          <div className={`${neo} ${neoShadow} rounded-xl overflow-hidden bg-slate-50 dark:bg-[#111827]`}>
            <div className="relative w-full aspect-[16/9]">
              <Image src="/images/stop-stigma.png" alt="Ilustrasi stop stigma ODHA" fill className="object-contain p-4" />
            </div>
          </div>

          <div className={`${neo} bg-lime-400 dark:bg-lime-700 px-4 py-2 rounded-lg shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] w-fit`}>
            <p className="font-black text-xs uppercase tracking-widest text-black">✅ Yang Bisa Kita Lakukan</p>
          </div>

          <div className="flex flex-col gap-3">
            {antiStigmaActions.map((action, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: 16 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.09, type: "spring", stiffness: 300, damping: 20 }}
                viewport={{ once: true }}
                whileHover={{ x: 4, boxShadow: "6px 6px 0px 0px rgba(0,0,0,1)" }}
                className={`${neo} ${action.color} rounded-xl p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex items-center gap-3 transition-all duration-100 cursor-default`}
              >
                <span className="w-8 h-8 flex-shrink-0 bg-black dark:bg-white rounded-lg border-2 border-black flex items-center justify-center text-white dark:text-black font-black text-sm">✓</span>
                <p className="font-black text-sm uppercase tracking-tight text-black dark:text-white leading-snug">{action.label}</p>
              </motion.div>
            ))}
          </div>

          <div className={`${neo} bg-black dark:bg-white rounded-xl p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,0.5)]`}>
            <p className="font-black text-base text-white dark:text-black uppercase tracking-wide leading-snug">
              💬 Kenali penyakitnya, bukan menghakimi orangnya.
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// ─── Fallback: Plain Paragraphs ───────────────────────────────────────────────

function FallbackLayout({ paragraphs }: { paragraphs: string[] }) {
  return (
    <motion.div variants={cardVariants} className="mb-10">
      <div className={`${neo} ${neoShadowLg} rounded-xl overflow-hidden bg-white dark:bg-[#0B0F19]`}>
        <div className="bg-black dark:bg-white px-6 py-3 flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-red-400 border border-black" />
          <div className="w-3 h-3 rounded-full bg-yellow-300 border border-black" />
          <div className="w-3 h-3 rounded-full bg-lime-400 border border-black" />
          <span className="ml-3 font-black text-xs uppercase tracking-widest text-white dark:text-black">Baca Materi</span>
        </div>
        <div className="p-8 sm:p-10 space-y-5">
          {paragraphs.map((paragraph, index) => {
            if (paragraph.trim() === "[PLACEHOLDER_GAMBAR_ALUR]") {
              return (
                <div key={index} className={`${neo} ${neoShadow} rounded-xl overflow-hidden bg-slate-50 dark:bg-[#111827] my-6`}>
                  <div className="bg-indigo-600 dark:bg-indigo-500 px-4 py-2 border-b-4 border-black dark:border-white">
                    <span className="font-black text-xs uppercase tracking-widest text-white">📊 Ilustrasi</span>
                  </div>
                  <div className="relative w-full aspect-[16/7]">
                    <Image src="/images/alur-kerja-hiv.png" alt="Ilustrasi alur HIV" fill className="object-contain p-4" />
                  </div>
                </div>
              );
            }
            return (
              <motion.p
                key={index}
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ type: "spring", stiffness: 280, damping: 20, delay: index * 0.06 }}
                viewport={{ once: true, amount: 0.4 }}
                className="text-base sm:text-lg text-gray-900 dark:text-gray-100 leading-relaxed font-medium border-l-[3px] border-transparent hover:border-indigo-500 pl-0 hover:pl-4 transition-all duration-150 whitespace-pre-line"
              >
                {paragraph.trim()}
              </motion.p>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
}

// ─── Dynamic Content Renderer ─────────────────────────────────────────────────

function ModuleContent({ id, paragraphs }: { id: string; paragraphs: string[] }) {
  switch (id) {
    case "pengenalan": return <PengenalanLayout />;
    case "cara_kerja": return <CaraKerjaLayout />;
    case "gejala": return <GejalaLayout />;
    case "penularan": return <PenularanLayout />;
    case "pencegahan": return <PencegahanLayout />;
    case "pengobatan": return <PengobatanLayout />;
    case "stigma": return <StigmaLayout />;
    default: return <FallbackLayout paragraphs={paragraphs} />;
  }
}

// ─── Main Client Component ────────────────────────────────────────────────────

export default function DetailEdukasiClient({
  materi,
  id,
  paragraphs,
  currentImage,
}: {
  materi: any;
  id: string;
  paragraphs: string[];
  currentImage: string;
}) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;
  return (
    <>

      <motion.main
        className="relative min-h-screen pt-24 pb-20 px-4 sm:px-6 overflow-hidden"
        style={gridBg}
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        {/* Dark mode grid overlay */}
        <div className="hidden dark:block absolute inset-0 pointer-events-none z-0" style={gridBgDark} />

        <div className="max-w-4xl mx-auto relative z-10">

          {/* ── Tombol Kembali ───────────────────────────────────────────── */}
          <motion.div variants={itemVariants} className="mb-10">
            <Link
              href="/edukasi"
              className="
              inline-flex items-center gap-2.5 px-5 py-2.5
              bg-white dark:bg-[#0B0F19]
              border-2 border-black dark:border-white rounded-full
              font-black text-xs uppercase tracking-widest text-black dark:text-white
              shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)]
              hover:translate-x-[-2px] hover:translate-y-[-2px]
              hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] dark:hover:shadow-[6px_6px_0px_0px_rgba(255,255,255,1)]
              active:translate-x-0 active:translate-y-0
              active:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]
              transition-all duration-100
            "
            >
              <ArrowLeft size={16} strokeWidth={3} />
              Kembali
            </Link>
          </motion.div>

          {/* ── Header Section ───────────────────────────────────────────── */}
          <motion.div variants={itemVariants} className="mb-12">
            <div className="mb-5">
              <span className="
              inline-flex items-center gap-2 px-4 py-1.5
              bg-white dark:bg-[#0B0F19]
              border-2 border-black dark:border-white rounded-full
              font-black text-xs uppercase tracking-widest text-black dark:text-white
              shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] dark:shadow-[3px_3px_0px_0px_rgba(255,255,255,1)]
            ">
                <BookOpen size={13} strokeWidth={3} />
                Materi Edukasi
                <span className="w-2 h-2 rounded-full bg-lime-400 border border-black dark:border-white" />
              </span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-8 items-start">
              {/* Title */}
              <div className="space-y-3">
                <div className="relative inline-block">
                  <span className="absolute inset-x-0 bottom-1 h-[45%] bg-yellow-300 dark:bg-yellow-400 -z-10 skew-x-[-1deg]" aria-hidden="true" />
                  <h1 className="relative text-5xl sm:text-6xl lg:text-7xl font-black uppercase text-black dark:text-white tracking-tighter leading-[0.9] break-words">
                    {materi.title}
                  </h1>
                </div>
                <p className="text-sm sm:text-base font-black text-indigo-600 dark:text-indigo-400 uppercase tracking-widest mt-3">
                  — {materi.subtitle}
                </p>

                {/* ── Pengantar Definisi (khusus modul pengenalan) ── */}
                {id === "pengenalan" && (
                  <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.45, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
                    className="mt-8 flex flex-col gap-5"
                  >
                    {/* HIV */}
                    <div className="border-l-4 border-black dark:border-white pl-5">
                      <p className="text-base sm:text-lg font-medium text-black dark:text-white leading-relaxed">
                        <span className="inline-block font-black text-black dark:text-white bg-cyan-300 dark:bg-cyan-700 px-1.5 py-0.5 mr-1 border-2 border-black dark:border-white rounded-md text-sm align-middle">
                          HIV
                        </span>
                        Human Immunodeficiency Virus (HIV) adalah virus yang menyerang sistem kekebalan tubuh,
                        terutama sel CD4 yang berperan melindungi tubuh dari berbagai penyakit. Ketika jumlah
                        sel CD4 terus berkurang, tubuh akan semakin sulit melawan infeksi.
                      </p>
                      <p className="mt-2 text-base sm:text-lg font-medium text-black/75 dark:text-white/65 leading-relaxed">
                        Seseorang yang terinfeksi HIV tidak selalu terlihat sakit. Banyak orang dapat hidup
                        bertahun-tahun tanpa gejala, sehingga pemeriksaan kesehatan menjadi sangat penting.
                      </p>
                    </div>

                    {/* AIDS */}
                    <div className="border-l-4 border-black dark:border-white pl-5">
                      <p className="text-base sm:text-lg font-medium text-black dark:text-white leading-relaxed">
                        <span className="inline-block font-black text-black dark:text-white bg-rose-300 dark:bg-rose-700 px-1.5 py-0.5 mr-1 border-2 border-black dark:border-white rounded-md text-sm align-middle">
                          AIDS
                        </span>
                        Acquired Immune Deficiency Syndrome (AIDS) adalah tahap lanjut dari infeksi HIV. Pada
                        kondisi ini, sistem kekebalan tubuh sudah sangat lemah sehingga tubuh mudah terserang
                        berbagai infeksi dan penyakit serius.
                      </p>
                    </div>
                  </motion.div>
                )}
              </div>

              {/* Thumbnail */}
              <motion.div
                variants={imageVariants}
                className="
                relative flex-shrink-0 w-36 h-36 sm:w-44 sm:h-44 lg:w-52 lg:h-52
                border-4 border-black dark:border-white
                shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] dark:shadow-[8px_8px_0px_0px_rgba(255,255,255,1)]
                bg-white dark:bg-[#0B0F19] rounded-lg overflow-hidden mx-auto lg:mx-0
              "
              >
                <Image src={currentImage} alt={materi.title} fill className="object-contain p-3" priority />
              </motion.div>
            </div>
          </motion.div>

          {/* ── Dynamic Module Content ───────────────────────────────────── */}
          <ModuleContent id={id} paragraphs={paragraphs} />

          {/* ── CTA Box "Materi Selesai" ─────────────────────────────────── */}
          <motion.div variants={cardVariants} className="mb-10 relative">
            <div className="
            relative
            bg-gradient-to-r from-cyan-300 via-yellow-300 to-lime-400
            dark:from-cyan-400 dark:via-yellow-300 dark:to-lime-400
            border-4 border-black dark:border-black rounded-2xl
            shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]
            p-7 sm:p-9
          ">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-7">
                <div className="flex items-center gap-4">
                  <motion.div
                    animate={{ scale: [1, 1.15, 1], rotate: [0, -12, 12, 0] }}
                    transition={{ duration: 1.8, repeat: Infinity }}
                  >
                    <CheckCircle size={44} className="text-black flex-shrink-0" strokeWidth={3} />
                  </motion.div>
                  <div>
                    <p className="text-xl sm:text-2xl font-black uppercase text-black tracking-tight">Materi Selesai!</p>
                    <p className="text-sm font-bold text-black uppercase tracking-widest mt-0.5">Uji Pengetahuanmu Sekarang</p>
                  </div>
                </div>

                <motion.div
                  initial={{ boxShadow: "6px 6px 0px 0px rgba(0,0,0,1)" }}
                  whileHover={{ y: -3, boxShadow: "9px 9px 0px 0px rgba(0,0,0,1)" }}
                  whileTap={{ y: 3, boxShadow: "2px 2px 0px 0px rgba(0,0,0,1)" }}
                  transition={{ type: "spring", stiffness: 500, damping: 20 }}
                  className="rounded-xl border-4 border-black"
                >
                  <Link
                    href={`/kuis?modul=${id}`}
                    className="
                    inline-flex items-center justify-center gap-2
                    px-8 py-4 rounded-[10px] bg-black text-yellow-300
                    font-black text-base sm:text-lg uppercase tracking-widest
                    whitespace-nowrap select-none
                  "
                  >
                    <Zap size={20} strokeWidth={3} fill="currentColor" />
                    Mulai Kuis
                  </Link>
                </motion.div>
              </div>
            </div>
          </motion.div>

          {/* ── Skip → Next Module ───────────────────────────────────────── */}
          {
            materi.nextModule && (
              <motion.div variants={itemVariants} className="text-center">
                <Link
                  href={`/edukasi/${materi.nextModule}`}
                  className="
                inline-flex items-center gap-2 px-5 py-2
                font-black text-xs uppercase tracking-widest
                text-black dark:text-white
                border-b-2 border-black dark:border-white
                hover:translate-y-[-2px] transition-transform duration-100
              "
                >
                  Lewati Kuis → Modul Berikutnya
                </Link>
              </motion.div>
            )
          }
        </div >
      </motion.main>

      {/* Floating UI — di luar motion.main agar 'fixed' relatif ke viewport */}
      <ScrollIndicator text="Scroll untuk lanjut ke Kuis" />
    </>
  );
}