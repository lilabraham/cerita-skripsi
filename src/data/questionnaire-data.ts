// src/data/questionnaire-data.ts

import type { PengetahuanItem, SikapItem, StepMeta } from "@/types/questionnaire";

// ─── PENGETAHUAN (24 soal, B/S) ────────────────────────────────────────────

export const PENGETAHUAN_ITEMS: PengetahuanItem[] = [
  { id: "p1",  no: 1,  kunciJawaban: "B", pertanyaan: "AIDS merupakan kumpulan gejala yang muncul akibat menurunnya sistem kekebalan tubuh karena infeksi HIV." },
  { id: "p2",  no: 2,  kunciJawaban: "B", pertanyaan: "HIV dan AIDS adalah dua kondisi yang berbeda." },
  { id: "p3",  no: 3,  kunciJawaban: "B", pertanyaan: "HIV merupakan singkatan dari Human Immunodeficiency Virus." },
  { id: "p4",  no: 4,  kunciJawaban: "B", pertanyaan: "Seseorang yang terinfeksi HIV tidak selalu menunjukkan gejala pada tahap awal." },
  { id: "p5",  no: 5,  kunciJawaban: "S", pertanyaan: "Gejala HIV dapat muncul dalam rentang waktu beberapa tahun setelah terinfeksi." },
  { id: "p6",  no: 6,  kunciJawaban: "B", pertanyaan: "Gejala awal menuju AIDS dapat berupa demam berkepanjangan, penurunan berat badan, diare, dan infeksi lainnya." },
  { id: "p7",  no: 7,  kunciJawaban: "S", pertanyaan: "Seseorang yang tampak sehat pasti tidak terinfeksi HIV/AIDS." },
  { id: "p8",  no: 8,  kunciJawaban: "B", pertanyaan: "Pada tahap AIDS, penderita rentan terhadap berbagai infeksi karena sistem imun sangat lemah." },
  { id: "p9",  no: 9,  kunciJawaban: "B", pertanyaan: "HIV dapat ditularkan dari ibu ke anak selama kehamilan, persalinan, atau menyusui." },
  { id: "p10", no: 10, kunciJawaban: "S", pertanyaan: "HIV dapat menular melalui berciuman." },
  { id: "p11", no: 11, kunciJawaban: "B", pertanyaan: "Berganti-ganti pasangan seksual meningkatkan risiko tertular HIV/AIDS." },
  { id: "p12", no: 12, kunciJawaban: "B", pertanyaan: "HIV dapat ditularkan melalui transfusi darah yang terkontaminasi." },
  { id: "p13", no: 13, kunciJawaban: "B", pertanyaan: "Membatasi hubungan seksual dengan satu pasangan dapat mengurangi risiko penularan HIV/AIDS." },
  { id: "p14", no: 14, kunciJawaban: "S", pertanyaan: "Penggunaan kondom tidak dapat mengurangi risiko penularan HIV/AIDS." },
  { id: "p15", no: 15, kunciJawaban: "S", pertanyaan: "Kesetiaan kepada pasangan bukan termasuk cara pencegahan HIV/AIDS." },
  { id: "p16", no: 16, kunciJawaban: "B", pertanyaan: "Hingga saat ini belum ada obat yang dapat menyembuhkan HIV secara total." },
  { id: "p17", no: 17, kunciJawaban: "B", pertanyaan: "Terapi antiretroviral (ARV) berfungsi menghambat perkembangan virus HIV." },
  { id: "p18", no: 18, kunciJawaban: "S", pertanyaan: "HIV/AIDS dapat disembuhkan dengan antibiotik." },
  { id: "p19", no: 19, kunciJawaban: "S", pertanyaan: "Semua pengidap HIV tidak memerlukan terapi ARV." },
  { id: "p20", no: 20, kunciJawaban: "B", pertanyaan: "Terapi ARV secara rutin dapat memperpanjang harapan hidup penderita HIV." },
  { id: "p21", no: 21, kunciJawaban: "S", pertanyaan: "ARV dapat menyembuhkan HIV/AIDS." },
  { id: "p22", no: 22, kunciJawaban: "S", pertanyaan: "HIV dapat menular melalui penggunaan toilet yang sama." },
  { id: "p23", no: 23, kunciJawaban: "S", pertanyaan: "Bayi dari ibu HIV positif pasti tertular HIV." },
  { id: "p24", no: 24, kunciJawaban: "B", pertanyaan: "HIV tidak menular melalui aktivitas seperti berenang bersama." },
];

// ─── SIKAP (23 soal, SS/S/TS/STS) ─────────────────────────────────────────

export const SIKAP_ITEMS: SikapItem[] = [
  { id: "s1",  no: 1,  arahScoring: "unfavorable", pertanyaan: "Menurut saya, pencegahan HIV/AIDS hanya menjadi tanggung jawab petugas kesehatan." },
  { id: "s2",  no: 2,  arahScoring: "unfavorable", pertanyaan: "Menurut saya, melakukan hubungan seksual sekali dengan penderita HIV tidak berisiko tertular HIV/AIDS." },
  { id: "s3",  no: 3,  arahScoring: "unfavorable", pertanyaan: "Menurut saya, penggunaan narkoba suntik tidak dapat menularkan HIV/AIDS." },
  { id: "s4",  no: 4,  arahScoring: "unfavorable", pertanyaan: "Menurut saya, penggunaan narkoba suntik satu kali tidak menyebabkan penularan HIV/AIDS." },
  { id: "s5",  no: 5,  arahScoring: "favorable",   pertanyaan: "Menurut saya, penggunaan jarum yang steril saat tindik, tato, atau suntik dapat mencegah penularan HIV/AIDS." },
  { id: "s6",  no: 6,  arahScoring: "favorable",   pertanyaan: "Menurut saya, pencegahan HIV/AIDS merupakan hal yang sangat penting." },
  { id: "s7",  no: 7,  arahScoring: "favorable",   pertanyaan: "Menurut saya, kesetiaan kepada pasangan dalam pernikahan penting untuk mencegah HIV/AIDS." },
  { id: "s8",  no: 8,  arahScoring: "favorable",   pertanyaan: "Menurut saya, hubungan seksual sebaiknya hanya dilakukan dalam pernikahan yang sah sebagai upaya pencegahan HIV/AIDS." },
  { id: "s9",  no: 9,  arahScoring: "favorable",   pertanyaan: "Saya merasa senang jika dapat memberikan informasi tentang pencegahan HIV/AIDS kepada teman." },
  { id: "s10", no: 10, arahScoring: "favorable",   pertanyaan: "Saya merasa senang jika dapat berperan dalam mencegah penularan HIV/AIDS." },
  { id: "s11", no: 11, arahScoring: "favorable",   pertanyaan: "Saya merasa senang jika mendapatkan penyuluhan tentang HIV/AIDS." },
  { id: "s12", no: 12, arahScoring: "favorable",   pertanyaan: "Menurut saya, setiap orang dapat berperan dalam pencegahan HIV/AIDS." },
  { id: "s13", no: 13, arahScoring: "unfavorable", pertanyaan: "Saya tidak merasa takut terhadap penularan HIV/AIDS." },
  { id: "s14", no: 14, arahScoring: "unfavorable", pertanyaan: "Saya merasa takut tertular HIV/AIDS melalui berjabat tangan dengan penderita." },
  { id: "s15", no: 15, arahScoring: "unfavorable", pertanyaan: "Saya merasa pencegahan HIV/AIDS sulit untuk dilakukan." },
  { id: "s16", no: 16, arahScoring: "unfavorable", pertanyaan: "Saya merasa tidak memiliki tanggung jawab dalam pencegahan HIV/AIDS." },
  { id: "s17", no: 17, arahScoring: "favorable",   pertanyaan: "Saya bersedia merawat anggota keluarga yang menderita HIV/AIDS di rumah." },
  { id: "s18", no: 18, arahScoring: "favorable",   pertanyaan: "Menurut saya, seseorang dengan HIV/AIDS yang tidak menunjukkan gejala tetap dapat beraktivitas seperti mengajar." },
  { id: "s19", no: 19, arahScoring: "favorable",   pertanyaan: "Saya akan menjaga kerahasiaan jika ada anggota keluarga yang terinfeksi HIV/AIDS." },
  { id: "s20", no: 20, arahScoring: "unfavorable", pertanyaan: "Saya akan menjauhi orang dengan HIV/AIDS untuk menghindari penularan." },
  { id: "s21", no: 21, arahScoring: "unfavorable", pertanyaan: "Saya cenderung tidak tertarik untuk mengikuti diskusi tentang HIV/AIDS." },
  { id: "s22", no: 22, arahScoring: "unfavorable", pertanyaan: "Saya tidak akan peduli jika kerabat atau teman saya terkena HIV/AIDS." },
  { id: "s23", no: 23, arahScoring: "unfavorable", pertanyaan: "Saya tidak akan membeli sayuran segar dari petani atau penjual yang menderita penyakit HIV/AIDS." },
];

// ─── Step slices ───────────────────────────────────────────────────────────

export const SLICES = {
  pengetahuan1: PENGETAHUAN_ITEMS.slice(0, 12),  // step 2: no.1–12
  pengetahuan2: PENGETAHUAN_ITEMS.slice(12),      // step 3: no.13–24
  sikap1:       SIKAP_ITEMS.slice(0, 12),         // step 4: no.1–12
  sikap2:       SIKAP_ITEMS.slice(12),            // step 5: no.13–23
} as const;

// ─── Step metadata (7 steps, index 0–6) ───────────────────────────────────

export const STEP_META: StepMeta[] = [
  { label: "Mulai",          section: "intro"        }, // 0
  { label: "Data Diri",      section: "identitas"    }, // 1
  { label: "Pengetahuan I",  section: "pengetahuan"  }, // 2
  { label: "Pengetahuan II", section: "pengetahuan"  }, // 3
  { label: "Sikap I",        section: "sikap"        }, // 4
  { label: "Sikap II",       section: "sikap"        }, // 5
  { label: "Konfirmasi",     section: "konfirmasi"   }, // 6
];

export const TOTAL_STEPS = STEP_META.length - 1; // 6

// ─── SUMBER_INFO options ───────────────────────────────────────────────────

export const SUMBER_INFO_OPTIONS = [
  "Buku", "Koran", "Majalah", "Leaflet", "Televisi",
  "Internet", "Guru", "Tenaga Kesehatan", "Teman", "Orang Tua", "Lainnya",
] as const;