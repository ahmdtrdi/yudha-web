"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { ThreeDButton } from "@/components/ThreeDButton";

export default function Home() {
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const hero = heroRef.current;
    if (!hero) return;

    let frame = 0;
    const updatePress = () => {
      const progress = Math.min(Math.max(window.scrollY / 220, 0), 1);
      hero.style.setProperty("--hand-press", `${progress * 32}px`);
      hero.style.setProperty("--press-progress", `${progress}`);
      frame = 0;
    };

    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(updatePress);
    };

    updatePress();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <main>
      <section ref={heroRef} className="hero" aria-labelledby="hero-title">
        <div className="hero__stage">
          <nav className="navbar" aria-label="Navigasi utama">
            <a className="brand" href="#hero" aria-label="Yudha, kembali ke atas">
              Yudha
            </a>

            <div className="navbar__links">
              <a className="push-button push-button--lime" href="#how-to-play">
                How to Play
              </a>
              <a className="push-button push-button--lime" href="#faq">
                FAQ
              </a>
            </div>

            <a className="push-button push-button--blue navbar__download" href="#download">
              Download
            </a>
          </nav>

          <div className="hero__copy" id="hero">
            <h1 id="hero-title">Mulai Perjalananmu</h1>
            <p>Push Your Limit</p>
          </div>

          <Image
            className="hero__city"
            src="/assets/city-park-landing-hero-2x.webp"
            alt="Ilustrasi taman hijau di tengah gedung perkotaan"
            width={2974}
            height={2116}
            priority
            quality={100}
            sizes="(min-width: 1440px) 1440px, 100vw"
          />

          <div className="press-scene">
            <Image
              className="press-scene__hand"
              src="/assets/cartoon-hand.png"
              alt="Tangan kartun yang mengarah ke tombol download"
              width={1246}
              height={760}
              priority
            />

            <ThreeDButton
              id="download"
              href="#live-beta"
              topLabel="Download"
              frontLabel="Live Beta"
            />
          </div>

          <p className="hero__tagline">Untuk kamu yang mengejar mimpi</p>

          <a className="scroll-cue" href="#how-to-play" aria-label="Lihat bagian berikutnya">
            <span>Scroll untuk menekan</span>
            <span aria-hidden="true">↓</span>
          </a>
        </div>
      </section>

      <section className="intro" id="how-to-play">
        <h2>Berani mulai. Terus melaju.</h2>
        <p>
          Yudha hadir untuk menemani setiap langkah, dari tantangan pertama sampai
          pencapaian terbaikmu.
        </p>
      </section>

      <section className="faq" id="faq" aria-labelledby="faq-title">
        <p>Punya pertanyaan?</p>
        <h2 id="faq-title">Semua yang perlu kamu tahu, segera hadir.</h2>
      </section>
    </main>
  );
}
