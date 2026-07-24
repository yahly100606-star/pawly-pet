"use client";

import { AnimatedMarqueeHero } from "@/components/ui/hero-3";

/* Branded local placeholders for the hero marquee (no third-party image
   hosts — keeps Lighthouse clean). Swap for Pawly product/UGC shots before
   launch — real pets, natural light, owners' hands in frame (see
   photography direction in the skill). */
const HERO_IMAGES = Array.from(
  { length: 8 },
  (_, i) => `/hero/pawly-${i + 1}.svg`
);

export function HeroSection() {
  return (
    <AnimatedMarqueeHero
      tagline="Vet-approved · Backed by the 90-day Pawly Promise"
      title={
        <>
          Grooming your dog
          <br />
          actually enjoys
        </>
      }
      description="Gentle, vet-approved grooming tools and coat care that turn bath-time battles into tail wags. If your pup isn't happier in 90 days, your money comes back."
      ctaText="Shop grooming essentials"
      images={HERO_IMAGES}
      onCtaClick={() => (window.location.href = "/collections/all")}
    />
  );
}
