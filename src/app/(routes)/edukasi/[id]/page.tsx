import Link from "next/link";
import { ArrowLeft, CheckCircle } from "lucide-react";
import { BookOpen } from "lucide-react";
import { materiData } from "@/data/content";
import { notFound } from "next/navigation";
import Badge from "@/components/ui/Badge";

export default async function DetailEdukasi({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const materi = materiData[id];

  if (!materi) notFound();

  const paragraphs = materi.content
    .trim()
    .split("\n\n")
    .filter((p) => p.trim().length > 0);

  return (
    <main className="min-h-screen bg-[var(--bg-base)] pt-24 pb-16 px-6">
      <div className="max-w-3xl mx-auto">

        {/* Tombol Kembali */}
        <Link
          href="/edukasi"
          className="inline-flex items-center gap-2 text-[var(--text-secondary)] hover:text-white text-sm mb-8 transition-colors group"
        >
          <ArrowLeft
            size={16}
            className="group-hover:-translate-x-1 transition-transform"
          />
          Kembali ke Daftar Modul
        </Link>

        {/* Header — ✅ Badge dipakai di sini */}
        <div className="mb-10 space-y-3">
          <Badge variant="primary" icon={BookOpen} dot>
            Materi Edukasi
          </Badge>
          <h1 className="text-3xl md:text-4xl font-bold text-white">
            {materi.title}
          </h1>
          <p className="text-[var(--text-secondary)] font-medium">
            {materi.subtitle}
          </p>
        </div>

        {/* Isi Materi */}
        <div className="space-y-5 mb-12">
          {paragraphs.map((paragraph, index) => (
            <p
              key={index}
              className="text-[var(--text-secondary)] leading-relaxed text-base"
            >
              {paragraph.trim()}
            </p>
          ))}
        </div>

        {/* CTA */}
        <div className="rounded-2xl border border-teal-500/20 bg-teal-500/5 p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <CheckCircle size={22} className="text-teal-400 mt-0.5 shrink-0" />
            <div>
              <p className="text-white font-semibold">Materi Selesai!</p>
              <p className="text-[var(--text-secondary)] text-sm">
                Kamu telah menyelesaikan modul ini. Mari uji pengetahuanmu!
              </p>
            </div>
          </div>
          <Link
            href={`/kuis?modul=${id}`}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-teal-500 hover:bg-teal-400 text-white font-semibold text-sm transition-colors whitespace-nowrap"
          >
            Mulai Kuis Modul Ini
          </Link>
        </div>

        {/* Link modul berikutnya */}
        {materi.nextModule && (
          <div className="mt-6 text-center">
            <Link
              href={`/edukasi/${materi.nextModule}`}
              className="text-sm text-[var(--text-muted)] hover:text-indigo-400 transition-colors"
            >
              Lewati kuis → Lanjut ke modul berikutnya
            </Link>
          </div>
        )}

      </div>
    </main>
  );
}