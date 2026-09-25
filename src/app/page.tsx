import BandImage from "@/components/sections/BandImage";
import ContactSection from "@/components/sections/ContactSection";
import HeroSection from "@/components/sections/HeroSection";
import ProcedureSection from "@/components/sections/ProcedureSection";
import ProjectsSection from "@/components/sections/ProjectsSection";
import ServicesSection from "@/components/sections/ServicesSection";

export default function Home() {
  return (
    <>
      <HeroSection />
      <ServicesSection />
      <ProjectsSection />
      <ProcedureSection />
      <BandImage />
      <ContactSection />
    </>
  );
}
