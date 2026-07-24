import { Navbar } from "@/components/landing/navbar";
import { HeroSection } from "@/components/landing/hero-section";

export default function Home() {
  return (
    <div id="top">
      <Navbar />
      <main>
        <HeroSection />
        {/* Sections land here one by one:
            features → social proof → pricing → FAQ → footer */}
      </main>
    </div>
  );
}
