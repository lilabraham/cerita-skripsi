// src/data/questionnaire-data.ts

import type { PengetahuanItem, SikapItem, StepMeta } from "@/types/questionnaire";

// ─── PENGETAHUAN (24 soal, B/S) ────────────────────────────────────────────

export const PENGETAHUAN_ITEMS: PengetahuanItem[] = [
  { id: "p1",  no: 1,  kunciJawaban: "B", pertanyaan: "AIDS adalah sekumpulan gejala yang ditimbulkan karena menurunnya kekebalan tubuh akibat terinfeksi HIV." },
  { id: "p2",  no: 2,  kunciJawaban: "B", pertanyaan: "HIV dan AIDS adalah penyakit yang berbeda." },
  { id: "p3",  no: 3,  kunciJawaban: "S", pertanyaan: "HIV adalah singkatan dari Human Immunisasi Virus." },
  { id: "p4",  no: 4,  kunciJawaban: "S", pertanyaan: "Seseorang yang terinfeksi HIV sama sekali tidak menunjukkan gejala apapun." },
  { id: "p5",  no: 5,  kunciJawaban: "B", pertanyaan: "Seseorang yang terkena HIV menunjukkan gejala dalam waktu 3-10 tahun." },
  { id: "p6",  no: 6,  kunciJawaban: "B", pertanyaan: "Gejala-gejala ringan yang menunjukkan seseorang sudah berpindah dari tahap terinfeksi HIV menuju AIDS seperti: demam, batuk lebih dari sebulan, menurunnya berat badan lebih dari 10%, diare, dan herpes." },
  { id: "p7",  no: 7,  kunciJawaban: "S", pertanyaan: "Seseorang yang terlihat sehat pasti tidak terkena virus HIV/AIDS." },
  { id: "p8",  no: 8,  kunciJawaban: "B", pertanyaan: "Pada tahap AIDS, penderita diserang berbagai penyakit yang muncul karena kekebalan tubuh sudah sangat lemah." },
  { id: "p9",  no: 9,  kunciJawaban: "B", pertanyaan: "HIV/AIDS dapat ditularkan dari ibu ke anaknya selama hamil, melahirkan, dan proses menyusui." },
  { id: "p10", no: 10, kunciJawaban: "S", pertanyaan: "HIV/AIDS dapat menular melalui berciuman dengan orang yang mengidap HIV/AIDS." },
  { id: "p11", no: 11, kunciJawaban: "B", pertanyaan: "Perempuan dan laki-laki yang berganti-ganti pasangan rentan tertular HIV/AIDS." },
  { id: "p12", no: 12, kunciJawaban: "B", pertanyaan: "HIV/AIDS bisa menular melalui transfusi darah." },
  { id: "p13", no: 13, kunciJawaban: "B", pertanyaan: "Seseorang bisa mengurangi kemungkinannya tertular virus HIV/AIDS dengan membatasi hubungan seks hanya dengan seorang yang tidak mempunyai pasangan lain." },
  { id: "p14", no: 14, kunciJawaban: "S", pertanyaan: "Seseorang yang memakai kondom setiap melakukan hubungan seks tidak bisa mengurangi kemungkinannya tertular virus HIV/AIDS." },
  { id: "p15", no: 15, kunciJawaban: "S", pertanyaan: "Setia terhadap pasangan yang dinikahinya bukan salah satu cara pencegahan HIV/AIDS." },
  { id: "p16", no: 16, kunciJawaban: "B", pertanyaan: "Sampai saat ini belum ditemukan obat yang dapat menghilangkan virus HIV dari tubuh manusia." },
  { id: "p17", no: 17, kunciJawaban: "B", pertanyaan: "Antiretroviral (ARV) hanya menghambat perkembangbiakan virus HIV." },
  { id: "p18", no: 18, kunciJawaban: "S", pertanyaan: "HIV/AIDS penyakit yang bisa disembuhkan dengan penyuntikan antibiotik secara rutin." },
  { id: "p19", no: 19, kunciJawaban: "S", pertanyaan: "Pengidap HIV TIDAK selalu memerlukan terapi ARV." },
  { id: "p20", no: 20, kunciJawaban: "B", pertanyaan: "Terapi ARV yang rutin akan memperpanjang kemampuan penderita bertahan hidup." },
  { id: "p21", no: 21, kunciJawaban: "S", pertanyaan: "Antiretrovirus (ARV) dapat menyembuhkan AIDS." },
  { id: "p22", no: 22, kunciJawaban: "S", pertanyaan: "Seseorang dapat tertular HIV/AIDS jika duduk ditoilet yang baru saja digunakan oleh orang yang terinfeksi HIV/AIDS." },
  { id: "p23", no: 23, kunciJawaban: "S", pertanyaan: "Bayi yang dilahirkan oleh seorang perempuan yang HIV positif pasti akan tertular HIV dari ibunya." },
  { id: "p24", no: 24, kunciJawaban: "B", pertanyaan: "HIV/AIDS tidak ditularkan melalui aktivitas berenang bersama dengan penderita HIV/AIDS." },
];

// ─── SIKAP (23 soal, SS/S/TS/STS) ─────────────────────────────────────────

export const SIKAP_ITEMS: SikapItem[] = [
  { id: "s1",  no: 1,  arahScoring: "unfavorable", pertanyaan: "Menurut saya, pencegahan HIV/AIDS hanya tanggung jawab petugas kesehatan." },
  { id: "s2",  no: 2,  arahScoring: "unfavorable", pertanyaan: "Melakukan hubungan seks sekali saja dengan penderita HIV tidak akan berisiko tertular HIV/AIDS." },
  { id: "s3",  no: 3,  arahScoring: "unfavorable", pertanyaan: "Menurut saya, narkoba suntik tidak dapat menularkan virus HIV/AIDS." },
  { id: "s4",  no: 4,  arahScoring: "unfavorable", pertanyaan: "Menurut saya, menggunakan narkoba suntik sekali saja tidak akan tertular HIV/AIDS." },
  { id: "s5",  no: 5,  arahScoring: "favorable",   pertanyaan: "Menurut saya, untuk mencegah penularan HIV/AIDS apabila saya akan melakukan tindik, tato, dan memakai jarum suntik, maka saya hanya memakai jarum yang baru dan steril." },
  { id: "s6",  no: 6,  arahScoring: "favorable",   pertanyaan: "Menurut saya, melakukan pencegahan HIV/AIDS sangat penting." },
  { id: "s7",  no: 7,  arahScoring: "favorable",   pertanyaan: "Menurut saya, setia kepada pasangan ketika sudah menikah sangat diperlukan untuk mencegah HIV/AIDS." },
  { id: "s8",  no: 8,  arahScoring: "favorable",   pertanyaan: "Menurut saya, untuk mencegah penularan HIV/AIDS, maka hubungan seksual hanya dilakukan melalui hubungan pernikahan yang sah." },
  { id: "s9",  no: 9,  arahScoring: "favorable",   pertanyaan: "Saya merasa senang jika bisa memberikan informasi tentang pencegahan HIV/AIDS kepada teman." },
  { id: "s10", no: 10, arahScoring: "favorable",   pertanyaan: "Saya merasa senang jika saya dapat mencegah penularan HIV/AIDS." },
  { id: "s11", no: 11, arahScoring: "favorable",   pertanyaan: "Saya merasa senang jika mendapat penyuluhan tentang pencegahan HIV/AIDS." },
  { id: "s12", no: 12, arahScoring: "favorable",   pertanyaan: "Menurut saya, pencegahan HIV/AIDS dapat dilakukan siapapun." },
  { id: "s13", no: 13, arahScoring: "unfavorable", pertanyaan: "Saya merasa tidak takut dengan penularan penyakit HIV/AIDS." },
  { id: "s14", no: 14, arahScoring: "unfavorable", pertanyaan: "Saya merasa takut tertular HIV/AIDS jika berjabat tangan dengan penderita HIV/AIDS." },
  { id: "s15", no: 15, arahScoring: "unfavorable", pertanyaan: "Saya merasa pencegahan HIV/AIDS merupakan hal yang sulit untuk saya lakukan." },
  { id: "s16", no: 16, arahScoring: "unfavorable", pertanyaan: "Saya merasa tidak bertanggung jawab terhadap pencegahan HIV/AIDS." },
  { id: "s17", no: 17, arahScoring: "favorable",   pertanyaan: "Jika salah satu anggota keluarga saya menderita AIDS, saya bersedia merawatnya di rumah saya." },
  { id: "s18", no: 18, arahScoring: "favorable",   pertanyaan: "Menurut saya, jika seorang guru wanita saya diketahui tertular virus HIV/AIDS tapi tidak kelihatan sakit, ia sebaiknya diperbolehkan tetap mengajar di sekolah." },
  { id: "s19", no: 19, arahScoring: "favorable",   pertanyaan: "Saya akan merahasiakan, jika salah satu anggota keluarga tertular virus HIV/AIDS." },
  { id: "s20", no: 20, arahScoring: "unfavorable", pertanyaan: "Saya akan menjauhi orang yang mengidap HIV/AIDS untuk mencegah penularan." },
  { id: "s21", no: 21, arahScoring: "unfavorable", pertanyaan: "Saya akan tertutup (cuek) terhadap diskusi permasalahan HIV/AIDS." },
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
