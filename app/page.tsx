import { Navbar } from "@/components/landing/navbar";
import { HeroSection } from "@/components/landing/hero-section";
import { Features } from "@/components/landing/features";

export default function Home() {
  return (
    <div id="top">
      <Navbar />
      <main>
        <HeroSection />
        <Features />
        {/* Sections land here one by one:
            social proof → pricing → FAQ → footer */}
      </main>
    </div>
  );
}
