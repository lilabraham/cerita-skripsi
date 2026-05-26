// src/app/(routes)/tentang/page.tsx

import { MapPin, GraduationCap, BookOpen, Mail, AtSign, ExternalLink } from "lucide-react";
import { Metadata } from "next";
import Badge from "@/components/ui/Badge";

export const metadata: Metadata = {
  title: "Tentang Penelitian | CERITA",
  description:
    "Informasi lengkap tentang penelitian skripsi dan peneliti di balik platform CERITA.",
};

const researcher = {
  name:       "Nama Lengkapmu",
  nim:        "NIM: 000000000",
  prodi:      "Program Studi Kebidanan",
  kampus:     "Universitas / Institusi",
  kota:       "Kota, Provinsi",
  email:      "email@kampus.ac.id",
  instagram:  "@username",
  pembimbing: "Nama Dosen Pembimbing, S.Keb., M.Kes.",
  tahun:      "2025/2026",
};

const researchInfo = {
  judul:
    "Pengaruh Pendidikan Kesehatan dengan Media Website terhadap Tingkat Pengetahuan dan Sikap Remaja Mengenai HIV/AIDS",
  lokasi:    "SMA / SMK [Nama Sekolah], [Kota]",
  populasi:  "Remaja kelas X–XI usia 15–18 tahun",
  metode:    "Quasi Experiment — Pre-test & Post-test with Control Group",
  instrumen: "Kuesioner terstruktur + Media Website CERITA",
  variabel: {
    bebas:   "Pendidikan Kesehatan melalui Media Website",
    terikat: "Tingkat Pengetahuan & Sikap Remaja tentang HIV/AIDS",
  },
};

const timeline = [
  { phase: "Penyusunan Proposal",  period: "Sep – Okt 2025", done: true  },
  { phase: "Seminar Proposal",     period: "Nov 2025",        done: true  },
  { phase: "Pengembangan Website", period: "Des – Jan 2026",  done: true  },
  { phase: "Pengambilan Data",     period: "Feb – Mar 2026",  done: false },
  { phase: "Analisis Data",        period: "Apr 2026",        done: false },
  { phase: "Sidang Skripsi",       period: "Mei 2026",        done: false },
];

const features = [
  {
    label: "Materi Edukasi",
    desc:  "4 chapter terstruktur tentang HIV/AIDS",
    icon:  BookOpen,
    bg:    "bg-yellow-300",
  },
  {
    label: "Kuis Interaktif",
    desc:  "Pre & post test untuk mengukur pengetahuan",
    icon:  GraduationCap,
    bg:    "bg-pink-400",
  },
  {
    label: "Berbasis Riset",
    desc:  "Konten berdasarkan pedoman Kemenkes RI dan UNAIDS",
    icon:  ExternalLink,
    bg:    "bg-cyan-300",
  },
];

const detailRows = [
  { label: "Lokasi Penelitian", value: researchInfo.lokasi           },
  { label: "Populasi / Sampel", value: researchInfo.populasi         },
  { label: "Metode Penelitian", value: researchInfo.metode           },
  { label: "Instrumen",         value: researchInfo.instrumen        },
  { label: "Variabel Bebas",    value: researchInfo.variabel.bebas   },
  { label: "Variabel Terikat",  value: researchInfo.variabel.terikat },
];

export default function TentangPage() {
  return (
    <main className="min-h-screen bg-[var(--bg-base)] pt-24 pb-20 px-6 transition-colors duration-300">
      <div className="max-w-3xl mx-auto space-y-8">

        {/* ── HERO ─────────────────────────────────── */}
        <div className="text-center space-y-4">
          <Badge variant="primary" dot>Penelitian Skripsi 2026</Badge>
          <h1 className="text-3xl md:text-5xl font-black text-black dark:text-white leading-none uppercase tracking-tight">
            Tentang{" "}
            <span className="text-gradient-primary">CERITA</span>
          </h1>
          <p className="text-[var(--text-secondary)] max-w-xl mx-auto leading-relaxed font-medium">
            Platform edukasi kesehatan yang dikembangkan sebagai media intervensi
            penelitian skripsi program studi kebidanan.
          </p>
        </div>

        {/* ── JUDUL PENELITIAN ─────────────────────── */}
        <div className="rounded-2xl border-4 border-black dark:border-white bg-cyan-300 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] dark:shadow-[8px_8px_0px_0px_rgba(255,255,255,0.8)] p-6 space-y-3">
          <p className="text-xs font-black text-black uppercase tracking-widest">
            Judul Penelitian
          </p>
          <p className="text-black font-bold text-lg leading-relaxed">
            {researchInfo.judul}
          </p>
        </div>

        {/* ── PROFIL PENELITI ──────────────────────── */}
        <div className="rounded-2xl border-4 border-black dark:border-white bg-white dark:bg-gray-900 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] dark:shadow-[8px_8px_0px_0px_rgba(255,255,255,0.8)] p-6 space-y-5">
          <p className="text-xs font-black text-black dark:text-white uppercase tracking-widest">
            Profil Peneliti
          </p>

          <div className="flex flex-col sm:flex-row gap-5 items-start">
            {/* Avatar */}
            <div className="w-20 h-20 rounded-2xl border-4 border-black dark:border-white bg-yellow-300 flex items-center justify-center shrink-0 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,0.8)]">
              <GraduationCap size={32} className="text-black" />
            </div>

            {/* Info */}
            <div className="flex-1 space-y-1">
              <p className="text-black dark:text-white font-black text-xl uppercase tracking-tight">
                {researcher.name}
              </p>
              <p className="text-indigo-600 dark:text-indigo-400 text-sm font-bold">
                {researcher.nim}
              </p>
              <p className="text-gray-600 dark:text-gray-400 text-sm font-medium">
                {researcher.prodi}
              </p>
              <p className="text-gray-600 dark:text-gray-400 text-sm font-medium">
                {researcher.kampus}
              </p>
              <div className="flex items-center gap-1.5 text-gray-500 dark:text-gray-500 text-sm pt-1 font-medium">
                <MapPin size={13} />
                <span>{researcher.kota}</span>
              </div>
            </div>
          </div>

          {/* Dosen Pembimbing */}
          <div className="rounded-xl border-2 border-black dark:border-white bg-lime-300 px-4 py-3 flex items-start gap-3 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] dark:shadow-[3px_3px_0px_0px_rgba(255,255,255,0.7)]">
            <GraduationCap size={16} className="text-black mt-0.5 shrink-0" />
            <div>
              <p className="text-xs text-black/70 font-black mb-0.5 uppercase tracking-wide">
                Dosen Pembimbing
              </p>
              <p className="text-black text-sm font-bold">
                {researcher.pembimbing}
              </p>
            </div>
          </div>

          {/* Kontak */}
          <div id="kontak" className="flex flex-wrap gap-3">
            <a
              href={`mailto:${researcher.email}`}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border-2 border-black dark:border-white bg-white dark:bg-gray-900 text-black dark:text-white font-bold text-sm shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] dark:shadow-[3px_3px_0px_0px_rgba(255,255,255,0.7)] hover:bg-yellow-300 hover:text-black hover:border-black transition-all active:translate-x-[3px] active:translate-y-[3px] active:shadow-none"
            >
              <Mail size={14} />
              {researcher.email}
            </a>
            <a
              href={`https://instagram.com/${researcher.instagram.replace("@", "")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border-2 border-black dark:border-white bg-white dark:bg-gray-900 text-black dark:text-white font-bold text-sm shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] dark:shadow-[3px_3px_0px_0px_rgba(255,255,255,0.7)] hover:bg-pink-400 hover:text-black hover:border-black transition-all active:translate-x-[3px] active:translate-y-[3px] active:shadow-none"
            >
              <AtSign size={14} />
              {researcher.instagram}
            </a>
          </div>
        </div>

        {/* ── DETAIL PENELITIAN ────────────────────── */}
        <div className="rounded-2xl border-4 border-black dark:border-white bg-white dark:bg-gray-900 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] dark:shadow-[8px_8px_0px_0px_rgba(255,255,255,0.8)] p-6 space-y-4">
          <p className="text-xs font-black text-black dark:text-white uppercase tracking-widest">
            Detail Penelitian
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {detailRows.map((item) => (
              <div
                key={item.label}
                className="rounded-xl border-2 border-black dark:border-white bg-gray-50 dark:bg-gray-800 p-4 space-y-1 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] dark:shadow-[3px_3px_0px_0px_rgba(255,255,255,0.7)]"
              >
                <p className="text-xs text-black dark:text-white font-black uppercase tracking-wide">
                  {item.label}
                </p>
                <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed font-medium">
                  {item.value}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* ── TIMELINE ─────────────────────────────── */}
        <div className="rounded-2xl border-4 border-black dark:border-white bg-white dark:bg-gray-900 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] dark:shadow-[8px_8px_0px_0px_rgba(255,255,255,0.8)] p-6 space-y-5">
          <p className="text-xs font-black text-black dark:text-white uppercase tracking-widest">
            Timeline Penelitian
          </p>
          <div className="space-y-3">
            {timeline.map((item, i) => (
              <div key={i} className="flex items-center gap-4">
                <div
                  className={`w-4 h-4 rounded-full shrink-0 border-2 border-black dark:border-white ${
                    item.done ? "bg-lime-300" : "bg-white dark:bg-gray-900"
                  }`}
                />
                <div className="flex-1 flex items-center justify-between gap-3">
                  <p
                    className={`text-sm font-bold ${
                      item.done
                        ? "text-black dark:text-white"
                        : "text-gray-500 dark:text-gray-500"
                    }`}
                  >
                    {item.phase}
                  </p>
                  <Badge variant={item.done ? "success" : "muted"} size="sm">
                    {item.period}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── FITUR PLATFORM ───────────────────────── */}
        <div className="rounded-2xl border-4 border-black dark:border-white bg-white dark:bg-gray-900 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] dark:shadow-[8px_8px_0px_0px_rgba(255,255,255,0.8)] p-6 space-y-5">
          <p className="text-xs font-black text-black dark:text-white uppercase tracking-widest">
            Fitur Platform
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {features.map((f) => (
              <div
                key={f.label}
                className="rounded-xl border-2 border-black dark:border-white bg-gray-50 dark:bg-gray-800 p-4 space-y-2 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,0.7)]"
              >
                <div className={`p-2 rounded-lg border-2 border-black dark:border-white ${f.bg} w-fit`}>
                  <f.icon size={16} className="text-black" />
                </div>
                <p className="text-black dark:text-white text-sm font-black uppercase tracking-tight">
                  {f.label}
                </p>
                <p className="text-gray-600 dark:text-gray-400 text-xs leading-relaxed font-medium">
                  {f.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* ── DISCLAIMER ───────────────────────────── */}
        <div className="rounded-2xl border-4 border-black dark:border-white bg-yellow-300 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] dark:shadow-[8px_8px_0px_0px_rgba(255,255,255,0.8)] p-5 space-y-2">
          <p className="text-black text-sm font-black uppercase tracking-tight">
            ⚠ Catatan Penting
          </p>
          <p className="text-black/80 text-sm leading-relaxed font-medium">
            Website ini dikembangkan{" "}
            <strong className="text-black font-black">
              khusus sebagai media intervensi penelitian
            </strong>
            . Seluruh konten edukasi disusun berdasarkan pedoman resmi Kementerian
            Kesehatan RI dan UNAIDS. Untuk informasi medis lebih lanjut,
            konsultasikan dengan tenaga kesehatan profesional.
          </p>
        </div>

        {/* ── FOOTER NOTE ──────────────────────────── */}
        <p className="text-center text-xs font-bold text-gray-500 dark:text-gray-600 uppercase tracking-wide">
          {`© ${new Date().getFullYear()} CERITA Project · ${researcher.prodi} · ${researcher.kampus}`}
        </p>

      </div>
    </main>
          
  );
}