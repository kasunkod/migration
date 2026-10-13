"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Search, Sparkles } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface SearchTicketProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
}

export function SearchTicket({ value, onChange, onSubmit }: SearchTicketProps) {
  const [focused, setFocused] = React.useState(false);

  return (
    <motion.form
      role="search"
      aria-label="Search Migration Menu podcast episodes"
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit();
      }}
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.15, ease: "easeOut" }}
      className={cn(
        "relative mx-auto flex w-full max-w-3xl flex-col overflow-visible rounded-[28px] border border-border bg-card shadow-soft transition-shadow duration-300 md:flex-row",
        focused && "shadow-lift ring-1 ring-primary/30"
      )}
    >
      {/* main stub */}
      <div className="flex flex-1 items-center gap-3 px-6 py-5 md:py-6">
        <Sparkles className="h-5 w-5 shrink-0 text-primary" aria-hidden="true" />
        <div className="flex w-full flex-col">
          <label htmlFor="menu-search" className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
            Searching for
          </label>
          <Input
            id="menu-search"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            placeholder="Ask anything about Migration Menu..."
            className="h-auto p-0 font-display text-lg tracking-tight placeholder:font-sans placeholder:text-base md:text-xl"
          />
        </div>
      </div>

      {/* perforation divider with punch-hole notches, styled like a ticket stub */}
      <div className="relative hidden w-0 shrink-0 md:block">
        <div className="perforation h-full w-px" aria-hidden="true" />
        <span className="absolute -left-[9px] -top-[9px] h-[18px] w-[18px] rounded-full border border-border bg-background" aria-hidden="true" />
        <span className="absolute -bottom-[9px] -left-[9px] h-[18px] w-[18px] rounded-full border border-border bg-background" aria-hidden="true" />
      </div>
      <div className="relative block h-0 w-full md:hidden">
        <div className="perforation h-px w-full" aria-hidden="true" style={{ backgroundImage: "linear-gradient(to right, hsl(var(--border)) 0%, hsl(var(--border)) 50%, transparent 50%)", backgroundSize: "10px 2px" }} />
      </div>

      {/* action stub */}
      <div className="flex items-center justify-center p-3 md:p-3">
        <Button type="submit" size="lg" className="w-full gap-2 md:w-auto">
          <Search className="h-4 w-4" aria-hidden="true" />
          Search episodes
        </Button>
      </div>
    </motion.form>
  );
}
