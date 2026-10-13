# Migration Menu AI — Frontend

A premium, minimal frontend for an AI-powered podcast discovery platform. The
homepage is the product: a single conversational search experience for
exploring stories about food, migration and culture, backed by realistic
mock data. There is no backend and no live AI — all search results are
pre-written sample data.

## Design concept

The visual identity leans into the two things the brand is named for:
**migration** and **menus**. The search bar is styled as a torn boarding
pass / ticket stub (dashed perforation, punch-hole notches), and country/food
tags are styled as dashed passport stamps. Typography pairs a warm editorial
serif (Fraunces) for display text with Inter for body copy and JetBrains
Mono for data-like details (durations, match percentages, tags) — evoking a
ticket or menu printout.

- **Primary**: `#F97316` (warm orange)
- **Base**: warm cream background, charcoal text, soft warm-grey sections
- **Accent**: deep "passport ink" navy, used sparingly for stamps

## Stack

- Next.js 15 (App Router) + TypeScript
- Tailwind CSS with CSS-variable based theme tokens (light/dark)
- shadcn/ui-style primitives (Button, Card, Badge, Input)
- Framer Motion for scroll reveals and micro-interactions
- lucide-react for icons
- next-themes for the light/dark toggle

## Getting started

```bash
npm install
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000).

## Project structure

```
app/
  layout.tsx        Root layout, fonts, theme provider
  page.tsx           Homepage — composes all sections, owns search state
  globals.css        Design tokens + utility classes (perforation, grain, glass)
components/
  nav/               Navbar
  hero/              Hero copy, search "ticket", suggestion chips
  search/            Search results section + result card
  episodes/          Popular Episodes section + episode card
  how-it-works/       3-step explainer
  footer/            Footer
  shared/            Passport-stamp tag component
  ui/                Button, Card, Badge, Input primitives
  theme-provider.tsx / theme-toggle.tsx
lib/
  data.ts            Mock episodes + search results
  utils.ts           `cn` class-merging helper
```

## Notes

- All podcast artwork uses CSS gradients + a subtle grain texture rather than
  stock photography, so the project has zero external image dependencies.
- Search is fully client-side and cosmetic: submitting a query always reveals
  the same three sample results, framed as if matched to your query.
- Built to respect keyboard navigation, visible focus states, and semantic
  landmarks (`header`, `main`, `section`, `footer`, `role="search"`).
