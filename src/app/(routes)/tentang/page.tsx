import { MapPin, GraduationCap, BookOpen, Mail, AtSign, ExternalLink } from "lucide-react";
import { Metadata } from "next";
import Badge from "@/components/ui/Badge";

export const metadata: Metadata = {
  title: "Tentang Penelitian | CERITA",
  description: "Informasi lengkap tentang penelitian skripsi dan peneliti di balik platform CERITA.",
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
  },
  {
    label: "Kuis Interaktif",
    desc:  "Pre & post test untuk mengukur pengetahuan",
    icon:  GraduationCap,
  },
  {
    label: "Berbasis Riset",
    desc:  "Konten berdasarkan pedoman Kemenkes RI dan UNAIDS",
    icon:  ExternalLink,
  },
];

const detailRows = [
  { label: "Lokasi Penelitian", value: researchInfo.lokasi            },
  { label: "Populasi / Sampel", value: researchInfo.populasi          },
  { label: "Metode Penelitian", value: researchInfo.metode            },
  { label: "Instrumen",         value: researchInfo.instrumen         },
  { label: "Variabel Bebas",    value: researchInfo.variabel.bebas    },
  { label: "Variabel Terikat",  value: researchInfo.variabel.terikat  },
];

export default function TentangPage() {
  return (
    <main className="min-h-screen bg-[var(--bg-base)] pt-24 pb-20 px-6">
      <div className="max-w-3xl mx-auto space-y-8">

        {/* ── HERO ─────────────────────────────────── */}
        <div className="text-center space-y-4">
          <Badge variant="primary" dot>Penelitian Skripsi 2026</Badge>
          <h1 className="text-3xl md:text-4xl font-bold text-white leading-snug">
            Tentang{" "}
            <span className="text-gradient-primary">CERITA</span>
          </h1>
          <p className="text-[var(--text-secondary)] max-w-xl mx-auto leading-relaxed">
            Platform edukasi kesehatan yang dikembangkan sebagai media intervensi
            penelitian skripsi program studi kebidanan.
          </p>
        </div>

        {/* ── JUDUL PENELITIAN ─────────────────────── */}
        <div className="rounded-2xl border border-indigo-500/20 bg-indigo-500/5 p-6 space-y-3">
          <p className="text-xs font-semibold text-indigo-400 uppercase tracking-widest">
            Judul Penelitian
          </p>
          <p className="text-white font-semibold text-lg leading-relaxed">
            {researchInfo.judul}
          </p>
        </div>

        {/* ── PROFIL PENELITI ──────────────────────── */}
        <div className="rounded-2xl border border-[var(--border-default)] bg-[var(--bg-surface)] p-6 space-y-5">
          <p className="text-xs font-semibold text-[var(--text-muted)] uppercase tracking-widest">
            Profil Peneliti
          </p>

          <div className="flex flex-col sm:flex-row gap-5 items-start">
            {/* Avatar */}
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-indigo-500/30 to-teal-500/20 border border-indigo-500/20 flex items-center justify-center shrink-0">
              <GraduationCap size={32} className="text-indigo-400" />
            </div>

            {/* Info */}
            <div className="flex-1 space-y-1">
              <p className="text-white font-bold text-xl">{researcher.name}</p>
              <p className="text-indigo-300 text-sm font-medium">{researcher.nim}</p>
              <p className="text-[var(--text-secondary)] text-sm">{researcher.prodi}</p>
              <p className="text-[var(--text-secondary)] text-sm">{researcher.kampus}</p>
              <div className="flex items-center gap-1.5 text-[var(--text-muted)] text-sm pt-1">
                <MapPin size={13} />
                <span>{researcher.kota}</span>
              </div>
            </div>
          </div>

          {/* Dosen pembimbing */}
          <div className="rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-elevated)] px-4 py-3 flex items-start gap-3">
            <GraduationCap size={16} className="text-teal-400 mt-0.5 shrink-0" />
            <div>
              <p className="text-xs text-[var(--text-muted)] mb-0.5">Dosen Pembimbing</p>
              <p className="text-white text-sm font-medium">{researcher.pembimbing}</p>
            </div>
          </div>

          {/* ✅ Kontak */}
          <div id="kontak" className="flex flex-wrap gap-3">
            <a
              href={`mailto:${researcher.email}`}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-[var(--border-default)] bg-[var(--bg-elevated)] text-[var(--text-secondary)] hover:text-white hover:border-indigo-400/40 text-sm transition-all duration-200"
            >
              <Mail size={14} />
              {researcher.email}
            </a>
            <a
              href={`https://instagram.com/${researcher.instagram.replace("@", "")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-[var(--border-default)] bg-[var(--bg-elevated)] text-[var(--text-secondary)] hover:text-white hover:border-indigo-400/40 text-sm transition-all duration-200"
            >
              <AtSign size={14} />
              {researcher.instagram}
            </a>
          </div>
        </div>

        {/* ── DETAIL PENELITIAN ────────────────────── */}
        <div className="rounded-2xl border border-[var(--border-default)] bg-[var(--bg-surface)] p-6 space-y-4">
          <p className="text-xs font-semibold text-[var(--text-muted)] uppercase tracking-widest">
            Detail Penelitian
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {detailRows.map((item) => (
              <div
                key={item.label}
                className="rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-elevated)] p-4 space-y-1"
              >
                <p className="text-xs text-[var(--text-muted)] font-medium">{item.label}</p>
                <p className="text-white text-sm leading-relaxed">{item.value}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ── TIMELINE ─────────────────────────────── */}
        <div className="rounded-2xl border border-[var(--border-default)] bg-[var(--bg-surface)] p-6 space-y-5">
          <p className="text-xs font-semibold text-[var(--text-muted)] uppercase tracking-widest">
            Timeline Penelitian
          </p>
          <div className="space-y-3">
            {timeline.map((item, i) => (
              <div key={i} className="flex items-center gap-4">
                <div className={`w-2.5 h-2.5 rounded-full shrink-0 ${
                  item.done
                    ? "bg-teal-400"
                    : "bg-[var(--bg-overlay)] border border-[var(--border-default)]"
                }`} />
                <div className="flex-1 flex items-center justify-between gap-3">
                  <p className={`text-sm font-medium ${
                    item.done ? "text-white" : "text-[var(--text-secondary)]"
                  }`}>
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
        <div className="rounded-2xl border border-[var(--border-default)] bg-[var(--bg-surface)] p-6 space-y-5">
          <p className="text-xs font-semibold text-[var(--text-muted)] uppercase tracking-widest">
            Fitur Platform
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {features.map((f) => (
              <div
                key={f.label}
                className="rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-elevated)] p-4 space-y-2"
              >
                <div className="p-2 rounded-lg bg-indigo-500/10 border border-indigo-500/20 w-fit">
                  <f.icon size={16} className="text-indigo-400" />
                </div>
                <p className="text-white text-sm font-semibold">{f.label}</p>
                <p className="text-[var(--text-muted)] text-xs leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ── DISCLAIMER ───────────────────────────── */}
        <div className="rounded-2xl border border-yellow-500/20 bg-yellow-500/5 p-5 space-y-2">
          <p className="text-yellow-300 text-sm font-semibold">Catatan Penting</p>
          <p className="text-[var(--text-secondary)] text-sm leading-relaxed">
            Website ini dikembangkan{" "}
            <strong className="text-white">
              khusus sebagai media intervensi penelitian
            </strong>
            . Seluruh konten edukasi disusun berdasarkan pedoman resmi Kementerian
            Kesehatan RI dan UNAIDS. Untuk informasi medis lebih lanjut,
            konsultasikan dengan tenaga kesehatan profesional.
          </p>
        </div>

        {/* ── FOOTER NOTE ──────────────────────────── */}
        <p className="text-center text-xs text-[var(--text-disabled)]">
          {`© ${new Date().getFullYear()} CERITA Project · ${researcher.prodi} · ${researcher.kampus}`}
        </p>

      </div>
    </main>
  );
}