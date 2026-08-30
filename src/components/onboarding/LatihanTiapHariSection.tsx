"use client";

import { useEffect, useRef, useState } from "react";

interface Feature {
  id: string;
  label: string;
  description: string;
}

const FEATURES: Feature[] = [
  {
    id: "arena-pvp",
    label: "Arena PvP",
    description:
      "Duel lawan pemain lain secara real-time. Kalah menang bukan akhir—kamu langsung dikasih tau kelemahan kamu ada di mana, dan diarahkan latihan sendiri di topik itu.",
  },
  {
    id: "analisis-performa",
    label: "Analisis Performa",
    description:
      "Semua progres kamu terekam: win rate, streak, akurasi jawaban, sampai kecepatan respons. Satu tempat buat lihat seberapa siap kamu sebenarnya.",
  },
  {
    id: "ai-interview",
    label: "AI Interview",
    description:
      "Latihan jawab pertanyaan interview langsung ke AI, dapat feedback instan soal cara jawabmu. Bukan cuma soal tertulis, tapi juga persiapan ngomong di depan pewawancara.",
  },
];

export function LatihanTiapHariSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const handleScroll = () => {
      const rect = section.getBoundingClientRect();
      const sectionHeight = rect.height;
      const viewportHeight = window.innerHeight;

      // How far the top of the section has scrolled past the top of the viewport
      const scrolled = -rect.top;
      // Total scrollable distance within the tall section
      const scrollableDistance = sectionHeight - viewportHeight;

      if (scrollableDistance <= 0) return;

      const progress = Math.max(0, Math.min(1, scrolled / scrollableDistance));

      // Map progress to 3 features: 0-0.33 = 0, 0.33-0.66 = 1, 0.66-1 = 2
      const index = Math.min(
        FEATURES.length - 1,
        Math.floor(progress * FEATURES.length)
      );

      setActiveIndex(index);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const active = FEATURES[activeIndex];

  return (
    <section ref={sectionRef} className="relative w-full bg-white font-sans py-12 sm:py-16 lg:py-20">
      <div className="w-full max-w-[1400px] mx-auto flex flex-col items-center text-center px-6">
        <div className="w-full flex flex-col items-center text-center">

          {/* Section Heading */}
          <h2 className="text-3xl sm:text-[40px] lg:text-[36px] font-extrabold text-stone-950 tracking-tight leading-[1.1] mb-2 sm:mb-3">
            Latihan tiap hari, tanpa terasa berat
          </h2>

          {/* Section Subtitle */}
          <p className="text-sm sm:text-[15px] md:text-[16px] text-stone-400 font-normal leading-relaxed max-w-[760px] mb-6 sm:mb-8">
            Yudha bikin drilling harian nempel lewat streak, duel PvP, dan progress yang keliatan tiap hari—bukan numpuk soal di last minute.
          </p>

          {/* Feature Showcase Card */}
          <div className="w-full border-[2.5px] border-stone-900 rounded-2xl sm:rounded-3xl bg-white shadow-[-4px_6px_0_rgba(0,0,0,0.9)] overflow-hidden">
            <div className="grid grid-cols-[1fr_auto_1fr] items-center min-h-[1080px] sm:min-h-[380px]">

              {/* Left: Feature Tab Labels */}
              <div className="flex flex-col justify-center gap-3 px-6 sm:px-8 lg:px-10 py-8">
                {FEATURES.map((feature, index) => (
                  <button
                    key={feature.id}
                    onClick={() => setActiveIndex(index)}
                    className={`text-left text-base sm:text-lg lg:text-xl font-semibold transition-colors duration-300 cursor-pointer ${
                      activeIndex === index
                        ? "text-stone-950"
                        : "text-stone-300 hover:text-stone-400"
                    }`}
                  >
                    {feature.label}
                  </button>
                ))}
              </div>

              {/* Center: Phone Mockup */}
              <div className="flex items-center justify-center px-2 py-6">
                <div className="relative w-[130px] sm:w-[150px] lg:w-[170px] h-[260px] sm:h-[300px] lg:h-[340px] border-[3px] border-stone-900 rounded-[26px] sm:rounded-[30px] bg-white overflow-hidden shadow-sm">
                  <div className="absolute top-2.5 left-1/2 -translate-x-1/2 w-16 h-[22px] bg-stone-900 rounded-full z-10" />
                  <div className="w-full h-full bg-stone-50" />
                </div>
              </div>

              {/* Right: Active Feature Description */}
              <div className="flex items-center px-6 sm:px-8 lg:px-10 py-8 min-h-[120px]">
                <p
                  key={active.id}
                  className="text-xs sm:text-[13px] lg:text-sm text-stone-500 leading-relaxed text-left animate-fadeIn"
                >
                  {active.description}
                </p>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
