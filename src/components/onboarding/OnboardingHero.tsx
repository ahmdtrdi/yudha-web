"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Navbar } from "@/components/Navbar";

export function OnboardingHero() {
  const router = useRouter();
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = email.trim();
    if (trimmed) {
      try {
        sessionStorage.setItem("open_beta_email", trimmed);
      } catch {
        // Fallback for storage restricted environments
      }
    }
    router.push("/open-beta");
  };

  return (
    <section
      className="w-full min-h-screen lg:min-h-[92vh] onboarding-hero-bg rounded-t-none rounded-b-[40px] sm:rounded-b-[52px] lg:rounded-b-[60px] relative overflow-hidden border-b border-stone-900/10"
      suppressHydrationWarning
    >

      {/* Single Shared Inner Layout Container to guarantee 100% vertical grid alignment */}
      <div
        className="w-full max-w-[1340px] mx-auto min-h-screen lg:min-h-[92vh] px-6 sm:px-10 lg:px-14 py-6 sm:py-8 flex flex-col justify-between z-10 relative"
        suppressHydrationWarning
      >

        {/* Modular Navigation Bar */}
        <Navbar />

        {/* Hero Content Area - Perfectly left-aligned with Logo */}
        <div className="w-full my-auto py-6 sm:py-10 flex flex-col items-start text-left">
          
          {/* Open Beta Badge (Red dot + text, no outline box) */}
          <div className="flex items-center gap-2.5 mb-3 sm:mb-4">
            <span className="w-3.5 h-3.5 rounded-full bg-[#ff0000] inline-block shadow-xs"></span>
            <span className="text-stone-950 font-bold text-base sm:text-lg tracking-tight">
              Open Beta
            </span>
          </div>

          {/* Main Headline */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[48px] xl:text-[52px] font-[800] text-stone-950 leading-[1.12] tracking-tight max-w-[490px] mb-3.5 sm:mb-4">
            Drilling soal dengan<br />cara paling seru
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-lg md:text-xl text-stone-900 font-medium leading-snug max-w-[500px] mb-6 sm:mb-7">
            Jawab soal, serang lawan, menang duel—semua bisa<br className="hidden sm:inline" /> kamu lakukan kapan pun dan di mana pun.
          </p>

          {/* Email Form & Tombol Daftar */}
          <form
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full max-w-[510px] mb-3 relative z-30"
          >
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="masukan email"
              className="w-full sm:flex-1 min-w-0 px-5 sm:px-6 py-3 sm:py-3.5 bg-white border-0 outline-none rounded-xl sm:rounded-2xl text-stone-950 placeholder:text-stone-400 placeholder:italic font-normal text-sm sm:text-base shadow-sm focus:ring-2 focus:ring-stone-900/10 cursor-text"
            />
            <button
              type="submit"
              className="nav-pill-btn nav-pill-lime py-3 sm:py-3.5 px-7 sm:px-9 text-sm sm:text-base font-extrabold cursor-pointer whitespace-nowrap select-none w-full sm:w-auto"
            >
              Daftar
            </button>
          </form>

          {/* Beta Disclaimer Sub-text */}
          <p className="text-xs sm:text-sm text-stone-950 font-bold max-w-[510px] leading-snug">
            Kami masih tahap open beta—jadi kamu bakal jadi salah satu yang pertama coba Yudha.
          </p>
        </div>

      </div>

    </section>
  );
}
