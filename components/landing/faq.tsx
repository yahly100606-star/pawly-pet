"use client";

import * as React from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ChevronDown } from "lucide-react";

const FAQS = [
  {
    question: "What exactly is the 90-day Pawly Promise?",
    answer:
      "Use any Pawly product for up to 90 days. If your dog isn't visibly more relaxed at grooming time — or you just don't love it — send it back for a full refund. No forms, no restocking fee, no interrogation.",
  },
  {
    question: "Are the products safe for puppies and cats?",
    answer:
      "Yes. Everything is vet-reviewed and formulated fragrance-light and tear-free. Brushes and shampoos work for cats and puppies from 12 weeks; clippers are recommended for dogs 6 months and up.",
  },
  {
    question: "How do I pick the right brush for my dog's coat?",
    answer:
      "Every product page has a coat-type selector — double, curly, silky, wiry, or short. Two taps and we'll point you at the right tool. Still unsure? Email us a photo of your pup and a human (who loves dogs) will reply within one business day.",
  },
  {
    question: "How fast is shipping?",
    answer:
      "Orders ship within 24 hours on business days, with free standard shipping on every kit. Most orders arrive in 2–4 business days, and you'll get tracking the moment it leaves our warehouse.",
  },
  {
    question: "Can I pause or cancel Pawly Club whenever I want?",
    answer:
      "Anytime, in two clicks from your account — no phone calls, no chatbot maze. Your member pricing stays active until the end of the billing period you've already paid for.",
  },
  {
    question: "My dog hates being groomed. Will this really help?",
    answer:
      "That's exactly who we build for. Our tools are designed around low noise, gentle contact, and short sessions, and every kit includes our step-by-step desensitization guide. It usually takes two to three weeks of short, treat-heavy sessions — and the Promise covers you the whole way.",
  },
];

function FaqItem({
  question,
  answer,
  isOpen,
  onToggle,
  id,
}: {
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
  id: string;
}) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <div className="rounded-2xl border bg-card shadow-sm">
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        aria-controls={`${id}-panel`}
        id={`${id}-button`}
        className="flex w-full items-center justify-between gap-4 rounded-2xl px-6 py-5 text-left font-medium transition-colors hover:bg-secondary/50 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      >
        {question}
        <motion.span
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: prefersReducedMotion ? 0 : 0.25 }}
          className="shrink-0 text-muted-foreground"
        >
          <ChevronDown className="h-5 w-5" aria-hidden />
        </motion.span>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            id={`${id}-panel`}
            role="region"
            aria-labelledby={`${id}-button`}
            initial={prefersReducedMotion ? false : { height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={prefersReducedMotion ? undefined : { height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <p className="px-6 pb-5 leading-relaxed text-muted-foreground">
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function Faq() {
  const prefersReducedMotion = useReducedMotion();
  const [openIndex, setOpenIndex] = React.useState<number | null>(0);

  return (
    <section id="faq" className="relative bg-background py-20 md:py-28">
      <div className="container">
        <motion.div
          initial={prefersReducedMotion ? undefined : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
          className="mx-auto flex max-w-[540px] flex-col items-center text-center"
        >
          <div className="rounded-lg border px-4 py-1 text-sm font-medium">
            Good questions
          </div>
          <h2 className="mt-5 text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            Before you ask
          </h2>
          <p className="mt-5 text-muted-foreground">
            The things every thoughtful dog person wants to know.
          </p>
        </motion.div>

        <motion.div
          initial={prefersReducedMotion ? undefined : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
          viewport={{ once: true, margin: "-80px" }}
          className="mx-auto mt-12 flex max-w-3xl flex-col gap-4"
        >
          {FAQS.map((faq, index) => (
            <FaqItem
              key={faq.question}
              id={`faq-${index}`}
              question={faq.question}
              answer={faq.answer}
              isOpen={openIndex === index}
              onToggle={() =>
                setOpenIndex(openIndex === index ? null : index)
              }
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
