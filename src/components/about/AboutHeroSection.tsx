import Image from "next/image";
import { Navbar } from "@/components/Navbar";

export function AboutHeroSection() {
  return (
    <section className="w-full bg-white relative overflow-hidden">
      {/* Shared Container aligned with Landing Page Grid */}
      <div className="w-full max-w-[1340px] mx-auto px-6 sm:px-10 lg:px-14 py-6 sm:py-8 flex flex-col items-center">

        {/* Navigation Bar Component */}
        <Navbar className="mb-10 sm:mb-14 lg:mb-16" />

        {/* Hero Header Typography */}
        <div className="w-full flex flex-col items-center text-center max-w-[800px] mx-auto">
          {/* Kicker / Category Label - 'About Us' in natural title case */}
          <span className="text-xs sm:text-sm font-semibold text-stone-900 mb-4 sm:mb-5">
            About Us
          </span>

          {/* Main Headline - Responsive sizing with smooth wrapping on mobile and iPad */}
          <h1 className="text-xl sm:text-2xl md:text-[26px] lg:text-[28px] font-[800] text-stone-950 leading-[1.28] tracking-tight max-w-[680px] mb-8 sm:mb-10 px-2">
            <span>Yudha mengubah drilling soal tes seleksi jadi</span>
            <br className="hidden sm:inline" />{" "}
            <span>pertarungan PvP yang gratis dan seru</span>
          </h1>

          {/* Hero Illustration - Compact, centered, matching Figma scale */}
          <div className="w-full max-w-[480px] sm:max-w-[520px] md:max-w-[540px] flex justify-center items-center">
            <Image
              src="/assets/hero-about-us.png"
              alt="Yudha Chibi Characters Hero"
              width={700}
              height={350}
              priority
              className="w-full h-auto object-contain"
            />
          </div>
        </div>

      </div>
    </section>
  );
}

