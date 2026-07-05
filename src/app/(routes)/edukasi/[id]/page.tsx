/*C:\Users\LENOVO\Documents\cerita-app\src\app\(routes)\edukasi\[id]\page.tsx*/

import { materiData } from "@/data/content";
import { notFound } from "next/navigation";
import DetailEdukasiClient from "./client";

// ─── Kamus gambar per modul ─────────────────────────────────────────────────

const imageMapping: Record<string, string> = {
  pengenalan: "/images/icons/Apa-itu-HIV-AIDS.png",
  cara_kerja: "/images/icons/Apa-itu-HIV-AIDS.png",
  gejala: "/images/icons/Gejala.png",
  penularan: "/images/icons/Penularan.png",
  pencegahan: "/images/icons/Mencegah.png",
  pengobatan: "/images/icons/Pengobatan.png",
  stigma: "/images/icons/Mitos.png",
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
  const currentImage = imageMapping[id] || "/images/icons/Apa-itu-HIV-AIDS.png";
  
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