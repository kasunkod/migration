
export type Episode = {
  episode_id: string;
  season: number;
  title: string;
guest?: string;
  restaurant: string;
  country_related: string;
  episode_summary: string;
  food_items_discussed: string[];
  image_url: string;
  spotify_url: string;
  youtube_url: string;
  episode_url: string;
};


export type SearchResult = {
  id: string;
  title: string;
  explanation: string;
  match: number;
  country: string;
  flag: string;
  duration: string;
  gradient: string;
  imageUrl: string;
  spotifyUrl: string;
  youtubeUrl: string;
  episodeUrl: string;
};

export const suggestionChips = [
  { label: "Sri Lankan food", emoji: "🍛" },
  { label: "Migration stories", emoji: "🌍" },
  { label: "Featured guests", emoji: "🎙" },
  { label: "Restaurants", emoji: "🍽" },
  { label: "Indian cuisine", emoji: "🇮🇳" },
  { label: "Bangladeshi culture", emoji: "🇧🇩" },
  { label: "Pakistani food", emoji: "🇵🇰" },
];

