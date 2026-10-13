"use client";
import ReactMarkdown from "react-markdown";

import * as React from "react";
import { Navbar } from "@/components/nav/navbar";
import { Hero } from "@/components/hero/hero";
import { SearchResults } from "@/components/search/search-results";
import { PopularEpisodes } from "@/components/episodes/popular-episodes";
import { HowItWorks } from "@/components/how-it-works/how-it-works";
import { Footer } from "@/components/footer/footer";
import type { SearchResult } from "@/lib/data";

export default function Home() {
  const [query, setQuery] = React.useState("");
  const [submittedQuery, setSubmittedQuery] = React.useState("");
  const [showResults, setShowResults] = React.useState(false);
  const [results, setResults] = React.useState<SearchResult[]>([]);
  const [aiAnswer, setAiAnswer] = React.useState("");
  const resultsRef = React.useRef<HTMLDivElement>(null);

  const handleSearch = async (value?: string) => {
    const finalQuery = (value ?? query).trim();

    if (!finalQuery) return;

    setQuery(finalQuery);
    setSubmittedQuery(finalQuery);
    setShowResults(true);
    setResults([]);

    try {
      const response = await fetch("http://127.0.0.1:8000/ask", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          question: finalQuery,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to contact the backend");
      }

      const data = await response.json();
      setAiAnswer(data.answer || "");

      const formattedResults: SearchResult[] = data.sources.map(
        (source: {
          episode_id: string;
          title: string;
          explanation: string;
          score: number;
          location: string[];
          countries: string[];
          restaurant: string;
          summary: string;
          topics: string[];
          food_items: string[];
          image_url: string;
          spotify_url: string;
          youtube_url: string;
          episode_url: string;
        }) => ({
          id: source.episode_id,
          title: source.title,
          explanation: source.explanation || source.summary || "",
          match: Math.round(source.score * 100),
          country: "",
          flag: "🎙️",
          duration: "",
          gradient: "from-orange-300 via-amber-200 to-rose-200",
          imageUrl: source.image_url
            ? `/images/${source.image_url.split("/").pop()}`
            : "",
          spotifyUrl: source.spotify_url || "",
          youtubeUrl: source.youtube_url || "",
          episodeUrl: source.episode_url || "",
        })
      );

      setResults(formattedResults);
    } catch (error) {
      console.error("Search error:", error);
      setResults([]);
    }

    requestAnimationFrame(() => {
      resultsRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main>
        <Hero
          query={query}
          onQueryChange={setQuery}
          onSearch={handleSearch}
        />

                <div ref={resultsRef}>
          {showResults && aiAnswer && (
            <section className="container py-8">
              <div className="rounded-2xl border border-border bg-card p-6">
                <h2 className="mb-3 font-display text-xl font-medium">
                  Answer
                </h2>
               <div className="prose prose-sm max-w-none dark:prose-invert">
                <ReactMarkdown>{aiAnswer}</ReactMarkdown>
              </div>
              </div>
            </section>
          )}

          <SearchResults
            query={submittedQuery}
            visible={showResults}
            results={results}
            onClear={() => {
              setShowResults(false);
              setAiAnswer("");
            }}
          />
        </div>

        <PopularEpisodes />
        <HowItWorks />
      </main>

      <Footer />
    </div>
  );
}