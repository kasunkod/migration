"use client";

import Image from "next/image";
import * as React from "react";
import { motion } from "framer-motion";
import { Bookmark, Clock, ExternalLink, Play } from "lucide-react";

import { Button } from "@/components/ui/button";
import { PassportStamp } from "@/components/shared/passport-stamp";
import type { Episode } from "@/lib/data";
import { cn } from "@/lib/utils";

interface EpisodeCardProps {
  episode: Episode;
  index: number;
}

// Deterministic waveform so server and client render identically.
const WAVE = [34, 58, 42, 76, 52, 88, 64, 40, 72, 96, 60, 46, 82, 54];

function guestName(value: unknown): string {
  if (typeof value === "string") return value;

  if (Array.isArray(value)) {
    return value
      .filter((item): item is string => typeof item === "string")
      .join(", ");
  }

  return "";
}

function initials(name: unknown): string {
  const text = guestName(name).trim();

  if (!text) return "";

  return text
    .split(/\s+/)
    .filter(Boolean)
    .map((part) => part[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

export function EpisodeCard({ episode, index }: EpisodeCardProps) {
  const [saved, setSaved] = React.useState(false);

  const number = String(index + 1).padStart(2, "0");
  const guest = guestName(episode.guest);

  // Optional link fields: rename to match your data (e.g. spotify_url).
  const links = episode as unknown as { spotify_url?: string };
  const spotifyUrl = links.spotify_url;

  const foods = (
    Array.isArray(episode.food_items_discussed)
      ? episode.food_items_discussed
      : [episode.food_items_discussed]
  )
    .filter((food): food is string => typeof food === "string" && Boolean(food.trim()))
    .slice(0, 2);

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{
        duration: 0.5,
        delay: (index % 2) * 0.08,
        ease: "easeOut",
      }}
      aria-labelledby={`${episode.episode_id}-title`}
      className="group relative flex h-full flex-row items-stretch gap-4 overflow-hidden rounded-3xl border border-border bg-card p-4 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-lift sm:gap-5 sm:p-5"
    >
      {/* Left column: image*/}
      <div className="flex w-28 shrink-0 flex-col gap-2.5 sm:w-36">
        <div className="relative aspect-square w-full overflow-hidden rounded-2xl bg-muted">
          <Image
            src={
              episode.image_url
                ? `/images/${episode.image_url.replace(/^\/?images\//, "")}`
                : "/images/ep1.png"
            }
            alt={episode.title}
            fill
            sizes="144px"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            priority={index < 2}
          />



          <div className="grain pointer-events-none absolute inset-0" aria-hidden="true" />

          <span
            className="pointer-events-none absolute -right-0.5 -top-2 select-none font-display text-[3.5rem] font-semibold italic leading-none text-white/40 mix-blend-overlay"
            aria-hidden="true"
          >
            {number}
          </span>

          <div
            className="absolute inset-x-2.5 bottom-2.5 flex h-5 items-end gap-[2px]"
            aria-hidden="true"
          >
            
          </div>

          <button
            type="button"
            aria-label={`Play ${episode.title}`}
            className="absolute left-1/2 top-1/2 flex h-10 w-10 -translate-x-1/2 -translate-y-1/2 scale-90 items-center justify-center rounded-full bg-primary text-primary-foreground opacity-0 shadow-lift transition-all duration-300 hover:scale-105 focus-visible:scale-100 focus-visible:opacity-100 group-hover:scale-100 group-hover:opacity-100"
          >
            <Play className="ml-0.5 h-4 w-4 fill-current" aria-hidden="true" />
          </button>
        </div>

      {/* Guest: sits right under the image, full name always visible */}
      {guest && (
        <div className="min-w-0 leading-tight">
          <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground">
            Guest
          </p>
          <p className="mt-0.5 break-words text-sm font-medium leading-snug text-foreground">
            {guest}
          </p>
        </div>
      )}
      </div>

      {/* Right column: details, with actions pinned to the bottom */}
      <div className="flex min-w-0 flex-1 flex-col gap-2.5">
        {/* Episode number, duration and save */}
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
            <span>Ep. {number}</span>

            <span aria-hidden="true" className="h-1 w-1 rounded-full bg-border" />

            
          </div>

          <button
            type="button"
            onClick={() => setSaved((current) => !current)}
            aria-pressed={saved}
            aria-label={
              saved
                ? `Remove ${episode.title} from saved`
                : `Save ${episode.title}`
            }
            className="-mr-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-muted-foreground transition-all hover:bg-secondary hover:text-foreground"
          >
            <Bookmark
              className={cn(
                "h-4 w-4 transition-colors",
                saved && "fill-primary text-primary"
              )}
              aria-hidden="true"
            />
          </button>
        </div>

        {/* Title */}
        <h3
          id={`${episode.episode_id}-title`}
          className="line-clamp-2 font-display text-lg font-medium leading-snug tracking-tight text-foreground md:text-xl"
        >
          {episode.title}
        </h3>

        {/* Summary */}
        <p className="line-clamp-2 text-sm leading-relaxed text-muted-foreground">
          {episode.episode_summary}
        </p>

        {/* Maximum of two food tags */}
        {foods.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {foods.map((food, i) => (
              <PassportStamp key={`${food}-${i}`} tone="primary" rotation="2">
                {food}
              </PassportStamp>
            ))}
          </div>
        )}

        {/* Actions: Listen, Spotify and any future links */}
        <div className="mt-auto flex flex-wrap items-center gap-2 border-t border-border/70 pt-3">
          <Button
            size="sm"
            className="gap-1.5"
            aria-label={`Listen to ${episode.title}`}
          >
            <Play className="h-3.5 w-3.5 fill-current" aria-hidden="true" />
            Listen
          </Button>

          {spotifyUrl && (
            <Button size="sm" variant="outline" className="gap-1.5" asChild>
              <a
                href={spotifyUrl}
                target="_blank"
                rel="noreferrer"
                aria-label={`Open ${episode.title} on Spotify`}
              >
                <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                Spotify
              </a>
            </Button>
          )}
        </div>
      </div>
    </motion.article>
  );
}
