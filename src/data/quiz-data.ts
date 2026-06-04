// src/data/quiz-data.ts

export interface QuizItem {
  id: number;
  question: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
}

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
        "HIV adalah virus yang menyerang sistem kekebalan tubuh, sementara AIDS adalah kondisi lanjut yang terjadi ketika sistem kekebalan sudah sangat lemah akibat infeksi HIV yang tidak ditangani.",
    },
    {
      id: 2,
      question: "Sel apa yang menjadi target utama serangan virus HIV?",
      options: ["Sel darah merah", "Sel CD4 (T-cell)", "Sel kulit", "Sel saraf otak"],
      correctAnswer: "Sel CD4 (T-cell)",
      explanation:
        "HIV secara spesifik menyerang sel CD4, yaitu sel darah putih yang berperan sebagai 'komandan' sistem kekebalan tubuh. Semakin sedikit sel CD4, semakin lemah pertahanan tubuh kita.",
    },
    {
      id: 3,
      question: "Seseorang dinyatakan telah mencapai stadium AIDS ketika...",
      options: [
        "Baru terpapar virus HIV untuk pertama kali",
        "Mengalami gejala mirip flu selama dua minggu",
        "Sistem kekebalan tubuhnya sudah rusak sangat parah akibat HIV",
        "Positif HIV namun belum menunjukkan gejala apapun",
      ],
      correctAnswer:
        "Sistem kekebalan tubuhnya sudah rusak sangat parah akibat HIV",
      explanation:
        "AIDS adalah tahap akhir infeksi HIV, ditandai dengan jumlah sel CD4 yang sangat rendah sehingga tubuh tidak mampu melawan penyakit oportunistik. Tidak semua orang dengan HIV otomatis berkembang ke AIDS jika mendapat pengobatan tepat waktu.",
    },
  ],

  cara_kerja: [
    {
      id: 1,
      question: "Apa yang terjadi pada sel CD4 setelah HIV berhasil masuk ke dalamnya?",
      options: [
        "Sel CD4 langsung mati dan tidak terjadi apa-apa",
        "HIV menggunakan sel CD4 untuk memperbanyak diri, lalu menghancurkan sel tersebut",
        "Sel CD4 melawan virus dan biasanya menang",
        "HIV tidur di dalam sel CD4 tanpa menimbulkan kerusakan",
      ],
      correctAnswer:
        "HIV menggunakan sel CD4 untuk memperbanyak diri, lalu menghancurkan sel tersebut",
      explanation:
        "HIV memiliki cara kerja yang licik: ia masuk ke dalam sel CD4, menggunakan 'mesin' sel tersebut untuk memproduksi ribuan salinan dirinya, kemudian keluar sekaligus menghancurkan sel inangnya. Proses ini berlangsung terus-menerus hingga jumlah sel CD4 terus berkurang.",
    },
    {
      id: 2,
      question: "Mengapa penurunan jumlah sel CD4 sangat berbahaya bagi tubuh?",
      options: [
        "Karena sel CD4 adalah sel yang membawa oksigen ke seluruh tubuh",
        "Karena sel CD4 adalah 'komandan' sistem kekebalan yang mengkoordinasi pertahanan tubuh",
        "Karena sel CD4 menghasilkan energi untuk aktivitas sehari-hari",
        "Karena sel CD4 membentuk lapisan pelindung pada kulit",
      ],
      correctAnswer:
        "Karena sel CD4 adalah 'komandan' sistem kekebalan yang mengkoordinasi pertahanan tubuh",
      explanation:
        "Sel CD4 berperan mengidentifikasi ancaman (bakteri, virus, jamur) dan mengaktifkan respons imun. Ketika jumlahnya terus berkurang, tubuh kehilangan kemampuan untuk melawan infeksi yang seharusnya tidak berbahaya sekalipun.",
    },
    {
      id: 3,
      question: "Proses HIV memperbanyak diri di dalam tubuh berlangsung secara...",
      options: [
        "Sangat cepat dan langsung menimbulkan gejala berat dalam hitungan jam",
        "Bertahap dan perlahan, bisa berlangsung bertahun-tahun tanpa gejala yang jelas",
        "Hanya terjadi saat penderita sedang demam tinggi",
        "Berhenti total jika penderita menjalani hidup sehat",
      ],
      correctAnswer:
        "Bertahap dan perlahan, bisa berlangsung bertahun-tahun tanpa gejala yang jelas",
      explanation:
        "Inilah yang membuat HIV berbahaya sekaligus penting untuk dideteksi dini. Selama fase laten, virus terus merusak sistem kekebalan secara diam-diam meski penderita tampak sehat. Tes HIV adalah satu-satunya cara untuk mengetahuinya.",
    },
  ],

  gejala: [
    {
      id: 1,
      question: "Pada fase akut (2–4 minggu pertama setelah terinfeksi), gejala HIV umumnya menyerupai...",
      options: [
        "Patah tulang dan nyeri sendi parah",
        "Penyakit flu biasa seperti demam, ruam, dan pembengkakan kelenjar",
        "Gangguan penglihatan dan pendengaran",
        "Tidak ada gejala sama sekali",
      ],
      correctAnswer:
        "Penyakit flu biasa seperti demam, ruam, dan pembengkakan kelenjar",
      explanation:
        "Fase akut sering disebut 'acute retroviral syndrome'. Gejalanya memang sangat mirip flu sehingga banyak orang tidak menyadarinya. Inilah mengapa tes HIV sangat penting, terutama setelah adanya perilaku berisiko.",
    },
    {
      id: 2,
      question: "Pada fase laten, seseorang yang terinfeksi HIV biasanya...",
      options: [
        "Sudah tidak bisa menularkan HIV ke orang lain",
        "Menunjukkan gejala berat sehingga mudah dikenali",
        "Tidak menunjukkan gejala, tetapi HIV tetap aktif dan bisa menular",
        "Sudah sembuh total dari infeksi HIV",
      ],
      correctAnswer:
        "Tidak menunjukkan gejala, tetapi HIV tetap aktif dan bisa menular",
      explanation:
        "Fase laten bisa berlangsung selama 10 tahun atau lebih. Orang yang terinfeksi tampak dan merasa sehat, namun virus tetap bereplikasi di dalam tubuh dan tetap bisa menularkan HIV kepada orang lain. Pengobatan ARV pada fase ini sangat efektif.",
    },
    {
      id: 3,
      question: "Salah satu tanda seseorang telah memasuki stadium AIDS adalah...",
      options: [
        "Kulit menjadi lebih cerah dan bersih",
        "Nafsu makan meningkat drastis",
        "Penurunan berat badan drastis dan rentan terkena TBC atau infeksi berat lainnya",
        "Sistem kekebalan tubuh pulih dengan sendirinya",
      ],
      correctAnswer:
        "Penurunan berat badan drastis dan rentan terkena TBC atau infeksi berat lainnya",
      explanation:
        "Pada stadium AIDS, sistem kekebalan sudah rusak parah sehingga tubuh tidak mampu melawan infeksi oportunistik seperti TBC, pneumonia, atau infeksi jamur yang pada orang sehat tidak berbahaya. Penurunan berat badan drastis juga merupakan salah satu tanda khas.",
    },
  ],

  penularan: [
    {
      id: 1,
      question: "Manakah di bawah ini yang MERUPAKAN cara penularan HIV?",
      options: [
        "Bersentuhan atau berpelukan dengan ODHIV",
        "Berbagi jarum suntik dengan orang yang terinfeksi HIV",
        "Makan bersama menggunakan piring yang sama",
        "Terkena gigitan nyamuk di daerah endemik",
      ],
      correctAnswer: "Berbagi jarum suntik dengan orang yang terinfeksi HIV",
      explanation:
        "HIV hanya dapat menular melalui cairan tubuh tertentu: darah, ASI, cairan seksual, dan dari ibu ke bayi. Berbagi jarum suntik adalah jalur penularan yang sangat berisiko karena darah yang terinfeksi masuk langsung ke aliran darah.",
    },
    {
      id: 2,
      question: "HIV dapat menular melalui gigitan nyamuk. Pernyataan ini...",
      options: [
        "Benar, nyamuk adalah vektor penular HIV yang umum",
        "Salah, HIV tidak dapat bertahan hidup di dalam tubuh nyamuk",
        "Tergantung jenis nyamuknya",
        "Masih dalam penelitian ilmuwan",
      ],
      correctAnswer: "Salah, HIV tidak dapat bertahan hidup di dalam tubuh nyamuk",
      explanation:
        "Ini adalah mitos yang sangat umum. HIV tidak bisa bertahan dan bereplikasi di dalam sistem pencernaan nyamuk, sehingga tidak bisa ditularkan melalui gigitan. HIV juga tidak menular melalui air liur, keringat, air mata, atau kontak fisik sehari-hari.",
    },
    {
      id: 3,
      question: "Seorang ibu dengan HIV dapat menularkan virus kepada bayinya melalui...",
      options: [
        "Kontak kulit saat menggendong bayi",
        "Proses persalinan dan pemberian ASI",
        "Berbicara atau bernyanyi di dekat bayi",
        "Bayi tidak bisa tertular HIV dari ibunya",
      ],
      correctAnswer: "Proses persalinan dan pemberian ASI",
      explanation:
        "Penularan dari ibu ke bayi (mother-to-child transmission) dapat terjadi saat persalinan atau melalui ASI. Kabar baiknya, dengan pengobatan ARV yang tepat selama kehamilan, risiko penularan ini dapat dikurangi hingga kurang dari 1%. Ibu dengan HIV tetap bisa melahirkan bayi yang sehat.",
    },
  ],
};