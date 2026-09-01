"use client";

import Image from "next/image";
import Link from "next/link";

export function FooterSection() {
  return (
    <footer className="w-full bg-white pt-8 sm:pt-12 lg:pt-16 pb-0 flex justify-center">
      {/* Outer rounded card container matching section width */}
      <div className="w-full max-w-[1680px] mx-auto px-4 sm:px-6">
        <div className="bg-white border-t-[1.5px] border-x-[1.5px] border-[#242424] rounded-t-[28px] sm:rounded-t-[36px] lg:rounded-t-[40px] pt-4 sm:pt-8 lg:pt-10 pb-0 overflow-hidden flex flex-col justify-between">

          {/* Top content: Brand logo on left, 4 nav columns on right */}
          <div className="px-6 sm:px-12 md:pl-20 md:pr-16 lg:pl-32 lg:pr-20 flex flex-col lg:flex-row justify-between items-start gap-8 lg:gap-12">

            {/* Left Brand Logo */}
            <div className="flex-shrink-0">
              <Image
                src="/assets/logo-footer-yudha-new.svg"
                alt="your hired ultimate arena - YUDHA"
                width={210}
                height={70}
                loading="lazy"
                className="w-[260px] sm:w-[280px] lg:w-[380px] h-auto object-contain"
              />
            </div>

            {/* Right Navigation Links Grid (4 Columns) */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-8 lg:gap-12 w-full lg:w-auto">

              {/* Company */}
              <div className="flex flex-col space-y-2">
                <h3 className="text-xs sm:text-sm font-medium text-stone-400">
                  Company
                </h3>
                <Link href="/about" className="text-xs sm:text-sm font-medium text-[#090909] hover:underline underline-offset-4 transition-colors">
                  About
                </Link>
                <a href="#" className="text-xs sm:text-sm font-medium text-[#090909] hover:underline underline-offset-4 transition-colors">
                  Careers
                </a>
                <a href="#" className="text-xs sm:text-sm font-medium text-[#090909] hover:underline underline-offset-4 transition-colors">
                  Become a affiliate
                </a>
              </div>

              {/* Resources */}
              <div className="flex flex-col space-y-2">
                <h3 className="text-xs sm:text-sm font-medium text-stone-400">
                  Resources
                </h3>
                <Link href="/contact" className="text-xs sm:text-sm font-medium text-[#090909] hover:underline underline-offset-4 transition-colors">
                  Contact us
                </Link>
                <a href="#" className="text-xs sm:text-sm font-medium text-[#090909] hover:underline underline-offset-4 transition-colors">
                  Help center
                </a>
                <a href="#" className="text-xs sm:text-sm font-medium text-[#090909] hover:underline underline-offset-4 transition-colors">
                  Download apps
                </a>
              </div>

              {/* Legal */}
              <div className="flex flex-col space-y-2">
                <h3 className="text-xs sm:text-sm font-medium text-stone-400">
                  Legal
                </h3>
                <Link href="/privacy-policy" className="text-xs sm:text-sm font-medium text-[#090909] hover:underline underline-offset-4 transition-colors">
                  Privacy policy
                </Link>
              </div>

              {/* Connect */}
              <div className="flex flex-col space-y-2">
                <h3 className="text-xs sm:text-sm font-medium text-stone-400">
                  Connect
                </h3>
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
          <div className="w-full pt-20 sm:pt-62 lg:pt-68 overflow-hidden flex justify-center items-end leading-none select-none pointer-events-none px-2 sm:px-4">
            <span className="font-semibold text-[#090909] tracking-[0.24em] leading-[0.75] text-[19vw] sm:text-[17vw] lg:text-[180px] xl:text-[200px] uppercase text-center w-full block translate-y-[4%]">
              YUDHA
            </span>
          </div>

        </div>
      </div>
    </footer>
  );
}
