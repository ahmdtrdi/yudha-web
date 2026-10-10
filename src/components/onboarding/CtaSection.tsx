import { LazyImage } from "@/components/ui/LazyImage";
import { GooglePlayLink } from "@/components/GooglePlayLink";
import { landingCopy, type LocaleProps } from "@/lib/landing-copy";

export function CtaSection({ locale = "id" }: LocaleProps) {
  const copy = landingCopy[locale].cta;
  return (
    <section className="w-full px-4 sm:px-8 lg:px-8 py-8 sm:py-12 lg:py-[60px] font-sans bg-white flex justify-center">
      <div className="relative w-full max-w-[1280px] rounded-[24px] sm:rounded-[36px] overflow-hidden min-h-[420px] sm:min-h-[480px] lg:min-h-[640px] flex flex-col items-center justify-start">

        {/* Background Image with smooth lazy loading */}
        <LazyImage
          src="/assets/Gambar Watercolor Chibi.png"
          alt={copy.imageAlt}
          fill
          className="object-cover object-bottom"
        />

        {/* Content overlay */}
        <div className="relative z-10 flex flex-col items-center text-center pt-10 sm:pt-14 lg:pt-16 px-6">

          {/* Heading — 48px white bold */}
          <h2 className="text-3xl sm:text-[40px] lg:text-[48px] font-extrabold text-white tracking-tight leading-[1.1] mb-2 sm:mb-3 drop-shadow-[0_2px_8px_rgba(0,0,0,0.25)]">
            {copy.title}
          </h2>

          {/* Subheading — 24px white */}
          <p className="text-lg sm:text-[22px] lg:text-[24px] text-white/90 font-medium leading-relaxed mb-6 sm:mb-8 drop-shadow-[0_1px_4px_rgba(0,0,0,0.2)]">
            {copy.description}
          </p>

          <GooglePlayLink locale={locale} />

        </div>

      </div>
    </section>
  );
}
