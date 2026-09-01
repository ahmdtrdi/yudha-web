"use client";

import { LazyImage } from "@/components/ui/LazyImage";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect, Suspense } from "react";

function OpenBetaContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    whatsapp: "",
    goal: "",
  });

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    let prefilledEmail = "";

    // 1. Try reading from sessionStorage (Secure & Clean URL)
    try {
      const stored = sessionStorage.getItem("open_beta_email");
      if (stored) {
        prefilledEmail = stored;
        sessionStorage.removeItem("open_beta_email");
      }
    } catch {
      // Ignore storage errors
    }

    // 2. Fallback to URL searchParams if passed via query string
    if (!prefilledEmail) {
      const emailParam = searchParams.get("email");
      if (emailParam) {
        prefilledEmail = emailParam;
      }
    }

    if (!prefilledEmail) return;

    const prefillTimer = window.setTimeout(() => {
      setFormData((prev) => ({ ...prev, email: prefilledEmail }));
    }, 0);

    return () => window.clearTimeout(prefillTimer);
  }, [searchParams]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");

    try {
      const res = await fetch("/api/open-beta", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        router.push("/close?from=open-beta");
      } else {
        setErrorMsg(data.error || "Gagal mendaftar. Silakan coba lagi.");
      }
    } catch {
      setErrorMsg("Terjadi kesalahan jaringan. Silakan coba lagi.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen lg:h-screen w-full bg-white flex flex-col lg:flex-row overflow-y-auto lg:overflow-hidden">
      {/* Left Column: Artwork Image (Full width cover anchored at bottom for mobile to show full characters, left-aligned contain on desktop) */}
      <div className="w-full lg:w-[42%] xl:w-[40%] h-[280px] sm:h-[340px] md:h-[400px] lg:h-screen relative bg-white overflow-hidden flex-shrink-0 flex flex-col justify-between p-4 sm:p-8 lg:p-10">
        {/* Background Image */}
        <LazyImage
          src="/assets/hero-43-form.png"
          alt="Yudha Chibi Adventurers under the Tree"
          fill
          priority
          wrapperClassName="absolute inset-0"
          className="object-cover object-bottom lg:object-contain lg:object-left"
        />

        {/* Top-Left White Yudha Brand Logo */}
        <div className="relative z-10">
          <Link href="/" className="inline-block group">
            <Image
              src="/assets/yudha-white-logo.svg"
              alt="Yudha White Logo"
              width={82}
              height={88}
              priority
              className="h-10 sm:h-13 md:h-15 w-auto object-contain transition-transform group-hover:scale-105"
            />
          </Link>
        </div>

        {/* Bottom spacer */}
        <div className="relative z-10" />
      </div>

      {/* Right Column: Open Beta Form Area */}
      <div className="flex-1 min-h-0 lg:h-screen bg-white px-5 sm:px-10 lg:px-12 xl:px-16 py-6 sm:py-8 lg:py-10 flex flex-col justify-between overflow-y-visible lg:overflow-y-auto">
        {/* Top Header: Back to Website Link */}
        <div className="w-full flex justify-end items-center">
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
        </div>

        {/* Center Content: Open Beta Form */}
        <div className="w-full max-w-[500px] mr-auto my-auto py-2">
          {/* Main Title & Subtitle */}
          <h1 className="text-xl sm:text-2xl md:text-[28px] font-[800] text-stone-950 leading-[1.2] tracking-tight mb-2">
            Jadi yang pertama coba Yudha.
          </h1>
          <p className="text-xs sm:text-[13px] text-stone-500 font-medium leading-relaxed mb-5 sm:mb-6 max-w-[460px]">
            Daftar sekarang, kami berikan akses open beta lebih dulu kepadamu!
          </p>

          <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-3.5">
            {/* Row 1: Name & Email */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-3.5">
                <div className="flex flex-col space-y-1">
                  <label className="text-xs font-semibold text-stone-900">
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Full Name"
                    className="w-full px-3.5 py-2 border border-stone-300 rounded-xl text-xs sm:text-sm text-stone-950 placeholder:text-stone-400 focus:outline-none focus:border-stone-900 transition-colors"
                  />
                </div>

                <div className="flex flex-col space-y-1">
                  <label className="text-xs font-semibold text-stone-900">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="your@email.com"
                    className="w-full px-3.5 py-2 border border-stone-300 rounded-xl text-xs sm:text-sm text-stone-950 placeholder:text-stone-400 focus:outline-none focus:border-stone-900 transition-colors"
                  />
                </div>
              </div>

              {/* Row 2: No whatsapp (optional) & your goal */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-3.5">
                <div className="flex flex-col space-y-1">
                  <label className="text-xs font-semibold text-stone-900">
                    No whatsapp <span className="font-normal text-stone-500">(optional)</span>
                  </label>
                  <input
                    type="tel"
                    name="whatsapp"
                    value={formData.whatsapp}
                    onChange={handleChange}
                    placeholder="08123456789"
                    className="w-full px-3.5 py-2 border border-stone-300 rounded-xl text-xs sm:text-sm text-stone-950 placeholder:text-stone-400 focus:outline-none focus:border-stone-900 transition-colors"
                  />
                </div>

                <div className="flex flex-col space-y-1">
                  <label className="text-xs font-semibold text-stone-900">
                    your goal
                  </label>
                  <div className="relative">
                    <select
                      name="goal"
                      required
                      value={formData.goal}
                      onChange={handleChange}
                      className="w-full px-3.5 py-2 border border-stone-300 rounded-xl text-xs sm:text-sm text-stone-950 bg-white focus:outline-none focus:border-stone-900 transition-colors appearance-none cursor-pointer"
                    >
                      <option value="">Select one</option>
                      <option value="cpns">CPNS</option>
                      <option value="bumn">BUMN</option>
                      <option value="mt">MT (Management Trainee)</option>
                      <option value="others">Others</option>
                    </select>
                    {/* Custom dropdown arrow */}
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-stone-700">
                      <svg
                        className="w-3.5 h-3.5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>

              {/* Error Alert */}
              {errorMsg && (
                <div className="p-2.5 text-xs text-red-600 bg-red-50 border border-red-200 rounded-xl">
                  {errorMsg}
                </div>
              )}

              {/* Bottom Notice */}
              <p className="text-[10.5px] text-stone-400 leading-tight pt-1">
                For details about how we collect, use, and protect your information, please see our{" "}
                <Link href="/privacy-policy" className="underline hover:text-stone-600">
                  Privacy Policy
                </Link>
              </p>

              {/* Submit Neobrutalist Blue Button - "Kirim" */}
              <div className="flex justify-end pt-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="nav-pill-btn nav-pill-blue px-10 py-2.5 text-xs sm:text-sm font-extrabold cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
                >
                  {loading ? "Mengirim..." : "Kirim"}
                </button>
              </div>
            </form>
        </div>

        {/* Bottom space */}
        <div className="hidden lg:block" />
      </div>
    </main>
  );
}

export default function OpenBetaPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen w-full bg-white flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-stone-900" />
        </div>
      }
    >
      <OpenBetaContent />
    </Suspense>
  );
}
