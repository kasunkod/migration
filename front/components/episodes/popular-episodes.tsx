
"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import type { Episode } from "@/lib/data";
import { EpisodeCard } from "@/components/episodes/episode-card";

export function PopularEpisodes() {
  const [episodes, setEpisodes] = useState<Episode[]>([]);
  const [selectedSeason, setSelectedSeason] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadEpisodes() {
      try {
        const response = await fetch("http://127.0.0.1:8000/episodes");

        if (!response.ok) {
          throw new Error("Could not load episodes.");
        }

        const data = await response.json();
        setEpisodes(data.episodes || []);
      } catch {
        setError("Unable to load episodes. Please check that the backend is running.");
      } finally {
        setLoading(false);
      }
    }

    loadEpisodes();
  }, []);

  const seasons = [1, 2, 3];
  const filteredEpisodes = episodes.filter(
    (episode) => episode.season === selectedSeason
  );

  return (
    <section
      id="episodes"
      className="border-t border-border/70 bg-secondary/40 py-20 md:py-28"
    >
      <div className="container">
        <div className="mx-auto mb-10 max-w-2xl text-center">
          <motion.span
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-mono text-xs uppercase tracking-[0.18em] text-primary"
          >
            On the menu
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.05 }}
            className="mt-3 font-display text-3xl font-medium tracking-tight text-foreground sm:text-4xl"
          >
            Explore All Episodes
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="mt-3 text-muted-foreground"
          >
            Discover the food, people and migration stories behind every episode.
          </motion.p>
        </div>

        <div className="mb-8 flex flex-wrap justify-center gap-3">
          {seasons.map((season) => (
            <button
              key={season}
              type="button"
              onClick={() => setSelectedSeason(season)}
              aria-pressed={selectedSeason === season}
              className={`rounded-full border px-5 py-2.5 text-sm font-medium transition-colors ${
                selectedSeason === season
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border bg-background hover:bg-primary/5"
              }`}
            >
              Season {season}
            </button>
          ))}
        </div>

        {loading ? (
          <p className="py-10 text-center text-muted-foreground">
            Loading episodes...
          </p>
        ) : error ? (
          <p className="py-10 text-center text-muted-foreground">{error}</p>
        ) : filteredEpisodes.length === 0 ? (
          <p className="py-10 text-center text-muted-foreground">
            No episodes available for Season {selectedSeason} yet.
          </p>
        ) : (
          <>
            <p className="mb-6 text-sm text-muted-foreground">
              Season {selectedSeason} · {filteredEpisodes.length}{" "}
              {filteredEpisodes.length === 1 ? "episode" : "episodes"}
            </p>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-2">
              {filteredEpisodes.map((episode, index) => (
                <EpisodeCard
                  key={episode.episode_id}
                  episode={episode}
                  index={index}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
}
