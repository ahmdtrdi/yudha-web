import { Navbar } from "@/components/Navbar";
import { GooglePlayLink } from "@/components/GooglePlayLink";
import { WhatsAppLink } from "@/components/WhatsAppLink";
import { landingCopy, type LocaleProps } from "@/lib/landing-copy";

export function OnboardingHero({ locale = "id" }: LocaleProps) {
  const copy = landingCopy[locale].hero;

  return (
    <section
      className="w-full min-h-screen lg:min-h-[92vh] onboarding-hero-bg rounded-t-none rounded-b-[40px] sm:rounded-b-[52px] lg:rounded-b-[60px] relative overflow-hidden border-b border-stone-900/10"
    >

      {/* Single Shared Inner Layout Container to guarantee 100% vertical grid alignment */}
      <div
        className="w-full max-w-[1340px] mx-auto min-h-screen lg:min-h-[92vh] px-6 sm:px-10 lg:px-14 py-6 sm:py-8 flex flex-col justify-between z-10 relative"
      >

        {/* Modular Navigation Bar */}
        <Navbar locale={locale} showLanguageSwitcher />

        {/* Hero Content Area - Perfectly left-aligned with Logo */}
        <div className="w-full my-auto py-6 sm:py-10 flex flex-col items-start text-left">

          <p className="mb-4 text-xs sm:text-sm font-bold tracking-wide text-stone-700">
            {copy.category}
          </p>
          
          <div className="flex items-center gap-2.5 mb-3 sm:mb-4">
            <span aria-hidden="true" className="w-3.5 h-3.5 rounded-full bg-[#128c4a] inline-block shadow-xs" />
            <span className="text-stone-950 font-bold text-base sm:text-lg tracking-tight">
              {copy.availability}
            </span>
          </div>

          {/* Main Headline */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[48px] xl:text-[52px] font-[800] text-stone-950 leading-[1.12] tracking-tight max-w-[490px] mb-3.5 sm:mb-4">
            {copy.title}<br />{copy.titleEnd}
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-lg md:text-xl text-stone-900 font-medium leading-snug max-w-[500px] mb-6 sm:mb-7">
            {copy.description}
          </p>

          <div className="flex flex-col items-start gap-3 mb-4 relative z-30">
            <GooglePlayLink locale={locale} className="-ml-3 w-[224px] sm:w-[240px]" />
            <WhatsAppLink locale={locale} />
          </div>

          <p className="rounded-xl border border-white/70 bg-white/85 px-3 py-2 text-xs sm:text-sm text-stone-950 font-semibold max-w-[460px] leading-relaxed shadow-sm">
            {copy.note}
          </p>
        </div>

      </div>

    </section>
  );
}
