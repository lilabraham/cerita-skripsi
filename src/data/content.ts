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
Pada fase ini penderita biasanya tidak merasakan gejala apa pun. Meskipun terlihat sehat, virus tetap berada di dalam tubuh dan masih dapat ditularkan kepada orang lain. Fase ini dapat berlangsung selama 3-10 tahun.

Fase AIDS
Jika HIV tidak diobati, sistem kekebalan tubuh akan semakin melemah dan muncul berbagai gejala berat seperti:
- Demam
- Batuk lebih dari sebulan
- Menurunnya berat badan lebih dari 10%
- Diare
- Herpes`,
    nextModule: "penularan",
  },
  penularan: {
    title: "Cara Penularan HIV",
    subtitle: "Fakta yang Perlu Kamu Ketahui",
    content: `Penularan HIV/AIDS dapat terjadi melalui:
- Hubungan seksual berisiko, terutama berganti-ganti pasangan dan tidak menggunakan kondom.
- Penggunaan bersama alat yang terkontaminasi, seperti jarum suntik, alat tindik, dan alat tato.
- Penularan dari ibu ke anak, yang dapat terjadi selama kehamilan, persalinan, dan menyusui.
- Transfusi darah yang terkontaminasi virus HIV.

HIV/AIDS tidak menular melalui:
1. Bertukar pakaian
2. Penggunaan toilet bersama
3. Berenang di kolam yang sama
4. Berbagi makanan atau minuman
5. Gigitan nyamuk
6. Berkeringat
7. Tinggal serumah dengan penderita yang terinfeksi
8. Bersalaman atau berjabat tangan
9. Berciuman atau mencium orang lain`,
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