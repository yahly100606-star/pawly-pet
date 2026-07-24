"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

const TIERS = [
  {
    name: "Starter Pack",
    price: "$29",
    cadence: "one-time",
    tagline: "For the first-time groomer",
    features: [
      "Gentle slicker brush",
      "Calming oat shampoo",
      "Illustrated grooming guide",
      "90-day Pawly Promise",
    ],
    cta: "Get the Starter Pack",
    href: "/collections/all",
    featured: false,
  },
  {
    name: "Groom Kit Pro",
    price: "$59",
    cadence: "one-time",
    tagline: "Everything for a full at-home groom",
    features: [
      "Everything in Starter Pack",
      "Quiet cordless clippers",
      "Stress-free nail trimmer",
      "De-shedding tool for your coat type",
      "90-day Pawly Promise",
    ],
    cta: "Get the Pro Kit",
    href: "/collections/all",
    featured: true,
  },
  {
    name: "Pawly Club",
    price: "$12",
    cadence: "/month",
    tagline: "Refills and perks on autopilot",
    features: [
      "Quarterly shampoo & refill box",
      "15% off everything, always",
      "Priority human support",
      "Pause or cancel anytime",
    ],
    cta: "Join the Club",
    href: "/collections/all",
    featured: false,
  },
];

export function Pricing() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section id="pricing" className="relative bg-secondary/50 py-20 md:py-28">
      <div className="container">
        <motion.div
          initial={prefersReducedMotion ? undefined : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
          className="mx-auto flex max-w-[540px] flex-col items-center text-center"
        >
          <div className="rounded-lg border bg-card px-4 py-1 text-sm font-medium">
            Simple pricing
          </div>
          <h2 className="mt-5 text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            Pick your pack
          </h2>
          <p className="mt-5 text-muted-foreground">
            Every kit ships free and carries the 90-day Pawly Promise.
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
          className="mx-auto mt-12 grid max-w-5xl items-stretch gap-6 md:grid-cols-3"
        >
          {TIERS.map((tier) => (
            <motion.article
              key={tier.name}
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
              className={cn(
                "relative flex flex-col rounded-3xl border bg-card p-8 shadow-sm transition-shadow hover:shadow-lg",
                tier.featured
                  ? "border-primary shadow-lg shadow-primary/15 md:-my-3"
                  : "hover:shadow-primary/10"
              )}
            >
              {tier.featured && (
                <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 rounded-full bg-primary px-4 py-1 text-xs font-semibold text-primary-foreground shadow-sm">
                  Most popular
                </span>
              )}

              <h3 className="text-lg font-semibold">{tier.name}</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                {tier.tagline}
              </p>

              <div className="mt-5 flex items-baseline gap-1">
                <span className="text-4xl font-bold tracking-tight">
                  {tier.price}
                </span>
                <span className="text-sm text-muted-foreground">
                  {tier.cadence}
                </span>
              </div>

              <ul className="mt-6 flex-1 space-y-3">
                {tier.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2.5 text-sm">
                    <Check
                      className="mt-0.5 h-4 w-4 shrink-0 text-primary"
                      aria-hidden
                    />
                    {feature}
                  </li>
                ))}
              </ul>

              <motion.a
                href={tier.href}
                whileHover={prefersReducedMotion ? undefined : { scale: 1.03 }}
                whileTap={prefersReducedMotion ? undefined : { scale: 0.97 }}
                className={cn(
                  "mt-8 inline-flex items-center justify-center rounded-full px-6 py-2.5 text-sm font-semibold transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
                  tier.featured
                    ? "bg-primary text-primary-foreground shadow-md hover:bg-primary/90"
                    : "border border-input bg-background hover:bg-secondary"
                )}
              >
                {tier.cta}
              </motion.a>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
