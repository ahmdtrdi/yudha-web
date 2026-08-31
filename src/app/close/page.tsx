"use client";

import Image from "next/image";
import Link from "next/link";

export default function ClosePage() {
  return (
    <main className="h-screen w-full bg-white flex flex-col justify-between items-center p-6 sm:p-10 lg:p-12 overflow-hidden select-none">
      {/* Top Header Bar: Brand Logo on Left, Back to Website Link on Right */}
      <header className="w-full max-w-[1340px] flex items-center justify-between">
        {/* Left: Brand Logo (logo-yudha.svg) */}
        <Link href="/" className="inline-block group">
          <Image
            src="/assets/logo-yudha.svg"
            alt="Yudha Logo"
            width={90}
            height={100}
            priority
            className="h-12 sm:h-14 md:h-16 w-auto object-contain transition-transform group-hover:scale-105"
          />
        </Link>

        {/* Right: Back to Website Link */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-stone-900 hover:text-stone-600 transition-colors"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
          Back to Website
        </Link>
      </header>

      {/* Center Content: Headline & Chibi Characters Artwork */}
      <div className="flex flex-col items-center justify-center text-center my-auto px-4 max-w-xl">
        {/* Main Title & Subtitle */}
        <h1 className="text-2xl sm:text-3xl md:text-[34px] font-[800] text-stone-950 leading-[1.25] tracking-tight mb-6 sm:mb-8">
          Terima Kasih!<br />
          Responmu kami simpan!
        </h1>

        {/* Hero Close Chibi Characters Illustration */}
        <div className="relative w-[240px] sm:w-[280px] md:w-[320px] aspect-[552/337] mx-auto">
          <Image
            src="/assets/hero-close.png"
            alt="Yudha Chibi Adventurers - Thank you"
            fill
            priority
            className="object-contain"
          />
        </div>
      </div>

      {/* Bottom Footer: Small logo-footer-yudha.svg */}
      <footer className="w-full flex justify-center items-center pb-2 sm:pb-4">
        <Image
          src="/assets/logo-footer-yudha.svg"
          alt="your hired ultimate arena - YUDHA"
          width={130}
          height={44}
          className="w-[100px] sm:w-[115px] md:w-[125px] h-auto object-contain opacity-90"
        />
      </footer>
    </main>
  );
}
