import BandImage from "@/components/sections/BandImage";
import ContactSection from "@/components/sections/ContactSection";
import HeroSection from "@/components/sections/HeroSection";
import ProcedureSection from "@/components/sections/ProcedureSection";
import ServicesSection from "@/components/sections/ServicesSection";
import NewsSection from "@/components/sections/NewsSection";

export default function Home() {
  return (
    <>
      <HeroSection />
      <ServicesSection />
      <NewsSection />
      <ProcedureSection />
      <BandImage />
      <ContactSection />
    </>
  );
}
