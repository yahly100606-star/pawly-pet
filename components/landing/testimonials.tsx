"use client";

import { motion, useReducedMotion } from "framer-motion";
import {
  TestimonialsColumn,
  type Testimonial,
} from "@/components/ui/testimonials-columns-1";

/* Placeholder reviews in Pawly's voice — replace with the real 4★+
   imported reviews from the roadmap when they land. Avatars are local
   initials placeholders (no third-party image hosts). */
const TESTIMONIALS: Testimonial[] = [
  {
    text: "Milo used to hide when the brush came out. Now he brings it to me. I don't know what sorcery this is, but we're keeping it.",
    image: "/avatars/pawly-1.svg",
    name: "Dana R.",
    role: "Milo's human · Golden Retriever",
  },
  {
    text: "The de-shedding kit paid for itself in one week of not vacuuming twice a day. My couch is visible again.",
    image: "/avatars/pawly-2.svg",
    name: "Tomer L.",
    role: "Luna's human · Husky mix",
  },
  {
    text: "Ordered the wrong size, emailed support, had a replacement before I finished my coffee the next morning.",
    image: "/avatars/pawly-3.svg",
    name: "Maya K.",
    role: "Biscuit's human · Cavalier",
  },
  {
    text: "The shampoo actually rinses out fast, which matters a lot when your dog treats bath time like a jailbreak.",
    image: "/avatars/pawly-4.svg",
    name: "Amir S.",
    role: "Rocky's human · Labrador",
  },
  {
    text: "90-day guarantee sounded like marketing until I used it on a brush that didn't suit our coat. Refund, no questions, no drama.",
    image: "/avatars/pawly-5.svg",
    name: "Noa B.",
    role: "Pixel's human · Border Collie",
  },
  {
    text: "First grooming kit that didn't feel like it was designed by someone who's never met a wiggling dog.",
    image: "/avatars/pawly-6.svg",
    name: "Daniel P.",
    role: "Chewy's human · Cockapoo",
  },
  {
    text: "Our groomer asked where we got the slicker brush. That felt like winning an award.",
    image: "/avatars/pawly-7.svg",
    name: "Shira A.",
    role: "Mocha's human · Poodle",
  },
  {
    text: "Nail trimming went from a two-person wrestling match to a one-treat job. Life-changing is a strong word, but it's the right one.",
    image: "/avatars/pawly-8.svg",
    name: "Yoav M.",
    role: "Bamba's human · Corgi",
  },
  {
    text: "Shipping was fast and everything smells faintly of coconut instead of chemicals. My dog approves. So does my apartment.",
    image: "/avatars/pawly-9.svg",
    name: "Lena G.",
    role: "Waffle's human · Frenchie",
  },
];

const firstColumn = TESTIMONIALS.slice(0, 3);
const secondColumn = TESTIMONIALS.slice(3, 6);
const thirdColumn = TESTIMONIALS.slice(6, 9);

export function TestimonialsSection() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section id="reviews" className="relative bg-background py-20 md:py-28">
      <div className="container z-10 mx-auto">
        <motion.div
          initial={prefersReducedMotion ? undefined : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
          className="mx-auto flex max-w-[540px] flex-col items-center justify-center"
        >
          <div className="flex justify-center">
            <div className="rounded-lg border px-4 py-1 text-sm font-medium">
              Happy tails
            </div>
          </div>

          <h2 className="mt-5 text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            The pack has spoken
          </h2>
          <p className="mt-5 text-center text-muted-foreground">
            Real owners, real coats, really clean couches.
          </p>
        </motion.div>

        <div className="mt-10 flex max-h-[740px] justify-center gap-6 overflow-hidden [mask-image:linear-gradient(to_bottom,transparent,black_25%,black_75%,transparent)]">
          <TestimonialsColumn testimonials={firstColumn} duration={15} />
          <TestimonialsColumn
            testimonials={secondColumn}
            className="hidden md:block"
            duration={19}
          />
          <TestimonialsColumn
            testimonials={thirdColumn}
            className="hidden lg:block"
            duration={17}
          />
        </div>
      </div>
    </section>
  );
}
