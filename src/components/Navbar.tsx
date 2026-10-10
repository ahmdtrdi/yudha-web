"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { landingCopy, landingHref, localizedHref, type LocaleProps } from "@/lib/landing-copy";
import { DEMO_VIDEO_ANCHOR, WHATSAPP_COMMUNITY_URL } from "@/lib/links";

interface NavbarProps extends LocaleProps {
  className?: string;
  showLanguageSwitcher?: boolean;
  pathname?: string;
}

export function Navbar({ className = "", locale = "id", showLanguageSwitcher = false, pathname = "/" }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const copy = landingCopy[locale];

  return (
    <header className={`w-full flex items-center justify-between gap-3 sm:gap-4 relative z-40 ${className}`}>
      {/* Left: Brand Logo */}
      <div className="flex shrink-0 items-center justify-start">
        <Link href={landingHref(locale)} aria-label={copy.nav.home} className="inline-block group">
          <Image
            src="/assets/logo-yudha.svg"
            alt="Yudha Logo"
            width={90}
            height={100}
            priority
            className="h-11 sm:h-14 md:h-16 w-auto object-contain transition-transform group-hover:scale-105"
          />
        </Link>
      </div>

      <nav aria-label={copy.nav.main} className="hidden xl:flex items-center justify-center gap-3">
        <Link href={localizedHref("/about", locale)} className="nav-pill-btn nav-pill-lime text-sm px-5 py-2">
          {copy.nav.about}
        </Link>
        <a href={landingHref(locale, DEMO_VIDEO_ANCHOR)} className="nav-pill-btn nav-pill-lime text-sm px-5 py-2">
          {copy.nav.howToPlay}
        </a>
        <a href={landingHref(locale, "#traction")} className="nav-pill-btn nav-pill-lime text-sm px-5 py-2">
          {copy.nav.traction}
        </a>
        <Link href={localizedHref("/contact", locale)} className="nav-pill-btn nav-pill-lime text-sm px-5 py-2">
          {copy.nav.contact}
        </Link>
        <a href={landingHref(locale, "#faq")} className="nav-pill-btn nav-pill-lime text-xs sm:text-sm px-3.5 sm:px-5 py-2">
          FAQ
        </a>
      </nav>

      <div className="flex items-center justify-end gap-2">
        {showLanguageSwitcher && (
          <LanguageSwitcher locale={locale} pathname={pathname} onSelect={() => setMobileMenuOpen(false)} />
        )}

        {/* Mobile Hamburger Toggle Button */}
        <button
          type="button"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label={mobileMenuOpen ? copy.nav.closeMenu : copy.nav.menu}
          aria-expanded={mobileMenuOpen}
          aria-controls="mobile-menu"
          className="xl:hidden flex shrink-0 items-center justify-center w-11 h-11 border-2 border-black rounded-xl bg-white shadow-[2px_2.5px_0px_#000000] active:translate-x-[1px] active:translate-y-[1px]"
        >
          <svg className="w-5 h-5 text-stone-950" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {mobileMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <nav id="mobile-menu" aria-label={copy.nav.main} className="xl:hidden absolute top-full left-0 right-0 mt-3 p-4 bg-white border-2 border-black rounded-2xl shadow-[4px_4.5px_0px_#000000] flex flex-col gap-2.5 z-50 animate-fadeIn">
          <Link
            href={localizedHref("/about", locale)}
            onClick={() => setMobileMenuOpen(false)}
            className="nav-pill-btn nav-pill-lime w-full text-center py-2.5 text-sm"
          >
            {copy.nav.about}
          </Link>
          <a
            href={landingHref(locale, DEMO_VIDEO_ANCHOR)}
            onClick={() => setMobileMenuOpen(false)}
            className="nav-pill-btn nav-pill-lime w-full text-center py-2.5 text-sm"
          >
            {copy.nav.howToPlay}
          </a>
          <Link
            href={localizedHref("/contact", locale)}
            onClick={() => setMobileMenuOpen(false)}
            className="nav-pill-btn nav-pill-lime w-full text-center py-2.5 text-sm"
          >
            {copy.nav.contact}
          </Link>
          <a
            href={landingHref(locale, "#traction")}
            onClick={() => setMobileMenuOpen(false)}
            className="nav-pill-btn nav-pill-lime w-full text-center py-2.5 text-sm"
          >
            {copy.nav.traction}
          </a>
          <a
            href={landingHref(locale, "#faq")}
            onClick={() => setMobileMenuOpen(false)}
            className="nav-pill-btn nav-pill-lime w-full text-center py-2.5 text-sm"
          >
            FAQ
          </a>
          <a
            href={WHATSAPP_COMMUNITY_URL}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setMobileMenuOpen(false)}
            className="nav-pill-btn nav-pill-blue w-full text-center py-2.5 text-sm"
          >
            {copy.community}
          </a>
        </nav>
      )}
    </header>
  );
}
