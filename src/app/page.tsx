import { OnboardingHero } from "@/components/onboarding/OnboardingHero";
import { CartesiusMapSection } from "@/components/onboarding/CartesiusMapSection";
import { GatCardCatalogSection } from "@/components/onboarding/GatCardCatalogSection";
import { GratisSeruEfektifSection } from "@/components/onboarding/GratisSeruEfektifSection";
import { LatihanTiapHariSection } from "@/components/onboarding/LatihanTiapHariSection";
import { FaqSection } from "@/components/onboarding/FaqSection";
import { CtaSection } from "@/components/onboarding/CtaSection";
import { FooterSection } from "@/components/onboarding/FooterSection";

export default function Home() {
  return (
    <main className="min-h-screen bg-white flex flex-col w-full overflow-x-hidden">
      <OnboardingHero />
      <CartesiusMapSection />
      <GatCardCatalogSection />
      <GratisSeruEfektifSection />
      <LatihanTiapHariSection />
      <FaqSection />
      <CtaSection />
      <FooterSection />
    </main>
  );
}


