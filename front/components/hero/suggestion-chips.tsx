"use client";

import { motion } from "framer-motion";
import { suggestionChips } from "@/lib/data";

interface SuggestionChipsProps {
  onSelect: (label: string) => void;
}

export function SuggestionChips({ onSelect }: SuggestionChipsProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
      className="mx-auto flex max-w-2xl flex-wrap items-center justify-center gap-2.5"
      role="group"
      aria-label="Suggested searches"
    >
      {suggestionChips.map((chip) => (
        <button
          key={chip.label}
          type="button"
          onClick={() => onSelect(chip.label)}
          className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-4 py-2 text-sm font-medium text-foreground/80 shadow-sm transition-all hover:-translate-y-0.5 hover:border-primary/30 hover:text-foreground hover:shadow-soft"
        >
          <span aria-hidden="true">{chip.emoji}</span>
          {chip.label}
        </button>
      ))}
    </motion.div>
  );
}
