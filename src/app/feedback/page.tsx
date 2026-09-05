"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormProgressBar } from "@/components/FormProgressBar";
import { FeedbackQuestion } from "@/components/FeedbackQuestion";
import {
  createFeedback,
  updateFeedback,
  validateFeedback,
  visibleFeedbackSteps,
  visibleQuestions,
  type FeedbackErrors,
  type FeedbackField,
  type FeedbackValue,
} from "@/lib/feedback";

export default function FeedbackPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState(createFeedback);
  const [errors, setErrors] = useState<FeedbackErrors>({});
  const [submitError, setSubmitError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const submitting = useRef(false);
  const heading = useRef<HTMLHeadingElement>(null);
  const steps = visibleFeedbackSteps(formData);
  const currentStep = steps[step - 1];

  useEffect(() => {
    heading.current?.focus();
  }, [step]);

  const focusError = (nextErrors: FeedbackErrors) => {
    requestAnimationFrame(() => {
      const field = Object.keys(nextErrors)[0];
      document.querySelector<HTMLElement>(`[data-field="${field}"] input, [data-field="${field}"] textarea, [data-field="${field}"] button`)?.focus();
    });
  };

  const changeAnswer = (field: FeedbackField, value: FeedbackValue) => {
    setFormData(previous => updateFeedback(previous, field, value));
    setErrors({});
    setSubmitError("");
  };

  const handleSubmit = async () => {
    if (submitting.current) return;
    submitting.current = true;
    setIsSubmitting(true);
    setSubmitError("");
    let completed = false;
    try {
      const res = await fetch("/api/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const result = await res.json();
      if (!res.ok || result.success !== true || result.mock) {
        if (res.status === 400 && result.errors) {
          const fieldErrors: FeedbackErrors = result.errors;
          setErrors(fieldErrors);
          const index = steps.findIndex(item => item.questions.some(q => fieldErrors[q.field] || (q.otherField && fieldErrors[q.otherField])));
          if (index >= 0) setStep(index + 1);
          focusError(fieldErrors);
        }
        throw new Error("Feedback belum tersimpan. Periksa jawabanmu atau coba kirim lagi sebentar lagi.");
      }
      completed = true;
      router.push("/close?from=feedback");
    } catch {
      setSubmitError("Feedback belum tersimpan. Jawabanmu tetap ada di halaman ini; silakan coba kirim lagi.");
    } finally {
      if (!completed) {
        submitting.current = false;
        setIsSubmitting(false);
      }
    }
  };

  const handleNext = () => {
    if (submitting.current) return;
    const nextErrors = validateFeedback({ ...formData }, step === steps.length ? steps : [currentStep]);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) {
      const index = steps.findIndex(item => item.questions.some(q => nextErrors[q.field] || (q.otherField && nextErrors[q.otherField])));
      if (index >= 0) setStep(index + 1);
      focusError(nextErrors);
      return;
    }
    if (step < steps.length) setStep(previous => previous + 1);
    else void handleSubmit();
  };

  const handleBack = () => {
    if (step > 1 && !submitting.current) {
      setErrors({});
      setSubmitError("");
      setStep(previous => previous - 1);
    }
  };

  return (
    <main className="relative min-h-screen w-full flex flex-col justify-center overflow-x-hidden text-[#090909] font-sans selection:bg-[#e3ec35] selection:text-[#090909]">
      {/* Background Image - WebP Optimized */}
      <div className="fixed inset-0 z-0 pointer-events-none opacity-90">
        <Image
          src="/assets/Hero Background Watercolor.webp"
          alt="Hero Background Watercolor"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
      </div>

      {/* Backdrop Blur Layer */}
      <div className="fixed inset-0 z-0 bg-white/15 backdrop-blur-[2px] pointer-events-none" />

      {/* Fixed Top Corner Controls */}
      <Link
        href="/"
        aria-label="Kembali ke Beranda Yudha"
        className="fixed top-4 left-4 sm:top-6 sm:left-6 z-30 inline-block group"
      >
        <Image
          src="/assets/logo-yudha.svg"
          alt="Yudha Logo"
          width={90}
          height={100}
          priority
          className="h-10 sm:h-12 md:h-14 w-auto object-contain transition-transform group-hover:scale-105"
        />
      </Link>

      <Link
        href="/"
        className="fixed top-4 right-4 sm:top-6 sm:right-6 z-30 push-button push-button--lime text-xs font-bold"
      >
        ✕ Keluar
      </Link>

      {/* Centered Floating Main Form Container */}
      <div className="relative z-10 w-full max-w-2xl mx-auto px-4 pt-20 pb-8 sm:pt-24 sm:pb-10">
        <form className="w-full" noValidate onSubmit={event => { event.preventDefault(); handleNext(); }}>
          <FormProgressBar
            currentStep={step}
            totalSteps={steps.length}
            category={currentStep.title}
          />

          <h1 ref={heading} tabIndex={-1} className="text-xl sm:text-2xl font-black mb-4 outline-none">
            {currentStep.title}
          </h1>
          <fieldset disabled={isSubmitting} className="grid min-w-0 grid-cols-1 gap-5 sm:grid-cols-2 disabled:opacity-70" key={currentStep.id}>
            <legend className="sr-only">{currentStep.title}</legend>
            {visibleQuestions(currentStep, formData).map(question => (
              <div key={question.field} className={question.field === "name" || question.field === "email" ? "min-w-0" : "min-w-0 sm:col-span-2"}>
                <FeedbackQuestion question={question} data={formData} errors={errors} onChange={changeAnswer} />
              </div>
            ))}
          </fieldset>
          {submitError && <p role="alert" className="mt-4 p-3 rounded-xl bg-red-50 border border-red-300 text-red-800 text-sm">{submitError}</p>}
          {/* Navigation Controls Bar */}
          <div className="mt-5 pt-3 border-t border-black/10 flex items-center justify-between gap-3">
            <button
              type="button"
              onClick={handleBack}
              disabled={step === 1 || isSubmitting}
              className={`push-button push-button--lime ${
                step === 1 ? "opacity-40 cursor-not-allowed pointer-events-none" : ""
              }`}
            >
              ← Kembali
            </button>

            <div className="flex items-center gap-2.5">
              <span className="hidden sm:inline text-xs text-gray-700 font-medium">
                Tekan <kbd className="px-1.5 py-0.5 border border-gray-400 rounded bg-white/80 font-mono text-[11px]">Enter ↵</kbd>
              </span>
              <button
                type="submit"
                disabled={isSubmitting}
                className="push-button push-button--blue"
              >
                {isSubmitting
                  ? "Mengirim..."
                  : step === steps.length
                  ? "Kirim Feedback 🎉"
                  : "Lanjut →"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </main>
  );
}
