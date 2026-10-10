import { aboutCopy } from "@/lib/about-copy";
import type { LocaleProps } from "@/lib/landing-copy";

export function OurMissionSection({ locale = "id" }: LocaleProps) {
  const copy = aboutCopy[locale].mission;
  return (
    <section id="mission" className="scroll-mt-6 w-full bg-white pt-10 sm:pt-14 pb-16 sm:pb-24">
      <div className="w-full max-w-[800px] mx-auto px-6 sm:px-10 flex flex-col items-center text-center">
        {/* Kicker */}
        <span className="text-xs sm:text-sm font-semibold text-stone-900 mb-4 sm:mb-5">
          {copy.label}
        </span>

        <h2 className="text-2xl sm:text-3xl md:text-[32px] font-[800] text-stone-950 leading-[1.2] tracking-tight mb-6 sm:mb-8">
          {copy.title}
        </h2>

        <p className="text-sm sm:text-base text-stone-600 font-normal leading-relaxed max-w-[640px]">
          {copy.problem}
        </p>
        <p className="mt-5 max-w-[640px] text-sm leading-relaxed text-stone-600 sm:text-base">{copy.approach}</p>
        <p className="mt-6 max-w-[640px] rounded-2xl border-2 border-stone-950 bg-[#f3f8c9] p-5 text-sm font-semibold leading-relaxed text-stone-800">{copy.audience}</p>
      </div>
    </section>
  );
}
