export function OurMissionSection() {
  return (
    <section className="w-full bg-white pt-10 sm:pt-14 pb-16 sm:pb-24">
      <div className="w-full max-w-[800px] mx-auto px-6 sm:px-10 flex flex-col items-center text-center">
        {/* Kicker */}
        <span className="text-xs sm:text-sm font-semibold text-stone-900 mb-4 sm:mb-5">
          Our Mission
        </span>

        {/* Heading: Exactly 2 lines "Mengapa kami" / "membangun Yudha." */}
        <h2 className="text-2xl sm:text-3xl md:text-[32px] font-[800] text-stone-950 leading-[1.2] tracking-tight mb-6 sm:mb-8">
          Mengapa kami<br />membangun Yudha.
        </h2>

        {/* Body Paragraph: 3 lines matching Figma */}
        <p className="text-xs sm:text-sm md:text-[14.5px] text-stone-600 font-normal leading-[1.65] max-w-[460px]">
          Kebanyakan orang yang mau lolos tes seleksi tidak pernah dapat cara belajar yang benar-benar cocok buat mereka. Yang ada cuma tumpukan soal, tanpa arah, tanpa progress yang kelihatan.
        </p>
      </div>
    </section>
  );
}
