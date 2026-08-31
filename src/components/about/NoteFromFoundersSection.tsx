import Link from "next/link";

export function NoteFromFoundersSection() {
  return (
    <section className="w-full bg-white pt-8 sm:pt-14 pb-24 sm:pb-32 lg:pb-40">
      <div className="w-full max-w-[1020px] mx-auto px-6 sm:px-10 lg:px-14">
        <div className="flex flex-col lg:flex-row justify-between items-start gap-10 lg:gap-16">

          {/* Left Column: Heading + Contact Us CTA */}
          <div className="w-full lg:w-[320px] flex-shrink-0 flex flex-col items-start">
            <h2 className="text-2xl sm:text-3xl md:text-[32px] font-[800] text-stone-950 leading-[1.18] tracking-tight mb-6 sm:mb-8">
              A note from the<br />founders
            </h2>

            {/* Contact Us Neobrutalist Blue Pill Button */}
            <Link
              href="/contact"
              className="nav-pill-btn nav-pill-blue px-7 py-2.5 text-xs sm:text-sm font-extrabold"
            >
              Contact Us
            </Link>
          </div>

          {/* Right Column: 3 Copy Paragraphs */}
          <div className="flex-1 flex flex-col space-y-5 sm:space-y-6 text-stone-600 text-xs sm:text-sm md:text-[13.5px] leading-[1.65] font-normal max-w-[560px]">
            <p>
              Yudha lahir dari pengamatan sederhana: banyak orang yang ingin lolos seleksi kerja atau kedinasan, tapi terhambat bukan karena kemampuan, melainkan karena waktu dan biaya. Mereka karyawan yang cuma punya waktu di sela kerja, mahasiswa yang baru lulus dengan tabungan terbatas, atau siapa pun yang tidak sanggup bayar bimbel jutaan rupiah untuk sekadar latihan soal.
            </p>

            <p>
              Kami percaya persiapan tes seleksi tidak seharusnya jadi barang mewah. Yudha menyusun ulang cara latihan soal GAT bekerja—mengubah drilling yang monoton jadi pertarungan PvP, mencatat setiap kelemahan lewat data, dan mengarahkan latihan berikutnya secara otomatis, sambil membiarkan niat dan kerja keras tetap jadi milik penggunanya sendiri.
            </p>

            <p>
              Tujuan kami sederhana: membuat persiapan tes seleksi bisa diakses siapa saja, di mana saja. Lebih sedikit waktu terbuang mencari soal yang tepat, lebih sedikit uang habis untuk tempat bimbel, dan lebih banyak orang yang benar-benar siap saat harinya tiba.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}
