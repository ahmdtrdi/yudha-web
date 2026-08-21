"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { ThreeDButton } from "@/components/ThreeDButton";

const clampProgress = (progress: number) => Math.min(Math.max(progress, 0), 1);
const easeInOut = (progress: number) => progress * progress * (3 - 2 * progress);
const easeOut = (progress: number) => 1 - (1 - progress) ** 3;

const partners = [
  { name: "Danantara Indonesia", className: "partner--danantara" },
  { name: "Mandiri", className: "partner--mandiri" },
  { name: "LPDP", className: "partner--lpdp" },
  { name: "ParagonCorp", className: "partner--paragon" },
  { name: "BCA", className: "partner--bca" },
  { name: "Astra", className: "partner--astra" },
  { name: "Telkom Indonesia", className: "partner--telkom" },
];

const questions = [
  "Apa itu Yudha?",
  "Bagaimana cara memulai perjalanan?",
  "Siapa yang dapat menggunakan Yudha?",
  "Apakah Yudha dapat diakses kapan saja?",
];

export default function Home() {
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const hero = heroRef.current;
    const button = hero?.querySelector<HTMLElement>(".mega-button");
    if (!hero || !button) return;

    let frame = 0;
    let currentHandOffset = 0;
    let currentPressProgress = 0;
    let scrollHandOffset = 0;
    let scrollPressProgress = 0;
    let pointerInteraction = 0;
    let targetHandOffset = 0;
    let targetPressProgress = 0;
    let previousTime = performance.now();

    const updateCombinedTargets = () => {
      const easedPointer = easeOut(pointerInteraction);
      const pointerHandOffset = easedPointer * 62;
      const pointerPressProgress = easeInOut(
        clampProgress((pointerInteraction - 0.3) / 0.7),
      );

      targetHandOffset = Math.max(scrollHandOffset, pointerHandOffset);
      targetPressProgress = Math.max(
        scrollPressProgress,
        pointerPressProgress,
      );
    };

    const updateScrollTargets = () => {
      const scrollOffset = Math.max(window.scrollY - hero.offsetTop, 0);
      const approachProgress = easeOut(clampProgress(scrollOffset / 24));
      const pressProgress = easeInOut(clampProgress((scrollOffset - 24) / 52));

      scrollHandOffset = approachProgress * 18 + pressProgress * 44;
      scrollPressProgress = pressProgress;
      updateCombinedTargets();
    };

    const renderPress = (time: number) => {
      const elapsed = Math.min(time - previousTime, 32);
      const smoothing = 1 - Math.exp(-elapsed / 28);

      currentHandOffset += (targetHandOffset - currentHandOffset) * smoothing;
      currentPressProgress +=
        (targetPressProgress - currentPressProgress) * smoothing;

      hero.style.setProperty("--hand-press", `${currentHandOffset}px`);
      hero.style.setProperty("--press-progress", `${currentPressProgress}`);
      hero.toggleAttribute("data-button-pressed", currentPressProgress >= 0.42);
      previousTime = time;

      const isMoving =
        Math.abs(targetHandOffset - currentHandOffset) > 0.05 ||
        Math.abs(targetPressProgress - currentPressProgress) > 0.002;

      frame = isMoving ? window.requestAnimationFrame(renderPress) : 0;
    };

    const scheduleRender = () => {
      if (!frame) {
        previousTime = performance.now();
        frame = window.requestAnimationFrame(renderPress);
      }
    };

    const onScroll = () => {
      updateScrollTargets();
      scheduleRender();
    };

    const onPointerMove = (event: PointerEvent) => {
      if (event.pointerType === "touch") return;

      const bounds = button.getBoundingClientRect();
      const horizontalDistance = Math.max(
        bounds.left - event.clientX,
        0,
        event.clientX - bounds.right,
      );
      const verticalDistance = Math.max(
        bounds.top - event.clientY,
        0,
        event.clientY - bounds.bottom,
      );
      const distance = Math.hypot(horizontalDistance, verticalDistance);

      pointerInteraction = 1 - clampProgress((distance - 24) / 120);
      updateCombinedTargets();
      scheduleRender();
    };

    const onPointerLeave = () => {
      pointerInteraction = 0;
      updateCombinedTargets();
      scheduleRender();
    };

    updateScrollTargets();
    currentHandOffset = targetHandOffset;
    currentPressProgress = targetPressProgress;
    hero.style.setProperty("--hand-press", `${currentHandOffset}px`);
    hero.style.setProperty("--press-progress", `${currentPressProgress}`);
    hero.toggleAttribute("data-button-pressed", currentPressProgress >= 0.42);
    window.addEventListener("scroll", onScroll, { passive: true });
    hero.addEventListener("pointermove", onPointerMove, { passive: true });
    hero.addEventListener("pointerleave", onPointerLeave);
    return () => {
      window.removeEventListener("scroll", onScroll);
      hero.removeEventListener("pointermove", onPointerMove);
      hero.removeEventListener("pointerleave", onPointerLeave);
      hero.removeAttribute("data-button-pressed");
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

          <div className="hero__illustration">
            <Image
              className="hero__city"
              src="/assets/city-park-landing-hero-ultrawide.webp"
              alt="Ilustrasi taman hijau di tengah gedung perkotaan"
              width={1774}
              height={887}
              priority
              quality={100}
              sizes="100vw"
            />

            <Image
              className="hero__hand"
              src="/assets/cartoon-hand.png"
              alt="Tangan kartun yang mengarah ke tombol download"
              width={1246}
              height={760}
              priority
            />
          </div>

          <div className="hero__cta">
            <ThreeDButton
              id="download"
              href="#live-beta"
              topLabel="Download"
              frontLabel="Live Beta"
            />
          </div>
        </div>
      </section>

      <p className="hero__tagline">Untuk kamu yang mengejar mimpi</p>

      <section className="demo-section" aria-label="Demo Produk">
        <div className="demo-card surface-card" id="demo-video">
          <div className="demo-card__placeholder">
            <span className="demo-card__play-icon" aria-hidden="true">▶</span>
            <p>Product Demo Video</p>
          </div>
        </div>

        <h2 className="demo-section__title">
          Diciptakan untuk orang-orang yang hidup dengan impian mereka
        </h2>
      </section>

      <section className="ecosystem" id="how-to-play" aria-labelledby="ecosystem-title">
        <h2 id="ecosystem-title" className="sr-only">Ekosistem perjalanan Yudha</h2>
        <div className="ecosystem__orbit" aria-label="Partner ekosistem Yudha">
          <span className="ecosystem__ring ecosystem__ring--outer" aria-hidden="true" />
          <span className="ecosystem__ring ecosystem__ring--inner" aria-hidden="true" />
          <span className="ecosystem__center">Yudha</span>
          {partners.map((partner) => (
            <span className={`partner ${partner.className}`} key={partner.name}>
              {partner.name}
            </span>
          ))}
        </div>
      </section>

      <p className="section-statement">
        Kami ciptakan untuk kamu yang berani maju
        <br />
        dengan keterbatasan yang ada
      </p>

      <section className="battle surface-card" aria-labelledby="battle-title">
        <h2 id="battle-title">Aptitude Battle</h2>
        <p className="battle__benefit battle__benefit--left">
          Akses kapan saja,
          <br />
          di mana saja
        </p>
        <div className="battle__phone" aria-label="Pratinjau aplikasi Yudha">
          <span className="battle__phone-speaker" aria-hidden="true" />
          <span>Yudha</span>
        </div>
        <p className="battle__benefit battle__benefit--right">
          Akses kapan saja,
          <br />
          di mana saja
        </p>
      </section>

      <section className="faq-section" id="faq" aria-labelledby="faq-title">
        <header className="faq-section__heading">
          <span>FAQ</span>
          <h2 id="faq-title">Questions<br />answered</h2>
        </header>

        <div className="faq-section__list">
          {questions.map((question, index) => (
            <details key={question} open={index === 0}>
              <summary>{question}</summary>
              <p>
                Yudha membantu kamu mengenali potensi, berlatih, dan melangkah
                menuju peluang yang tepat.
              </p>
            </details>
          ))}
        </div>
      </section>

      <section className="journey-cta surface-card" id="live-beta" aria-labelledby="journey-title">
        <h2 id="journey-title">Mari melangkah bersama</h2>
        <a className="push-button push-button--blue" href="#download">
          Download
        </a>
      </section>

      <footer className="site-footer">
        <nav className="site-footer__links" aria-label="Navigasi footer">
          <div>
            <h3>Company</h3>
            <a href="#hero">About</a>
            <a href="#how-to-play">Careers</a>
            <a href="mailto:hello@yudha.id">Become an affiliate</a>
          </div>
          <div>
            <h3>Resources</h3>
            <a href="mailto:hello@yudha.id">Contact us</a>
            <a href="#faq">Help center</a>
            <a href="#download">Download apps</a>
          </div>
          <div>
            <h3>Legal</h3>
            <a href="#faq">Privacy policy</a>
          </div>
          <div>
            <h3>Connect</h3>
            <a href="#hero">X</a>
            <a href="#hero">LinkedIn</a>
            <a href="#hero">Instagram</a>
          </div>
        </nav>

        <div className="site-footer__brand">
          <p>Your Ultimate Digital Hired Arena</p>
          <strong>YUDHA</strong>
        </div>
      </footer>
    </main>
  );
}
