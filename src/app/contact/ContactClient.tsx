"use client";

import { LazyImage } from "@/components/ui/LazyImage";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { contactCopy } from "@/lib/contact-copy";
import { landingHref, type LocaleProps } from "@/lib/landing-copy";
import { CONTACT_EMAIL } from "@/lib/links";

export default function ContactClient({ locale = "id" }: LocaleProps) {
  const copy = contactCopy[locale];
  const router = useRouter();
  const submitting = useRef(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    represent: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (submitting.current) return;
    submitting.current = true;
    setLoading(true);
    setErrorMsg("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        router.push(`/close?from=contact&lang=${locale}`);
      } else {
        setErrorMsg(res.status === 503 ? copy.unavailable : res.status === 400 ? copy.invalid : copy.failed);
      }
    } catch {
      setErrorMsg(copy.network);
    } finally {
      setLoading(false);
      submitting.current = false;
    }
  };

  return (
    <main lang={locale} className="min-h-screen lg:h-screen w-full bg-white flex flex-col lg:flex-row overflow-y-auto lg:overflow-hidden">

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
          <Link href={landingHref(locale)} className="inline-block group">
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

      {/* Right Column: Contact Form Area */}
      <div className="flex-1 min-h-0 lg:h-screen bg-white px-5 sm:px-10 lg:px-12 xl:px-16 py-6 sm:py-8 lg:py-10 flex flex-col justify-between overflow-y-visible lg:overflow-y-auto">

        {/* Top Header: Back to Website Link */}
        <div className="w-full flex flex-wrap justify-between gap-4 items-center mb-6">
          <LanguageSwitcher locale={locale} pathname="/contact" />
          <Link
            href={landingHref(locale)}
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
            {copy.back}
          </Link>
        </div>

        {/* Center Content: Form */}
        <div className="w-full max-w-[500px] mr-auto my-auto py-2">

          {/* Main Title & Subtitle */}
          <h1 className="text-xl sm:text-2xl md:text-[28px] font-[800] text-stone-950 leading-[1.2] tracking-tight mb-2">
            {copy.title}
          </h1>
          <p className="text-xs sm:text-[13px] text-stone-500 font-medium leading-relaxed mb-5 sm:mb-6 max-w-[460px]">
            {copy.description}
          </p>

          <div className="mb-5 rounded-xl border border-stone-200 bg-stone-50 p-3 text-xs leading-relaxed text-stone-600 sm:text-sm">
            <p>{copy.directEmail}</p>
            <a href={`mailto:${CONTACT_EMAIL}`} className="mt-1 inline-block break-all font-bold text-blue-700 underline underline-offset-4">{CONTACT_EMAIL}</a>
          </div>

          <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-3.5">

            {/* Row 1: Name & Email */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-3.5">
                <div className="flex flex-col space-y-1">
                  <label htmlFor="contact-name" className="text-xs font-semibold text-stone-900">
                    {copy.name}
                  </label>
                  <input
                    type="text"
                    id="contact-name"
                    autoComplete="name"
                    maxLength={120}
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    placeholder={copy.namePlaceholder}
                    className="w-full px-3.5 py-2 border border-stone-300 rounded-xl text-xs sm:text-sm text-stone-950 placeholder:text-stone-400 focus:outline-none focus:border-stone-900 transition-colors"
                  />
                </div>

                <div className="flex flex-col space-y-1">
                  <label htmlFor="contact-email" className="text-xs font-semibold text-stone-900">
                    {copy.email}
                  </label>
                  <input
                    type="email"
                    id="contact-email"
                    autoComplete="email"
                    maxLength={254}
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="your@email.com"
                    className="w-full px-3.5 py-2 border border-stone-300 rounded-xl text-xs sm:text-sm text-stone-950 placeholder:text-stone-400 focus:outline-none focus:border-stone-900 transition-colors"
                  />
                </div>
              </div>

              {/* Row 2: Company (optional) & I represent */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-3.5">
                <div className="flex flex-col space-y-1">
                  <label htmlFor="contact-company" className="text-xs font-semibold text-stone-900">
                    {copy.company} <span className="font-normal text-stone-500">({copy.optional})</span>
                  </label>
                  <input
                    type="text"
                    id="contact-company"
                    autoComplete="organization"
                    maxLength={200}
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    placeholder={copy.companyPlaceholder}
                    className="w-full px-3.5 py-2 border border-stone-300 rounded-xl text-xs sm:text-sm text-stone-950 placeholder:text-stone-400 focus:outline-none focus:border-stone-900 transition-colors"
                  />
                </div>

                <div className="flex flex-col space-y-1">
                  <label htmlFor="contact-represent" className="text-xs font-semibold text-stone-900">
                    {copy.represent}
                  </label>
                  <div className="relative">
                    <select
                      id="contact-represent"
                      name="represent"
                      value={formData.represent}
                      onChange={handleChange}
                      className="w-full px-3.5 py-2 border border-stone-300 rounded-xl text-xs sm:text-sm text-stone-950 bg-white focus:outline-none focus:border-stone-900 transition-colors appearance-none cursor-pointer"
                    >
                      <option value="">{copy.select}</option>
                      {Object.entries(copy.audiences).map(([value, label]) => <option key={value} value={value}>{label}</option>)}
                    </select>
                    {/* Custom dropdown arrow */}
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-stone-700">
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>

              {/* Row 3: What would you like to discuss? */}
              <div className="flex flex-col space-y-1">
                <label htmlFor="contact-message" className="text-xs font-semibold text-stone-900">
                  {copy.message}
                </label>
                <textarea
                  id="contact-message"
                  maxLength={5000}
                  name="message"
                  required
                  rows={3}
                  value={formData.message}
                  onChange={handleChange}
                  placeholder={copy.messagePlaceholder}
                  className="w-full px-3.5 py-2 border border-stone-300 rounded-xl text-xs sm:text-sm text-stone-950 placeholder:text-stone-400 focus:outline-none focus:border-stone-900 transition-colors resize-none"
                />
              </div>

              {/* Error Alert */}
              {errorMsg && (
                <div role="alert" className="p-2.5 text-xs text-red-600 bg-red-50 border border-red-200 rounded-xl">
                  {errorMsg}
                </div>
              )}

              {/* Bottom Notice */}
              <p className="text-xs text-stone-600 leading-relaxed pt-0.5">
                {copy.privacy}{" "}
                <Link href="/privacy-policy" className="underline hover:text-stone-600">
                  {copy.privacyLink}
                </Link>
              </p>

              {/* Submit Neobrutalist Blue Button - Right aligned matching Figma */}
              <div className="flex justify-end pt-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="nav-pill-btn nav-pill-blue px-9 py-2.5 text-xs sm:text-sm font-extrabold cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
                >
                  {loading ? copy.sending : copy.submit}
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
