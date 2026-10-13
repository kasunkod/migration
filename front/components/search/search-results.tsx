"use client";

import { AnimatePresence, motion } from "framer-motion";
import { SearchX, X } from "lucide-react";

import { ResultCard } from "@/components/search/result-card";
import type { SearchResult } from "@/lib/data";

interface SearchResultsProps {
  query: string;
  visible: boolean;
  onClear: () => void;
  results: SearchResult[];
}

export function SearchResults({
  query,
  visible,
  onClear,
  results,
}: SearchResultsProps) {
  return (
    <AnimatePresence>
      {visible && (
        <motion.section
          id="search-results"
          aria-label="Search results"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
          className="overflow-hidden border-t border-border/70 bg-background"
        >
          <div className="container py-14 md:py-20">
            <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
              <div>
                <span className="font-mono text-xs uppercase tracking-[0.18em] text-primary">
                  Results
                </span>

                <h2 className="mt-2 font-display text-2xl font-medium tracking-tight text-foreground sm:text-3xl">
                  {results.length} episodes match{" "}
                  <span className="text-primary">&ldquo;{query}&rdquo;</span>
                </h2>
              </div>

              <button
                type="button"
                onClick={onClear}
                className="inline-flex items-center gap-1.5 rounded-full border border-border px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
              >
                <X className="h-3.5 w-3.5" aria-hidden="true" />
                Clear results
              </button>
            </div>

            {results.length > 0 ? (
              <div className="flex flex-col gap-4">
                {results.map((result, index) => (
                  <ResultCard
                    key={result.id}
                    result={result}
                    index={index}
                  />
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center gap-3 rounded-2xl border border-dashed border-border py-16 text-center">
                <SearchX
                  className="h-6 w-6 text-muted-foreground"
                  aria-hidden="true"
                />

                <p className="text-muted-foreground">
                  No episodes matched that search. Try a different place, dish
                  or guest name.
                </p>
              </div>
            )}
          </div>
        </motion.section>
      )}
    </AnimatePresence>
  );
}