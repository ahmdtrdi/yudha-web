import Image from "next/image";
import Link from "next/link";
import { landingCopy, landingHref, localizedHref, type LocaleProps } from "@/lib/landing-copy";
import { CONTACT_EMAIL, DEMO_VIDEO_ANCHOR, PLAY_STORE_URL, WHATSAPP_COMMUNITY_URL } from "@/lib/links";

export function FooterSection({ locale = "id" }: LocaleProps) {
  const copy = landingCopy[locale].footer;
  return (
    <footer className="w-full bg-white pt-8 sm:pt-12 lg:pt-16 pb-0 flex justify-center">
      {/* Outer rounded card container matching section width */}
      <div className="w-full max-w-[1680px] mx-auto px-4 sm:px-6">
        <div className="bg-white border-t-[1.5px] border-x-[1.5px] border-[#242424] rounded-t-[28px] sm:rounded-t-[36px] lg:rounded-t-[40px] pt-4 sm:pt-8 lg:pt-10 pb-0 overflow-hidden flex flex-col justify-between">

          {/* Top content: Brand logo on left, 4 nav columns on right */}
          <div className="px-6 sm:px-12 xl:pl-20 xl:pr-16 flex flex-col xl:flex-row justify-between items-start gap-8 xl:gap-12">

            {/* Left Brand Logo */}
            <div className="w-full max-w-[300px] shrink-0">
              <Image
                src="/assets/logo-footer-yudha-new.svg"
                alt="YUDHA"
                width={210}
                height={70}
                loading="lazy"
                className="w-[260px] max-w-full h-auto object-contain"
              />
              <p className="mt-4 text-sm leading-relaxed text-stone-600">{copy.description}</p>
              <a href={`mailto:${CONTACT_EMAIL}`} className="mt-3 inline-block break-all text-sm font-semibold underline underline-offset-4">{CONTACT_EMAIL}</a>
            </div>

            {/* Right Navigation Links Grid (4 Columns) */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-8 xl:gap-10 w-full xl:w-auto">

              {/* Company */}
              <div className="flex flex-col space-y-2">
                <h3 className="text-xs sm:text-sm font-medium text-stone-600">
                  {copy.company}
                </h3>
                <Link href={localizedHref("/about", locale)} className="text-xs sm:text-sm font-medium text-[#090909] hover:underline underline-offset-4 transition-colors">
                  {copy.about}
                </Link>
                <a href={localizedHref("/about", locale, "#team")} className="text-xs sm:text-sm font-medium text-[#090909] hover:underline underline-offset-4 transition-colors">
                  {copy.team}
                </a>
                <a href={localizedHref("/about", locale, "#mission")} className="text-xs sm:text-sm font-medium text-[#090909] hover:underline underline-offset-4 transition-colors">
                  {copy.mission}
                </a>
                <a href={landingHref(locale, "#traction")} className="text-xs sm:text-sm font-medium text-[#090909] hover:underline underline-offset-4 transition-colors">
                  {copy.traction}
                </a>
              </div>

              {/* Resources */}
              <div className="flex flex-col space-y-2">
                <h3 className="text-xs sm:text-sm font-medium text-stone-600">
                  {copy.resources}
                </h3>
                <Link href={localizedHref("/contact", locale)} className="text-xs sm:text-sm font-medium text-[#090909] hover:underline underline-offset-4 transition-colors">
                  {copy.contact}
                </Link>
                <a href={landingHref(locale, "#faq")} className="text-xs sm:text-sm font-medium text-[#090909] hover:underline underline-offset-4 transition-colors">
                  {copy.help}
                </a>
                <a href={landingHref(locale, DEMO_VIDEO_ANCHOR)} className="text-xs sm:text-sm font-medium text-[#090909] hover:underline underline-offset-4 transition-colors">
                  {landingCopy[locale].nav.howToPlay}
                </a>
                <a href={PLAY_STORE_URL} target="_blank" rel="noopener noreferrer" className="text-xs sm:text-sm font-medium text-[#090909] hover:underline underline-offset-4 transition-colors">
                  {copy.download}
                </a>
              </div>

              {/* Legal */}
              <div className="flex flex-col space-y-2">
                <h3 className="text-xs sm:text-sm font-medium text-stone-600">
                  {copy.legal}
                </h3>
                <Link href="/privacy-policy" className="text-xs sm:text-sm font-medium text-[#090909] hover:underline underline-offset-4 transition-colors">
                  {copy.privacy}
                </Link>
              </div>

              {/* Connect */}
              <div className="flex flex-col space-y-2">
                <h3 className="text-xs sm:text-sm font-medium text-stone-600">
                  {copy.connect}
                </h3>
                <a
                  href={WHATSAPP_COMMUNITY_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs sm:text-sm font-medium text-[#090909] hover:underline underline-offset-4 transition-colors"
                >
                  {copy.community}
                </a>
                <a
                  href="https://x.com/yudhaisfun"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs sm:text-sm font-medium text-[#090909] hover:underline underline-offset-4 transition-colors"
                >
                  X
                </a>
                <a
                  href="https://www.linkedin.com/company/yudha"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs sm:text-sm font-medium text-[#090909] hover:underline underline-offset-4 transition-colors"
                >
                  Linkedin
                </a>
                <a
                  href="https://www.instagram.com/yudha.fun/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs sm:text-sm font-medium text-[#090909] hover:underline underline-offset-4 transition-colors"
                >
                  Instagram
                </a>
              </div>

            </div>

          </div>

          {/* YUDHA Wordmark at the bottom — sitting directly at the end of page */}
          <div className="mt-10 flex flex-col justify-between gap-2 border-t border-stone-200 px-6 py-5 text-xs text-stone-500 sm:flex-row sm:px-12">
            <p>© {new Date().getFullYear()} Yudha. {copy.copyright}</p>
            <p>{copy.builtFor}</p>
          </div>
          <div className="w-full pt-10 sm:pt-16 overflow-hidden flex justify-center items-end leading-none select-none pointer-events-none px-2 sm:px-4">
            <span className="font-semibold text-[#090909] tracking-[0.24em] leading-[0.75] text-[19vw] sm:text-[17vw] lg:text-[180px] xl:text-[200px] uppercase text-center w-full block translate-y-[4%]">
              YUDHA
            </span>
          </div>

        </div>
      </div>
    </footer>
  );
}
