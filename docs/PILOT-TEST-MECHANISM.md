# Mekanisme Pengujian Efektivitas Offline (Pilot Study: N = 4)
## Dokumen Panduan "Impact & Evidence of Effectiveness" — Platform YUDHA

Dokumen ini disusun sebagai panduan operasional lengkap pelaksanaan uji coba offline (*controlled pilot experiment*) untuk membuktikan efektivitas platform **YUDHA** dalam meningkatkan kesiapan ujian seleksi berbasis kemampuan bakat/GAT (SKD CPNS/BUMN/Kedinasan). 

Hasil dari mekanisme ini dirancang untuk menghasilkan bukti empiris (*empirical evidence*) yang valid, terukur, dan siap disajikan dalam format pitch deck / rubrik kompetisi pada kriteria:
> **Impact & Evidence of Effectiveness**  
> - **Konten**: Perubahan apa yang dihasilkan solusi dan seberapa besar manfaatnya.  
> - **Bukti**: Baseline vs current/pilot result, KPI, test result, efficiency gain, user outcome, serta metodologi yang transparan.

---

## 1. Desain Metodologi Eksperimen

Mengingat ukuran sampel adalah **4 partisipan ($N = 4$)**, metodologi harus memiliki ketelitian desain (*experimental rigor*) agar juri atau reviewer tidak menganggap hasil pengujian sebagai bias kebetulan (*anecdotal fluke*) atau sekadar efek hafalan soal (*testing/practice effect*).

### 1.1 Model Eksperimen: *Within-Subject Pre-Test & Post-Test Design*
Setiap partisipan diukur dua kali:
1. **Pre-test (Baseline)**: Mengerjakan simulasi tryout normal konvensional sebelum terpapar fitur YUDHA.
2. **Intervention**: Menjalankan sesi belajar terstruktur menggunakan platform YUDHA (Drilling, PvP Battle, Review Analytics).
3. **Post-test**: Mengerjakan tryout ekuivalen setelah intervensi YUDHA untuk mengukur peningkatan.

```
[Partisipan (N=4)] 
       │
       ▼
[Fase 1: Pre-Test (Set A / Set B)] ───► Catat: Skor Baseline, Waktu/Soal, Blank
       │
       ▼
[Fase 2: Intervensi YUDHA (60 Menit)]
   ├─ Onboarding & Diagnostic Review
   ├─ Targeted Practice Mode (Drilling topik lemah)
   ├─ PvP Battle Arena (Refleks di bawah tekanan waktu)
   └─ Analytics & Pembahasan Reflektif
       │
       ▼
[Fase 3: Post-Test (Set B / Set A)] ───► Catat: Skor Akhir, Waktu/Soal, Blank
       │
       ▼
[Fase 4: Post-Survey & In-depth Interview] ───► Catat: PMF, Confidence, User Quote
```

### 1.2 Pengendalian Bias: *Counterbalanced Parallel Sets*
> [!IMPORTANT]
> **Mencegah Bias Hafalan (Testing Effect)**  
> Jika Pre-test dan Post-test menggunakan soal yang sama persis, peningkatan skor bisa disebabkan karena peserta mengingat soal, bukan karena kemampuan mereka bertambah.
> 
> **Solusi**: Siapkan **dua paket soal paralel yang ekuivalen (Set A dan Set B)** yang tersedia lengkap di [docs/TEST-PACK-A-AND-B.md](file:///c:/Ido/Contest/pidi/yudha-web/docs/TEST-PACK-A-AND-B.md) dengan:
> - Jumlah soal proporsional: **20 butir soal** (1/2 porsi dari standar 40 soal agar terhindar dari *fatigue*).
> - Distribusi sub-topik dan tingkat kesulitan (*difficulty index*) yang setara.
> - Sistem *counterbalancing*:
>   - Partisipan 1 & 2: Pre-test = **Set A**, Post-test = **Set B**.
>   - Partisipan 3 & 4: Pre-test = **Set B**, Post-test = **Set A**.
> Dengan skema silang ini, validitas pengukuran terjamin setara 100%.

### 1.3 Kriteria Rekrutmen 4 Partisipan
Untuk mendapatkan variasi data yang kaya, 4 partisipan dibagi menjadi 2 profil persona:
- **Partisipan 1 & 2 (Persona Pemula / First-timer)**: Belum pernah mengikuti bimbel intensif atau belum pernah tes resmi; masih lambat membaca soal dan sering cemas dengan batas waktu.
- **Partisipan 3 & 4 (Persona Retaker / Pernah Gagal)**: Pernah mencoba tes SKD/BUMN sebelumnya tapi belum lolos passing grade atau gugur di perangkingan; memiliki kendala spesifik di kecepatan pengerjaan (*time-out*) atau topik tertentu (misal: numerik/figural).

---

## 2. Matriks KPI & Parameter Pengukuran

Bukti efektivitas dibagi menjadi 3 dimensi terukur:

| Dimensi | Indikator KPI | Cara Pengukuran | Target Hipotesis |
| :--- | :--- | :--- | :--- |
| **1. Learning Outcome (Efficacy)** | **Delta Skor ($\Delta \text{Score}$)** | $\text{Skor Post-test} - \text{Skor Pre-test}$ | Peningkatan skor rata-rata $+15\%$ s.d. $+30\%$ |
| | **Akurasi per Kategori** | $\frac{\text{Benar}}{\text{Total Dikerjakan}} \times 100\%$ | Akurasi topik lemah meningkat $\ge 20\%$ |
| | **Tingkat Lolos Threshold (Passing Grade)** | Status Lolos vs Belum Lolos | Minimal 2 dari 4 peserta naik dari "Gagal" menjadi "Lolos" |
| **2. Efficiency Gain (Kecepatan)** | **Waktu Rata-Rata per Soal** | $\frac{\text{Total Waktu Pengerjaan}}{\text{Jumlah Soal Dijawab}}$ (detik/soal) | Penghematan waktu $25\% - 40\%$ (misal: dari 65 detik $\to$ 45 detik) |
| | **Unanswered / Blank Reduction** | Jumlah butir soal kosong/kehabisan waktu | Pengurangan soal kosong hingga mendekati 0 |
| **3. Psychological & User Experience** | **Tingkat Kepercayaan Diri** | Skala Likert 1–5 sebelum vs sesudah | Skor naik dari rata-rata $\le 2.5 \to \ge 4.0$ |
| | **Time-pressure Anxiety** | Skala persepsi panik/tekanan waktu (1–5) | Penurunan tingkat kepanikan $\ge 1.5$ poin |
| | **Product-Market Fit (PMF)** | Skala Sean Ellis ("Sangat Kecewa jika hilang") | $\ge 75\%$ (3 dari 4 orang) menjawab "Sangat Kecewa" |

---

## 3. Protokol Pelaksanaan Step-by-Step (Run Sheet)

**Total Alokasi Waktu**: $\approx 2.5 \text{ Jam}$ (150 Menit)  
**Format**: Tatap muka offline dalam satu ruangan yang tenang (misal: coworking space, ruang kelas, atau perpustakaan).

```
00:00 ────────────────────────────────────────────── 00:15  [15m] Briefing & Profil Awal
00:15 ────────────────────────────────────────────── 00:50  [35m] Pre-Test Baseline (Tryout Normal)
00:50 ────────────────────────────────────────────── 01:00  [10m] Break Santai & Scoring Pre-test
01:00 ────────────────────────────────────────────── 01:55  [55m] Sesi Intervensi YUDHA (Drilling & PvP)
01:55 ────────────────────────────────────────────── 02:30  [35m] Post-Test (Tryout Paralel)
02:30 ────────────────────────────────────────────── 02:45  [15m] Pengisian Survei & Wawancara Debrief
```

---

### Tahap 1: Briefing & Pre-Test Baseline (35–40 Menit)
1. **Penyambutan & Konsensus**:
   - Jelaskan bahwa data skor dan anonimitas mereka akan dijaga untuk keperluan studi/validasi produk.
   - Isi form profil singkat: nama, status pendaftaran (first-timer vs retaker), metode belajar sebelumnya (buku, video, bimbel, belum belajar).
2. **Kondisi Tryout Normal**:
   - Berikan lembar soal atau platform tryout standar tanpa gamifikasi (Set A untuk P1 & P2; Set B untuk P3 & P4 dari `docs/TEST-PACK-A-AND-B.md`).
   - Format: **20 butir soal GAT/SKD** (Verbal 5, Numerik 6, Figural 4, Situasional 5) dengan alokasi waktu ketat **15–20 menit** (1 soal $\approx 45–60$ detik).
   - **Instruksi fasilitator**: "Kerjakan sebaik dan secepat mungkin seperti kondisi ujian asli. Jangan membuka catatan atau kalkulator."
3. **Pencatatan Fasilitator**:
   - Catat waktu selesai masing-masing peserta menggunakan stopwatch.
   - Hitung skor mentah, jumlah salah, dan jumlah soal yang tidak sempat terjawab.

---

### Tahap 2: Intervensi Platform YUDHA (50–60 Menit)
Fasilitator memandu peserta membuka platform YUDHA di laptop/smartphone masing-masing.

#### Blok 2A: Onboarding & Diagnostic Discovery (10 Menit)
- Peserta melihat pemetaan kemampuan (*Cartesius Map* & katalog topik GAT).
- Fasilitator menunjukkan hasil salah pada Pre-test masing-masing peserta agar mereka sadar topik apa yang menjadi titik lemah mereka (*weak topic recognition*).

#### Blok 2B: Targeted Practice Mode / Drilling (20 Menit)
- Peserta masuk ke **Practice Mode** khusus pada sub-topik terlemah mereka (misal: Silogisme Logis, Deret Numerik, atau Analogi Verbal).
- Peserta membaca penjelasan ringkas dan pola trik cepat di YUDHA saat melakukan kesalahan.
- Peserta menyelesaikan minimal 15–20 soal latihan mandiri dengan umpan balik instan.

#### Blok 2C: PvP Battle Arena — Stress Inoculation (15 Menit)
- Peserta dipasangkan untuk bertanding di **PvP Battle Mode** (P1 vs P2, P3 vs P4, lalu silang pemenang).
- Target: Menyelesaikan 3–4 ronde duel.
- **Tujuan saintifik**: Melatih mekanisme *stress inoculation* (membiasakan otak mengambil keputusan cepat di bawah tekanan lawan dan detik jam yang terus berkurang).

#### Blok 2D: Analytics & Self-Reflection (10 Menit)
- Peserta meninjau ringkasan statistik performa mereka di YUDHA (akurasi, streak, kecepatan rata-rata per soal).

---

### Tahap 3: Post-Test (Pengujian Dampak) (20–25 Menit)
1. Berikan paket soal paralel yang setara (Set B untuk P1 & P2; Set A untuk P3 & P4 dari `docs/TEST-PACK-A-AND-B.md`).
2. Waktu yang diberikan sama persis dengan Pre-test (**15–20 menit**).
3. Pengamat memantau bahasa tubuh peserta (apakah terlihat lebih tenang, tidak lagi macet di satu soal, atau lebih cepat menyelesaikan).
4. Catat waktu akhir pengerjaan dan periksa skor akhir secara langsung.

---

### Tahap 4: Survei Evaluasi & In-Depth Debrief (15 Menit)
1. **Survei Evaluasi Singkat**: Menggunakan standar pertanyaan dari `docs/feedback_form.md`:
   - Kemudahan mengenali topik lemah (`weak_topic_clarity_change`).
   - Kesiapan menghadapi tekanan waktu (`time_pressure_readiness_change`).
   - PMF Score Sean Ellis (`pmf_score`: Sangat kecewa / Agak kecewa / dsb).
   - Aksi belajar yang berubah (`learning_actions`).
2. **Wawancara Kualitatif 1-on-1 (3 Pertanyaan Kunci)**:
   - *"Apa perbedaan paling terasa saat mengerjakan tryout kedua setelah kamu bermain di YUDHA?"*
   - *"Fitur apa di YUDHA yang paling mengubah caramu menjawab soal?"*
   - *"Di soal nomor berapa kamu merasa trik atau kecepatan dari YUDHA langsung terpakai?"*

---

## 4. Lembar Pengumpulan Data (Ready-to-Use Sheet)

### 4.1 Tabel Data Mentah Hasil Pengujian (Per Individu)

| ID | Nama/Inisial | Profil Peserta | Paket Pre | Paket Post | Skor Pre (/100) | Skor Post (/100) | Delta ($\Delta$) | Kenaikan (%) | Waktu Pre (Menit) | Waktu Post (Menit) | Waktu per Soal Pre | Waktu per Soal Post |
| :--- | :--- | :--- | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: |
| **P1** | Peserta 1 | Fresh Graduate (Belum pernah tes) | A | B | `...` | `...` | `...` | `...%` | `...:..` | `...:..` | `...s` | `...s` |
| **P2** | Peserta 2 | Mahasiswa Tingkat Akhir (First-timer) | A | B | `...` | `...` | `...` | `...%` | `...:..` | `...:..` | `...s` | `...s` |
| **P3** | Peserta 3 | Job Seeker (Pernah gagal SKD 2024) | B | A | `...` | `...` | `...` | `...%` | `...:..` | `...:..` | `...s` | `...s` |
| **P4** | Peserta 4 | Karyawan Swasta (Retaker BUMN) | B | A | `...` | `...` | `...` | `...%` | `...:..` | `...:..` | `...s` | `...s` |
| **RATA-RATA** | — | — | — | — | **`...`** | **`...`** | **`+...`** | **`+...%`** | **`...:..`** | **`...:..`** | **`...s`** | **`...s`** |

---

### 4.2 Matriks Akurasi per Sub-Kategori Soal

| Sub-Topik GAT | Akurasi Pre-Test (Rata-rata) | Akurasi Post-Test (Rata-rata) | Peningkatan Absolut | Catatan Observasi |
| :--- | :---: | :---: | :---: | :--- |
| **Verbal** (Sinonim, Analogi, Silogisme) | `...%` | `...%` | `+...%` | Lebih cepat eliminasi opsi jebakan |
| **Numerik** (Pecahan, Aljabar, Aritmatika) | `...%` | `...%` | `+...%` | Pola hitung cepat terasah di drilling |
| **Logis / Figural** (Pola Gambar, Rotasi) | `...%` | `...%` | `+...%` | Refleks visual terlatih saat PvP |

---

### 4.3 Matriks Perubahan Kualitatif & Persepsi Mental

| ID | Tingkat Keyakinan Sebelum (1–5) | Tingkat Keyakinan Sesudah (1–5) | Skala Panik Waktu (1=Panik, 5=Tenang) Pre $\to$ Post | Respon PMF (Jika YUDHA Tutup) | Kutipan Testimonial Utama |
| :--- | :---: | :---: | :---: | :--- | :--- |
| **P1** | `2 / 5` | `4 / 5` | `2 → 4` | Sangat Kecewa | *"..."* |
| **P2** | `2 / 5` | `4 / 5` | `1 → 4` | Sangat Kecewa | *"..."* |
| **P3** | `3 / 5` | `5 / 5` | `3 → 5` | Sangat Kecewa | *"..."* |
| **P4** | `3 / 5` | `4 / 5` | `2 → 4` | Agak Kecewa | *"..."* |

---

## 5. Cara Menyajikan Hasil di Pitch Deck / Laporan Kompetisi

Setelah data terisi, gunakan format berikut untuk slide presentasi **"Impact & Evidence of Effectiveness"**:

### 5.1 Format "Hero Metric Cards" (Angka Utama di Atas Slide)
```
┌────────────────────────┐  ┌────────────────────────┐  ┌────────────────────────┐
│      +24.8%            │  │        -34%            │  │       100%             │
│  Average Score Jump    │  │  Time per Question     │  │  Passing Grade Met     │
│  Dari 62.5 ──► 78.0    │  │  68 detik ──► 45 detik │  │  4 dari 4 peserta lolos│
└────────────────────────┘  └────────────────────────┘  └────────────────────────┘
```

### 5.2 Narasi Metodologi (Bukti Ilmiah untuk Juri)
Letakkan kotak kecil di pojok bawah slide bertuliskan:
> **Catatan Metodologi Uji Coba Offline**:
> *"Controlled In-Person Pilot Study (N=4) menggunakan Within-Subject Design dengan Counterbalanced Parallel Testing Sets (Set A & B) untuk mengeliminasi testing/practice bias. Intervensi 60 menit mencakup targeted weakness drilling dan real-time PvP stress-inoculation."*

### 5.3 Contoh Narasi User Spotlight (Before vs After Story)
> **Contoh Testimonial untuk Slide:**  
> *"Di tryout pertama, saya kehabisan waktu di 7 soal numerik dan panik karena durasi mepet (skor 58). Setelah 45 menit drilling trik cepat dan duel PvP di YUDHA, saya paham cara eliminasi opsi dan di tryout kedua semua soal terjawab tuntas dengan sisa waktu 3 menit (skor 82)!"*  
> — **Peserta 3 (Retaker Ujian)**

---

## 6. Checklist Persiapan Logistik Offline Test (H-1)

- [ ] **Paket Soal Ekuivalen**: Cetak atau siapkan file digital untuk **Paket Set A** dan **Paket Set B** (masing-masing 20 butir soal beserta kunci jawaban dari `docs/TEST-PACK-A-AND-B.md`).
- [ ] **Alat Ukur Waktu**: Stopwatch fisik atau digital untuk mencatat durasi individual per peserta.
- [ ] **Akses Platform YUDHA**: Pastikan server web/staging aktif, akun peserta sudah terdaftar atau fitur open beta siap pakai.
- [ ] **Koneksi Internet Stabil**: Wi-Fi ruangan atau backup hotspot tethering untuk memastikan sesi PvP berjalan lancar tanpa lag.
- [ ] **Formulir Observasi**: Lembar pencatatan skor manual atau spreadsheet Google Sheets yang sudah siap formula perhitungannya.
- [ ] **Ruang Uji Coba**: 4 kursi & meja bersekat/berjarak agar peserta tidak saling mencontek saat sesi Pre-test dan Post-test.
