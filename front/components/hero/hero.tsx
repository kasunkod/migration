"use client";

import * as React from "react";
import { motion } from "framer-motion";

import { SearchTicket } from "@/components/hero/search-ticket";
import { SuggestionChips } from "@/components/hero/suggestion-chips";

interface HeroProps {
  query: string;
  onQueryChange: (value: string) => void;
  onSearch: (value?: string) => void;
}

export function Hero({ query, onQueryChange, onSearch }: HeroProps) {
  return (
    <section id="top" className="relative overflow-hidden pb-20 pt-20 md:pb-28 md:pt-28">
      {/* ambient background */}
      <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden="true">
        <div className="absolute left-1/2 top-[-120px] h-[480px] w-[780px] -translate-x-1/2 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute right-[8%] top-[220px] h-[220px] w-[220px] rounded-full bg-ink/5 blur-2xl" />
      </div>

      <div className="container flex flex-col items-center text-center">
        <motion.span
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-1.5 font-mono text-xs uppercase tracking-[0.14em] text-muted-foreground"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-primary" />
          AI-powered episode search
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.05 }}
          className="text-balance font-display text-5xl font-medium tracking-tight text-foreground sm:text-6xl md:text-7xl"
        >
          Migration Menu <span className="italic text-primary">AI</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mx-auto mt-6 max-w-xl text-balance text-lg leading-relaxed text-muted-foreground"
        >
          Discover podcast stories through conversation. Search across food,
          migration, culture, guests and places using AI.
        </motion.p>

        <div className="mt-10 w-full px-1">
          <SearchTicket value={query} onChange={onQueryChange} onSubmit={() => onSearch()} />
        </div>

        <div className="mt-6 w-full">
          <SuggestionChips
            onSelect={(label) => {
              onQueryChange(label);
              onSearch(label);
            }}
          />
        </div>
      </div>
    </section>
  );
}
