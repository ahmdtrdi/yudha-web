import { AboutHeroSection } from "@/components/about/AboutHeroSection";
import { OurMissionSection } from "@/components/about/OurMissionSection";
import { TeamSection } from "@/components/about/TeamSection";
import { NoteFromFoundersSection } from "@/components/about/NoteFromFoundersSection";
import { FooterSection } from "@/components/onboarding/FooterSection";

export const metadata = {
  title: "About Us — Yudha",
  description: "Yudha mengubah drilling soal tes seleksi jadi pertarungan PvP yang gratis dan seru",
};

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-white flex flex-col w-full overflow-x-hidden">
      <AboutHeroSection />
      <OurMissionSection />
      <TeamSection />
      <NoteFromFoundersSection />
      <FooterSection />
    </main>
  );
}
