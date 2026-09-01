"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Image from "next/image";

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

const SCREENS = [
  {
    key: "arena-main",
    src: "/assets/M-Arena.png",
    alt: "Tampilan Arena PvP Yudha",
  },
  {
    key: "arena-question",
    src: "/assets/M-Arena-Question.png",
    alt: "Tampilan Soal Duel Arena PvP Yudha",
  },
  {
    key: "profile",
    src: "/assets/M-Profile.png",
    alt: "Tampilan Analisis Performa Profil Yudha",
  },
  {
    key: "interview",
    src: "/assets/M-Interview-Speak.png",
    alt: "Tampilan AI Interview Simulasi Suara Yudha",
  },
];

function WordRevealText({ text, progress }: { text: string; progress: number }) {
  const words = text.split(" ");

  return (
    <p className="text-sm sm:text-[15px] lg:text-[16px] leading-[1.7] font-medium text-left select-none">
      {words.map((word, i) => {
        const start = i / words.length;
        const end = (i + 1) / words.length;
        const wordFraction = Math.max(0, Math.min(1, (progress - start) / (end - start || 0.01)));
        const opacity = 0.2 + 0.8 * wordFraction;
        const isLit = wordFraction >= 0.4;

        return (
          <span
            key={i}
            className="inline-block mr-[0.26em] transition-opacity duration-75"
            style={{
              opacity: opacity,
              color: isLit ? "#090909" : "#a8a29e",
              fontWeight: isLit ? 600 : 400,
            }}
          >
            {word}
          </span>
        );
      })}
    </p>
  );
}

export function LatihanTiapHariSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  const handleScroll = useCallback(() => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const scrollable = rect.height - window.innerHeight;
    if (scrollable <= 0) return;

    const progress = Math.max(0, Math.min(1, -rect.top / scrollable));
    setScrollProgress(progress);
  }, []);

  useEffect(() => {
    let animFrame: number;

    const onScroll = () => {
      cancelAnimationFrame(animFrame);
      animFrame = requestAnimationFrame(handleScroll);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(animFrame);
    };
  }, [handleScroll]);

  // Phase computation:
  // Phase 1a: Arena PvP (M-Arena.png) + word fade in (0.00 -> 0.22)
  // Phase 1b: Arena PvP Question (M-Arena-Question.png) + full text stays (0.22 -> 0.38)
  // Phase 2:  Analisis Performa (M-Profile.png) + word fade in (0.38 -> 0.70)
  // Phase 3:  AI Interview (M-Interview-Speak.png) + word fade in (0.70 -> 1.00)

  let activeIndex = 0;
  let activeImageKey = "arena-main";
  let wordProgress = 0;

  if (scrollProgress < 0.22) {
    activeIndex = 0;
    activeImageKey = "arena-main";
    wordProgress = Math.min(1, scrollProgress / 0.20);
  } else if (scrollProgress < 0.38) {
    activeIndex = 0;
    activeImageKey = "arena-question";
    wordProgress = 1.0;
  } else if (scrollProgress < 0.70) {
    activeIndex = 1;
    activeImageKey = "profile";
    wordProgress = Math.min(1, Math.max(0, (scrollProgress - 0.38) / (0.64 - 0.38)));
  } else {
    activeIndex = 2;
    activeImageKey = "interview";
    wordProgress = Math.min(1, Math.max(0, (scrollProgress - 0.70) / (0.95 - 0.70)));
  }

  const activeFeature = FEATURES[activeIndex];

  const handleTabClick = (index: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const scrollable = rect.height - window.innerHeight;
    const currentScrollY = window.scrollY || window.pageYOffset;
    const sectionTop = currentScrollY + rect.top;

    let targetProgress = 0.05;
    if (index === 1) targetProgress = 0.48;
    if (index === 2) targetProgress = 0.82;

    window.scrollTo({
      top: sectionTop + targetProgress * scrollable,
      behavior: "smooth",
    });
  };

  // Indicator bar calculation (for the vertical track on left)
  // Starts with a minimal notch (14%) and expands downward smoothly as user scrolls
  const indicatorHeightPercent = Math.min(100, Math.max(14, scrollProgress * 100));

  return (
    <section
      ref={containerRef}
      className="relative w-full h-[400vh] bg-white font-sans"
    >
      {/* Sticky Viewport Container */}
      <div className="sticky top-0 h-screen w-full flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8 py-4 sm:py-6 overflow-hidden">
        <div className="w-full max-w-[1040px] mx-auto flex flex-col items-center">

          {/* Section Heading & Subtitle */}
          <div className="w-full flex flex-col items-center text-center mb-5 sm:mb-7 lg:mb-9">
            <h2 className="text-2xl sm:text-[34px] lg:text-[38px] font-extrabold text-stone-950 tracking-tight leading-[1.15] mb-2 sm:mb-3">
              Latihan tiap hari, tanpa terasa berat
            </h2>
            <p className="text-xs sm:text-[14px] md:text-[15px] lg:text-[16px] text-stone-400 font-normal leading-relaxed max-w-[740px]">
              Yudha bikin drilling harian nempel lewat streak, duel PvP, dan progress yang keliatan tiap hari—bukan numpuk soal di last minute.
            </p>
          </div>

          {/* Feature Showcase Card - Matches Figma proportions & Neobrutalist styling */}
          <div className="w-full border-[2.5px] border-stone-900 rounded-[28px] sm:rounded-[36px] bg-white shadow-[-6px_8px_0_rgba(0,0,0,0.95)] p-5 sm:p-7 lg:p-9 relative overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-[220px_1fr_280px] lg:grid-cols-[250px_1fr_320px] items-center gap-6 lg:gap-8 min-h-[350px] sm:min-h-[390px] lg:min-h-[420px]">

              {/* Left Column: Feature Tab Labels with Vertical Scrollbar Indicator */}
              <div className="relative pl-6 flex flex-row md:flex-col justify-between md:justify-center gap-4 sm:gap-6 lg:gap-8 border-b md:border-b-0 border-stone-100 pb-3 md:pb-0">
                {/* Vertical Indicator Track (Desktop) */}
                <div className="hidden md:block absolute left-0 top-1 bottom-1 w-[3.5px] bg-stone-200 rounded-full overflow-hidden">
                  <div
                    className="w-full bg-stone-950 rounded-full transition-all duration-100 ease-out"
                    style={{ height: `${indicatorHeightPercent}%` }}
                  />
                </div>

                {/* Horizontal Indicator Track (Mobile) */}
                <div className="md:hidden absolute left-0 right-0 bottom-0 h-[2.5px] bg-stone-200">
                  <div
                    className="h-full bg-stone-950 transition-all duration-100 ease-out"
                    style={{ width: `${indicatorHeightPercent}%` }}
                  />
                </div>

                {FEATURES.map((feature, index) => {
                  const isCurrent = activeIndex === index;
                  return (
                    <button
                      key={feature.id}
                      onClick={() => handleTabClick(index)}
                      className={`text-left text-sm sm:text-lg lg:text-2xl transition-all duration-200 cursor-pointer whitespace-nowrap md:whitespace-normal py-1 ${
                        isCurrent
                          ? "text-stone-950 font-extrabold scale-[1.02] origin-left"
                          : "text-stone-300 font-semibold hover:text-stone-500"
                      }`}
                    >
                      {feature.label}
                    </button>
                  );
                })}
              </div>

              {/* Center Column: Authentic Mobile UI Screen (No fake phone frame) */}
              <div className="flex items-center justify-center py-1">
                <div className="relative w-full max-w-[190px] sm:max-w-[220px] md:max-w-[240px] lg:max-w-[260px] aspect-[9/19] flex items-center justify-center">
                  {SCREENS.map((screen) => {
                    const isActive = screen.key === activeImageKey;
                    return (
                      <div
                        key={screen.key}
                        className={`absolute inset-0 transition-all duration-500 ease-out flex items-center justify-center ${
                          isActive
                            ? "opacity-100 scale-100 translate-y-0 z-10"
                            : "opacity-0 scale-95 translate-y-2 pointer-events-none z-0"
                        }`}
                      >
                        <Image
                          src={screen.src}
                          alt={screen.alt}
                          width={380}
                          height={800}
                          priority
                          className="w-full h-full object-contain select-none drop-shadow-[0_10px_20px_rgba(0,0,0,0.08)]"
                        />
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Right Column: Active Feature Description with Word-by-Word Fade-in */}
              <div className="w-full flex items-center justify-center md:justify-start px-2 sm:px-4 min-h-[100px] sm:min-h-[130px]">
                <WordRevealText
                  key={activeFeature.id}
                  text={activeFeature.description}
                  progress={wordProgress}
                />
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}


