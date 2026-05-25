/*C:\Users\LENOVO\Documents\cerita-app\src\app\(routes)\edukasi\[id]\page.tsx*/

import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, CheckCircle, BookOpen } from "lucide-react";
import { materiData } from "@/data/content";
import { notFound } from "next/navigation";
import Badge from "@/components/ui/Badge";

// ─── Kamus gambar per modul (dari Code 1) ─────────────────────────────────────

const imageMapping: Record<string, string> = {
  pengenalan: "/images/virus-hiv.png",
  penularan: "/images/remaja-sehat.png",
  pencegahan: "/images/remaja-demam.png",
  pengobatan: "/images/botol-arv.png",
};

// ─── Component ────────────────────────────────────────────────────────────────

export default async function DetailEdukasi({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const materi = materiData[id];

  // Jika modul tidak ditemukan → 404
  if (!materi) notFound();

  // Gambar dinamis per modul, fallback ke virus-hiv (dari Code 1)
  const currentImage = imageMapping[id] || "/images/virus-hiv.png";

  // Split konten menjadi array paragraf (dari kedua code)
  const paragraphs = materi.content
    .trim()
    .split("\n\n")
    .filter((p) => p.trim().length > 0);

  return (
    <main className="min-h-screen bg-[var(--bg-base)] pt-24 pb-16 px-6">
      <div className="max-w-4xl mx-auto">

        {/* ── Tombol Kembali ── */}
        <Link
          href="/edukasi"
          className="inline-flex items-center gap-2 text-[var(--text-secondary)] hover:text-gray-900 dark:hover:text-white text-sm mb-8 transition-colors group"
        >
          <ArrowLeft
            size={16}
            className="group-hover:-translate-x-1 transition-transform"
          />
          Kembali ke Daftar Modul
        </Link>

        {/* ── Header: Badge + Split Layout (Judul kiri, Gambar kanan) ── */}
        <div className="mb-12 pb-8 border-b border-gray-200 dark:border-white/10">
          {/* Badge — dari Code 2 */}
          <div className="mb-4">
            <Badge variant="primary" icon={BookOpen} dot>
              Materi Edukasi
            </Badge>
          </div>

          {/* Grid split layout — dari Code 1 */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">

            {/* Sisi Kiri: Judul & Subtitle */}
            <div className="md:col-span-8 text-left space-y-2">
              <h1 className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white font-heading tracking-tight leading-tight">
                {materi.title}
              </h1>
              <p className="text-indigo-600 dark:text-indigo-400 font-medium text-lg md:text-xl">
                {materi.subtitle}
              </p>
            </div>

            {/* Sisi Kanan: Ilustrasi Vektor Dinamis — dari Code 1 */}
            <div className="md:col-span-4 flex justify-center md:justify-end relative">
              {/* Glow effect di belakang ilustrasi */}
              <div className="absolute w-40 h-40 rounded-full bg-indigo-500/10 blur-2xl pointer-events-none" />

              <div className="relative w-36 h-36 md:w-44 md:h-44 aspect-square">
                <Image
                  src={currentImage}
                  alt={materi.title}
                  fill
                  className="object-contain drop-shadow-[0_8px_20px_rgba(79,70,229,0.3)] animate-gradient"
                  priority
                />
              </div>
            </div>
          </div>
        </div>

        {/* ── Isi Materi — hover border effect dari Code 1, CSS vars dari Code 2 ── */}
        <div className="space-y-6 mb-16 max-w-3xl">
          {paragraphs.map((paragraph, index) => (
            <p
              key={index}
              className="text-[var(--text-secondary)] leading-relaxed text-base md:text-lg border-l-2 border-transparent hover:border-indigo-500/30 pl-0 hover:pl-3 transition-all duration-200"
            >
              {paragraph.trim()}
            </p>
          ))}
        </div>

        {/* ── CTA Card — shadow & glow dari Code 1, CSS vars dari Code 2 ── */}
        <div className="rounded-2xl border border-teal-200 dark:border-teal-500/20 bg-teal-50 dark:bg-teal-500/5 p-6 md:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 shadow-sm dark:shadow-xl dark:shadow-black/20">
          <div className="flex items-start gap-4">
            <CheckCircle
              size={28}
              className="text-teal-400 mt-0.5 shrink-0 drop-shadow-[0_0_8px_rgba(45,212,191,0.4)]"
            />
            <div>
              <p className="text-gray-900 dark:text-white font-semibold text-lg">Materi Selesai!</p>
              <p className="text-[var(--text-secondary)] text-sm md:text-base mt-0.5">
                Kamu telah menyelesaikan modul ini. Mari uji pengetahuanmu!
              </p>
            </div>
          </div>

          <Link
            href={`/kuis?modul=${id}`}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-teal-500 hover:bg-teal-400 text-white font-semibold text-sm transition-all duration-300 shadow-lg shadow-teal-500/25 active:scale-98 whitespace-nowrap"
          >
            Mulai Kuis Modul Ini
          </Link>
        </div>

        {/* ── Link Modul Berikutnya — underline style dari Code 1, CSS var dari Code 2 ── */}
        {materi.nextModule && (
          <div className="mt-8 text-center">
            <Link
              href={`/edukasi/${materi.nextModule}`}
              className="text-sm text-[var(--text-muted)] hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors underline underline-offset-4"
            >
              Lewati kuis → Lanjut ke modul berikutnya
            </Link>
          </div>
        )}

      </div>
    </main>
  );
}