export interface Question {
  id: number;
  category: "VERBAL" | "NUMERIK" | "LOGIS" | "SITUASIONAL";
  subtest: string;
  question: string;
  options: string[];
  correctIndex: number; // 0 for A, 1 for B, 2 for C, 3 for D, 4 for E
  pointMap?: number[]; // Scaled points for situasional questions [A, B, C, D, E]
  explanation: string;
}

export interface ContestantProfile {
  id: "A" | "B" | "C" | "D";
  name: string;
  persona: string;
}

export const CONTESTANTS: ContestantProfile[] = [
  {
    id: "A",
    name: "Kontestan A",
    persona: "Fresh Graduate (Belum pernah ujian / First-Timer)",
  },
  {
    id: "B",
    name: "Kontestan B",
    persona: "Mahasiswa Tingkat Akhir (First-Timer)",
  },
  {
    id: "C",
    name: "Kontestan C",
    persona: "Job Seeker (Pernah gagal SKD 2024 / Retaker)",
  },
  {
    id: "D",
    name: "Kontestan D",
    persona: "Karyawan Swasta (Retaker Seleksi BUMN)",
  },
];

/**
 * Counterbalanced assignment:
 * Kontestan A & B: Pre-Test = Paket A, Post-Test = Paket B
 * Kontestan C & D: Pre-Test = Paket B, Post-Test = Paket A
 */
export function getAssignedPackage(contestantId: "A" | "B" | "C" | "D", phase: "pre" | "post"): "PAKET A" | "PAKET B" {
  if (contestantId === "A" || contestantId === "B") {
    return phase === "pre" ? "PAKET A" : "PAKET B";
  } else {
    return phase === "pre" ? "PAKET B" : "PAKET A";
  }
}

export const QUESTIONS_PAKET_A: Question[] = [
  {
    id: 1,
    category: "VERBAL",
    subtest: "Kemampuan Bakat GAT — Verbal (Analogi)",
    question: "PAYUNG : HUJAN = HELM : ...",
    options: ["Motor", "Kepala", "Benturan", "Jalan", "Polisi"],
    correctIndex: 2, // C
    explanation: "Fungsi Proteksi: Payung melindungi dari Hujan; Helm melindungi dari Benturan.",
  },
  {
    id: 2,
    category: "VERBAL",
    subtest: "Kemampuan Bakat GAT — Verbal (Proses)",
    question: "BENIH : POHON = KEPOMPONG : ...",
    options: ["Ulat", "Daun", "Kupu-kupu", "Serangga", "Telur"],
    correctIndex: 2, // C
    explanation: "Fase Transformasi: Benih berkembang menjadi Pohon; Kepompong berkembang menjadi Kupu-kupu.",
  },
  {
    id: 3,
    category: "VERBAL",
    subtest: "Kemampuan Bakat GAT — Verbal (Silogisme Kuantor)",
    question: "Semua atlet profesional menjalani latihan fisik disiplin.\nSebagian mahasiswa Universitas Gadjah Mada adalah atlet profesional.\n\nKesimpulan yang paling tepat adalah:",
    options: [
      "Semua mahasiswa Universitas Gadjah Mada menjalani latihan fisik disiplin.",
      "Sebagian mahasiswa Universitas Gadjah Mada menjalani latihan fisik disiplin.",
      "Mahasiswa yang bukan atlet tidak menjalani latihan fisik disiplin.",
      "Semua yang disiplin berlatih fisik adalah mahasiswa Universitas Gadjah Mada.",
      "Tidak ada mahasiswa Universitas Gadjah Mada yang bukan atlet.",
    ],
    correctIndex: 1, // B
    explanation: "Premis Universal ('Semua') digabung dengan Premis Partikular ('Sebagian') selalu menghasilkan kesimpulan 'Sebagian'.",
  },
  {
    id: 4,
    category: "VERBAL",
    subtest: "Kemampuan Bakat GAT — Verbal (Silogisme Implikasi)",
    question: "Jika jalanan tergenang banjir, maka laju bus antar-kota mengalami keterlambatan.\nHari ini laju bus antar-kota tiba tepat waktu (tidak terlambat).\n\nKesimpulan yang sah adalah:",
    options: [
      "Jalanan tidak tergenang banjir.",
      "Pengemudi bus mencari rute alternatif.",
      "Hujan tidak turun hari ini.",
      "Jalanan mungkin sedikit tergenang air.",
      "Bus berangkat lebih awal dari biasanya.",
    ],
    correctIndex: 0, // A
    explanation: "Modus Tollens: Jika P -> Q, dan diketahui ~Q (tidak terlambat), maka kesimpulan sah adalah ~P (jalanan tidak tergenang banjir).",
  },
  {
    id: 5,
    category: "VERBAL",
    subtest: "Kemampuan Bakat GAT — Verbal (Penalaran Analitis)",
    question: "Dalam perlombaan lari cepat 100 meter:\n• Atlet A finish lebih cepat daripada B, tetapi lebih lambat daripada C.\n• Atlet D finish lebih lambat daripada E, tetapi lebih cepat daripada C.\n\nSiapakah yang finish di urutan pertama (paling cepat)?",
    options: ["A", "B", "C", "D", "E"],
    correctIndex: 4, // E
    explanation: "Urutan dari tercepat: E > D > C > A > B. Jadi yang finish pertama adalah E.",
  },
  {
    id: 6,
    category: "NUMERIK",
    subtest: "Kemampuan Bakat GAT — Numerik (Deret Eksponensial)",
    question: "3, 5, 9, 17, 33, ...",
    options: ["49", "57", "65", "67", "72"],
    correctIndex: 2, // C
    explanation: "Pola selisih: +2, +4, +8, +16, +32. Maka angka berikutnya: 33 + 32 = 65.",
  },
  {
    id: 7,
    category: "NUMERIK",
    subtest: "Kemampuan Bakat GAT — Numerik (Deret Dua Larik)",
    question: "12, 8, 16, 11, 20, 14, 24, ...",
    options: ["17", "18", "19", "26", "28"],
    correctIndex: 0, // A
    explanation: "Larik ganjil: 12, 16, 20, 24 (+4). Larik genap: 8, 11, 14, (+3) -> 17.",
  },
  {
    id: 8,
    category: "NUMERIK",
    subtest: "Kemampuan Bakat GAT — Numerik (Pecahan Khusus)",
    question: "Nilai dari 66 2/3% × 0,75 + 1/2 adalah ...",
    options: ["3/4", "1", "1 1/4", "1 1/2", "2"],
    correctIndex: 1, // B
    explanation: "Trik Pecahan: 66 2/3% = 2/3. 0,75 = 3/4. Maka (2/3 × 3/4) + 1/2 = 1/2 + 1/2 = 1.",
  },
  {
    id: 9,
    category: "NUMERIK",
    subtest: "Kemampuan Bakat GAT — Numerik (Aljabar Cepat)",
    question: "Nilai dari (65)² - (35)² adalah ...",
    options: ["1.800", "2.400", "3.000", "3.600", "4.225"],
    correctIndex: 2, // C
    explanation: "Trik Selisih Kuadrat: a² - b² = (a+b)(a-b) = (65+35)(65-35) = 100 × 30 = 3.000.",
  },
  {
    id: 10,
    category: "NUMERIK",
    subtest: "Kemampuan Bakat GAT — Numerik (Perbandingan Kuantitatif)",
    question: "Diketahui:\nx = Nilai rata-rata dari 14, 16, dan 18\ny = Nilai median dari 12, 16, dan 20\n\nHubungan yang benar antara x dan y adalah:",
    options: ["x > y", "x < y", "x = y", "x = 2y", "Hubungan x dan y tidak dapat ditentukan"],
    correctIndex: 2, // C
    explanation: "x = (14+16+18)/3 = 16. y = median(12, 16, 20) = 16. Maka x = y.",
  },
  {
    id: 11,
    category: "NUMERIK",
    subtest: "Kemampuan Bakat GAT — Numerik (Aritmatika Kecepatan)",
    question: "Sebuah mobil menempuh jarak tertentu dalam waktu 3 jam dengan kecepatan konstan 60 km/jam. Jika kecepatan mobil tersebut dinaikkan menjadi 90 km/jam, berapa waktu yang dibutuhkan untuk menempuh jarak yang sama?",
    options: ["1,5 jam", "2 jam", "2,25 jam", "2,5 jam", "2,75 jam"],
    correctIndex: 1, // B
    explanation: "Jarak = 3 × 60 = 180 km. Waktu baru = 180 / 90 = 2 jam.",
  },
  {
    id: 12,
    category: "LOGIS",
    subtest: "Kemampuan Bakat GAT — Logis (Pola Berulang)",
    question: "Jadwal tugas berulang setiap tiga hari dengan urutan: memeriksa berkas, memasukkan data, lalu menyusun laporan. Hari ke-1 digunakan untuk memeriksa berkas. Kegiatan pada hari ke-8 adalah ...",
    options: [
      "Memasukkan data",
      "Memeriksa berkas",
      "Menyusun laporan",
      "Memasukkan data dan menyusun laporan",
      "Tidak ada tugas",
    ],
    correctIndex: 0,
    explanation: "Memasukkan data dilakukan pada hari ke-2, ke-5, dan ke-8. Setiap kegiatan berulang setelah tiga hari.",
  },
  {
    id: 13,
    category: "LOGIS",
    subtest: "Kemampuan Bakat GAT — Logis (Implikasi Berantai)",
    question: "Setiap peserta yang lulus seleksi administrasi mendapat undangan wawancara. Setiap peserta yang mendapat undangan wawancara wajib mengonfirmasi kehadiran. Rina lulus seleksi administrasi. Kesimpulan yang pasti benar adalah ...",
    options: [
      "Rina sudah mengikuti wawancara.",
      "Rina pasti diterima bekerja.",
      "Rina wajib mengonfirmasi kehadiran.",
      "Rina tidak mendapat undangan wawancara.",
      "Rina sudah mengonfirmasi kehadiran.",
    ],
    correctIndex: 2,
    explanation: "Lulus administrasi berarti mendapat undangan, dan mendapat undangan berarti wajib mengonfirmasi kehadiran. Jadi Rina wajib mengonfirmasi; belum tentu ia sudah melakukannya.",
  },
  {
    id: 14,
    category: "LOGIS",
    subtest: "Kemampuan Bakat GAT — Logis (Keanggotaan Kelompok)",
    question: "Daftar peserta kelas menulis adalah Andi, Bima, dan Citra. Daftar peserta kelas bahasa adalah Bima, Citra, dan Deni. Undangan khusus hanya diberikan kepada peserta yang mengikuti tepat satu dari kedua kelas tersebut. Siapa yang menerima undangan khusus?",
    options: [
      "Bima dan Citra",
      "Andi dan Deni",
      "Andi dan Bima",
      "Citra dan Deni",
      "Andi, Bima, Citra, dan Deni",
    ],
    correctIndex: 1,
    explanation: "Andi hanya mengikuti kelas menulis dan Deni hanya mengikuti kelas bahasa. Bima dan Citra mengikuti kedua kelas, sehingga tidak memenuhi syarat tepat satu kelas.",
  },
  {
    id: 15,
    category: "LOGIS",
    subtest: "Kemampuan Bakat GAT — Logis (Negasi Pernyataan)",
    question: "Pernyataan \"Semua peserta pelatihan sudah mengumpulkan tugas\" ternyata salah. Pernyataan yang pasti benar adalah ...",
    options: [
      "Semua peserta belum mengumpulkan tugas.",
      "Sebagian peserta sudah mengumpulkan tugas.",
      "Tidak ada peserta pelatihan.",
      "Setidaknya satu peserta belum mengumpulkan tugas.",
      "Hanya satu peserta yang sudah mengumpulkan tugas.",
    ],
    correctIndex: 3,
    explanation: "Pernyataan semua peserta sudah mengumpulkan tugas menjadi salah jika ada setidaknya satu peserta yang belum mengumpulkan. Tidak dapat disimpulkan berapa peserta yang sudah mengumpulkan.",
  },
  {
    id: 16,
    category: "SITUASIONAL",
    subtest: "Karakteristik & Integritas — TWK (Anti-Gratifikasi)",
    question: "Anda staf pengadaan barang. Rekanan vendor yang memenangkan tender secara sah mengirimkan parsel buah dan voucher belanja Rp1.000.000 ke rumah Anda sebagai ungkapan terima kasih hari raya. Tindakan Anda adalah:",
    options: [
      "Menerimanya karena tender telah selesai dan tidak mempengaruhi keputusan apa pun.",
      "Menolak secara sopan dan melaporkan pemberian tersebut ke Unit Pengendalian Gratifikasi (UPG).",
      "Menerima parsel buahnya saja agar tidak menyinggung, namun mengembalikan voucher belanja.",
      "Membagikan parsel dan voucher kepada rekan-rekan kantor yang membutuhkan.",
      "Menyimpan barang tersebut dan baru melapor jika ada audit internal.",
    ],
    correctIndex: 1, // B
    pointMap: [1, 5, 3, 2, 1],
    explanation: "Integritas tertinggi menolak secara sopan dan melaporkan gratifikasi ke instansi terkait (UPG).",
  },
  {
    id: 17,
    category: "SITUASIONAL",
    subtest: "Karakteristik & Integritas — TWK (Musyawarah)",
    question: "Dalam rapat penyusunan program kerja terjadi perdebatan sengit antara dua kubu karena perbedaan prioritas anggaran, sehingga rapat terancam jalan buntu (deadlock). Sikap Anda:",
    options: [
      "Langsung meminta pimpinan melakukan pemungutan suara (voting) agar cepat selesai.",
      "Membela salah satu pihak yang programnya dinilai paling populer.",
      "Mengajak kedua pihak mengidentifikasi tujuan bersama (common goal) dan menyusun alternatif kompromi berdasarkan data kebutuhan riil.",
      "Memilih diam dan pasif mengikuti keputusan akhir pimpinan.",
      "Menyarankan rapat dibatalkan dan ditunda hingga suasana tenang.",
    ],
    correctIndex: 2, // C
    pointMap: [3, 2, 5, 2, 1],
    explanation: "Musyawarah mufakat mengedepankan identifikasi common goal dan solusi win-win berbasis data objektif.",
  },
  {
    id: 18,
    category: "SITUASIONAL",
    subtest: "Karakteristik Pribadi — TKP (Prioritas Pelayanan)",
    question: "Anda sedang fokus menyelesaikan laporan darurat pimpinan yang harus tuntas dalam 30 menit. Tiba-tiba seorang warga lansia datang dengan kebingungan mencari loket layanan di lantai lain. Respon Anda:",
    options: [
      "Mengabaikannya dan tetap mengetik agar laporan Anda tidak terlambat.",
      "Menegur warga tersebut karena salah masuk ruangan kerja staf.",
      "Berhenti sejenak, mendengarkan dengan ramah, dan memanggil petugas front-office atau rekan piket untuk mengantarkan warga tersebut, lalu melanjutkan tugas Anda.",
      "Mengantar langsung warga tersebut keliling gedung hingga ke loket tujuan tanpa memikirkan laporan Anda.",
      "Menyuruh warga membaca denah papan petunjuk yang tertempel di depan pintu.",
    ],
    correctIndex: 2, // C
    pointMap: [1, 2, 5, 3, 2],
    explanation: "Solutif dan proporsional: Menunjukkan empati pelayanan tanpa mengorbankan batas waktu tanggung jawab utama.",
  },
  {
    id: 19,
    category: "SITUASIONAL",
    subtest: "Karakteristik Pribadi — TKP (Adaptasi Teknologi)",
    question: "Instansi Anda mulai menerapkan aplikasi digital baru untuk absensi dan alur disposisi surat yang menggantikan sistem manual. Beberapa rekan senior mengeluh dan enggan menggunakannya. Sikap Anda:",
    options: [
      "Ikut menggunakan sistem manual demi solidaritas antar rekan kerja.",
      "Mempelajari sistem baru secara mendalam dan dengan sabar mendampingi serta membantu rekan senior mempraktikkannya.",
      "Membiarkan saja karena penerapan sistem baru adalah tanggung jawab bagian IT.",
      "Mengusulkan kepada pimpinan agar sistem lama tetap dipertahankan bagi pegawai senior.",
      "Mengkritik rekan-rekan senior yang lambat beradaptasi di depan forum rapat.",
    ],
    correctIndex: 1, // B
    pointMap: [2, 5, 3, 2, 1],
    explanation: "Adaptif dan suportif: Proaktif mempelajari sistem digital baru dan mengedukasi rekan kerja di lingkungan tim.",
  },
  {
    id: 20,
    category: "SITUASIONAL",
    subtest: "Karakteristik Pribadi — TKP (Kerjasama Tim)",
    question: "Anda tergabung dalam tim lintas unit. Salah seorang rekan tim memiliki pandangan politik pribadi yang sangat bertolak belakang dengan Anda dan kerap menyuarakannya di grup koordinasi. Sikap Anda:",
    options: [
      "Menolak bekerjasama dan meminta dipindahkan ke tim lain.",
      "Berdebat aktif di grup kerja untuk meluruskan pandangan rekan tersebut.",
      "Mengabaikan perbedaan pandangan pribadi dan tetap fokus menjaga komunikasi profesional demi target capaian tim.",
      "Menghasut anggota tim lain untuk memusuhi rekan tersebut.",
      "Membatasi komunikasi seminimal mungkin hingga pekerjaan terlantar.",
    ],
    correctIndex: 2, // C
    pointMap: [1, 2, 5, 1, 2],
    explanation: "Profesionalisme: Menjaga objektif kerja tim dan memisahkan urusan opini pribadi dari target institusi.",
  },
];

export const QUESTIONS_PAKET_B: Question[] = [
  {
    id: 1,
    category: "VERBAL",
    subtest: "Kemampuan Bakat GAT — Verbal (Analogi)",
    question: "KACAMATA : SILAU = MASKER : ...",
    options: ["Wajah", "Medis", "Polusi", "Dokter", "Udara"],
    correctIndex: 2, // C
    explanation: "Fungsi Proteksi: Kacamata melindungi dari Silau; Masker melindungi dari Polusi.",
  },
  {
    id: 2,
    category: "VERBAL",
    subtest: "Kemampuan Bakat GAT — Verbal (Proses)",
    question: "TELUR : AYAM = KEPOMPONG : ...",
    options: ["Daun", "Ulat", "Serangga", "Kupu-kupu", "Bunga"],
    correctIndex: 3, // D
    explanation: "Fase Transformasi: Telur berkembang/menetas jadi Ayam; Kepompong bermetamorfosis jadi Kupu-kupu.",
  },
  {
    id: 3,
    category: "VERBAL",
    subtest: "Kemampuan Bakat GAT — Verbal (Silogisme Kuantor)",
    question: "Semua musisi orkestra memiliki kepekaan nada yang tinggi.\nSebagian guru kesenian SMA adalah musisi orkestra.\n\nKesimpulan yang paling tepat adalah:",
    options: [
      "Semua guru kesenian SMA memiliki kepekaan nada yang tinggi.",
      "Sebagian guru kesenian SMA memiliki kepekaan nada yang tinggi.",
      "Guru yang bukan musisi tidak memiliki kepekaan nada.",
      "Semua orang yang peka nada adalah guru kesenian SMA.",
      "Tidak ada guru kesenian SMA yang menjadi musisi orkestra.",
    ],
    correctIndex: 1, // B
    explanation: "Premis Universal ('Semua') digabung dengan Premis Partikular ('Sebagian') selalu menghasilkan kesimpulan 'Sebagian'.",
  },
  {
    id: 4,
    category: "VERBAL",
    subtest: "Kemampuan Bakat GAT — Verbal (Silogisme Implikasi)",
    question: "Jika suhu mesin pendingin terlalu panas, maka lampu alarm merah otomatis menyala.\nSaat ini lampu alarm merah tidak menyala (padam).\n\nKesimpulan yang sah adalah:",
    options: [
      "Suhu mesin pendingin tidak terlalu panas.",
      "Sistem kelistrikan alarm mengalami kerusakan.",
      "Mesin sedang dimatikan total.",
      "Suhu mesin pendingin mencapai titik didih.",
      "Petugas telah memperbaiki pendingin ruangan.",
    ],
    correctIndex: 0, // A
    explanation: "Modus Tollens: Jika P -> Q, dan diketahui ~Q (alarm tidak menyala), maka kesimpulan sah adalah ~P (suhu tidak terlalu panas).",
  },
  {
    id: 5,
    category: "VERBAL",
    subtest: "Kemampuan Bakat GAT — Verbal (Penalaran Analitis)",
    question: "Dalam ujian seleksi peringkat nilai matematika:\n• Siswa P memperoleh nilai lebih tinggi daripada Q, tetapi lebih rendah daripada R.\n• Siswa S memperoleh nilai lebih rendah daripada T, tetapi lebih tinggi daripada R.\n\nSiapakah siswa yang memperoleh peringkat pertama (nilai tertinggi)?",
    options: ["P", "Q", "R", "S", "T"],
    correctIndex: 4, // T
    explanation: "Urutan dari nilai tertinggi: T > S > R > P > Q. Siswa peraih peringkat pertama adalah T.",
  },
  {
    id: 6,
    category: "NUMERIK",
    subtest: "Kemampuan Bakat GAT — Numerik (Deret Eksponensial)",
    question: "4, 7, 13, 25, 49, ...",
    options: ["73", "85", "97", "99", "101"],
    correctIndex: 2, // C
    explanation: "Pola selisih: +3, +6, +12, +24, +48. Maka angka berikutnya: 49 + 48 = 97.",
  },
  {
    id: 7,
    category: "NUMERIK",
    subtest: "Kemampuan Bakat GAT — Numerik (Deret Dua Larik)",
    question: "15, 6, 18, 9, 21, 12, 24, ...",
    options: ["14", "15", "16", "27", "30"],
    correctIndex: 1, // B
    explanation: "Larik ganjil: 15, 18, 21, 24 (+3). Larik genap: 6, 9, 12, (+3) -> 15.",
  },
  {
    id: 8,
    category: "NUMERIK",
    subtest: "Kemampuan Bakat GAT — Numerik (Pecahan Khusus)",
    question: "Nilai dari 33 1/3% × 0,75 + 3/4 adalah ...",
    options: ["1/2", "3/4", "1", "1 1/4", "1 1/2"],
    correctIndex: 2, // C
    explanation: "Trik Pecahan: 33 1/3% = 1/3. 0,75 = 3/4. Maka (1/3 × 3/4) + 3/4 = 1/4 + 3/4 = 1.",
  },
  {
    id: 9,
    category: "NUMERIK",
    subtest: "Kemampuan Bakat GAT — Numerik (Aljabar Cepat)",
    question: "Nilai dari (75)² - (25)² adalah ...",
    options: ["2.500", "3.750", "5.000", "5.625", "6.000"],
    correctIndex: 2, // C
    explanation: "Trik Selisih Kuadrat: a² - b² = (a+b)(a-b) = (75+25)(75-25) = 100 × 50 = 5.000.",
  },
  {
    id: 10,
    category: "NUMERIK",
    subtest: "Kemampuan Bakat GAT — Numerik (Perbandingan Kuantitatif)",
    question: "Diketahui:\nx = Nilai rata-rata dari 21, 24, dan 27\ny = Nilai median dari 19, 24, dan 29\n\nHubungan yang benar antara x dan y adalah:",
    options: ["x > y", "x < y", "x = y", "x = 3y", "Hubungan x dan y tidak dapat ditentukan"],
    correctIndex: 2, // C
    explanation: "x = (21+24+27)/3 = 24. y = median(19, 24, 29) = 24. Maka x = y.",
  },
  {
    id: 11,
    category: "NUMERIK",
    subtest: "Kemampuan Bakat GAT — Numerik (Aritmatika Kecepatan)",
    question: "Sebuah kereta cepat menempuh jarak tertentu dalam waktu 4 jam dengan kecepatan rata-rata 120 km/jam. Jika kecepatan kereta dinaikkan menjadi 160 km/jam, berapa waktu yang dibutuhkan untuk menempuh jarak yang sama?",
    options: ["2 jam", "2,5 jam", "3 jam", "3,2 jam", "3,5 jam"],
    correctIndex: 2, // C
    explanation: "Jarak = 4 × 120 = 480 km. Waktu baru = 480 / 160 = 3 jam.",
  },
  {
    id: 12,
    category: "LOGIS",
    subtest: "Kemampuan Bakat GAT — Logis (Pola Berulang)",
    question: "Jadwal belajar berulang setiap tiga hari dengan urutan: membaca materi, mengerjakan latihan, lalu membahas jawaban. Hari ke-1 digunakan untuk membaca materi. Kegiatan pada hari ke-11 adalah ...",
    options: [
      "Mengerjakan latihan",
      "Membaca materi",
      "Membahas jawaban",
      "Mengerjakan latihan dan membahas jawaban",
      "Tidak ada kegiatan",
    ],
    correctIndex: 0,
    explanation: "Mengerjakan latihan dilakukan pada hari ke-2, ke-5, ke-8, dan ke-11. Setiap kegiatan berulang setelah tiga hari.",
  },
  {
    id: 13,
    category: "LOGIS",
    subtest: "Kemampuan Bakat GAT — Logis (Implikasi Berantai)",
    question: "Setiap pegawai yang ditugaskan ke luar kota mendapat surat tugas. Setiap pegawai yang mendapat surat tugas wajib membuat laporan perjalanan. Dodi ditugaskan ke luar kota. Kesimpulan yang pasti benar adalah ...",
    options: [
      "Dodi sudah berangkat ke luar kota.",
      "Dodi pasti mendapat kenaikan jabatan.",
      "Dodi wajib membuat laporan perjalanan.",
      "Dodi tidak mendapat surat tugas.",
      "Dodi sudah membuat laporan perjalanan.",
    ],
    correctIndex: 2,
    explanation: "Ditugaskan ke luar kota berarti mendapat surat tugas, dan mendapat surat tugas berarti wajib membuat laporan perjalanan. Jadi Dodi wajib membuat laporan; belum tentu ia sudah membuatnya.",
  },
  {
    id: 14,
    category: "LOGIS",
    subtest: "Kemampuan Bakat GAT — Logis (Keanggotaan Kelompok)",
    question: "Daftar anggota klub musik adalah Eka, Fajar, dan Gina. Daftar anggota klub teater adalah Fajar, Gina, dan Hani. Undangan khusus hanya diberikan kepada anggota yang mengikuti tepat satu dari kedua klub tersebut. Siapa yang menerima undangan khusus?",
    options: [
      "Fajar dan Gina",
      "Eka dan Hani",
      "Eka dan Fajar",
      "Gina dan Hani",
      "Eka, Fajar, Gina, dan Hani",
    ],
    correctIndex: 1,
    explanation: "Eka hanya mengikuti klub musik dan Hani hanya mengikuti klub teater. Fajar dan Gina mengikuti kedua klub, sehingga tidak memenuhi syarat tepat satu klub.",
  },
  {
    id: 15,
    category: "LOGIS",
    subtest: "Kemampuan Bakat GAT — Logis (Negasi Pernyataan)",
    question: "Pernyataan \"Semua berkas pendaftaran sudah diverifikasi\" ternyata salah. Pernyataan yang pasti benar adalah ...",
    options: [
      "Semua berkas belum diverifikasi.",
      "Sebagian berkas sudah diverifikasi.",
      "Tidak ada berkas pendaftaran.",
      "Setidaknya satu berkas belum diverifikasi.",
      "Hanya satu berkas yang sudah diverifikasi.",
    ],
    correctIndex: 3,
    explanation: "Pernyataan semua berkas sudah diverifikasi menjadi salah jika ada setidaknya satu berkas yang belum diverifikasi. Tidak dapat disimpulkan berapa berkas yang sudah diverifikasi.",
  },
  {
    id: 16,
    category: "SITUASIONAL",
    subtest: "Karakteristik & Integritas — TWK (Anti-Gratifikasi)",
    question: "Anda bendahara proyek pemerintah. Rekanan katering konsumsi menawarkan penggelembungan (mark-up) kuitansi 15% dari total pengeluaran resmi dan selisihnya akan diserahkan kepada Anda sebagai 'uang lelah'. Tindakan Anda adalah:",
    options: [
      "Menerima tawaran tersebut karena sudah menjadi kebiasaan umum.",
      "Menolak tegas tawaran tersebut dan menegaskan pembayaran harus sesuai bukti riil pengeluaran.",
      "Meminta diskon katering dinaikkan untuk kas kantor pribadi.",
      "Melaporkan vendor tersebut ke penegak hukum tanpa verifikasi.",
      "Menerima sebagian uang tersebut untuk disumbangkan ke panti asuhan.",
    ],
    correctIndex: 1, // B
    pointMap: [1, 5, 2, 4, 1],
    explanation: "Integritas penuh: Menolak mark-up anggaran dan memastikan pertanggungjawaban keuangan sesuai bukti riil.",
  },
  {
    id: 17,
    category: "SITUASIONAL",
    subtest: "Karakteristik & Integritas — TWK (Musyawarah)",
    question: "Dalam penyusunan rencana kerja unit, terjadi perbedaan ide tajam antara pegawai muda yang ingin otomatisasi penuh dan pegawai senior yang ingin verifikasi tatap muka. Sikap Anda sebagai penengah:",
    options: [
      "Mengabaikan ide pegawai senior karena dinilai ketinggalan zaman.",
      "Mengabaikan ide pegawai muda karena dinilai belum berpengalaman.",
      "Mengintegrasikan kedua ide: menerapkan sistem digital untuk otomatisasi data, namun mempertahankan tahap verifikasi sampel tatap muka.",
      "Menyerahkan seluruh keputusan kepada pihak yang suaranya paling vokal.",
      "Menunda rencana kerja hingga tahun depan.",
    ],
    correctIndex: 2, // C
    pointMap: [2, 2, 5, 2, 1],
    explanation: "Musyawarah integratif: Menggabungkan kelebihan teknologi dan kontrol mitigasi risiko untuk solusi komprehensif.",
  },
  {
    id: 18,
    category: "SITUASIONAL",
    subtest: "Karakteristik Pribadi — TKP (Prioritas Pelayanan)",
    question: "Saat jam istirahat baru saja dimulai dan Anda hendak makan siang, seorang pemohon datang dengan panik menyatakan berkas izinnya harus diverifikasi hari ini karena batas pendaftaran beasiswanya berakhir 1 jam lagi. Respon Anda:",
    options: [
      "Menolak melayani dan memintanya kembali setelah jam istirahat selesai pukul 13.00.",
      "Mengalokasikan waktu 10–15 menit untuk memeriksa kelengkapan berkas darurat tersebut sebelum pergi istirahat makan siang.",
      "Memarahi pemohon karena datang tidak tepat waktu.",
      "Meninggalkan pemohon begitu saja tanpa sepatah kata.",
      "Menyuruh satpam mengusir pemohon keluar ruangan.",
    ],
    correctIndex: 1, // B
    pointMap: [2, 5, 1, 1, 1],
    explanation: "Pelayanan publik berorientasi solusi: Meluangkan waktu singkat demi kebutuhan urgen warga tanpa mengabaikan istirahat pribadi.",
  },
  {
    id: 19,
    category: "SITUASIONAL",
    subtest: "Karakteristik Pribadi — TKP (Adaptasi Teknologi)",
    question: "Unit kerja Anda beralih dari spreadsheet mandiri ke sistem ERP cloud terintegrasi yang menuntut ketelitian input real-time. Sebagian rekan kerja merasa tertekan karena kesalahan tercatat otomatis. Sikap Anda:",
    options: [
      "Ikut memprotes kebijakan pimpinan mengenai penggunaan sistem baru.",
      "Mempelajari modul sistem secara cermat, membiasakan diri bekerja lebih teliti, dan saling mengoreksi bersama rekan kerja.",
      "Mengisi data secara asal-asalan agar target waktu terpenuhi.",
      "Meminta kembali menggunakan sistem spreadsheet manual lama.",
      "Menunggu rekan lain mahir terlebih dahulu baru ikut belajar.",
    ],
    correctIndex: 1, // B
    pointMap: [2, 5, 1, 2, 3],
    explanation: "Adaptasi dan kolaborasi: Sikap proaktif meningkatkan kompetensi dan saling mendukung akurasi tim kerja.",
  },
  {
    id: 20,
    category: "SITUASIONAL",
    subtest: "Karakteristik Pribadi — TKP (Kerjasama Tim)",
    question: "Anda memimpin tim kerja dengan latar belakang daerah yang beragam. Salah satu anggota tim sering minder dan jarang berbicara saat rapat karena merasa logat bicaranya berbeda. Sikap Anda:",
    options: [
      "Membiarkannya karena itu masalah karakter pribadinya.",
      "Memberikan kesempatan berbicara secara suportif, menghargai setiap masukannya, dan menciptakan suasana diskusi yang inklusif dan setara.",
      "Mengganti posisinya dengan anggota lain yang lebih vokal.",
      "Menertawakan logatnya sebagai bahan lelucon pencair suasana.",
      "Memberikan seluruh tugas penulisan dokumen hanya kepada anggota tersebut.",
    ],
    correctIndex: 1, // B
    pointMap: [2, 5, 2, 1, 2],
    explanation: "Kepemimpinan inklusif: Mendorong partisipasi setara dan menghormati keberagaman anggota tim.",
  },
];

export interface AssessmentRecord {
  id: string;
  timestamp: string; // ISO string
  dateDisplay: string; // DD-MM-YYYY
  timeDisplay: string; // HH:mm
  contestantId: "A" | "B" | "C" | "D";
  contestantName: string;
  phase: "pre" | "post";
  packageAssigned: "PAKET A" | "PAKET B";
  answers: Record<number, number>; // questionId -> optionIndex
  scoreGat: number; // 0 - 75
  scoreSituasional: number; // 0 - 25
  totalScore: number; // 0 - 100
  durationSeconds: number;
  passingGradeMet: boolean;
}
