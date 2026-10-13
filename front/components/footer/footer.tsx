import { Github, Twitter } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-border/70 bg-secondary/40">
      <div className="container flex flex-col gap-8 py-12 md:flex-row md:items-start md:justify-between">
        <div className="max-w-xs">
          <a href="#top" className="flex items-center gap-2.5">
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-primary text-primary-foreground font-display text-xs font-semibold">
              M
            </span>
            <span className="font-display text-base font-medium tracking-tight">
              Migration Menu <span className="text-primary">AI</span>
            </span>
          </a>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            Stories of food and migration, made searchable. An independent
            listening companion for the Migration Menu podcast archive.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
          <div>
            <h3 className="font-mono text-xs uppercase tracking-[0.14em] text-muted-foreground">
              Product
            </h3>
            <ul className="mt-3 flex flex-col gap-2 text-sm">
              <li><a href="#top" className="text-foreground/80 hover:text-foreground">Home</a></li>
              <li><a href="#episodes" className="text-foreground/80 hover:text-foreground">Explore</a></li>
              <li><a href="#episodes" className="text-foreground/80 hover:text-foreground">Episodes</a></li>
            </ul>
          </div>
          <div>
            <h3 className="font-mono text-xs uppercase tracking-[0.14em] text-muted-foreground">
              Project
            </h3>
            <ul className="mt-3 flex flex-col gap-2 text-sm">
              <li><a href="#how-it-works" className="text-foreground/80 hover:text-foreground">How it works</a></li>
              <li><a href="#top" className="text-foreground/80 hover:text-foreground">About</a></li>
            </ul>
          </div>
          <div>
            <h3 className="font-mono text-xs uppercase tracking-[0.14em] text-muted-foreground">
              Connect
            </h3>
            <ul className="mt-3 flex flex-col gap-2 text-sm">
              <li>
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-1.5 text-foreground/80 hover:text-foreground"
                >
                  <Github className="h-3.5 w-3.5" /> GitHub
                </a>
              </li>
              <li>
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-1.5 text-foreground/80 hover:text-foreground"
                >
                  <Twitter className="h-3.5 w-3.5" /> Twitter
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-border/70">
        <div className="container flex flex-col-reverse items-center justify-between gap-3 py-5 text-xs text-muted-foreground sm:flex-row">
          <span>© {new Date().getFullYear()} Migration Menu AI. All rights reserved.</span>
          <span className="font-mono">Built for curious eaters and displaced kitchens.</span>
        </div>
      </div>
    </footer>
  );
}
