"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormProgressBar } from "@/components/FormProgressBar";

export interface FeedbackFormData {
  name: string;
  email: string;
  q1_source: string;
  q1_source_other: string;
  q2_reason: string;
  q2_reason_other: string;
  q3_tutorial_clarity: number | null;
  q4_confusing_onboarding: string;
  q5_daily_battles: string;
  q6_favorite_features: string[];
  q7_pmf_score: string;
  q8_pmf_followup: string;
  q9_hook_reason: string;
  q10_price_too_cheap: string;
  q11_price_good_deal: string;
  q12_price_expensive: string;
  q13_price_too_expensive: string;
  q14_weakness_improvement: number | null;
  q15_pressure_readiness: number | null;
  q15_pressure_reason: string;
  q16_status_segmentation: string;
  q17_contact_consent: boolean | null;
  q17_contact_info: string;
}

const initialFormData: FeedbackFormData = {
  name: "",
  email: "",
  q1_source: "",
  q1_source_other: "",
  q2_reason: "",
  q2_reason_other: "",
  q3_tutorial_clarity: null,
  q4_confusing_onboarding: "",
  q5_daily_battles: "",
  q6_favorite_features: [],
  q7_pmf_score: "",
  q8_pmf_followup: "",
  q9_hook_reason: "",
  q10_price_too_cheap: "",
  q11_price_good_deal: "",
  q12_price_expensive: "",
  q13_price_too_expensive: "",
  q14_weakness_improvement: null,
  q15_pressure_readiness: null,
  q15_pressure_reason: "",
  q16_status_segmentation: "",
  q17_contact_consent: null,
  q17_contact_info: "",
};

const TOTAL_STEPS = 9;

export default function FeedbackPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<FeedbackFormData>(initialFormData);
  const [showError, setShowError] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const formatCurrency = (val: string) => {
    const raw = val.replace(/\D/g, "");
    if (!raw) return "";
    return new Intl.NumberFormat("id-ID").format(Number(raw));
  };

  const handleCurrencyInput = (field: keyof FeedbackFormData, val: string) => {
    const numeric = val.replace(/\D/g, "");
    setFormData((prev) => ({ ...prev, [field]: numeric }));
    setShowError(false);
  };

  const isStepValid = useCallback((): boolean => {
    switch (step) {
      case 1:
        if (!formData.name.trim()) return false;
        if (!formData.email.trim()) return false;
        if (!formData.q1_source) return false;
        if (formData.q1_source === "Lainnya" && !formData.q1_source_other.trim()) return false;
        if (!formData.q2_reason) return false;
        if (formData.q2_reason === "Lainnya" && !formData.q2_reason_other.trim()) return false;
        return true;
      case 2:
        return formData.q3_tutorial_clarity !== null;
      case 3:
        if (!formData.q5_daily_battles) return false;
        if (formData.q6_favorite_features.length === 0) return false;
        return true;
      case 4:
        if (!formData.q7_pmf_score) return false;
        if (!formData.q8_pmf_followup.trim()) return false;
        return true;
      case 5:
        return formData.q9_hook_reason.trim().length > 0;
      case 6:
        return (
          formData.q10_price_too_cheap.trim().length > 0 &&
          formData.q11_price_good_deal.trim().length > 0
        );
      case 7:
        return (
          formData.q12_price_expensive.trim().length > 0 &&
          formData.q13_price_too_expensive.trim().length > 0
        );
      case 8:
        return (
          formData.q14_weakness_improvement !== null &&
          formData.q15_pressure_readiness !== null
        );
      case 9:
        if (!formData.q16_status_segmentation) return false;
        if (formData.q17_contact_consent === null) return false;
        if (formData.q17_contact_consent && !formData.q17_contact_info.trim()) return false;
        return true;
      default:
        return true;
    }
  }, [step, formData]);

  const handleSubmit = useCallback(async () => {
    setIsSubmitting(true);
    try {
      const payload = {
        ...formData,
        q1_source:
          formData.q1_source === "Lainnya"
            ? `Lainnya: ${formData.q1_source_other}`
            : formData.q1_source,
        q2_reason:
          formData.q2_reason === "Lainnya"
            ? `Lainnya: ${formData.q2_reason_other}`
            : formData.q2_reason,
      };

      const res = await fetch("/api/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        throw new Error("Gagal mengirim feedback");
      }

      router.push("/close?from=feedback");
    } catch (err) {
      console.error(err);
      alert("Terjadi kesalahan saat mengirimkan feedback. Silakan coba lagi.");
    } finally {
      setIsSubmitting(false);
    }
  }, [formData, router]);

  const handleNext = useCallback(() => {
    if (!isStepValid()) {
      setShowError(true);
      return;
    }
    setShowError(false);
    if (step < TOTAL_STEPS) {
      setStep((prev) => prev + 1);
    } else {
      handleSubmit();
    }
  }, [handleSubmit, isStepValid, step]);

  const handleBack = () => {
    if (step > 1) {
      setShowError(false);
      setStep((prev) => prev - 1);
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Enter" && !e.shiftKey) {
        const target = e.target as HTMLElement;
        if (target && target.tagName === "TEXTAREA") return;
        e.preventDefault();
        handleNext();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleNext]);

  const getCategoryName = (stepNum: number) => {
    if (stepNum <= 2) return "Kesan Pertama & Onboarding";
    if (stepNum <= 5) return "Pengalaman & Keaktifan";
    if (stepNum <= 7) return "Evaluasi Nilai & Harga";
    return "Dampak Belajar & Follow-up";
  };

  const toggleFeature = (feature: string) => {
    setFormData((prev) => {
      const exists = prev.q6_favorite_features.includes(feature);
      const updated = exists
        ? prev.q6_favorite_features.filter((f) => f !== feature)
        : [...prev.q6_favorite_features, feature];
      return { ...prev, q6_favorite_features: updated };
    });
    setShowError(false);
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
        className="fixed top-4 left-4 sm:top-6 sm:left-6 z-30 brand flex items-center justify-center w-11 h-11 border-1.5 border-[#090909] rounded-xl bg-white font-bold text-base text-[#090909] shadow-[-3px_3px_0_#090909] hover:translate-x-[-2px] hover:translate-y-[2px] transition-transform"
      >
        Yudha
      </Link>

      <Link
        href="/"
        className="fixed top-4 right-4 sm:top-6 sm:right-6 z-30 push-button push-button--lime text-xs font-bold"
      >
        ✕ Keluar
      </Link>

      {/* Centered Floating Main Form Container */}
      <div className="relative z-10 w-full max-w-2xl mx-auto px-4 pt-16 pb-8 sm:py-6">
        <div className="w-full">
          <FormProgressBar
            currentStep={step}
            totalSteps={TOTAL_STEPS}
            category={getCategoryName(step)}
          />

          {showError && (
            <div className="mb-4 px-3 py-2 bg-red-500/90 text-white backdrop-blur border border-red-700 rounded-xl font-bold text-xs animate-bounce text-center shadow-[-2px_2px_0_#090909]">
              ⚠️ Mohon isi pertanyaan yang wajib sebelum melanjutkan!
            </div>
          )}

            {/* STEP 1 */}
            {step === 1 && (
              <div className="space-y-4 sm:space-y-5 animate-fadeIn">
                {/* Identitas Diri */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-3.5 pb-3 border-b border-black/10">
                  <div className="flex flex-col space-y-1">
                    <label className="text-xs font-semibold text-stone-900">
                      Nama Lengkap <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      placeholder="Nama Lengkap Kamu"
                      value={formData.name}
                      onChange={(e) => {
                        setFormData((prev) => ({ ...prev, name: e.target.value }));
                        setShowError(false);
                      }}
                      className="w-full px-3.5 py-2 border border-stone-300 rounded-xl text-xs sm:text-sm text-stone-950 placeholder:text-stone-400 focus:outline-none focus:border-stone-900 transition-colors bg-white/80 backdrop-blur"
                    />
                  </div>

                  <div className="flex flex-col space-y-1">
                    <label className="text-xs font-semibold text-stone-900">
                      Alamat Email <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      placeholder="email@kamu.com"
                      value={formData.email}
                      onChange={(e) => {
                        setFormData((prev) => ({ ...prev, email: e.target.value }));
                        setShowError(false);
                      }}
                      className="w-full px-3.5 py-2 border border-stone-300 rounded-xl text-xs sm:text-sm text-stone-950 placeholder:text-stone-400 focus:outline-none focus:border-stone-900 transition-colors bg-white/80 backdrop-blur"
                    />
                  </div>
                </div>

                <div>
                  <h2 className="text-base sm:text-lg font-black mb-1.5 tracking-tight">
                    1. Dari mana kamu pertama kali mendengar tentang YUDHA? <span className="text-red-500">*</span>
                  </h2>
                  <div className="mt-2.5 space-y-2">
                    {[
                      { key: "A", label: "Rekomendasi teman / Komunitas CPNS & BUMN", val: "Teman / Komunitas CPNS/BUMN" },
                      { key: "B", label: "Media Sosial (TikTok / Instagram / X)", val: "TikTok / Instagram" },
                      { key: "C", label: "Lainnya", val: "Lainnya" },
                    ].map((opt) => (
                      <button
                        key={opt.key}
                        type="button"
                        onClick={() => {
                          setFormData((prev) => ({ ...prev, q1_source: opt.val }));
                          setShowError(false);
                        }}
                        className={`w-full text-left p-2.5 sm:p-3 rounded-xl border-1.5 font-bold text-xs sm:text-sm flex items-center gap-2.5 transition-all backdrop-blur-md ${
                          formData.q1_source === opt.val
                            ? "bg-[#e3ec35] text-[#090909] border-[#090909] shadow-[-3px_3px_0_#090909] translate-x-[-1px] translate-y-[-1px]"
                            : "bg-white/65 hover:bg-white/90 border-[#090909]/20 hover:border-[#090909] text-[#090909]"
                        }`}
                      >
                        <span className="w-6 h-6 flex items-center justify-center rounded-md bg-[#090909]/10 text-xs font-black shrink-0">
                          {opt.key}
                        </span>
                        <span className="flex-1">{opt.label}</span>
                        {formData.q1_source === opt.val && <span className="font-black">✓</span>}
                      </button>
                    ))}
                  </div>

                  {formData.q1_source === "Lainnya" && (
                    <input
                      type="text"
                      placeholder="Sebutkan sumber lainnya..."
                      value={formData.q1_source_other}
                      onChange={(e) => {
                        setFormData((prev) => ({ ...prev, q1_source_other: e.target.value }));
                        setShowError(false);
                      }}
                      className="mt-2 w-full p-2.5 border-1.5 border-[#090909] rounded-xl bg-white/80 backdrop-blur focus:outline-none focus:ring-2 focus:ring-[#0c70da] font-medium text-xs sm:text-sm"
                    />
                  )}
                </div>

                <div className="pt-3 border-t border-black/10">
                  <h2 className="text-base sm:text-lg font-black mb-1.5 tracking-tight">
                    2. Apa tujuan utama kamu saat mencoba YUDHA pertama kali? <span className="text-red-500">*</span>
                  </h2>
                  <div className="mt-2.5 grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {[
                      { key: "A", label: "Persiapan Ujian SKD CPNS / BUMN", val: "Persiapan SKD" },
                      { key: "B", label: "Melatih Interview Berbasis AI", val: "Latihan interview" },
                      { key: "C", label: "Sekadar Penasaran Menguji Skill", val: "Sekadar penasaran" },
                      { key: "D", label: "Direkomendasikan Oleh Teman", val: "Direkomendasikan teman" },
                      { key: "E", label: "Lainnya", val: "Lainnya" },
                    ].map((opt) => (
                      <button
                        key={opt.key}
                        type="button"
                        onClick={() => {
                          setFormData((prev) => ({ ...prev, q2_reason: opt.val }));
                          setShowError(false);
                        }}
                        className={`text-left p-2.5 rounded-xl border-1.5 font-bold text-xs sm:text-sm flex items-center gap-2 transition-all backdrop-blur-md ${
                          formData.q2_reason === opt.val
                            ? "bg-[#e3ec35] text-[#090909] border-[#090909] shadow-[-3px_3px_0_#090909] translate-x-[-1px] translate-y-[-1px]"
                            : "bg-white/65 hover:bg-white/90 border-[#090909]/20 hover:border-[#090909] text-[#090909]"
                        }`}
                      >
                        <span className="w-5 h-5 flex items-center justify-center rounded bg-[#090909]/10 text-[11px] font-black shrink-0">
                          {opt.key}
                        </span>
                        <span className="flex-1">{opt.label}</span>
                        {formData.q2_reason === opt.val && <span className="font-black">✓</span>}
                      </button>
                    ))}
                  </div>

                  {formData.q2_reason === "Lainnya" && (
                    <input
                      type="text"
                      placeholder="Sebutkan tujuan lainnya..."
                      value={formData.q2_reason_other}
                      onChange={(e) => {
                        setFormData((prev) => ({ ...prev, q2_reason_other: e.target.value }));
                        setShowError(false);
                      }}
                      className="mt-2 w-full p-2.5 border-1.5 border-[#090909] rounded-xl bg-white/80 backdrop-blur focus:outline-none focus:ring-2 focus:ring-[#0c70da] font-medium text-xs sm:text-sm"
                    />
                  )}
                </div>
              </div>
            )}

            {/* STEP 2 */}
            {step === 2 && (
              <div className="space-y-5 animate-fadeIn">
                <div>
                  <h2 className="text-base sm:text-lg font-black mb-1 tracking-tight">
                    3. Seberapa jelas panduan awal (tutorial) YUDHA dalam membantumu memahami cara bermain? <span className="text-red-500">*</span>
                  </h2>
                  <p className="text-[11px] font-medium text-gray-700 mb-3">
                    1 = Sangat Membingungkan &nbsp;•&nbsp; 5 = Sangat Jelas & Mudah Dipahami
                  </p>
                  <div className="grid grid-cols-5 gap-2 sm:gap-3">
                    {[1, 2, 3, 4, 5].map((num) => (
                      <button
                        key={num}
                        type="button"
                        onClick={() => {
                          setFormData((prev) => ({ ...prev, q3_tutorial_clarity: num }));
                          setShowError(false);
                        }}
                        className={`aspect-square flex flex-col items-center justify-center rounded-xl border-1.5 font-black text-lg sm:text-xl transition-all backdrop-blur-md ${
                          formData.q3_tutorial_clarity === num
                            ? "bg-[#0c70da] text-white border-[#090909] shadow-[-3px_3px_0_#090909] translate-x-[-1px] translate-y-[-1px]"
                            : "bg-white/65 hover:bg-white/90 border-[#090909]/20 hover:border-[#090909] text-[#090909]"
                        }`}
                      >
                        {num}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-black/10">
                  <h2 className="text-base sm:text-lg font-black mb-1 tracking-tight">
                    4. Apakah ada bagian tutorial atau alur awal yang menurutmu kurang jelas?
                  </h2>
                  <p className="text-[11px] text-gray-600 mb-2">
                    (Opsional — Tuliskan saran atau bagian yang terasa membingungkan)
                  </p>
                  <textarea
                    rows={2}
                    placeholder="Contoh: Penjelasan tentang poin battle kurang paham..."
                    value={formData.q4_confusing_onboarding}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, q4_confusing_onboarding: e.target.value }))
                    }
                    className="w-full p-3 border-1.5 border-[#090909] rounded-xl bg-white/80 backdrop-blur focus:outline-none focus:ring-2 focus:ring-[#0c70da] font-medium text-xs sm:text-sm"
                  />
                </div>
              </div>
            )}

            {/* STEP 3 */}
            {step === 3 && (
              <div className="space-y-5 animate-fadeIn">
                <div>
                  <h2 className="text-base sm:text-lg font-black mb-1.5 tracking-tight">
                    5. Sejak pertama install, seberapa rutin kamu latihan per hari? <span className="text-red-500">*</span>
                  </h2>
                  <div className="mt-2.5 space-y-2">
                    {[
                      { key: "A", label: "Belum pernah / Kurang dari 1x per hari" },
                      { key: "B", label: "1 hingga 3x latihan per hari" },
                      { key: "C", label: "4 hingga 10x latihan per hari" },
                      { key: "D", label: "Lebih dari 10x per hari (Sangat aktif)" },
                    ].map((opt) => (
                      <button
                        key={opt.key}
                        type="button"
                        onClick={() => {
                          setFormData((prev) => ({ ...prev, q5_daily_battles: opt.label }));
                          setShowError(false);
                        }}
                        className={`w-full text-left p-2.5 sm:p-3 rounded-xl border-1.5 font-bold text-xs sm:text-sm flex items-center gap-2.5 transition-all backdrop-blur-md ${
                          formData.q5_daily_battles === opt.label
                            ? "bg-[#e3ec35] text-[#090909] border-[#090909] shadow-[-3px_3px_0_#090909] translate-x-[-1px] translate-y-[-1px]"
                            : "bg-white/65 hover:bg-white/90 border-[#090909]/20 hover:border-[#090909] text-[#090909]"
                        }`}
                      >
                        <span className="w-6 h-6 flex items-center justify-center rounded-md bg-[#090909]/10 text-xs font-black">
                          {opt.key}
                        </span>
                        <span className="flex-1">{opt.label}</span>
                        {formData.q5_daily_battles === opt.label && <span className="font-black">✓</span>}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-black/10">
                  <h2 className="text-base sm:text-lg font-black mb-1 tracking-tight">
                    6. Fitur mana saja yang paling sering kamu gunakan? <span className="text-red-500">*</span>
                  </h2>
                  <p className="text-[11px] text-gray-600 mb-2">(Bisa pilih lebih dari satu)</p>
                  <div className="grid grid-cols-2 gap-2">
                    {["PvP Battle", "AI Interview Simulator", "Practice Mode", "Analytics & Stats"].map((feat) => {
                      const isSelected = formData.q6_favorite_features.includes(feat);
                      return (
                        <button
                          key={feat}
                          type="button"
                          onClick={() => toggleFeature(feat)}
                          className={`p-2.5 rounded-xl border-1.5 font-bold text-xs sm:text-sm flex items-center justify-between transition-all backdrop-blur-md ${
                            isSelected
                              ? "bg-[#0c70da] text-white border-[#090909] shadow-[-3px_3px_0_#090909] translate-x-[-1px] translate-y-[-1px]"
                              : "bg-white/65 hover:bg-white/90 border-[#090909]/20 hover:border-[#090909] text-[#090909]"
                          }`}
                        >
                          <span>{feat}</span>
                          <span className="font-black">{isSelected ? "☑" : "☐"}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}

            {/* STEP 4 */}
            {step === 4 && (
              <div className="space-y-4 sm:space-y-5 animate-fadeIn">
                <div>
                  <h2 className="text-base sm:text-lg font-black mb-1.5 tracking-tight">
                    7. Jika YUDHA tiba-tiba tidak tersedia lagi besok, bagaimana perasaanmu? <span className="text-red-500">*</span>
                  </h2>
                  <div className="mt-2.5 space-y-2">
                    {[
                      { key: "A", label: "Sangat kecewa — YUDHA sudah jadi bagian rutinitas belajarku", val: "Sangat kecewa" },
                      { key: "B", label: "Agak kecewa — masih bisa cari alternatif lain", val: "Agak kecewa" },
                      { key: "C", label: "Tidak masalah — tidak terlalu berdampak", val: "Tidak masalah" },
                      { key: "D", label: "Sudah tidak menggunakan YUDHA lagi", val: "Sudah tidak pakai lagi" },
                    ].map((opt) => (
                      <button
                        key={opt.key}
                        type="button"
                        onClick={() => {
                          setFormData((prev) => ({ ...prev, q7_pmf_score: opt.val }));
                          setShowError(false);
                        }}
                        className={`w-full text-left p-2.5 sm:p-3 rounded-xl border-1.5 font-bold text-xs sm:text-sm flex items-center gap-2.5 transition-all backdrop-blur-md ${
                          formData.q7_pmf_score === opt.val
                            ? "bg-[#e3ec35] text-[#090909] border-[#090909] shadow-[-3px_3px_0_#090909] translate-x-[-1px] translate-y-[-1px]"
                            : "bg-white/65 hover:bg-white/90 border-[#090909]/20 hover:border-[#090909] text-[#090909]"
                        }`}
                      >
                        <span className="w-6 h-6 flex items-center justify-center rounded-md bg-[#090909]/10 text-xs font-black">
                          {opt.key}
                        </span>
                        <span className="flex-1">{opt.label}</span>
                        {formData.q7_pmf_score === opt.val && <span className="font-black">✓</span>}
                      </button>
                    ))}
                  </div>
                </div>

                {formData.q7_pmf_score && (
                  <div className="pt-3 border-t border-black/10 animate-fadeIn">
                    <h2 className="text-base sm:text-lg font-black mb-1 tracking-tight">
                      8.{" "}
                      {formData.q7_pmf_score === "Sangat kecewa"
                        ? "Nilai atau manfaat terbesar apa yang membuat YUDHA sangat berharga bagimu?"
                        : formData.q7_pmf_score === "Agak kecewa"
                        ? "Hal utama apa yang perlu ditingkatkan agar YUDHA jauh lebih bermanfaat?"
                        : "Apa faktor utama yang membuatmu kurang tertarik atau berhenti di YUDHA?"}{" "}
                      <span className="text-red-500">*</span>
                    </h2>
                    <textarea
                      rows={2}
                      placeholder="Tuliskan pengalaman atau pendapat jujurmu..."
                      value={formData.q8_pmf_followup}
                      onChange={(e) => {
                        setFormData((prev) => ({ ...prev, q8_pmf_followup: e.target.value }));
                        setShowError(false);
                      }}
                      className="w-full p-3 border-1.5 border-[#090909] rounded-xl bg-white/80 backdrop-blur focus:outline-none focus:ring-2 focus:ring-[#0c70da] font-medium text-xs sm:text-sm"
                    />
                  </div>
                )}
              </div>
            )}

            {/* STEP 5 */}
            {step === 5 && (
              <div className="space-y-4 animate-fadeIn">
                <div>
                  <h2 className="text-base sm:text-lg font-black mb-1.5 tracking-tight">
                    9. Fitur atau keseruan apa di YUDHA yang paling membuatmu bersemangat untuk kembali latihan besok? <span className="text-red-500">*</span>
                  </h2>
                  <p className="text-[11px] text-gray-600 mb-3">
                    (Misal: persaingan leaderboard, variasi soal PvP, umpan balik AI Interview, dll.)
                  </p>
                  <textarea
                    rows={3}
                    placeholder="Tuliskan alasan atau fitur favoritmu..."
                    value={formData.q9_hook_reason}
                    onChange={(e) => {
                      setFormData((prev) => ({ ...prev, q9_hook_reason: e.target.value }));
                      setShowError(false);
                    }}
                    className="w-full p-3.5 border-1.5 border-[#090909] rounded-xl bg-white/80 backdrop-blur focus:outline-none focus:ring-2 focus:ring-[#0c70da] font-medium text-xs sm:text-sm"
                  />
                </div>
              </div>
            )}

            {/* STEP 6 */}
            {step === 6 && (
              <div className="space-y-5 animate-fadeIn">
                <div>
                  <h2 className="text-base sm:text-lg font-black mb-1 tracking-tight">
                    10. Berapa harga per bulan yang menurutmu terlalu murah hingga meragukan kualitasnya? <span className="text-red-500">*</span>
                  </h2>
                  <div className="relative mt-2">
                    <span className="absolute left-3.5 top-2.5 font-bold text-gray-600 text-sm">Rp</span>
                    <input
                      type="text"
                      placeholder="20.000"
                      value={formatCurrency(formData.q10_price_too_cheap)}
                      onChange={(e) => handleCurrencyInput("q10_price_too_cheap", e.target.value)}
                      className="w-full pl-10 pr-3 py-2.5 border-1.5 border-[#090909] rounded-xl font-bold text-base bg-white/80 backdrop-blur focus:outline-none focus:ring-2 focus:ring-[#0c70da]"
                    />
                  </div>
                </div>

                <div className="pt-4 border-t border-black/10">
                  <h2 className="text-base sm:text-lg font-black mb-1 tracking-tight">
                    11. Berapa harga per bulan yang menurutmu wajar dan terasa sebagai tawaran sangat baik (good deal)? <span className="text-red-500">*</span>
                  </h2>
                  <div className="relative mt-2">
                    <span className="absolute left-3.5 top-2.5 font-bold text-gray-600 text-sm">Rp</span>
                    <input
                      type="text"
                      placeholder="50.000"
                      value={formatCurrency(formData.q11_price_good_deal)}
                      onChange={(e) => handleCurrencyInput("q11_price_good_deal", e.target.value)}
                      className="w-full pl-10 pr-3 py-2.5 border-1.5 border-[#090909] rounded-xl font-bold text-base bg-white/80 backdrop-blur focus:outline-none focus:ring-2 focus:ring-[#0c70da]"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* STEP 7 */}
            {step === 7 && (
              <div className="space-y-5 animate-fadeIn">
                <div>
                  <h2 className="text-base sm:text-lg font-black mb-1 tracking-tight">
                    12. Berapa harga per bulan yang mulai terasa mahal, namun masih kamu pertimbangkan? <span className="text-red-500">*</span>
                  </h2>
                  <div className="relative mt-2">
                    <span className="absolute left-3.5 top-2.5 font-bold text-gray-600 text-sm">Rp</span>
                    <input
                      type="text"
                      placeholder="99.000"
                      value={formatCurrency(formData.q12_price_expensive)}
                      onChange={(e) => handleCurrencyInput("q12_price_expensive", e.target.value)}
                      className="w-full pl-10 pr-3 py-2.5 border-1.5 border-[#090909] rounded-xl font-bold text-base bg-white/80 backdrop-blur focus:outline-none focus:ring-2 focus:ring-[#0c70da]"
                    />
                  </div>
                </div>

                <div className="pt-4 border-t border-black/10">
                  <h2 className="text-base sm:text-lg font-black mb-1 tracking-tight">
                    13. Berapa harga per bulan yang terlalu mahal hingga kamu langsung batal membeli? <span className="text-red-500">*</span>
                  </h2>
                  <div className="relative mt-2">
                    <span className="absolute left-3.5 top-2.5 font-bold text-gray-600 text-sm">Rp</span>
                    <input
                      type="text"
                      placeholder="250.000"
                      value={formatCurrency(formData.q13_price_too_expensive)}
                      onChange={(e) => handleCurrencyInput("q13_price_too_expensive", e.target.value)}
                      className="w-full pl-10 pr-3 py-2.5 border-1.5 border-[#090909] rounded-xl font-bold text-base bg-white/80 backdrop-blur focus:outline-none focus:ring-2 focus:ring-[#0c70da]"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* STEP 8 */}
            {step === 8 && (
              <div className="space-y-5 animate-fadeIn">
                <div>
                  <h2 className="text-base sm:text-lg font-black mb-1 tracking-tight">
                    14. Seberapa besar YUDHA membantumu memperjelas materi atau bidang yang kamu lemah? <span className="text-red-500">*</span>
                  </h2>
                  <p className="text-[11px] font-medium text-gray-700 mb-2.5">1 = Belum terasa &nbsp;•&nbsp; 5 = Sangat jelas & terbantu</p>
                  <div className="grid grid-cols-5 gap-2 sm:gap-3">
                    {[1, 2, 3, 4, 5].map((num) => (
                      <button
                        key={num}
                        type="button"
                        onClick={() => {
                          setFormData((prev) => ({ ...prev, q14_weakness_improvement: num }));
                          setShowError(false);
                        }}
                        className={`aspect-square flex flex-col items-center justify-center rounded-xl border-1.5 font-black text-lg sm:text-xl transition-all backdrop-blur-md ${
                          formData.q14_weakness_improvement === num
                            ? "bg-[#0c70da] text-white border-[#090909] shadow-[-3px_3px_0_#090909] translate-x-[-1px] translate-y-[-1px]"
                            : "bg-white/65 hover:bg-white/90 border-[#090909]/20 hover:border-[#090909] text-[#090909]"
                        }`}
                      >
                        {num}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-black/10">
                  <h2 className="text-base sm:text-lg font-black mb-1 tracking-tight">
                    15. Seberapa siap kamu menghadapi tekanan waktu ujian sesungguhnya setelah rutin di YUDHA? <span className="text-red-500">*</span>
                  </h2>
                  <p className="text-[11px] font-medium text-gray-700 mb-2.5">1 = Belum merasa siap &nbsp;•&nbsp; 5 = Jauh lebih siap & tenang</p>
                  <div className="grid grid-cols-5 gap-2 sm:gap-3 mb-3">
                    {[1, 2, 3, 4, 5].map((num) => (
                      <button
                        key={num}
                        type="button"
                        onClick={() => {
                          setFormData((prev) => ({ ...prev, q15_pressure_readiness: num }));
                          setShowError(false);
                        }}
                        className={`aspect-square flex flex-col items-center justify-center rounded-xl border-1.5 font-black text-lg sm:text-xl transition-all backdrop-blur-md ${
                          formData.q15_pressure_readiness === num
                            ? "bg-[#0c70da] text-white border-[#090909] shadow-[-3px_3px_0_#090909] translate-x-[-1px] translate-y-[-1px]"
                            : "bg-white/65 hover:bg-white/90 border-[#090909]/20 hover:border-[#090909] text-[#090909]"
                        }`}
                      >
                        {num}
                      </button>
                    ))}
                  </div>

                  <input
                    type="text"
                    placeholder="Alasan atau catatan singkat (opsional)..."
                    value={formData.q15_pressure_reason}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, q15_pressure_reason: e.target.value }))
                    }
                    className="w-full p-2.5 border-1.5 border-[#090909] rounded-xl bg-white/80 backdrop-blur focus:outline-none focus:ring-2 focus:ring-[#0c70da] font-medium text-xs sm:text-sm"
                  />
                </div>
              </div>
            )}

            {/* STEP 9 */}
            {step === 9 && (
              <div className="space-y-5 animate-fadeIn">
                <div>
                  <h2 className="text-base sm:text-lg font-black mb-2 tracking-tight">
                    16. Bagaimana status pendaftaran CPNS / BUMN kamu saat ini? <span className="text-red-500">*</span>
                  </h2>
                  <div className="space-y-2">
                    {[
                      { key: "A", label: "Sedang aktif mendaftar & bersiap tes periode ini", val: "Aktif mendaftar CPNS/BUMN sekarang" },
                      { key: "B", label: "Bersiap untuk pendaftaran periode tahun depan", val: "Bersiap untuk tahun depan" },
                      { key: "C", label: "Hanya mencoba-coba / belum ada rencana mendaftar", val: "Hanya mencoba-coba / tidak mendaftar" },
                    ].map((opt) => (
                      <button
                        key={opt.key}
                        type="button"
                        onClick={() => {
                          setFormData((prev) => ({ ...prev, q16_status_segmentation: opt.val }));
                          setShowError(false);
                        }}
                        className={`w-full text-left p-2.5 sm:p-3 rounded-xl border-1.5 font-bold text-xs sm:text-sm flex items-center gap-2.5 transition-all backdrop-blur-md ${
                          formData.q16_status_segmentation === opt.val
                            ? "bg-[#e3ec35] text-[#090909] border-[#090909] shadow-[-3px_3px_0_#090909] translate-x-[-1px] translate-y-[-1px]"
                            : "bg-white/65 hover:bg-white/90 border-[#090909]/20 hover:border-[#090909] text-[#090909]"
                        }`}
                      >
                        <span className="w-6 h-6 flex items-center justify-center rounded-md bg-[#090909]/10 text-xs font-black">
                          {opt.key}
                        </span>
                        <span className="flex-1">{opt.label}</span>
                        {formData.q16_status_segmentation === opt.val && <span className="font-black">✓</span>}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-black/10">
                  <h2 className="text-base sm:text-lg font-black mb-1 tracking-tight">
                    17. Bolehkah tim YUDHA menghubungimu dalam 2–3 bulan ke depan untuk tanya hasil tes kamu? <span className="text-red-500">*</span>
                  </h2>
                  <p className="text-[11px] text-gray-600 mb-2.5">
                    (Data kamu aman & hanya digunakan untuk evaluasi perkembangan peserta)
                  </p>
                  <div className="grid grid-cols-2 gap-2 mb-3">
                    <button
                      type="button"
                      onClick={() => {
                        setFormData((prev) => ({ ...prev, q17_contact_consent: true }));
                        setShowError(false);
                      }}
                      className={`p-2.5 rounded-xl border-1.5 font-bold text-xs sm:text-sm transition-all backdrop-blur-md ${
                        formData.q17_contact_consent === true
                          ? "bg-[#e3ec35] text-[#090909] border-[#090909] shadow-[-3px_3px_0_#090909] translate-x-[-1px] translate-y-[-1px]"
                          : "bg-white/65 hover:bg-white/90 border-[#090909]/20 hover:border-[#090909] text-[#090909]"
                      }`}
                    >
                      Ya, Tentu Boleh
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setFormData((prev) => ({
                          ...prev,
                          q17_contact_consent: false,
                          q17_contact_info: "",
                        }));
                        setShowError(false);
                      }}
                      className={`p-2.5 rounded-xl border-1.5 font-bold text-xs sm:text-sm transition-all backdrop-blur-md ${
                        formData.q17_contact_consent === false
                          ? "bg-gray-300 text-[#090909] border-[#090909] shadow-[-3px_3px_0_#090909] translate-x-[-1px] translate-y-[-1px]"
                          : "bg-white/65 hover:bg-white/90 border-[#090909]/20 hover:border-[#090909] text-[#090909]"
                      }`}
                    >
                      Tidak Untuk Saat Ini
                    </button>
                  </div>

                  {formData.q17_contact_consent && (
                    <input
                      type="text"
                      placeholder="Nomor WhatsApp atau alamat Email kamu..."
                      value={formData.q17_contact_info}
                      onChange={(e) => {
                        setFormData((prev) => ({ ...prev, q17_contact_info: e.target.value }));
                        setShowError(false);
                      }}
                      className="w-full p-2.5 border-1.5 border-[#090909] rounded-xl bg-white/80 backdrop-blur focus:outline-none focus:ring-2 focus:ring-[#0c70da] font-medium text-xs sm:text-sm animate-fadeIn"
                    />
                  )}
                </div>
              </div>
            )}

            {/* Navigation Controls Bar */}
            <div className="mt-5 pt-3 border-t border-black/10 flex items-center justify-between gap-3">
              <button
                type="button"
                onClick={handleBack}
                disabled={step === 1}
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
                  type="button"
                  onClick={handleNext}
                  disabled={isSubmitting}
                  className="push-button push-button--blue"
                >
                  {isSubmitting
                    ? "Mengirim..."
                    : step === TOTAL_STEPS
                    ? "Kirim Feedback 🎉"
                    : "Lanjut →"}
                </button>
              </div>
            </div>
          </div>
      </div>
    </main>
  );
}
