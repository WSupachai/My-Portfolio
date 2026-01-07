import HeroSection from "@/src/components/sections/HeroSection";
import AboutSection from "@/src/components/sections/AboutSection"
import SkillsSection from "@/src/components/sections/SkillsSection"
import ProjectSection from "@/src/components/sections/ProjectSection"
import ContactSection from "@/src/components/sections/ContactSection"

import { Inter } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "600", "700"],
});

export default function Home() {
  return (
    <main className="min-h-screen">
      <section id="hero">
        <HeroSection />
      </section>

      <section id="about" className={`${inter.className}`}>
        <AboutSection />
      </section>

      <section id="skills" className={`${inter.className}`}>
        <SkillsSection />
      </section>

      <section id="projects" className={`${inter.className}`}>
        <ProjectSection />
      </section>

      <section id="contact" className={`${inter.className}`}>
        <ContactSection />
      </section>
    </main>
  );
}
