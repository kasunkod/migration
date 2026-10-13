"use client";

import * as React from "react";
import { Github, Menu, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import { cn } from "@/lib/utils";

const links = [
  { label: "Home", href: "#top" },
  { label: "Explore", href: "#episodes" },
  { label: "Episodes", href: "#episodes" },
  { label: "About", href: "#how-it-works" },
];

export function Navbar() {
  const [open, setOpen] = React.useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/70 bg-background/80 backdrop-blur-md">
      <div className="container flex h-16 items-center justify-between">
        <a href="#top" className="flex items-center gap-2.5" aria-label="Migration Menu AI home">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground font-display text-sm font-semibold">
            M
          </span>
          <span className="font-display text-[17px] font-medium tracking-tight">
            Migration Menu <span className="text-primary">AI</span>
          </span>
        </a>

        <nav className="hidden items-center gap-8 md:flex" aria-label="Main navigation">
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-1 md:flex">
          <Button variant="ghost" size="icon" asChild aria-label="View source on GitHub">
            <a href="https://github.com" target="_blank" rel="noreferrer">
              <Github className="h-[18px] w-[18px]" />
            </a>
          </Button>
          <ThemeToggle />
        </div>

        <button
          className="flex items-center justify-center rounded-full p-2 md:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      <div
        className={cn(
          "overflow-hidden border-t border-border/70 md:hidden transition-[max-height] duration-300 ease-in-out",
          open ? "max-h-72" : "max-h-0 border-t-0"
        )}
      >
        <nav className="container flex flex-col gap-1 py-3" aria-label="Mobile navigation">
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setOpen(false)}
              className="rounded-lg px-3 py-2.5 text-sm font-medium text-muted-foreground hover:bg-secondary hover:text-foreground"
            >
              {link.label}
            </a>
          ))}
          <div className="mt-1 flex items-center justify-between px-3 py-1">
            <a
              href="https://github.com"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 text-sm font-medium text-muted-foreground"
            >
              <Github className="h-4 w-4" /> GitHub
            </a>
            <ThemeToggle />
          </div>
        </nav>
      </div>
    </header>
  );
}
