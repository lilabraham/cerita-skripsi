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
  pencegahan: [
    {
      id: 1,
      question: "Huruf 'D' dalam prinsip ABCDE pencegahan HIV singkatan dari...",
      options: [
        "Diet ketat dan hidup sehat",
        "No Drugs (Hindari narkoba suntik)",
        "Deteksi dini melalui tes HIV",
        "Diskusi rutin dengan dokter",
      ],
      correctAnswer: "No Drugs (Hindari narkoba suntik)",
      explanation:
        "D dalam ABCDE adalah No Drugs — hindari penggunaan narkoba suntik dan jangan pernah berbagi jarum suntik. Berbagi jarum adalah jalur penularan HIV yang sangat berisiko karena darah yang terinfeksi masuk langsung ke aliran darah.",
    },
    {
      id: 2,
      question:
        "Berdasarkan prinsip ABCDE, cara yang dinyatakan paling efektif untuk mencegah penularan HIV secara seksual adalah...",
      options: [
        "C - Condom (penggunaan kondom secara konsisten)",
        "B - Be Faithful (setia pada satu pasangan)",
        "A - Abstinence (menghindari hubungan seksual berisiko)",
        "E - Education (mencari informasi yang benar)",
      ],
      correctAnswer: "A - Abstinence (menghindari hubungan seksual berisiko)",
      explanation:
        "Abstinence atau menghindari hubungan seksual berisiko adalah cara paling efektif menurut prinsip ABCDE. Meskipun demikian, setiap huruf dalam ABCDE tetap penting dan relevan sesuai kondisi individu masing-masing.",
    },
    {
      id: 3,
      question:
        "Mengapa 'Education' (E) atau pendidikan dimasukkan sebagai salah satu prinsip pencegahan HIV?",
      options: [
        "Karena pendidikan menjamin seseorang bebas dari penyakit",
        "Karena informasi yang benar akan membantu seseorang membuat keputusan yang sehat dan aman",
        "Agar masyarakat tahu cara menyembuhkan HIV secara mandiri",
        "Untuk memudahkan tenaga medis mendata pasien",
      ],
      correctAnswer:
        "Karena informasi yang benar akan membantu seseorang membuat keputusan yang sehat dan aman",
      explanation:
        "Prinsip Education menekankan pentingnya memperoleh informasi yang benar mengenai HIV/AIDS. Pengetahuan yang tepat membantu seseorang memahami cara penularan, pencegahan, serta menghindari perilaku berisiko sehingga dapat mengambil keputusan yang sehat dan aman.",
    },
  ],

  pengobatan: [
    {
      id: 1,
      question: "Terapi ARV bekerja dengan cara...",
      options: [
        "Membunuh semua virus HIV secara permanen dalam 30 hari",
        "Menekan jumlah virus HIV agar sistem kekebalan tubuh tetap terjaga",
        "Menyembuhkan AIDS secara total dalam 3 bulan pengobatan",
        "Mengganti sel CD4 yang rusak dengan sel imun baru",
      ],
      correctAnswer:
        "Menekan jumlah virus HIV agar sistem kekebalan tubuh tetap terjaga",
      explanation:
        "ARV tidak menyembuhkan HIV secara total, tetapi menekan viral load (jumlah virus dalam darah) hingga tidak terdeteksi. Hasilnya, sistem kekebalan tubuh tetap berfungsi optimal dan penderita dapat hidup sehat serta produktif.",
    },
    {
      id: 2,
      question: "Pernyataan yang BENAR mengenai HIV dan pengobatan saat ini adalah...",
      options: [
        "HIV sudah bisa disembuhkan total dengan obat terbaru",
        "Penderita HIV tidak perlu minum obat jika masih merasa sehat",
        "HIV belum bisa disembuhkan, tetapi bisa dikendalikan dengan terapi ARV",
        "ARV hanya efektif di stadium awal dan tidak berguna di stadium lanjut",
      ],
      correctAnswer:
        "HIV belum bisa disembuhkan, tetapi bisa dikendalikan dengan terapi ARV",
      explanation:
        "Hingga saat ini belum ada obat yang bisa menyembuhkan HIV secara total. Namun dengan terapi ARV yang konsisten, penderita dapat menekan perkembangan virus, menjaga imunitas, dan menjalani hidup sehat — bahkan dengan harapan hidup yang hampir setara orang tanpa HIV.",
    },
    {
      id: 3,
      question:
        "Berikut ini yang merupakan manfaat terapi ARV adalah...",
      options: [
        "Menyembuhkan HIV secara total",
        "Menghilangkan kebutuhan pemeriksaan kesehatan",
        "Menjaga daya tahan tubuh dan mengurangi risiko infeksi oportunistik",
        "Mencegah semua jenis penyakit",
      ],
      correctAnswer:
        "Menjaga daya tahan tubuh dan mengurangi risiko infeksi oportunistik",
      explanation:
        "Terapi ARV membantu menjaga sistem kekebalan tubuh, menekan perkembangan HIV, serta mengurangi risiko infeksi oportunistik. Namun, ARV belum dapat menyembuhkan HIV secara total.",
    },
  ],

  stigma: [
    {
      id: 1,
      question: "Apa kepanjangan dari ODHA?",
      options: [
        "Orang Dengan Harapan Abadi",
        "Orang Dengan HIV/AIDS",
        "Organisasi Dukungan HIV dan AIDS",
        "Orang Dengan Hambatan Aktivitas",
      ],
      correctAnswer: "Orang Dengan HIV/AIDS",
      explanation:
        "ODHA adalah singkatan dari Orang Dengan HIV/AIDS. Mereka adalah individu yang terinfeksi HIV dan tetap memiliki hak yang sama dengan orang lain untuk belajar, bekerja, bergaul, dan hidup di masyarakat.",
    },
    {
      id: 2,
      question: "Apa dampak stigma dan diskriminasi terhadap ODHA?",
      options: [
        "Mendorong ODHA lebih rajin memeriksakan diri ke dokter",
        "Mempercepat proses penyembuhan karena tekanan sosial",
        "Membuat ODHA enggan berobat sehingga kondisi kesehatan makin memburuk",
        "Tidak berpengaruh apapun terhadap kesehatan ODHA",
      ],
      correctAnswer:
        "Membuat ODHA enggan berobat sehingga kondisi kesehatan makin memburuk",
      explanation:
        "Stigma dan diskriminasi membuat ODHA takut terbuka dan enggan memeriksakan diri atau mengakses pengobatan. Akibatnya, virus semakin berkembang tanpa terkontrol dan kondisi kesehatan terus memburuk. Dukungan sosial yang positif justru mendorong ODHA untuk tetap konsisten menjalani terapi.",
    },
    {
      id: 3,
      question:
        "Aktivitas sehari-hari seperti berjabat tangan, berbagi alat makan, atau menggunakan toilet yang sama dengan ODHA...",
      options: [
        "Berisiko tinggi menularkan HIV",
        "Tidak menularkan HIV, karena virus tidak menyebar lewat kontak sehari-hari",
        "Berisiko hanya jika ODHA sedang dalam stadium AIDS",
        "Aman hanya jika ODHA sudah minum ARV",
      ],
      correctAnswer:
        "Tidak menularkan HIV, karena virus tidak menyebar lewat kontak sehari-hari",
      explanation:
        "HIV hanya menular melalui darah, cairan seksual, ASI, dan dari ibu ke bayi — bukan lewat kontak fisik biasa, berbagi alat makan, atau toilet. Memahami fakta ini penting untuk mengurangi stigma yang tidak berdasar terhadap ODHA di lingkungan sosial.",
    },
  ],
};