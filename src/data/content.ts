// src/data/content.ts

// ✅ Fix: definisikan tipe eksplisit, hindari Record tanpa argument
interface MateriItem {
  title: string;
  subtitle: string;
  content: string;
  nextModule: string | null;
}

export const materiData: Record<string, MateriItem> = {
  pengenalan: {
    title: "Apa itu HIV/AIDS?",
    subtitle: "Mengenal Musuh Tak Kasat Mata",
    content: `HIV (Human Immunodeficiency Virus) adalah virus yang merusak sistem kekebalan tubuh dengan menginfeksi dan menghancurkan sel CD4.

Semakin banyak sel CD4 yang dihancurkan, kekebalan tubuh akan semakin lemah, sehingga rentan diserang berbagai penyakit.

Sedangkan AIDS (Acquired Immune Deficiency Syndrome) adalah stadium akhir dari infeksi HIV. Pada tahap ini, kemampuan tubuh untuk melawan infeksi sudah hilang sepenuhnya.

Penting untuk diingat: Orang yang terinfeksi HIV belum tentu terkena AIDS jika ditangani dan diobati sejak dini.`,
    nextModule: "penularan",
  },
  penularan: {
    title: "Mitos vs Fakta Penularan",
    subtitle: "Jangan Salah Sangka!",
    content: `Banyak orang mengira HIV menular melalui jabat tangan atau gigitan nyamuk. Itu adalah mitos besar!

HIV TIDAK menular melalui:
- Keringat atau air mata.
- Gigitan nyamuk atau serangga.
- Berbagi alat makan atau kolam renang.
- Berpelukan atau berjabat tangan.

HIV HANYA menular melalui:
- Hubungan seksual tanpa pengaman dengan orang yang terinfeksi.
- Berbagi jarum suntik yang tidak steril.
- Dari ibu positif HIV ke bayi saat hamil, bersalin, atau menyusui.
- Transfusi darah yang tercemar (sangat jarang terjadi saat ini).`,
    nextModule: "pencegahan",
  },
  pencegahan: {
    title: "Benteng Pertahanan (Pencegahan)",
    subtitle: "Lindungi Diri, Lindungi Sesama",
    content: `Mencegah HIV jauh lebih mudah daripada mengobatinya. Ada beberapa langkah efektif yang bisa kamu lakukan.

Abstinence (Tidak melakukan hubungan seksual sebelum menikah) adalah cara paling aman secara absolut.

Gunakan kondom secara konsisten dan benar jika aktif secara seksual.

Jangan berbagi jarum suntik dalam kondisi apapun, termasuk untuk tato atau tindik.

Lakukan tes HIV secara rutin jika kamu merasa berisiko. Mengetahui status lebih awal menyelamatkan hidup.

Program PMTCT (Prevention of Mother-to-Child Transmission) tersedia di puskesmas untuk ibu hamil.`,
    nextModule: "pengobatan",
  },
  pengobatan: {
    title: "Harapan & Pengobatan",
    subtitle: "HIV Bukan Akhir Segalanya",
    content: `Kabar baiknya: HIV bukan lagi vonis mati. Dengan pengobatan modern, ODHIV (Orang Dengan HIV) bisa hidup panjang dan sehat.

ARV (Antiretroviral) adalah obat yang menekan jumlah virus HIV dalam darah hingga tidak terdeteksi.

Dengan ARV yang dikonsumsi rutin, viral load bisa menjadi Undetectable = Untransmittable (U=U), artinya virus tidak bisa ditularkan ke orang lain.

ARV tersedia GRATIS di Indonesia melalui program pemerintah di puskesmas dan rumah sakit rujukan.

Stigma adalah musuh terbesar ODHIV. Dukungan sosial dan mental sama pentingnya dengan pengobatan medis.`,
    nextModule: null,
  },
};