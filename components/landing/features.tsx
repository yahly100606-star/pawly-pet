"use client";

import { motion, useReducedMotion } from "framer-motion";
import { BadgeCheck, HeartHandshake, Sparkles } from "lucide-react";

const FEATURES = [
  {
    icon: HeartHandshake,
    title: "Vet-approved, dog-adored",
    description:
      "Every brush, clipper, and shampoo is reviewed by practicing vets and tested on real wiggling dogs — gentle on skin, calm on nerves.",
    accent: "bg-primary/10 text-primary",
  },
  {
    icon: Sparkles,
    title: "Made for your dog's coat",
    description:
      "Double coat, curly, silky, or somewhere in between — tools matched to the coat you actually live with, so grooming works the first time.",
    accent: "bg-accent/15 text-accent-foreground",
  },
  {
    icon: BadgeCheck,
    title: "The 90-day Pawly Promise",
    description:
      "If your pup isn't visibly happier at grooming time within 90 days, send it back for a full refund. No forms, no drama, no hard feelings.",
    accent: "bg-primary/10 text-primary",
  },
];

export function Features() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section id="features" className="relative bg-background py-20 md:py-28">
      <div className="container">
        <motion.div
          initial={prefersReducedMotion ? undefined : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
          className="mx-auto flex max-w-[540px] flex-col items-center text-center"
        >
          <div className="rounded-lg border px-4 py-1 text-sm font-medium">
            Why Pawly
          </div>
          <h2 className="mt-5 text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            Happier grooming, by design
          </h2>
          <p className="mt-5 text-muted-foreground">
            Three reasons bath time stops being a wrestling match.
          </p>
        </motion.div>

        <motion.div
          initial={prefersReducedMotion ? undefined : "hidden"}
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          variants={{
            hidden: {},
            show: { transition: { staggerChildren: 0.12 } },
          }}
          className="mx-auto mt-12 grid max-w-5xl gap-6 md:grid-cols-3"
        >
          {FEATURES.map(({ icon: Icon, title, description, accent }) => (
            <motion.article
              key={title}
              variants={{
                hidden: { opacity: 0, y: 24 },
                show: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.5, ease: "easeOut" },
                },
              }}
              whileHover={
                prefersReducedMotion
                  ? undefined
                  : { y: -6, transition: { duration: 0.25, ease: "easeOut" } }
              }
              className="group rounded-3xl border bg-card p-8 shadow-sm transition-shadow hover:shadow-lg hover:shadow-primary/10"
            >
              <div
                className={`inline-flex h-12 w-12 items-center justify-center rounded-2xl ${accent}`}
              >
                <Icon className="h-6 w-6" aria-hidden />
              </div>
              <h3 className="mt-5 text-xl font-semibold tracking-tight">
                {title}
              </h3>
              <p className="mt-3 leading-relaxed text-muted-foreground">
                {description}
              </p>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
