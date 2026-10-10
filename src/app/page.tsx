import { OnboardingHero } from "@/components/onboarding/OnboardingHero";
import { CartesiusMapSection } from "@/components/onboarding/CartesiusMapSection";
import { GatCardCatalogSection } from "@/components/onboarding/GatCardCatalogSection";
import { GratisSeruEfektifSection } from "@/components/onboarding/GratisSeruEfektifSection";
import { LatihanTiapHariSection } from "@/components/onboarding/LatihanTiapHariSection";
import { FaqSection } from "@/components/onboarding/FaqSection";
import { CtaSection } from "@/components/onboarding/CtaSection";
import { FooterSection } from "@/components/onboarding/FooterSection";
import { getLocale, landingCopy } from "@/lib/landing-copy";
import type { Metadata } from "next";
import { createPageMetadata, SITE_URL } from "@/lib/site";
import { CONTACT_EMAIL, PLAY_STORE_URL } from "@/lib/links";
import { TractionSection } from "@/components/onboarding/TractionSection";
import { TEAM_MEMBERS } from "@/lib/team";

interface HomeProps {
  searchParams: Promise<{ lang?: string | string[] }>;
}

export async function generateMetadata({ searchParams }: HomeProps): Promise<Metadata> {
  const locale = getLocale((await searchParams).lang);
  return createPageMetadata("/", locale, landingCopy[locale].metadata);
}

export default async function Home({ searchParams }: HomeProps) {
  const locale = getLocale((await searchParams).lang);
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${SITE_URL}/#organization`,
        name: "YUDHA",
        alternateName: "Your Ultimate Digital Hiring Arena",
        url: SITE_URL,
        email: CONTACT_EMAIL,
        logo: `${SITE_URL}/assets/logo-yudha.svg`,
        founder: TEAM_MEMBERS.map((member) => ({ "@type": "Person", name: member.name, sameAs: member.linkedin })),
      },
      {
        "@type": "MobileApplication",
        name: "Yudha",
        description: landingCopy[locale].metadata.description,
        applicationCategory: "EducationalApplication",
        operatingSystem: "Android",
        downloadUrl: PLAY_STORE_URL,
        publisher: { "@id": `${SITE_URL}/#organization` },
      },
    ],
  };

  return (
    <main lang={locale} className="min-h-screen bg-white flex flex-col w-full overflow-x-clip">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, "\\u003c") }} />
      <OnboardingHero locale={locale} />
      <TractionSection locale={locale} />
      <GratisSeruEfektifSection locale={locale} />
      <CartesiusMapSection locale={locale} />
      <GatCardCatalogSection locale={locale} />
      <LatihanTiapHariSection locale={locale} />
      <FaqSection locale={locale} />
      <CtaSection locale={locale} />
      <FooterSection locale={locale} />
    </main>
  );
}


