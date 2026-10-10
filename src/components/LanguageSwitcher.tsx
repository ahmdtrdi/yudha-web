"use client";

import Link from "next/link";
import { useEffect } from "react";
import { landingCopy, localizedHref, type LocaleProps } from "@/lib/landing-copy";

interface LanguageSwitcherProps extends LocaleProps {
  pathname: string;
  onSelect?: () => void;
}

export function LanguageSwitcher({ locale = "id", pathname, onSelect }: LanguageSwitcherProps) {
  useEffect(() => {
    const previousLanguage = document.documentElement.lang;
    document.documentElement.lang = locale;
    return () => { document.documentElement.lang = previousLanguage; };
  }, [locale]);

  return (
    <nav aria-label={landingCopy[locale].nav.language} className="flex shrink-0 items-center rounded-xl border-2 border-stone-950 bg-white p-1 text-xs font-bold shadow-[2px_2px_0_#090909] sm:text-sm">
      <Link
        href={localizedHref(pathname, "id")}
        lang="id"
        hrefLang="id"
        aria-label="Bahasa Indonesia"
        aria-current={locale === "id" ? "page" : undefined}
        scroll={false}
        onClick={onSelect}
        className={`rounded-lg px-3 py-2 focus-visible:outline-2 focus-visible:outline-blue-600 ${locale === "id" ? "bg-[#e2ef44]" : "hover:bg-stone-100"}`}
      >
        ID
      </Link>
      <Link
        href={localizedHref(pathname, "en")}
        lang="en"
        hrefLang="en"
        aria-current={locale === "en" ? "page" : undefined}
        scroll={false}
        onClick={onSelect}
        className={`rounded-lg px-3 py-2 focus-visible:outline-2 focus-visible:outline-blue-600 ${locale === "en" ? "bg-[#e2ef44]" : "hover:bg-stone-100"}`}
      >
        English
      </Link>
    </nav>
  );
}
