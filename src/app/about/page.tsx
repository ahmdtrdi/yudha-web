import { AboutHeroSection } from "@/components/about/AboutHeroSection";
import { OurMissionSection } from "@/components/about/OurMissionSection";
import { TeamSection } from "@/components/about/TeamSection";
import { NoteFromFoundersSection } from "@/components/about/NoteFromFoundersSection";
import { FooterSection } from "@/components/onboarding/FooterSection";
import { getLocale } from "@/lib/landing-copy";
import { aboutCopy } from "@/lib/about-copy";
import { createPageMetadata } from "@/lib/site";
import { StartupProfileSection } from "@/components/about/StartupProfileSection";

interface AboutPageProps {
  searchParams: Promise<{ lang?: string | string[] }>;
}

export async function generateMetadata({ searchParams }: AboutPageProps) {
  const locale = getLocale((await searchParams).lang);
  return createPageMetadata("/about", locale, aboutCopy[locale].metadata);
}

export default async function AboutPage({ searchParams }: AboutPageProps) {
  const locale = getLocale((await searchParams).lang);
  return (
    <main lang={locale} className="min-h-screen bg-white flex flex-col w-full overflow-x-hidden">
      <AboutHeroSection locale={locale} />
      <OurMissionSection locale={locale} />
      <StartupProfileSection locale={locale} />
      <TeamSection locale={locale} />
      <NoteFromFoundersSection locale={locale} />
      <FooterSection locale={locale} />
    </main>
  );
}
