import HeroSection from "@/src/components/sections/HeroSection";
import AboutSection from "@/src/components/sections/AboutSection"
import SkillsSection from "@/src/components/sections/SkillsSection"
import ProjectSection from "@/src/components/sections/ProjectSection"
import ContactSection from "@/src/components/sections/ContactSection"



export default function Home() {
  return (
    <main className="min-h-screen">
      <section id="hero">
        <HeroSection />
      </section>

      <section id="about">
        <AboutSection />
      </section>

      <section id="skills">
        <SkillsSection />
      </section>

      <section id="projects">
        <ProjectSection />
      </section>

      <section id="contact">
        <ContactSection />
      </section>
    </main>
  );
}
