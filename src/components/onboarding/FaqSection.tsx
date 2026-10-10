"use client";

import { useState } from "react";
import { landingCopy, type LocaleProps } from "@/lib/landing-copy";

export function FaqSection({ locale = "id" }: LocaleProps) {
  const copy = landingCopy[locale].faq;
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleItem = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="scroll-mt-6 w-full bg-white py-12 sm:py-16 lg:py-20 px-6 sm:px-10 lg:px-14 font-sans">
      <div className="w-full max-w-[960px] mx-auto grid grid-cols-1 sm:grid-cols-[0.45fr_1fr] gap-8 sm:gap-12 lg:gap-16 items-start">

        {/* Left: Label + Heading */}
        <div className="flex flex-col gap-2">
          <span className="text-sm font-medium text-stone-400 tracking-wide">FAQ</span>
          <h2 className="text-3xl sm:text-[36px] lg:text-[40px] font-medium text-stone-950 tracking-tight leading-[1.1]">
            {copy.title}
          </h2>
        </div>

        {/* Right: Accordion Items */}
        <div className="flex flex-col border-t border-stone-200">
          {copy.items.map((item, index) => (
            <div key={index} className="border-b border-stone-200">
              <button
                type="button"
                id={`faq-question-${index}`}
                aria-expanded={openIndex === index}
                aria-controls={`faq-answer-${index}`}
                onClick={() => toggleItem(index)}
                className="w-full flex items-center justify-between py-4 sm:py-5 text-left cursor-pointer group"
              >
                <span className="text-sm sm:text-[15px] font-medium text-stone-800 pr-4 group-hover:text-stone-950 transition-colors">
                  {item.question}
                </span>
                <span className="text-lg sm:text-xl text-stone-400 flex-shrink-0 transition-transform duration-300" style={{ transform: openIndex === index ? "rotate(45deg)" : "rotate(0deg)" }}>
                  +
                </span>
              </button>
              <div
                id={`faq-answer-${index}`}
                role="region"
                aria-labelledby={`faq-question-${index}`}
                hidden={openIndex !== index}
              >
                <p className="text-xs sm:text-sm text-stone-500 leading-relaxed pb-4 sm:pb-5 pr-8">
                  {item.answer}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
