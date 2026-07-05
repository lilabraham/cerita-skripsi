"use client";

import {
  MapPin,
  GraduationCap,
  BookOpen,
  Mail,
  FlaskConical,
  Users,
  School,
  ExternalLink,
  CheckCircle2,
} from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import Badge from "@/components/ui/Badge";

// ─── Animation Variants ───────────────────────────────────────────────────────

const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};
function FloatingShape({ className, style }: { className: string; style?: React.CSSProperties }) {
  return (
    <motion.div
      aria-hidden="true"
      className={cn("absolute pointer-events-none select-none hidden sm:block", className)}
      style={style}
      animate={{ y: [0, -14, 0], rotate: [0, 8, -8, 0], opacity: [0.4, 0.7, 0.4] }}
      transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
    />
  );
}

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const slideUp = {
  hidden: { opacity: 0, y: 32 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: EASE },
  },
};

const slideLeft = {
  hidden: { opacity: 0, x: -24 },
  show: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.45, ease: EASE },
  },
};

// ─── Static Data ──────────────────────────────────────────────────────────────

const researcher = {
  name: "Putik Aulia Rachma",
  nim: "P1337424425146",
  prodi: "Kebidanan Semarang – Sarjana Terapan",
  kampus: "Poltekkes Kemenkes Semarang",
  tahun: "2026",
  email: "humas@poltekkes-smg.ac.id",
  initials: "PA",
};

const supervisors = [
  {
    label: "Pembimbing I",
    name: "Ida Ariyanti, S.SiT, Bdn., M.Kes",
    nip: "NIP. 19700514 199803 2 001",
    color: "bg-cyan-300",
  },
  {
    label: "Pembimbing II",
    name: "Dinar Indri Bakti Salsabila, S.Tr.Keb., M.Tr.Keb",
    nip: "NIP. 19970306 202506 2 010",
    color: "bg-pink-300",
  },
];

const researchDetails = [
  {
    icon: School,
    label: "Lokasi Penelitian",
    value: "SMA Mardisiswa Semarang",
    bg: "bg-lime-300",
  },
  {
    icon: FlaskConical,
    label: "Metode Penelitian",
    value: "Quasi Eksperimen · Non-equivalent Control Group Design",
    bg: "bg-yellow-300",
  },
  {
    icon: Users,
    label: "Populasi / Sampel",
    value: "Remaja kelas XI aktif usia 17–20 tahun",
    bg: "bg-orange-300",
  },
];

const researchTitle =
  "Pengaruh Pendidikan Kesehatan dengan Media Website terhadap Tingkat Pengetahuan dan Sikap Remaja Mengenai HIV/AIDS";

const timeline = [
  { phase: "Penyusunan Proposal", period: "Jan – Mei 2026", done: true },
  { phase: "Seminar Proposal", period: "Jun 2026", done: true },
  { phase: "Pengembangan Website", period: "Jul 2026", done: true },
  { phase: "Pengambilan Data", period: "Agu 2026", done: false },
  { phase: "Analisis Data", period: "Agu – Sep 2026", done: false },
  { phase: "Sidang Skripsi", period: "Sep 2026", done: false },
];

// ─── Component ────────────────────────────────────────────────────────────────

export default function TentangPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[var(--bg-base)] pt-24 pb-20 px-4 sm:px-6 transition-colors duration-300">
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none opacity-60 dark:opacity-30"
        style={{
          backgroundImage: `radial-gradient(circle, rgba(0,0,0,0.08) 1.2px, transparent 1.2px)`,
          backgroundSize: "24px 24px",
        }}
      />
      <FloatingShape className="w-16 h-16 rounded-full border-4 border-black bg-cyan-300/40" style={{ top: "8%", left: "4%" }} />
      <FloatingShape className="w-10 h-10 rounded-lg border-4 border-black bg-yellow-300/50 rotate-12" style={{ top: "18%", right: "6%" }} />
      <FloatingShape className="w-20 h-20 rounded-full border-4 border-black bg-pink-300/30" style={{ bottom: "12%", left: "3%" }} />
      <FloatingShape className="w-12 h-12 rounded-lg border-4 border-black bg-lime-300/40 -rotate-6" style={{ bottom: "20%", right: "5%" }} />

      <motion.div
        className="relative z-10 max-w-4xl mx-auto space-y-6"
        variants={containerVariants}
        initial="hidden"
        animate="show"
      >

        {/* ── HEADER ────────────────────────────────── */}
        <motion.div variants={slideUp} className="text-center space-y-3">
          <Badge variant="primary" dot>Penelitian Skripsi 2026</Badge>
          <h1 className="text-4xl md:text-6xl font-black text-black dark:text-white leading-none uppercase tracking-tighter">
            Tentang{" "}
            <span className="text-gradient-primary">CERITA</span>
          </h1>
          <p className="text-[var(--text-secondary)] max-w-lg mx-auto text-sm md:text-base leading-relaxed font-medium">
            Platform edukasi kesehatan sebagai media intervensi penelitian
            skripsi program studi kebidanan.
          </p>
        </motion.div>

        {/* ── JUDUL PENELITIAN (Hero Card) ──────────── */}
        <motion.div
          variants={slideUp}
          className="rounded-2xl border-4 border-black dark:border-white bg-cyan-300 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] dark:shadow-[8px_8px_0px_0px_rgba(255,255,255,0.8)] p-5 sm:p-6 space-y-2"
        >
          <p className="text-xs font-black text-black uppercase tracking-widest flex items-center gap-1.5">
            <BookOpen size={12} />
            Judul Penelitian
          </p>
          <p className="text-black font-bold text-base md:text-lg leading-relaxed">
            {researchTitle}
          </p>
        </motion.div>

        {/* ── PROFIL PENELITI (Bright Yellow Card) ─── */}
        <motion.div
          variants={slideUp}
          className="rounded-2xl border-4 border-black dark:border-white bg-yellow-300 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] dark:shadow-[8px_8px_0px_0px_rgba(255,255,255,0.8)] p-5 sm:p-6"
        >
          <p className="text-xs font-black text-black uppercase tracking-widest mb-5">
            Profil Peneliti
          </p>

          <div className="flex flex-col sm:flex-row gap-5 items-start">
            {/* Initials Avatar */}
            <div className="w-20 h-20 rounded-2xl border-4 border-black bg-white flex items-center justify-center shrink-0 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
              <span className="text-2xl font-black text-black select-none">
                {researcher.initials}
              </span>
            </div>

            {/* Info */}
            <div className="flex-1 space-y-1">
              <p className="text-black font-black text-2xl md:text-3xl uppercase tracking-tight leading-none">
                {researcher.name}
              </p>
              <p className="text-black/70 text-sm font-bold tracking-wide">
                {researcher.nim}
              </p>
              <p className="text-black text-sm font-bold">
                {researcher.prodi}
              </p>
              <div className="flex items-center gap-1.5 text-black/70 text-sm font-medium pt-0.5">
                <MapPin size={13} />
                <span>{researcher.kampus} · {researcher.tahun}</span>
              </div>
            </div>
          </div>

          {/* Kontak */}
          <div className="mt-5 flex flex-wrap gap-3">
            <a
              href={`mailto:${researcher.email}`}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border-2 border-black bg-black text-yellow-300 font-bold text-sm shadow-[3px_3px_0px_0px_rgba(0,0,0,0.3)] hover:bg-white hover:text-black transition-all active:translate-x-[3px] active:translate-y-[3px] active:shadow-none"
            >
              <Mail size={13} />
              {researcher.email}
            </a>
          </div>
        </motion.div>

        {/* ── GRID: Pembimbing + Detail Penelitian ──── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {/* Dosen Pembimbing */}
          <motion.div
            variants={slideLeft}
            whileHover={{ y: -4, boxShadow: "10px 10px 0px 0px rgba(0,0,0,1)" }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="rounded-2xl border-4 border-black dark:border-white bg-white dark:bg-gray-900 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] dark:shadow-[8px_8px_0px_0px_rgba(255,255,255,0.8)] p-5 sm:p-6 space-y-4"
          >
            <p className="text-xs font-black text-black dark:text-white uppercase tracking-widest flex items-center gap-1.5">
              <GraduationCap size={12} />
              Dosen Pembimbing
            </p>

            <div className="space-y-3">
              {supervisors.map((s) => (
                <div
                  key={s.label}
                  className={`rounded-xl border-2 border-black dark:border-white ${s.color} px-4 py-3 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,0.7)]`}
                >
                  <p className="text-[10px] font-black text-black uppercase tracking-widest mb-0.5">
                    {s.label}
                  </p>
                  <p className="text-black font-black text-sm leading-snug">
                    {s.name}
                  </p>
                  <p className="text-black/60 text-xs font-medium mt-0.5">
                    {s.nip}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Detail Penelitian */}
          <motion.div
            variants={slideUp}
            whileHover={{ y: -4, boxShadow: "10px 10px 0px 0px rgba(0,0,0,1)" }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="rounded-2xl border-4 border-black dark:border-white bg-white dark:bg-gray-900 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] dark:shadow-[8px_8px_0px_0px_rgba(255,255,255,0.8)] p-5 sm:p-6 space-y-4"
          >
            <p className="text-xs font-black text-black dark:text-white uppercase tracking-widest flex items-center gap-1.5">
              <FlaskConical size={12} />
              Detail Penelitian
            </p>

            <div className="space-y-3">
              {researchDetails.map((d) => (
                <div
                  key={d.label}
                  className={`rounded-xl border-2 border-black dark:border-white ${d.bg} px-4 py-3 flex items-start gap-3 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,0.7)]`}
                >
                  <d.icon size={16} className="text-black mt-0.5 shrink-0" />
                  <div>
                    <p className="text-[10px] font-black text-black uppercase tracking-widest mb-0.5">
                      {d.label}
                    </p>
                    <p className="text-black font-bold text-sm leading-snug">
                      {d.value}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* ── TIMELINE ──────────────────────────────── */}
        <motion.div
          variants={slideUp}
          className="rounded-2xl border-4 border-black dark:border-white bg-white dark:bg-gray-900 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] dark:shadow-[8px_8px_0px_0px_rgba(255,255,255,0.8)] p-5 sm:p-6 space-y-5"
        >
          <p className="text-xs font-black text-black dark:text-white uppercase tracking-widest">
            Timeline Penelitian
          </p>

          <div className="relative pl-5 space-y-0">
            {/* Vertical line */}
            <div className="absolute left-[7px] top-2 bottom-2 w-0.5 bg-black/20 dark:bg-white/20" />

            {timeline.map((item, i) => (
              <motion.div
                key={i}
                variants={slideLeft}
                className="relative flex items-center gap-4 py-2.5"
              >
                {/* Dot */}
                <div
                  className={`absolute -left-5 w-4 h-4 rounded-full border-2 border-black dark:border-white flex items-center justify-center shrink-0 ${item.done ? "bg-lime-300" : "bg-white dark:bg-gray-900"
                    }`}
                >
                  {item.done && <CheckCircle2 size={9} className="text-black" />}
                </div>

                <div className="flex-1 flex items-center justify-between gap-3 min-w-0">
                  <p
                    className={`text-sm font-bold truncate ${item.done
                      ? "text-black dark:text-white"
                      : "text-gray-400 dark:text-gray-600"
                      }`}
                  >
                    {item.phase}
                  </p>
                  <Badge variant={item.done ? "success" : "muted"} size="sm">
                    {item.period}
                  </Badge>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* ── DISCLAIMER ────────────────────────────── */}
        <motion.div
          variants={slideUp}
          className="rounded-2xl border-4 border-black dark:border-white bg-orange-300 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] dark:shadow-[8px_8px_0px_0px_rgba(255,255,255,0.8)] p-5 space-y-2"
        >
          <p className="text-black text-sm font-black uppercase tracking-tight flex items-center gap-1.5">
            <ExternalLink size={14} />
            Catatan Penting
          </p>
          <p className="text-black/80 text-sm leading-relaxed font-medium">
            Website ini dikembangkan{" "}
            <strong className="text-black font-black">
              khusus sebagai media intervensi penelitian
            </strong>
            . Seluruh konten edukasi disusun berdasarkan pedoman resmi
            Kementerian Kesehatan RI dan UNAIDS. Untuk informasi medis lebih
            lanjut, konsultasikan dengan tenaga kesehatan profesional.
          </p>
        </motion.div>

        {/* ── FOOTER NOTE ───────────────────────────── */}
        <motion.p
          variants={slideUp}
          className="text-center text-xs font-bold text-gray-500 dark:text-gray-600 uppercase tracking-wide"
        >
          {`© ${new Date().getFullYear()} CERITA Project · ${researcher.prodi} · ${researcher.kampus}`}
        </motion.p>

      </motion.div>
    </main>
  );
}