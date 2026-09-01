"use client";

import { LazyImage } from "@/components/ui/LazyImage";

export function CartesiusMapSection() {
  return (
    <section className="w-full py-12 sm:py-16 lg:py-20 px-6 sm:px-10 lg:px-14 bg-white flex flex-col items-center justify-center text-center">
      <div className="w-full max-w-[1200px] mx-auto flex flex-col items-center">

        {/* Section Heading - Single line on desktop/tablet matching Figma design */}
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-[38px] font-extrabold text-stone-950 tracking-tight leading-tight max-w-[960px] mb-4 sm:mb-5">
          Satu kemampuan, ratusan pintu terbuka
        </h2>

        {/* Section Subtitle - Soft color, elegant sizing, 2 lines matching design */}
        <p className="text-sm sm:text-base md:text-[17px] text-stone-400 font-normal leading-relaxed max-w-[680px] mb-10 sm:mb-14 lg:mb-16">
          Institusi pemerintah, BUMN, swasta, sampai beasiswa—semua pakai GAT (General Aptitude Test) sebagai saringan awal. Yudha bantu kamu siap untuk semuanya.
        </p>

        {/* Cartesius Map Diagram - Proportional sizing with spacious breathing room */}
        <div className="w-full max-w-[720px] md:max-w-[780px] lg:max-w-[820px] mx-auto mb-10 sm:mb-14 lg:mb-16 flex justify-center items-center">
          <LazyImage
            src="/assets/cartesius-map.png"
            alt="Diagram Tingkat Keketatan vs Tingkat Kompleksitas Soal GAT"
            width={1000}
            height={560}
            className="w-full h-auto object-contain select-none"
          />
        </div>

        {/* Section Footer / Description Text - Soft caption */}
        <div className="text-xs sm:text-sm md:text-[15px] text-stone-400 font-normal leading-relaxed max-w-[640px] space-y-1">
          <p>Semakin ke kanan, soal makin kompleks. Semakin ke atas, seleksi makin ketat.</p>
          <p>Yudha melatih kamu di semua level.</p>
        </div>

      </div>
    </section>
  );
}

