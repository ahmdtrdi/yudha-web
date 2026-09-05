# Feedback YUDHA — Survei versi 2

Form `/feedback` mengumpulkan persepsi perubahan belajar dan validasi produk. Ada 10 langkah utama dan satu langkah AI Interview yang hanya muncul jika fitur tersebut pernah digunakan. Empat pertanyaan harga versi lama dihapus dari form baru.

Jawaban perubahan adalah laporan persepsi retrospektif, bukan pengukuran baseline objektif atau bukti kausal peningkatan kemampuan. Skor, akurasi, dan waktu tes sebelum–sesudah perlu dikumpulkan melalui pilot terpisah.

## Aturan pengisian

- Pertanyaan wajib mengikuti penanda pada form. Cerita perubahan, kendala, dan catatan onboarding opsional.
- Semua input teks maksimal 2.000 karakter; email divalidasi. Jawaban 0 hari dan pilihan belum bisa menilai tetap valid.
- Pilihan eksklusif menggantikan pilihan lain dalam pertanyaan yang sama. Memilih opsi biasa membatalkan pilihan eksklusif.
- Lainnya wajib disertai keterangan. Keterangan dibersihkan jika Lainnya dibatalkan.
- Jawaban AI Interview dihapus jika fitur tersebut dibatalkan. Kontak follow-up dihapus jika persetujuan ditolak.
- Pertanyaan lanjutan validasi produk tampil setelah memilih respons dan dibersihkan jika respons berubah.
- Jawaban tetap berada di state halaman ketika navigasi kembali atau pengiriman gagal; refresh/keluar halaman tidak menyimpan draf.

## Pertanyaan dan nilai jawaban

### Profil

**Nama lengkap** (wajib jika tampil)

- Field: `name`

**Alamat email** (wajib jika tampil)

- Field: `email`

**Dari mana kamu pertama kali mendengar tentang YUDHA?** (wajib jika tampil)

- Field: `source`
- Nilai: `Teman / Komunitas CPNS/BUMN` (Rekomendasi teman / Komunitas CPNS & BUMN); `TikTok / Instagram` (Media Sosial (TikTok / Instagram / X)); `Lainnya` (Lainnya).
- Keterangan Lainnya: `source_other`.

**Apa tujuan utama kamu saat mencoba YUDHA pertama kali?** (wajib jika tampil)

- Field: `goal`
- Nilai: `Persiapan SKD` (Persiapan Ujian SKD CPNS / BUMN); `Latihan interview` (Melatih Interview Berbasis AI); `Sekadar penasaran` (Sekadar Penasaran Menguji Skill); `Direkomendasikan teman` (Direkomendasikan Oleh Teman); `Lainnya` (Lainnya).
- Keterangan Lainnya: `goal_other`.

### Pengalaman awal

**Seberapa jelas panduan awal (tutorial) YUDHA dalam membantumu memahami cara bermain?** (wajib jika tampil)

- Field: `tutorial_clarity`
- Nilai: `1`; `2`; `3`; `4`; `5`; `Belum mencoba tutorial`.
- Petunjuk: 1 = Sangat membingungkan • 5 = Sangat jelas & mudah dipahami

**Apakah ada bagian tutorial atau alur awal yang menurutmu kurang jelas?** (opsional)

- Field: `onboarding_obstacles`

### Kondisi penggunaan

**Sudah berapa lama kamu menggunakan YUDHA?** (wajib jika tampil)

- Field: `usage_duration`
- Nilai: `Baru mencoba hari ini`; `2–6 hari`; `7–13 hari`; `14–28 hari`; `Lebih dari 28 hari`.

**Sebelum menggunakan YUDHA, bagaimana kamu biasanya mempersiapkan tes?** (wajib jika tampil)

- Field: `previous_preparation`
- Pilihan jamak.
- Nilai: `Belum rutin belajar`; `Buku`; `Video atau media sosial`; `Aplikasi latihan`; `Bimbel`; `Lainnya`.
- Eksklusif: Belum rutin belajar.
- Keterangan Lainnya: `previous_preparation_other`.

### Aktivitas

**Dalam 7 hari terakhir, berapa hari kamu berlatih menggunakan YUDHA?** (wajib jika tampil)

- Field: `active_days_last_week`
- Nilai: `0`; `1`; `2`; `3`; `4`; `5`; `6`; `7`.
- Petunjuk: Hitung hari, bukan jumlah sesi. Pilih 0 jika belum berlatih.

**Fitur YUDHA mana saja yang pernah kamu gunakan?** (wajib jika tampil)

- Field: `features_used`
- Pilihan jamak.
- Nilai: `PvP Battle`; `AI Interview Simulator`; `Practice Mode`; `Analytics & Stats`; `Belum mencoba fitur`.
- Eksklusif: Belum mencoba fitur.

### Validasi produk

**Jika YUDHA tiba-tiba tidak tersedia lagi besok, bagaimana perasaanmu?** (wajib jika tampil)

- Field: `pmf_score`
- Nilai: `Sangat kecewa`; `Agak kecewa`; `Tidak masalah`; `Sudah tidak pakai lagi`.

**Apa faktor utama yang membuatmu kurang tertarik atau berhenti di YUDHA?** (wajib jika tampil)

- Field: `pmf_followup`
- Jika sangat kecewa: “Nilai atau manfaat terbesar apa yang membuat YUDHA sangat berharga bagimu?”; jika agak kecewa: “Hal utama apa yang perlu ditingkatkan agar YUDHA jauh lebih bermanfaat?”; respons lain memakai pertanyaan di atas.

### Alasan kembali

**Apa yang membuatmu ingin kembali berlatih di YUDHA, jika ada?** (wajib jika tampil)

- Field: `return_reason`
- Petunjuk: Jika belum ingin kembali, kamu juga boleh menceritakannya.

### Perubahan belajar

**Dibanding sebelum menggunakan YUDHA, seberapa sering kamu sekarang berlatih soal?** (wajib jika tampil)

- Field: `practice_frequency_change`
- Nilai: `Jauh lebih jarang`; `Lebih jarang`; `Sama`; `Lebih sering`; `Jauh lebih sering`; `Belum bisa menilai`.

**Dibanding sebelum menggunakan YUDHA, bagaimana kemampuanmu mengenali materi yang perlu dipelajari lagi?** (wajib jika tampil)

- Field: `weak_topic_clarity_change`
- Nilai: `Jauh lebih sulit`; `Lebih sulit`; `Tidak berubah`; `Lebih mudah`; `Jauh lebih mudah`; `Belum bisa menilai`.

### Kesiapan dan tindakan

**Dibanding sebelum menggunakan YUDHA, bagaimana kesiapanmu mengerjakan soal dengan batas waktu?** (wajib jika tampil)

- Field: `time_pressure_readiness_change`
- Nilai: `Jauh kurang siap`; `Kurang siap`; `Tidak berubah`; `Lebih siap`; `Jauh lebih siap`; `Belum bisa menilai`.

**Apakah hasil analisis atau pembahasan YUDHA membuatmu melakukan sesuatu secara berbeda saat belajar?** (wajib jika tampil)

- Field: `learning_actions`
- Pilihan jamak.
- Nilai: `Mempelajari topik yang lemah`; `Mengubah strategi menjawab`; `Mengatur waktu latihan`; `Belum mengubah apa pun`; `Belum menggunakan fitur tersebut`; `Lainnya`.
- Eksklusif: Belum mengubah apa pun; Belum menggunakan fitur tersebut.
- Keterangan Lainnya: `learning_actions_other`.

### Latihan AI Interview (kondisional)

**Setelah latihan AI Interview, apa yang kamu ubah saat menjawab pertanyaan interview?** (wajib jika tampil)

- Field: `interview_changes`
- Pilihan jamak.
- Nilai: `Struktur jawaban`; `Contoh pengalaman yang digunakan`; `Relevansi jawaban`; `Durasi jawaban`; `Belum mengubah apa pun`; `Lainnya`.
- Eksklusif: Belum mengubah apa pun.
- Keterangan Lainnya: `interview_changes_other`.

### Pengalaman nyata

**Ceritakan satu perubahan nyata setelah memakai YUDHA, jika ada.** (opsional)

- Field: `concrete_change`
- Petunjuk: Apa yang sebelumnya sulit, lalu bagaimana kondisinya sekarang? Tidak ada perubahan juga boleh.

**Apa kendala utama yang masih menghambat persiapan ujianmu saat menggunakan YUDHA?** (opsional)

- Field: `remaining_obstacles`

### Follow-up

**Bagaimana status pendaftaran CPNS / BUMN kamu saat ini?** (wajib jika tampil)

- Field: `preparation_status`
- Nilai: `Aktif mendaftar CPNS/BUMN sekarang` (Sedang aktif mendaftar & bersiap tes periode ini); `Bersiap untuk tahun depan` (Bersiap untuk pendaftaran periode tahun depan); `Hanya mencoba-coba / tidak mendaftar` (Hanya mencoba-coba / belum ada rencana mendaftar).

**Bolehkah tim YUDHA menghubungimu dalam 2–3 bulan ke depan untuk tanya hasil tes kamu?** (wajib jika tampil)

- Field: `contact_consent`
- Nilai: `true` (Ya, tentu boleh); `false` (Tidak untuk saat ini).
- Petunjuk: Kontak digunakan untuk follow-up evaluasi perkembangan peserta.

**Nomor WhatsApp atau alamat email untuk follow-up** (wajib jika tampil)

- Field: `contact_info`
- Hanya tampil dan wajib jika `contact_consent` bernilai `true`.

## API dan kompatibilitas

- Endpoint tetap `POST /api/feedback`. Payload baru memiliki `survey_version: 2` dan field di atas. Definisi tipe, pertanyaan, dan validasi bersama berada di `src/lib/feedback.ts`.
- Jawaban yang dinormalisasi dan tervalidasi disimpan dalam `feedback_responses.answers`, termasuk versi survei. Field tidak dikenal tidak diteruskan.
- Kolom lama untuk identitas, sumber, tujuan, tutorial numerik, onboarding, PMF, alasan kembali, status, dan persetujuan tetap diisi jika maknanya sama.
- Kolom `q5_daily_battles`, Q10–Q15 bernilai null untuk versi 2; `q6_favorite_features` memakai array kosong. Fitur pernah dipakai dan kategori perubahan tetap berada di `answers`, karena maknanya berbeda dari kolom lama. Tutorial yang belum dicoba menghasilkan null di kolom numerik lama.
- Payload lama tanpa versi tetap diterima dan divalidasi menurut pilihan form lama. Data historis tidak diubah; jangan gabungkan agregat skala lama dengan kategori versi baru.
- Tidak ada migrasi schema dalam perubahan ini: API menggunakan tabel dan kolom `answers` yang sudah dipakai implementasi sebelumnya. Keberadaan dan izin insert database deployment perlu diverifikasi pada lingkungan pengujian sebelum rilis.
- Respons 200 `{ success: true }` hanya setelah insert berhasil, tanpa SELECT/readback. Browser kemudian menuju `/close?from=feedback`.
- JSON atau jawaban invalid: 400; Supabase tidak dikonfigurasi: 503; insert gagal: 500. Tidak ada sukses semu atau pencatatan respons pribadi ke log.

## Verifikasi

- Jalankan `npm run test:feedback`, `npm run lint`, `npx tsc --noEmit`, dan `npm run build`.
- Pengujian otomatis memakai mock pada batas database; tidak membaca kredensial atau memasukkan respons ke database produksi.
- Verifikasi browser mencakup desktop/mobile, keyboard, 0 hari, pilihan eksklusif, Lainnya, cabang AI Interview, kembali/maju, consent, dan kegagalan pengiriman.

## Membaca hasil

- Laporkan jumlah responden, periode pengumpulan, lama penggunaan, dan proporsi jawaban untuk setiap kategori.
- Tampilkan belum bisa menilai sebagai kelompok tersendiri; jangan mengubahnya menjadi nilai 0 atau menghilangkannya tanpa menjelaskan denominator.
- Bedakan keterlibatan pengguna, persepsi perubahan, dan hasil tes objektif. Jangan menyatakan peningkatan skor atau efek kausal hanya berdasarkan survei ini.
