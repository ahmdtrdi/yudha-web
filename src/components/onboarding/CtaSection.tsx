"use client";

import Image from "next/image";

export function CtaSection() {
  return (
    <section className="w-full px-8 sm:px-10 lg:px-8 py-8 sm:py-12 lg:py-[60px] font-sans bg-white flex justify-center">
      <div className="relative w-full max-w-[1280px] rounded-[28px] sm:rounded-[36px] overflow-hidden min-h-[720px] sm:min-h-[400px] lg:min-h-[680px] flex flex-col items-center justify-start">

        {/* Background Image */}
        <Image
          src="/assets/Gambar Watercolor Chibi.png"
          alt="Watercolor chibi characters resting on a hill"
          fill
          className="object-cover object-bottom"
          priority={false}
        />

        {/* Content overlay */}
        <div className="relative z-10 flex flex-col items-center text-center pt-10 sm:pt-14 lg:pt-16 px-6">

          {/* Heading — 48px white bold */}
          <h2 className="text-3xl sm:text-[40px] lg:text-[48px] font-extrabold text-white tracking-tight leading-[1.1] mb-2 sm:mb-3 drop-shadow-[0_2px_8px_rgba(0,0,0,0.25)]">
            Latihan dimulai sekarang
          </h2>

          {/* Subheading — 24px white */}
          <p className="text-lg sm:text-[22px] lg:text-[24px] text-white/90 font-medium leading-relaxed mb-6 sm:mb-8 drop-shadow-[0_1px_4px_rgba(0,0,0,0.2)]">
            akses soal dimana saja, kapan saja
          </p>

          {/* CTA Button - Matches Figma Blue Button */}
          <a
            href="#"
            className="nav-pill-btn nav-pill-blue px-8 sm:px-10 py-3 sm:py-3.5 text-sm sm:text-base font-extrabold cursor-pointer"
          >
            Daftar
          </a>

        </div>

      </div>
    </section>
  );
}
