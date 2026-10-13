"use client";

import { motion } from "framer-motion";
import { MessageCircle, ScanSearch, ListChecks } from "lucide-react";

const steps = [
  {
    label: "Ask naturally",
    description:
      "Type a question the way you'd ask a friend. \u201cAny episodes about biryani and Karachi?\u201d works just as well as a single keyword.",
    icon: MessageCircle,
  },
  {
    label: "AI searches every Migration Menu podcast",
    description:
      "Your question is matched against every episode transcript, guest story and food reference in the archive.",
    icon: ScanSearch,
  },
  {
    label: "Get the most relevant episodes instantly",
    description:
      "Results arrive ranked by relevance, with a plain-language explanation of why each one fits what you asked.",
    icon: ListChecks,
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="py-20 md:py-28">
      <div className="container">
        <div className="mx-auto mb-14 max-w-2xl text-center">
          <span className="font-mono text-xs uppercase tracking-[0.18em] text-primary">
            How it works
          </span>
          <h2 className="mt-3 font-display text-3xl font-medium tracking-tight text-foreground sm:text-4xl">
            Conversation in, story out
          </h2>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {steps.map((step, index) => (
            <motion.div
              key={step.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: index * 0.1, ease: "easeOut" }}
              className="relative rounded-2xl border border-border bg-card p-7 shadow-soft"
            >
              <div className="mb-5 flex items-center justify-between">
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <step.icon className="h-5 w-5" aria-hidden="true" />
                </span>
                <span className="font-mono text-sm text-muted-foreground">
                  {String(index + 1).padStart(2, "0")}
                </span>
              </div>
              <h3 className="font-display text-lg font-medium tracking-tight text-foreground">
                {step.label}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
