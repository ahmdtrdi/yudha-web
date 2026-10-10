import Link from "next/link";
import { aboutCopy } from "@/lib/about-copy";
import { localizedHref, type LocaleProps } from "@/lib/landing-copy";

export function NoteFromFoundersSection({ locale = "id" }: LocaleProps) {
  const copy = aboutCopy[locale].founders;
  return (
    <section className="w-full bg-white pt-8 sm:pt-14 pb-24 sm:pb-32 lg:pb-40">
      <div className="w-full max-w-[1020px] mx-auto px-6 sm:px-10 lg:px-14">
        <div className="flex flex-col lg:flex-row justify-between items-start gap-10 lg:gap-16">

          {/* Left Column: Heading + Contact Us CTA */}
          <div className="w-full lg:w-[320px] flex-shrink-0 flex flex-col items-start">
            <h2 className="text-2xl sm:text-3xl md:text-[32px] font-[800] text-stone-950 leading-[1.18] tracking-tight mb-6 sm:mb-8">
              {copy.title}
            </h2>

            {/* Contact Us Neobrutalist Blue Pill Button */}
            <Link
              href={localizedHref("/contact", locale)}
              className="nav-pill-btn nav-pill-blue px-7 py-2.5 text-xs sm:text-sm font-extrabold"
            >
              {copy.contact}
            </Link>
          </div>

          {/* Right Column: 3 Copy Paragraphs */}
          <div className="flex-1 flex flex-col space-y-5 sm:space-y-6 text-stone-600 text-sm sm:text-base leading-relaxed font-normal max-w-[560px]">
            {copy.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
          </div>

        </div>
      </div>
    </section>
  );
}
