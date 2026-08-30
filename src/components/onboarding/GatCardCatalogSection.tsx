"use client";

import Image from "next/image";

interface CardItem {
  id: string;
  title: string;
  image: string;
}

const TOP_ROW_CARDS: CardItem[] = [
  {
    id: "numerik",
    title: "Numerik",
    image: "/assets/numerik-card.png",
  },
  {
    id: "verbal",
    title: "Verbal",
    image: "/assets/verbal-card.png",
  },
  {
    id: "logis",
    title: "Logis",
    image: "/assets/logis-card.png",
  },
  {
    id: "figural",
    title: "Figural",
    image: "/assets/figural-card.png",
  },
];

const BOTTOM_ROW_CARDS: CardItem[] = [
  {
    id: "akhlak",
    title: "Akhlak",
    image: "/assets/akhlak-card.png",
  },
  {
    id: "tkp",
    title: "TKP",
    image: "/assets/tkp-card.png",
  },
  {
    id: "twk",
    title: "TWK",
    image: "/assets/twk-card.png",
  },
];

export function GatCardCatalogSection() {
  return (
    <section className="w-full py-12 sm:py-16 lg:py-20 px-6 sm:px-10 lg:px-14 bg-white flex flex-col items-center justify-center text-center font-sans">
      <div className="w-full max-w-[1200px] mx-auto flex flex-col items-center">
        
        {/* Section Heading */}
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-[38px] font-extrabold text-stone-950 tracking-tight leading-tight max-w-[960px] mb-4 sm:mb-5">
          Satu Aplikasi, Semua Jenis Soal GAT
        </h2>

        {/* Section Subtitle */}
        <p className="text-sm sm:text-base md:text-[17px] text-stone-400 font-normal leading-relaxed max-w-[700px] mb-8 sm:mb-10 lg:mb-12">
          Yudha menyediakan latihan soal GAT lengkap—verbal, numerik, logika, dan figural—untuk persiapan CPNS, BUMN, hingga management trainee.
        </p>

        {/* Cards Catalog Grid Container - Capped at 786px matching Figma artboard */}
        <div className="w-full max-w-[786px] mx-auto flex flex-col items-center gap-6 sm:gap-8">
          
          {/* Row 1: 4 Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-5 md:gap-6 w-full justify-items-center">
            {TOP_ROW_CARDS.map((card) => (
              <CatalogCard key={card.id} card={card} />
            ))}
          </div>

          {/* Row 2: 3 Cards (Centered) */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 sm:gap-5 md:gap-6 w-full max-w-[600px] justify-items-center">
            {BOTTOM_ROW_CARDS.map((card) => (
              <CatalogCard key={card.id} card={card} />
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}

function CatalogCard({ card }: { card: CardItem }) {
  return (
    <div className="group flex flex-col items-center cursor-pointer select-none">
      
      {/* Outer Card Slot Container */}
      <div className="relative w-[135px] sm:w-[150px] md:w-[160px] h-[215px] sm:h-[245px] md:h-[265px] flex items-end justify-center pt-6">
        
        {/* Card Artwork Image - Pulls UP out of sleeve on hover */}
        <div className="relative z-10 w-full h-[92%] transition-transform duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:-translate-y-12 sm:group-hover:-translate-y-14 group-hover:scale-[1.02]">
          <Image
            src={card.image}
            alt={card.title}
            fill
            sizes="(max-width: 640px) 135px, (max-width: 768px) 150px, 160px"
            className="object-contain drop-shadow-2xs transition-all duration-500 group-hover:drop-shadow-sm"
          />
        </div>

        {/* Sleeve / Pocket (Bungkusan Bening Transparan) - Top edge raised to match design */}
        <div className="absolute bottom-0 left-[5%] right-[5%] h-[32%] bg-white/40 border border-stone-200/60 rounded-t-none rounded-b-xl sm:rounded-b-[16px] shadow-[0_2px_8px_rgba(0,0,0,0.03)] z-20 pointer-events-none transition-all duration-400 ease-out group-hover:border-stone-300/70 group-hover:bg-white/55 group-hover:shadow-[0_4px_12px_rgba(0,0,0,0.05)]" />

      </div>

      {/* Card Title Label */}
      <span className="mt-3.5 sm:mt-4 text-sm sm:text-base font-medium text-stone-800 tracking-tight transition-colors group-hover:text-stone-950">
        {card.title}
      </span>
    </div>
  );
}





