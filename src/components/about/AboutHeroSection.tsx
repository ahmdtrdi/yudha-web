import Image from "next/image";
import { Navbar } from "@/components/Navbar";
import { aboutCopy } from "@/lib/about-copy";
import type { LocaleProps } from "@/lib/landing-copy";

export function AboutHeroSection({ locale = "id" }: LocaleProps) {
  const copy = aboutCopy[locale].hero;
  return (
    <section className="w-full bg-white relative overflow-hidden">
      {/* Shared Container aligned with Landing Page Grid */}
      <div className="w-full max-w-[1340px] mx-auto px-6 sm:px-10 lg:px-14 py-6 sm:py-8 flex flex-col items-center">

        {/* Navigation Bar Component */}
        <Navbar locale={locale} pathname="/about" showLanguageSwitcher className="mb-10 sm:mb-14 lg:mb-16" />

        {/* Hero Header Typography */}
        <div className="w-full flex flex-col items-center text-center max-w-[800px] mx-auto">
          {/* Kicker / Category Label - 'About Us' in natural title case */}
          <span className="text-xs sm:text-sm font-semibold text-stone-900 mb-4 sm:mb-5">
            {copy.label}
          </span>

          {/* Main Headline - Responsive sizing with smooth wrapping on mobile and iPad */}
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-[800] text-stone-950 leading-[1.15] tracking-tight max-w-[800px] mb-5 px-2">
            <span>{copy.title}</span>
            <br className="hidden sm:inline" />{" "}
            <span>{copy.titleEnd}</span>
          </h1>
          <p className="mb-8 max-w-[620px] text-sm leading-relaxed text-stone-600 sm:text-base">{copy.description}</p>

          {/* Hero Illustration - Compact, centered, matching Figma scale */}
          <div className="w-full max-w-[480px] sm:max-w-[520px] md:max-w-[540px] flex justify-center items-center">
            <Image
              src="/assets/hero-about-us.png"
              alt={copy.imageAlt}
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

