import { HeroSection } from "@/components/sections/hero";
import { AboutSection } from "@/components/sections/about";
import { SkillsSection } from "@/components/sections/skills";
import { ProjectsSection } from "@/components/sections/projects";
import { ExperienceSection } from "@/components/sections/experience";
import { ContactSection } from "@/components/sections/contact";

export default function Home() {
  return (
    <main className="relative z-10">
      <HeroSection />
      <div className="border-t border-white/5"><AboutSection /></div>
      <div className="border-t border-white/5"><SkillsSection /></div>
      <div className="border-t border-white/5"><ProjectsSection /></div>
      <div className="border-t border-white/5"><ExperienceSection /></div>
      <div className="border-t border-white/5"><ContactSection /></div>
    </main>
  );
}
