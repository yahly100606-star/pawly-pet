"use client";

import * as React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Facebook, Instagram, Moon, Send, Sun } from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

function PawlyFooter() {
  const prefersReducedMotion = useReducedMotion();
  const [isDarkMode, setIsDarkMode] = React.useState(false);

  React.useEffect(() => {
    document.documentElement.classList.toggle("dark", isDarkMode);
  }, [isDarkMode]);

  return (
    <footer className="relative border-t bg-background text-foreground transition-colors duration-300">
      <div className="container mx-auto px-4 py-12 md:px-6 lg:px-8">
        <motion.div
          initial={prefersReducedMotion ? undefined : "hidden"}
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          variants={{
            hidden: {},
            show: { transition: { staggerChildren: 0.08 } },
          }}
          className="grid gap-12 md:grid-cols-2 lg:grid-cols-4"
        >
          <motion.div
            variants={fadeUp}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="relative"
          >
            <h2 className="mb-4 text-3xl font-bold tracking-tight">
              Join the pack
            </h2>
            <p className="mb-6 text-muted-foreground">
              Grooming tips, new arrivals, and 10% off your first order.
              No spam — we promise. It&apos;s in the Pawly Promise.
            </p>
            <form className="relative">
              <Input
                type="email"
                placeholder="Enter your email"
                className="pr-12 backdrop-blur-sm"
              />
              <Button
                type="submit"
                size="icon"
                className="absolute right-1 top-1 h-8 w-8 rounded-full bg-primary text-primary-foreground transition-transform hover:scale-105"
              >
                <Send className="h-4 w-4" />
                <span className="sr-only">Subscribe to the newsletter</span>
              </Button>
            </form>
            <div className="absolute -right-4 top-0 h-24 w-24 rounded-full bg-primary/10 blur-2xl" />
          </motion.div>

          <motion.div
            variants={fadeUp}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <h3 className="mb-4 text-lg font-semibold">Shop &amp; learn</h3>
            <nav className="space-y-2 text-sm">
              <a href="/collections/all" className="block transition-colors hover:text-primary">
                Shop all grooming
              </a>
              <a href="/pages/grooming-guide" className="block transition-colors hover:text-primary">
                Grooming guide
              </a>
              <a href="/pages/pawly-promise" className="block transition-colors hover:text-primary">
                The Pawly Promise
              </a>
              <a href="/pages/about" className="block transition-colors hover:text-primary">
                About Pawly
              </a>
              <a href="/pages/contact" className="block transition-colors hover:text-primary">
                Contact
              </a>
            </nav>
          </motion.div>

          <motion.div
            variants={fadeUp}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <h3 className="mb-4 text-lg font-semibold">Get in touch</h3>
            <address className="space-y-2 text-sm not-italic">
              <p>Questions about your pup&apos;s coat?</p>
              <p>Email: hello@pawly.shop</p>
              <p>We answer within one business day.</p>
              <p className="pt-2 font-medium text-foreground">
                90-day money-back guarantee on every order.
              </p>
            </address>
          </motion.div>

          <motion.div
            variants={fadeUp}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="relative"
          >
            <h3 className="mb-4 text-lg font-semibold">Follow the zoomies</h3>
            <div className="mb-6 flex space-x-4">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="outline" size="icon" className="rounded-full">
                      <Instagram className="h-4 w-4" />
                      <span className="sr-only">Instagram</span>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Fresh cuts and happy tails on Instagram</p>
                  </TooltipContent>
                </Tooltip>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="outline" size="icon" className="rounded-full">
                      <Facebook className="h-4 w-4" />
                      <span className="sr-only">Facebook</span>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Join our community on Facebook</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            <div className="flex items-center space-x-2">
              <Sun className="h-4 w-4" />
              <Switch
                id="dark-mode"
                checked={isDarkMode}
                onCheckedChange={setIsDarkMode}
              />
              <Moon className="h-4 w-4" />
              <Label htmlFor="dark-mode" className="sr-only">
                Toggle dark mode
              </Label>
            </div>
          </motion.div>
        </motion.div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t pt-8 text-center md:flex-row">
          <p className="text-sm text-muted-foreground">
            © 2026 Pawly. All rights reserved.
          </p>
          <nav className="flex gap-4 text-sm">
            <a href="/policies/privacy-policy" className="transition-colors hover:text-primary">
              Privacy policy
            </a>
            <a href="/policies/terms-of-service" className="transition-colors hover:text-primary">
              Terms of service
            </a>
            <a href="/policies/refund-policy" className="transition-colors hover:text-primary">
              Refund policy
            </a>
          </nav>
        </div>
      </div>
    </footer>
  );
}

export { PawlyFooter };
