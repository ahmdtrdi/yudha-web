import type { Metadata } from "next";
import Link from "next/link";

import { Navbar } from "@/components/Navbar";
import { FooterSection } from "@/components/onboarding/FooterSection";

export const metadata: Metadata = {
  title: "Kebijakan Privasi — YUDHA",
  description:
    "Pelajari bagaimana YUDHA mengumpulkan, menggunakan, melindungi, dan menghapus data pribadi di aplikasi dan website.",
  robots: {
    index: true,
    follow: true,
  },
};

const privacyEmail = "yudha.project67@gmail.com";
const deletionMailto =
  "mailto:yudha.project67@gmail.com?subject=Penghapusan%20Akun%20YUDHA";

const tableOfContents = [
  { href: "#ringkasan", label: "Ringkasan" },
  { href: "#data-yang-dikumpulkan", label: "Data yang dikumpulkan" },
  { href: "#penggunaan-data", label: "Cara kami menggunakan data" },
  { href: "#penyedia-layanan", label: "Penyedia layanan" },
  { href: "#retensi-data", label: "Retensi data" },
  { href: "#hak-pengguna", label: "Hak pengguna" },
  { href: "#penghapusan-akun", label: "Penghapusan akun" },
  { href: "#privasi-anak", label: "Privasi anak" },
  { href: "#kontak", label: "Kontak" },
] as const;

const dataCategories = [
  {
    title: "Akun dan profil",
    description:
      "Alamat email, nama, username, target CPNS atau BUMN, serta kredensial akun yang diproses melalui Supabase Auth. YUDHA tidak dapat melihat password dalam bentuk teks biasa.",
  },
  {
    title: "Aktivitas belajar",
    description:
      "Jawaban, penggunaan hint, waktu respons, skor, riwayat latihan, progres, streak, rekomendasi belajar, dan data analitik kemampuan yang dihasilkan dari aktivitasmu.",
  },
  {
    title: "Permainan dan ekonomi virtual",
    description:
      "Riwayat PvP, hasil pertandingan, aksi permainan, rank, leaderboard, Y-Coin, inventory, item yang digunakan, Hired Pass, dan transaksi virtual di dalam YUDHA.",
  },
  {
    title: "Notifikasi dan perangkat",
    description:
      "Preferensi notifikasi, token Firebase Cloud Messaging, ID instalasi, jenis platform, zona waktu, serta status pengiriman atau pembukaan notifikasi. YUDHA tidak mengakses lokasi GPS-mu.",
  },
  {
    title: "AI Mock Interview",
    description:
      "Perusahaan dan posisi tujuan, jawaban teks atau suara, transkrip, evaluasi, skor, ringkasan, serta konteks percakapan yang dibutuhkan untuk menjalankan simulasi wawancara.",
  },
  {
    title: "Formulir website",
    description:
      "Nama, email, WhatsApp opsional, perusahaan, pesan, tujuan open beta, persetujuan untuk dihubungi, dan jawaban survei atau feedback yang kamu kirimkan.",
  },
] as const;

const providers = [
  {
    name: "Supabase",
    purpose: "Autentikasi, database, dan penyimpanan data aplikasi serta formulir website.",
    href: "https://supabase.com/privacy",
  },
  {
    name: "Google, Firebase, dan Gemini",
    purpose: "Pengiriman push notification dan pemrosesan evaluasi AI Interview.",
    href: "https://policies.google.com/privacy",
  },
  {
    name: "Groq",
    purpose: "Transkripsi audio jawaban dan layanan AI cadangan jika diperlukan.",
    href: "https://groq.com/privacy-policy",
  },
  {
    name: "ElevenLabs",
    purpose: "Mengubah teks pertanyaan wawancara menjadi suara.",
    href: "https://elevenlabs.io/privacy-policy",
  },
  {
    name: "Vercel",
    purpose: "Hosting website dan pemrosesan teknis permintaan web.",
    href: "https://vercel.com/legal/privacy-notice",
  },
] as const;

const retentionPeriods = [
  {
    data: "Akun, belajar, PvP, dan interview",
    period: "Selama akun aktif; dihapus atau dianonimkan maksimal 30 hari setelah permintaan terverifikasi.",
  },
  {
    data: "Audio mentah interview",
    period: "Hanya sampai transkripsi atau sesi suara berakhir, kemudian dihapus.",
  },
  {
    data: "Salinan backup",
    period: "Maksimal 90 hari setelah data utama dihapus.",
  },
  {
    data: "Log teknis dan keamanan",
    period: "Maksimal 90 hari, kecuali dibutuhkan lebih lama untuk investigasi yang sah.",
  },
  {
    data: "Formulir website",
    period: "Maksimal 2 tahun atau lebih cepat jika kamu meminta penghapusan.",
  },
] as const;

const userRights = [
  "Mengetahui dan memperoleh akses ke data pribadi yang kami proses.",
  "Memperbaiki atau memperbarui data yang tidak akurat.",
  "Menarik persetujuan untuk pemrosesan yang didasarkan pada persetujuan.",
  "Mengajukan keberatan atau meminta pembatasan pemrosesan tertentu.",
  "Meminta salinan atau portabilitas data dalam format yang wajar.",
  "Meminta penghapusan akun dan data pribadi yang terkait.",
] as const;

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen overflow-x-hidden bg-[#f6f5ef] text-[#090909]">
      <div className="mx-auto w-full max-w-[1320px] px-4 pt-4 sm:px-6 sm:pt-6 lg:px-10">
        <Navbar />

        <header className="relative mt-8 overflow-hidden rounded-[28px] border-2 border-black bg-[linear-gradient(135deg,#f8ffad_0%,#dfff3f_52%,#91e7ff_100%)] px-6 py-12 shadow-[7px_8px_0_#090909] sm:mt-10 sm:px-10 sm:py-16 lg:px-16 lg:py-20">
          <div
            aria-hidden="true"
            className="absolute -right-14 -top-16 h-44 w-44 rounded-full border-2 border-black/20 bg-white/35 sm:h-60 sm:w-60"
          />
          <div className="relative max-w-4xl">
            <h1 className="max-w-3xl text-4xl font-extrabold leading-[1.02] tracking-[-0.055em] sm:text-5xl lg:text-7xl">
              Kebijakan Privasi
            </h1>
            <p className="mt-6 max-w-3xl text-base font-medium leading-7 sm:text-lg sm:leading-8">
              Kami ingin kamu memahami data apa yang YUDHA gunakan, mengapa
              data itu dibutuhkan, dan bagaimana kamu dapat mengendalikannya.
              Kebijakan ini berlaku untuk aplikasi YUDHA dan website yudha.fun.
            </p>
            <div className="mt-8 flex flex-wrap gap-3 text-sm font-bold">
              <span className="rounded-full border border-black bg-white/80 px-4 py-2">
                Berlaku 1 September 2026
              </span>
              <span className="rounded-full border border-black bg-white/80 px-4 py-2">
                Pengguna usia 13+
              </span>
            </div>
          </div>
        </header>

        <div className="grid gap-8 py-12 lg:grid-cols-[260px_minmax(0,1fr)] lg:gap-12 lg:py-16">
          <aside className="h-fit rounded-3xl border-2 border-black bg-white p-5 shadow-[5px_6px_0_#090909] lg:sticky lg:top-6">
            <h2 className="text-sm font-extrabold uppercase tracking-[0.12em]">
              Daftar isi
            </h2>
            <nav aria-label="Daftar isi kebijakan privasi" className="mt-4">
              <ol className="space-y-1">
                {tableOfContents.map((item, index) => (
                  <li key={item.href}>
                    <a
                      href={item.href}
                      className="flex min-h-11 items-center gap-3 rounded-xl px-3 py-2 text-sm font-semibold text-stone-600 transition-colors hover:bg-[#efff77] hover:text-black focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                    >
                      <span className="text-xs font-extrabold text-stone-400">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      {item.label}
                    </a>
                  </li>
                ))}
              </ol>
            </nav>
          </aside>

          <article className="min-w-0 space-y-7">
            <section
              id="ringkasan"
              className="scroll-mt-6 rounded-[28px] border-2 border-black bg-white p-6 shadow-[5px_6px_0_#090909] sm:p-8"
            >
              <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-[#527500]">
                Ringkasan
              </p>
              <h2 className="mt-2 text-2xl font-extrabold tracking-tight sm:text-3xl">
                Privasi yang mudah dipahami
              </h2>
              <p className="mt-4 leading-7 text-stone-700">
                YUDHA, atau Your Ultimate Digital Hiring Arena, bertindak
                sebagai pengendali data untuk layanan ini. Kami memproses data
                agar kamu dapat membuat akun, belajar, bermain PvP, menerima
                rekomendasi, menggunakan AI Mock Interview, dan berkomunikasi
                dengan kami melalui website.
              </p>
              <div className="mt-6 grid gap-3 sm:grid-cols-3">
                {[
                  "Kami tidak menjual data pribadi.",
                  "Kami tidak menjalankan iklan personal saat ini.",
                  "Konten interview tidak dipakai melatih model YUDHA.",
                ].map((statement) => (
                  <div
                    key={statement}
                    className="rounded-2xl border border-black bg-[#f8ffad] p-4 text-sm font-bold leading-6"
                  >
                    {statement}
                  </div>
                ))}
              </div>
            </section>

            <section
              id="data-yang-dikumpulkan"
              className="scroll-mt-6 rounded-[28px] border-2 border-black bg-white p-6 shadow-[5px_6px_0_#090909] sm:p-8"
            >
              <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-[#0874b9]">
                Data yang dikumpulkan
              </p>
              <h2 className="mt-2 text-2xl font-extrabold tracking-tight sm:text-3xl">
                Data yang dibutuhkan untuk menjalankan YUDHA
              </h2>
              <div className="mt-6 grid gap-4 md:grid-cols-2">
                {dataCategories.map((category) => (
                  <div
                    key={category.title}
                    className="rounded-2xl border border-stone-300 bg-[#fafaf7] p-5"
                  >
                    <h3 className="font-extrabold">{category.title}</h3>
                    <p className="mt-2 text-sm leading-6 text-stone-600">
                      {category.description}
                    </p>
                  </div>
                ))}
              </div>
              <div className="mt-5 rounded-2xl border border-black bg-[#e7f7ff] p-5 text-sm leading-6 text-stone-700">
                <strong className="text-black">Data yang terlihat pengguna lain.</strong>{" "}
                Username, rank, dan statistik kompetitif tertentu dapat tampil
                di leaderboard atau kepada lawan PvP. Riwayat belajar pribadi,
                isi jawaban interview, transkrip, dan evaluasi AI tidak
                ditampilkan kepada pengguna lain.
              </div>
            </section>

            <section
              id="penggunaan-data"
              className="scroll-mt-6 rounded-[28px] border-2 border-black bg-white p-6 shadow-[5px_6px_0_#090909] sm:p-8"
            >
              <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-[#527500]">
                Penggunaan data
              </p>
              <h2 className="mt-2 text-2xl font-extrabold tracking-tight sm:text-3xl">
                Mengapa kami memproses data
              </h2>
              <ul className="mt-5 grid gap-3 text-sm leading-6 text-stone-700 sm:text-base">
                {[
                  "Membuat, mengamankan, dan memulihkan akun serta sesi login.",
                  "Menjalankan latihan, pertandingan, leaderboard, progres, ekonomi virtual, dan rekomendasi belajar.",
                  "Menyediakan transkripsi, pertanyaan suara, evaluasi, dan ringkasan AI Mock Interview.",
                  "Mengirim notifikasi yang kamu aktifkan serta mencatat keberhasilan pengirimannya.",
                  "Menjawab pertanyaan, memproses pendaftaran open beta, dan menindaklanjuti feedback sesuai pilihanmu.",
                  "Mendeteksi penyalahgunaan, menjaga keamanan, memperbaiki gangguan, dan memenuhi kewajiban hukum.",
                  "Meningkatkan produk menggunakan feedback serta data agregat atau yang telah dideidentifikasi.",
                ].map((purpose) => (
                  <li key={purpose} className="flex gap-3">
                    <span
                      aria-hidden="true"
                      className="mt-2 h-2 w-2 flex-none rounded-full bg-[#527500]"
                    />
                    <span>{purpose}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-5 text-sm leading-6 text-stone-600">
                Bergantung pada konteksnya, dasar pemrosesan kami adalah
                persetujuanmu, kebutuhan untuk menyediakan layanan yang kamu
                minta, kepentingan yang sah untuk keamanan dan peningkatan
                layanan, atau kewajiban hukum.
              </p>
              <div className="mt-5 rounded-2xl border border-dashed border-stone-400 p-5 text-sm leading-6 text-stone-600">
                Website menggunakan <code>sessionStorage</code> hanya untuk
                memindahkan email secara sementara ke formulir open beta. Nilai
                tersebut dihapus setelah dibaca atau ketika sesi tab browser
                berakhir. Saat ini kami tidak memasang SDK iklan, analytics,
                atau tracking cookie sendiri.
              </div>
            </section>

            <section
              id="penyedia-layanan"
              className="scroll-mt-6 rounded-[28px] border-2 border-black bg-white p-6 shadow-[5px_6px_0_#090909] sm:p-8"
            >
              <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-[#0874b9]">
                Penyedia layanan
              </p>
              <h2 className="mt-2 text-2xl font-extrabold tracking-tight sm:text-3xl">
                Pihak yang membantu kami menyediakan layanan
              </h2>
              <p className="mt-4 leading-7 text-stone-700">
                Kami membagikan data hanya sejauh diperlukan kepada penyedia
                yang memprosesnya untuk membantu YUDHA. Masing-masing penyedia
                juga memiliki kebijakan dan lokasi pemrosesan sendiri.
              </p>
              <div className="mt-6 divide-y divide-stone-200 overflow-hidden rounded-2xl border border-stone-300">
                {providers.map((provider) => (
                  <div
                    key={provider.name}
                    className="grid gap-2 bg-[#fafaf7] p-5 sm:grid-cols-[190px_1fr_auto] sm:items-center"
                  >
                    <h3 className="font-extrabold">{provider.name}</h3>
                    <p className="text-sm leading-6 text-stone-600">
                      {provider.purpose}
                    </p>
                    <a
                      href={provider.href}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex min-h-11 items-center font-bold text-[#0874b9] underline decoration-2 underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                      style={{ color: "#0874b9" }}
                    >
                      Lihat kebijakan
                      <span className="sr-only"> {provider.name}</span>
                    </a>
                  </div>
                ))}
              </div>
              <div className="mt-5 rounded-2xl border border-black bg-[#f8ffad] p-5 text-sm leading-6 text-stone-700">
                Dalam AI Interview, Gemini menerima teks dan konteks yang
                diperlukan untuk evaluasi, Groq menerima audio saat kamu memilih
                jawaban suara, dan ElevenLabs menerima teks pertanyaan untuk
                membuat audio. Audio mentah di sistem YUDHA dihapus setelah
                transkripsi atau sesi suara berakhir. YUDHA tidak menggunakan
                jawaban, transkrip, atau evaluasi untuk melatih model AI YUDHA.
              </div>
              <p className="mt-5 text-sm leading-6 text-stone-600">
                Sebagian penyedia dapat memproses data di luar Indonesia. Kami
                membatasi data yang dikirim sesuai tujuan layanan dan menggunakan
                pengamanan kontraktual serta teknis yang tersedia. Praktik
                penyedia tetap tunduk pada kebijakan mereka masing-masing.
              </p>
            </section>

            <section
              id="retensi-data"
              className="scroll-mt-6 rounded-[28px] border-2 border-black bg-white p-6 shadow-[5px_6px_0_#090909] sm:p-8"
            >
              <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-[#527500]">
                Retensi data
              </p>
              <h2 className="mt-2 text-2xl font-extrabold tracking-tight sm:text-3xl">
                Berapa lama data disimpan
              </h2>
              <dl className="mt-6 grid gap-3">
                {retentionPeriods.map((item) => (
                  <div
                    key={item.data}
                    className="grid gap-2 rounded-2xl border border-stone-300 p-5 sm:grid-cols-[210px_1fr]"
                  >
                    <dt className="font-extrabold">{item.data}</dt>
                    <dd className="text-sm leading-6 text-stone-600">
                      {item.period}
                    </dd>
                  </div>
                ))}
              </dl>
              <p className="mt-5 text-sm leading-6 text-stone-600">
                Data tertentu dapat disimpan lebih lama jika diwajibkan hukum,
                diperlukan untuk keamanan, pencegahan penipuan, penyelesaian
                sengketa, atau audit transaksi. Aksesnya akan dibatasi dan data
                akan dihapus atau dianonimkan setelah kebutuhan tersebut berakhir.
              </p>
            </section>

            <section
              id="hak-pengguna"
              className="scroll-mt-6 rounded-[28px] border-2 border-black bg-white p-6 shadow-[5px_6px_0_#090909] sm:p-8"
            >
              <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-[#0874b9]">
                Hak pengguna
              </p>
              <h2 className="mt-2 text-2xl font-extrabold tracking-tight sm:text-3xl">
                Kamu tetap memegang kendali
              </h2>
              <p className="mt-4 leading-7 text-stone-700">
                Sesuai hukum yang berlaku, termasuk{" "}
                <a
                  href="https://peraturan.bpk.go.id/Details/229798/uu-no-27-tahun-2022"
                  target="_blank"
                  rel="noreferrer"
                  className="font-bold text-[#0874b9] underline decoration-2 underline-offset-4"
                  style={{ color: "#0874b9" }}
                >
                  Undang-Undang Nomor 27 Tahun 2022 tentang Pelindungan Data
                  Pribadi
                </a>
                , kamu dapat:
              </p>
              <ul className="mt-5 grid gap-3 sm:grid-cols-2">
                {userRights.map((right) => (
                  <li
                    key={right}
                    className="rounded-2xl border border-stone-300 bg-[#fafaf7] p-4 text-sm font-semibold leading-6"
                  >
                    {right}
                  </li>
                ))}
              </ul>
              <p className="mt-5 text-sm leading-6 text-stone-600">
                Kami dapat meminta informasi yang wajar untuk memverifikasi
                identitasmu sebelum memenuhi permintaan. Beberapa hak dapat
                dibatasi jika hukum mengizinkan atau mewajibkannya.
              </p>
            </section>

            <section
              id="penghapusan-akun"
              className="scroll-mt-6 rounded-[28px] border-2 border-black bg-[#8edfff] p-6 shadow-[6px_7px_0_#090909] sm:p-8"
            >
              <p className="text-xs font-extrabold uppercase tracking-[0.16em]">
                Penghapusan akun
              </p>
              <h2 className="mt-2 text-2xl font-extrabold tracking-tight sm:text-3xl">
                Ingin menghapus akun dan datamu?
              </h2>
              <p className="mt-4 max-w-3xl leading-7">
                Kirim permintaan dari alamat email yang terdaftar pada akunmu
                dengan subjek <strong>“Penghapusan Akun YUDHA”</strong>. Sertakan
                username jika tersedia, tetapi jangan pernah mengirim password.
                Kamu juga dapat memakai formulir kontak kami.
              </p>
              <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <a
                  href={deletionMailto}
                  className="inline-flex min-h-12 items-center justify-center rounded-xl border-2 border-black bg-black px-5 py-3 text-center text-sm font-extrabold text-white transition-transform hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                  style={{ color: "#ffffff" }}
                >
                  Kirim email penghapusan
                </a>
                <Link
                  href="/contact"
                  className="inline-flex min-h-12 items-center justify-center rounded-xl border-2 border-black bg-white px-5 py-3 text-center text-sm font-extrabold shadow-[3px_3px_0_#090909] transition-transform hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                >
                  Gunakan formulir kontak
                </Link>
              </div>
              <p className="mt-5 text-sm font-semibold leading-6">
                Setelah permintaan terverifikasi, data akan dihapus atau
                dianonimkan maksimal 30 hari. Salinan pada backup dapat bertahan
                hingga 90 hari sebelum terhapus melalui siklus backup normal.
              </p>
            </section>

            <section
              id="privasi-anak"
              className="scroll-mt-6 rounded-[28px] border-2 border-black bg-white p-6 shadow-[5px_6px_0_#090909] sm:p-8"
            >
              <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-[#527500]">
                Privasi anak
              </p>
              <h2 className="mt-2 text-2xl font-extrabold tracking-tight sm:text-3xl">
                YUDHA ditujukan untuk pengguna berusia 13 tahun ke atas
              </h2>
              <p className="mt-4 leading-7 text-stone-700">
                Pengguna berusia 13 hingga 17 tahun hanya boleh menggunakan
                YUDHA dengan izin orang tua atau wali. Kami tidak dengan sengaja
                meminta atau mengumpulkan data anak di bawah 13 tahun. Jika kamu
                adalah orang tua atau wali dan yakin seorang anak di bawah 13
                tahun telah memberikan data kepada kami, hubungi kami agar data
                tersebut dapat ditinjau dan dihapus.
              </p>
            </section>

            <section
              id="kontak"
              className="scroll-mt-6 rounded-[28px] border-2 border-black bg-white p-6 shadow-[5px_6px_0_#090909] sm:p-8"
            >
              <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-[#0874b9]">
                Keamanan, perubahan, dan kontak
              </p>
              <h2 className="mt-2 text-2xl font-extrabold tracking-tight sm:text-3xl">
                Ada pertanyaan tentang privasimu?
              </h2>
              <p className="mt-4 leading-7 text-stone-700">
                Kami menggunakan pengamanan yang wajar, termasuk koneksi
                terenkripsi, autentikasi, pembatasan akses berbasis peran, dan
                kebijakan akses database. Namun, tidak ada sistem elektronik
                yang dapat dijamin sepenuhnya aman.
              </p>
              <p className="mt-4 leading-7 text-stone-700">
                Kebijakan ini dapat diperbarui ketika fitur, penyedia, atau
                aturan yang berlaku berubah. Tanggal pembaruan akan ditampilkan
                di bagian atas halaman, dan perubahan penting akan kami
                komunikasikan melalui cara yang sesuai.
              </p>
              <div className="mt-6 rounded-2xl border-2 border-black bg-[#f8ffad] p-5">
                <p className="text-sm font-semibold text-stone-600">
                  Pengendali data
                </p>
                <p className="mt-1 font-extrabold">
                  YUDHA — Your Ultimate Digital Hiring Arena
                </p>
                <a
                  href={`mailto:${privacyEmail}`}
                  className="mt-3 inline-flex min-h-11 items-center font-extrabold text-[#0874b9] underline decoration-2 underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                  style={{ color: "#0874b9" }}
                >
                  {privacyEmail}
                </a>
                <span className="mx-3 hidden text-stone-400 sm:inline">•</span>
                <Link
                  href="/contact"
                  className="inline-flex min-h-11 items-center font-extrabold text-[#0874b9] underline decoration-2 underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                  style={{ color: "#0874b9" }}
                >
                  Formulir kontak
                </Link>
              </div>
            </section>
          </article>
        </div>
      </div>

      <FooterSection />
    </main>
  );
}
