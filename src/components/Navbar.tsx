"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

interface NavbarProps {
  className?: string;
}

export function Navbar({ className = "" }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className={`w-full flex items-center justify-between gap-3 sm:gap-4 relative z-40 ${className}`}>
      {/* Left: Brand Logo */}
      <div className="flex items-center justify-start">
        <Link href="/" className="inline-block group">
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

      {/* Center: Desktop Nav Links (Hidden on small mobile, visible from md up) */}
      <nav className="hidden md:flex items-center justify-center gap-2 sm:gap-3 lg:gap-3.5">
        <Link href="/about" className="nav-pill-btn nav-pill-lime text-xs sm:text-sm px-3.5 sm:px-5 py-2">
          About
        </Link>
        <Link href="/#how-to-play" className="nav-pill-btn nav-pill-lime text-xs sm:text-sm px-3.5 sm:px-5 py-2">
          How to Play
        </Link>
        <Link href="/#faq" className="nav-pill-btn nav-pill-lime text-xs sm:text-sm px-3.5 sm:px-5 py-2">
          FAQ
        </Link>
      </nav>

      {/* Right: Download CTA Button & Mobile Hamburger Toggle */}
      <div className="flex items-center justify-end gap-2">
        <Link
          href="/open-beta"
          className="nav-pill-btn nav-pill-blue text-xs sm:text-sm px-4 sm:px-7 py-2 whitespace-nowrap"
        >
          Download
        </Link>

        {/* Mobile Hamburger Toggle Button */}
        <button
          type="button"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
          className="md:hidden flex items-center justify-center w-9 h-9 border-2 border-black rounded-xl bg-white shadow-[2px_2.5px_0px_#000000] active:translate-x-[1px] active:translate-y-[1px]"
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
        <div className="md:hidden absolute top-full left-0 right-0 mt-3 p-4 bg-white border-2 border-black rounded-2xl shadow-[4px_4.5px_0px_#000000] flex flex-col gap-2.5 z-50 animate-fadeIn">
          <Link
            href="/about"
            onClick={() => setMobileMenuOpen(false)}
            className="nav-pill-btn nav-pill-lime w-full text-center py-2.5 text-sm"
          >
            About
          </Link>
          <Link
            href="/#how-to-play"
            onClick={() => setMobileMenuOpen(false)}
            className="nav-pill-btn nav-pill-lime w-full text-center py-2.5 text-sm"
          >
            How to Play
          </Link>
          <Link
            href="/#faq"
            onClick={() => setMobileMenuOpen(false)}
            className="nav-pill-btn nav-pill-lime w-full text-center py-2.5 text-sm"
          >
            FAQ
          </Link>
          <Link
            href="/open-beta"
            onClick={() => setMobileMenuOpen(false)}
            className="nav-pill-btn nav-pill-blue w-full text-center py-2.5 text-sm"
          >
            Daftar Open Beta
          </Link>
        </div>
      )}
    </header>
  );
}
