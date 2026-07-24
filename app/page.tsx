import { Navbar } from "@/components/landing/navbar";
import { HeroSection } from "@/components/landing/hero-section";
import { Features } from "@/components/landing/features";
import { TestimonialsSection } from "@/components/landing/testimonials";
import { Pricing } from "@/components/landing/pricing";
import { Faq } from "@/components/landing/faq";
import { PawlyFooter } from "@/components/ui/footer-section";

export default function Home() {
  return (
    <div id="top">
      <Navbar />
      <main>
        <HeroSection />
        <Features />
        <TestimonialsSection />
        <Pricing />
        <Faq />
      </main>
      <PawlyFooter />
    </div>
  );
}
