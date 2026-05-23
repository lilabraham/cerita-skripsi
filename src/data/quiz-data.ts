export interface QuizItem {
  id: number;
  question: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
}

// ✅ Fix: Record<string, QuizItem[]>
export const quizData: Record<string, QuizItem[]> = {
  pengenalan: [
    {
      id: 1,
      question: "Apakah HIV dan AIDS itu hal yang sama?",
      options: [
        "Ya, keduanya adalah penyakit yang persis sama",
        "Tidak, HIV adalah virusnya, sedangkan AIDS adalah stadium akhir infeksinya",
        "Tidak, AIDS adalah virusnya, HIV adalah gejalanya",
        "Ya, hanya berbeda istilah medis saja",
      ],
      correctAnswer:
        "Tidak, HIV adalah virusnya, sedangkan AIDS adalah stadium akhir infeksinya",
      explanation:
        "HIV adalah virus yang menyerang sistem imun, sedangkan AIDS adalah kondisi (sindrom) ketika sistem imun sudah sangat rusak.",
    },
    {
      id: 2,
      question: "Sel apa yang secara spesifik diserang oleh virus HIV?",
      options: ["Sel darah merah", "Sel CD4 (T-cell)", "Sel kulit", "Sel saraf otak"],
      correctAnswer: "Sel CD4 (T-cell)",
      explanation:
        "HIV menginfeksi dan menghancurkan sel CD4 yang merupakan bagian penting dari sistem kekebalan tubuh.",
    },
  ],
  penularan: [
    {
      id: 1,
      question: "Manakah yang BUKAN cara penularan HIV?",
      options: [
        "Berbagi jarum suntik",
        "Berjabat tangan",
        "Hubungan seksual tanpa pengaman",
        "Dari ibu ke bayi saat menyusui",
      ],
      correctAnswer: "Berjabat tangan",
      explanation:
        "HIV tidak menular melalui kontak fisik biasa seperti berjabat tangan, berpelukan, atau berbagi alat makan.",
    },
    {
      id: 2,
      question: "HIV dapat menular melalui gigitan nyamuk. Pernyataan ini...",
      options: ["Benar", "Salah", "Tergantung kondisi", "Masih diteliti"],
      correctAnswer: "Salah",
      explanation:
        "HIV tidak bisa bertahan hidup di dalam tubuh nyamuk dan tidak menular melalui gigitan serangga.",
    },
  ],
  pencegahan: [
    {
      id: 1,
      question: "Cara paling efektif untuk mencegah HIV secara absolut adalah...",
      options: [
        "Minum vitamin setiap hari",
        "Tidak melakukan hubungan seksual (abstinence)",
        "Olahraga rutin",
        "Makan makanan bergizi",
      ],
      correctAnswer: "Tidak melakukan hubungan seksual (abstinence)",
      explanation:
        "Abstinence adalah satu-satunya cara yang 100% efektif mencegah penularan HIV melalui jalur seksual.",
    },
  ],
  pengobatan: [
    {
      id: 1,
      question: "ARV adalah singkatan dari...",
      options: [
        "Anti Retro Viral",
        "Anti Resistan Vaksin",
        "Antibiotik Reaksi Virus",
        "Agen Resistensi Viral",
      ],
      correctAnswer: "Anti Retro Viral",
      explanation:
        "ARV (Antiretroviral) adalah obat yang menekan replikasi virus HIV dalam tubuh sehingga viral load menjadi tidak terdeteksi.",
    },
  ],
};