"use client";

import { motion } from "framer-motion";
import { Bookmark, Clock, Play, Sparkles } from "lucide-react";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PassportStamp } from "@/components/shared/passport-stamp";
import type { SearchResult } from "@/lib/data";
import { cn } from "@/lib/utils";

interface ResultCardProps {
  result: SearchResult;
  index: number;
}

export function ResultCard({ result, index }: ResultCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay: index * 0.08, ease: "easeOut" }}
    >
      <Card className="flex flex-col gap-5 p-5 transition-shadow duration-300 hover:shadow-lift sm:flex-row sm:items-start">
        <div
          className={cn(
            "relative h-28 w-full shrink-0 overflow-hidden rounded-xl bg-gradient-to-br sm:h-40 sm:w-40",
            result.gradient
          )}
        >
          {result.imageUrl ? (
            <img
              src={result.imageUrl}
              alt={result.title}
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="grain absolute inset-0" aria-hidden="true" />
          )}          
        </div>

        <div className="flex flex-1 flex-col gap-2.5">
          <div className="flex flex-wrap items-start justify-between gap-2">
            <h3 className="font-display text-lg font-medium leading-snug tracking-tight text-foreground">
              {result.title}
            </h3>
            <PassportStamp tone="ink" rotation="3">
              {result.flag} {result.country}
            </PassportStamp>
          </div>

          <div className="flex items-start gap-2 rounded-xl bg-primary/5 p-3">
            <Sparkles className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
            <p className="text-sm leading-relaxed text-foreground/80">
              {result.explanation}
            </p>
          </div>

            {(result.spotifyUrl || result.youtubeUrl || result.episodeUrl) && (
            <div className="flex flex-wrap gap-2">
              {result.spotifyUrl && (
                <a
                  href={result.spotifyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full border px-3 py-2 text-sm transition-colors hover:bg-primary/5"
                >
                  Listen on Spotify
                </a>
              )}

              {result.youtubeUrl && (
                <a
                  href={result.youtubeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full border px-3 py-2 text-sm transition-colors hover:bg-primary/5"
                >
                  Watch on YouTube
                </a>
              )}

              {result.episodeUrl && (
                <a
                  href={result.episodeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full border px-3 py-2 text-sm transition-colors hover:bg-primary/5"
                >
                  Episode details
                </a>
              )}
            </div>
          )}
        </div>
      </Card>
    </motion.div>
  );
}
