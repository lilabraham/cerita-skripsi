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
    title: "Apa Itu HIV dan AIDS?",
    subtitle: "Mengenal Virus yang Menyerang Sistem Kekebalan Tubuh",
    content: `HIV
Human Immunodeficiency Virus (HIV) adalah virus yang menyerang sistem kekebalan tubuh, terutama sel CD4 yang berperan melindungi tubuh dari berbagai penyakit. Ketika jumlah sel CD4 terus berkurang, tubuh akan semakin sulit melawan infeksi.

Seseorang yang terinfeksi HIV tidak selalu terlihat sakit. Banyak orang dapat hidup bertahun-tahun tanpa gejala, sehingga pemeriksaan kesehatan menjadi sangat penting.

AIDS
Acquired Immune Deficiency Syndrome (AIDS) adalah tahap lanjut dari infeksi HIV. Pada kondisi ini, sistem kekebalan tubuh sudah sangat lemah sehingga tubuh mudah terserang berbagai infeksi dan penyakit serius.`,
    nextModule: "cara_kerja",
  },
  cara_kerja: {
    title: "Bagaimana HIV Menyerang Tubuh?",
    subtitle: "Memahami Proses Infeksi Secara Bertahap",
    content: `Setelah masuk ke dalam tubuh, HIV akan mencari dan menyerang sel CD4, yaitu sel darah putih yang berfungsi menjaga sistem kekebalan tubuh.

Prosesnya terjadi secara bertahap:
[PLACEHOLDER_GAMBAR_ALUR]

Semakin sedikit jumlah sel CD4, semakin sulit tubuh melawan infeksi dan penyakit.`,
    nextModule: "gejala",
  },
  gejala: {
    title: "Gejala HIV Per Fase",
    subtitle: "Kenali Tanda-Tanda dari Setiap Tahapan",
    content: `Fase Akut
Fase ini biasanya terjadi dalam beberapa minggu setelah seseorang terinfeksi HIV. Gejala yang dapat muncul antara lain:
- Demam
- Sakit tenggorokan
- Sakit kepala
- Kelelahan
- Nyeri otot dan sendi
- Ruam kulit

Gejala tersebut sering menyerupai flu sehingga banyak orang tidak menyadari bahwa dirinya telah terinfeksi HIV.

Fase Laten
Pada fase ini penderita biasanya tidak merasakan gejala apa pun. Meskipun terlihat sehat, virus tetap berada di dalam tubuh dan masih dapat ditularkan kepada orang lain. Fase ini dapat berlangsung selama bertahun-tahun.

Fase AIDS
Jika HIV tidak diobati, sistem kekebalan tubuh akan semakin melemah dan muncul berbagai gejala berat seperti:
- Berat badan turun drastis
- Demam berkepanjangan
- Diare kronis
- Batuk yang tidak kunjung sembuh
- Infeksi berulang
- Tuberkulosis (TBC)
- Infeksi jamur dan penyakit lainnya`,
    nextModule: "penularan",
  },
  penularan: {
    title: "Cara Penularan HIV",
    subtitle: "Fakta yang Perlu Kamu Ketahui",
    content: `HIV dapat menular melalui cairan tubuh tertentu yang mengandung virus dalam jumlah cukup untuk menyebabkan infeksi.

HIV dapat menular melalui:
Hubungan seksual berisiko tanpa pengaman.
Penggunaan jarum suntik secara bergantian.
Transfusi darah yang terkontaminasi HIV.
Penularan dari ibu ke bayi saat kehamilan, persalinan, atau menyusui.

Penting untuk diketahui bahwa HIV tidak menular dengan mudah seperti flu atau batuk.

HIV Tidak Menular Melalui
Banyak orang masih memiliki pemahaman yang salah mengenai HIV. Padahal, HIV tidak dapat menular melalui aktivitas sehari-hari.

HIV tidak menular melalui:
Bersalaman
Berpelukan
Makan bersama
Belajar bersama
Berenang bersama
Tinggal serumah
Gigitan nyamuk

Karena itu, ODHA tidak perlu dijauhi atau didiskriminasi.`,
    nextModule: "pencegahan",
  },
  pencegahan: {
  title: "Cara Mencegah HIV",
  subtitle: "Prinsip ABCDE untuk Perlindungan Diri",
  content: `Pencegahan HIV dapat dilakukan dengan menerapkan prinsip ABCDE.

A - Abstinence
Menghindari hubungan seksual yang berisiko merupakan cara paling efektif untuk mencegah penularan HIV.

B - Be Faithful
Setia pada satu pasangan dan menghindari berganti-ganti pasangan dapat mengurangi risiko penularan.

C - Condom
Penggunaan kondom yang benar dan konsisten dapat membantu mengurangi risiko penularan HIV melalui hubungan seksual.

D - No Drugs
Hindari penggunaan narkoba suntik dan jangan pernah menggunakan jarum suntik secara bergantian.

E - Education
Mencari informasi yang benar mengenai HIV membantu seseorang mengambil keputusan yang sehat dan aman.`,
  nextModule: "pengobatan",
},

pengobatan: {
  title: "Pengobatan HIV",
  subtitle: "Mengendalikan HIV dengan Terapi ARV",
  content: `Saat ini HIV belum dapat disembuhkan sepenuhnya. Namun, HIV dapat dikendalikan melalui terapi Antiretroviral (ARV).

ARV bekerja dengan cara menekan jumlah virus dalam tubuh sehingga sistem kekebalan tubuh tetap terjaga.

Manfaat terapi ARV:
- Menekan perkembangan virus
- Menjaga daya tahan tubuh
- Mengurangi risiko infeksi
- Membantu ODHA hidup sehat dan produktif

Semakin cepat HIV terdeteksi dan diobati, semakin baik kualitas hidup penderitanya.`,
  nextModule: "stigma",
},
stigma: {
  title: "Stop Stigma terhadap ODHA",
  subtitle: "Kenali Penyakitnya, Bukan Menghakimi Orangnya",
  content: `ODHA adalah Orang Dengan HIV/AIDS. Mereka adalah individu yang tetap memiliki hak yang sama untuk belajar, bekerja, bergaul, dan hidup di masyarakat.

Stigma dan diskriminasi dapat membuat ODHA enggan memeriksakan diri atau mencari pengobatan sehingga justru memperburuk kondisi kesehatan.

Yang dapat kita lakukan:
- Menghargai dan menghormati ODHA.
- Tidak mengucilkan atau membully.
- Memberikan dukungan sosial.
- Menyebarkan informasi yang benar tentang HIV.

Kenali penyakitnya, bukan menghakimi orangnya.`,
  nextModule: null,
},
};