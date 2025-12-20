import HeroSection from "@/src/components/sections/HeroSection";
import ContactSection from "@/src/components/sections/ContactSection"
import SkillsSection from "@/src/components/sections/SkillsSection"
export default function Home() {
  return (
    <main className="min-h-screen">
      {/*<HeroSection /> */}
      <SkillsSection />
      <ContactSection />
    </main>
  );
}
