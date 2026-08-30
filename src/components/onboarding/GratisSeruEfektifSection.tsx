"use client";

export function GratisSeruEfektifSection() {
  return (
    <section className="w-full bg-[#9DD8F5] rounded-[28px] sm:rounded-[36px] py-10 sm:py-12 lg:py-14 px-5 sm:px-8 lg:px-10 flex flex-col items-center text-center font-sans my-4 sm:my-6 lg:my-8">
      <div className="w-full max-w-[1020px] flex flex-col items-center">

        {/* Heading — 48px bold per Figma */}
        <h2 className="text-3xl sm:text-[40px] lg:text-[48px] font-extrabold text-stone-950 tracking-tight leading-[1.1] mb-2 sm:mb-3">
          gratis. seru. efektif
        </h2>

        {/* Subtitle — 16px, line break after first sentence per Figma */}
        <p className="text-sm sm:text-[15px] md:text-[16px] text-stone-700/60 font-normal leading-relaxed max-w-[740px] mb-5 sm:mb-6">
          Latihan di Yudha itu seru, hemat waktu, dan murah!
          <br />
          Dengan sistem drilling singkat dan cepat, kamu akan menjawab soal, membuka level baru, sekaligus mengasah kemampuan yang paling sering diuji di tes seleksi: verbal, numerik, logika, dan figural.
        </p>

        {/* Video Card — left+bottom black shadow per Figma */}
        <div className="w-full aspect-video border-[2.5px] border-stone-900 rounded-2xl sm:rounded-3xl bg-white shadow-[-4px_6px_0_rgba(0,0,0,0.9)] overflow-hidden flex items-center justify-center">
          <span className="text-stone-300 text-sm font-medium select-none">Video Demo</span>
        </div>

      </div>
    </section>
  );
}
