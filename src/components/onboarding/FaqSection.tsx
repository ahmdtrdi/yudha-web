"use client";

import { useState } from "react";

interface FaqItem {
  question: string;
  answer: string;
}

const FAQ_ITEMS: FaqItem[] = [
  {
    question: "Apakah Yudha benar-benar gratis?",
    answer:
      "Ya, Yudha gratis untuk digunakan. Kamu bisa latihan drilling soal GAT, ikut duel PvP, dan pantau progres tanpa biaya apapun.",
  },
  {
    question: "Soal GAT apa saja yang tersedia di Yudha?",
    answer:
      "Yudha menyediakan 7 jenis soal GAT: Numerik, Verbal, Logis, Figural, Akhlak, TKP, dan TWK. Semua dirancang untuk persiapan seleksi CPNS, BUMN, dan management trainee.",
  },
  {
    question: "Bagaimana cara kerja fitur Arena PvP?",
    answer:
      "Di Arena PvP, kamu duel menjawab soal dengan pemain lain secara real-time. Setelah selesai, sistem menunjukkan kelemahan kamu dan mengarahkan latihan mandiri di topik tersebut.",
  },
  {
    question: "Apakah AI Interview bisa bantu persiapan wawancara BUMN?",
    answer:
      "Tentu. AI Interview melatih kamu menjawab pertanyaan interview dan memberi feedback instan soal cara jawabmu—bukan cuma soal tertulis, tapi juga persiapan berbicara di depan pewawancara.",
  },
];

export function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleItem = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="w-full bg-white py-12 sm:py-16 lg:py-20 px-6 sm:px-10 lg:px-14 font-sans">
      <div className="w-full max-w-[960px] mx-auto grid grid-cols-1 sm:grid-cols-[0.45fr_1fr] gap-8 sm:gap-12 lg:gap-16 items-start">

        {/* Left: Label + Heading */}
        <div className="flex flex-col gap-2">
          <span className="text-sm font-medium text-stone-400 tracking-wide">FAQ</span>
          <h2 className="text-3xl sm:text-[36px] lg:text-[40px] font-medium text-stone-950 tracking-tight leading-[1.1]">
            Questions,
            <br />
            answered
          </h2>
        </div>

        {/* Right: Accordion Items */}
        <div className="flex flex-col border-t border-stone-200">
          {FAQ_ITEMS.map((item, index) => (
            <div key={index} className="border-b border-stone-200">
              <button
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
                className="overflow-hidden transition-all duration-300 ease-out"
                style={{
                  maxHeight: openIndex === index ? "200px" : "0px",
                  opacity: openIndex === index ? 1 : 0,
                }}
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
