"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { landingCopy, type LocaleProps } from "@/lib/landing-copy";

const SCREENS = [
  {
    key: "arena-main",
    src: "/assets/M-Arena.png",
  },
  {
    key: "arena-question",
    src: "/assets/M-Arena-Question.png",
  },
  {
    key: "profile",
    src: "/assets/M-Profile.png",
  },
  {
    key: "interview",
    src: "/assets/M-Interview-Speak.png",
  },
] as const;

export function LatihanTiapHariSection({ locale = "id" }: LocaleProps) {
  const copy = landingCopy[locale].practice;
  const containerRef = useRef<HTMLElement>(null);
  const [screenIndex, setScreenIndex] = useState(0);

  useEffect(() => {
    let animationFrame = 0;
    const updateScreen = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const scrollable = rect.height - window.innerHeight;
      const progress = scrollable > 0 ? Math.max(0, Math.min(1, -rect.top / scrollable)) : 0;
      setScreenIndex(progress < 0.22 ? 0 : progress < 0.38 ? 1 : progress < 0.7 ? 2 : 3);
    };
    const onScroll = () => {
      cancelAnimationFrame(animationFrame);
      animationFrame = requestAnimationFrame(updateScreen);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    onScroll();
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(animationFrame);
    };
  }, []);

  const activeIndex = screenIndex < 2 ? 0 : screenIndex - 1;
  const activeFeature = copy.features[activeIndex];
  const activeScreen = SCREENS[screenIndex];

  const handleTabClick = (index: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const scrollable = rect.height - window.innerHeight;
    const targetProgress = [0.05, 0.48, 0.82][index];
    window.scrollTo({
      top: window.scrollY + rect.top + targetProgress * scrollable,
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth",
    });
  };

  return (
    <section
      ref={containerRef}
      id="daily-practice"
      aria-labelledby="practice-title"
      className="relative h-[400vh] w-full bg-white font-sans"
    >
      <div className="sticky top-0 flex min-h-screen w-full flex-col items-center justify-center px-5 py-4 sm:px-6 sm:py-6 lg:px-8">
        <div className="w-full max-w-[1040px] mx-auto flex flex-col items-center">

          {/* Section Heading & Subtitle */}
          <div className="w-full flex flex-col items-center text-center mb-5 sm:mb-7 lg:mb-9">
            <h2 id="practice-title" className="text-xl sm:text-[34px] lg:text-[38px] font-extrabold text-stone-950 tracking-tight leading-[1.15] mb-2 sm:mb-3">
              {copy.title}
            </h2>
            <p className="text-sm sm:text-base text-stone-600 font-normal leading-relaxed max-w-[740px]">
              {copy.description}
            </p>
          </div>

          {/* Feature Showcase Card - Matches Figma proportions & Neobrutalist styling */}
          <div className="w-full border-[2.5px] border-stone-900 rounded-[28px] sm:rounded-[36px] bg-white shadow-[-6px_8px_0_rgba(0,0,0,0.95)] p-4 sm:p-7 lg:p-9 relative overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-[220px_1fr_280px] lg:grid-cols-[250px_1fr_320px] items-center gap-4 sm:gap-6 lg:gap-8">

              <div role="group" aria-label={copy.title} className="flex flex-row md:flex-col justify-between md:justify-center gap-2 sm:gap-4 border-b md:border-b-0 border-stone-200 pb-3 md:pb-0">

                {copy.features.map((feature, index) => {
                  const isCurrent = activeIndex === index;
                  return (
                    <button
                      type="button"
                      aria-pressed={isCurrent}
                      key={feature.id}
                      onClick={() => handleTabClick(index)}
                      aria-controls="feature-description"
                      className={`min-w-0 rounded-xl p-2.5 sm:p-3 text-left text-xs sm:text-base lg:text-xl transition-colors duration-200 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 ${
                        isCurrent
                          ? "bg-[#e2ef44] text-stone-950 font-extrabold"
                          : "text-stone-600 font-semibold hover:bg-stone-100"
                      }`}
                    >
                      {feature.label}
                    </button>
                  );
                })}
              </div>

              {/* Center Column: Authentic Mobile UI Screen (No fake phone frame) */}
              <div className="flex items-center justify-center py-1">
                <div className="relative flex h-[28svh] max-h-[240px] w-full max-w-[190px] items-center justify-center md:h-[56svh] md:max-h-[549px] md:max-w-[240px] lg:max-w-[260px]">
                  <Image
                    key={activeScreen.key}
                    src={activeScreen.src}
                    alt={copy.screens[activeScreen.key]}
                    width={380}
                    height={800}
                    sizes="(max-width: 640px) 190px, (max-width: 768px) 220px, 260px"
                    className="w-full h-full object-contain select-none animate-fadeIn drop-shadow-[0_10px_20px_rgba(0,0,0,0.08)]"
                  />
                </div>
              </div>

              <div id="feature-description" aria-live="polite" className="w-full px-2 sm:px-4">
                <h3 className="mb-3 text-lg font-extrabold text-stone-950">{activeFeature.label}</h3>
                <p className="text-sm sm:text-base leading-relaxed text-stone-600">{activeFeature.description}</p>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}


