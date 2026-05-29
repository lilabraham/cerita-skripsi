/*C:\Users\LENOVO\Documents\cerita-app\src\app\(routes)\edukasi\[id]\page.tsx*/

import { materiData } from "@/data/content";
import { notFound } from "next/navigation";
import DetailEdukasiClient from "./client";

// ─── Kamus gambar per modul ─────────────────────────────────────────────────

const imageMapping: Record<string, string> = {
  pengenalan: "/images/virus-hiv.png",
  penularan: "/images/remaja-sehat.png",
  pencegahan: "/images/remaja-demam.png",
  pengobatan: "/images/botol-arv.png",
};

// ─── Server Component (Data Fetching) ──────────────────────────────────────

export default async function DetailEdukasi({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const materi = materiData[id];

  // Jika modul tidak ditemukan → 404
  if (!materi) notFound();

  // Gambar dinamis per modul, fallback ke virus-hiv
  const currentImage = imageMapping[id] || "/images/virus-hiv.png";

  // Split konten menjadi array paragraf
  const paragraphs = materi.content
    .trim()
    .split("\n\n")
    .filter((p) => p.trim().length > 0);

  return (
    <DetailEdukasiClient
      materi={materi}
      id={id}
      paragraphs={paragraphs}
      currentImage={currentImage}
    />
  );
}