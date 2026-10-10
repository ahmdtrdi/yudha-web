import Image from "next/image";
import { landingCopy, type LocaleProps } from "@/lib/landing-copy";
import { PLAY_STORE_URL } from "@/lib/links";

export function GooglePlayLink({
  locale = "id",
  className = "w-[208px] sm:w-[224px]",
}: LocaleProps & { className?: string }) {
  return (
    <a
      href={PLAY_STORE_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={landingCopy[locale].download}
      className={`inline-flex shrink-0 rounded-xl transition-transform hover:scale-[1.03] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 ${className}`}
    >
      <Image
        src={`/assets/google-play-${locale}.png`}
        alt={landingCopy[locale].download}
        width={646}
        height={250}
        className="h-auto w-full"
      />
    </a>
  );
}
