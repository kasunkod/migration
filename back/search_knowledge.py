import os
import json
import re
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
TRANSCRIPTS_DIR = os.path.join(BASE_DIR, "data", "transcripts")
EPISODES_DIR = os.path.join(BASE_DIR, "data", "episodes")


def load_episode_metadata():
    episodes = {}

    for filename in sorted(os.listdir(EPISODES_DIR)):
        if not filename.endswith(".json"):
            continue

        filepath = os.path.join(EPISODES_DIR, filename)

        with open(filepath, "r", encoding="utf-8") as file:
            episode = json.load(file)

        episode_id = filename.replace(".json", "")
        episodes[episode_id] = episode

    return episodes


def load_transcripts():
    documents = []
    episode_metadata = load_episode_metadata()

    for filename in sorted(os.listdir(TRANSCRIPTS_DIR)):
        if not filename.endswith(".txt"):
            continue

        filepath = os.path.join(TRANSCRIPTS_DIR, filename)

        with open(filepath, "r", encoding="utf-8") as file:
            transcript = file.read()

        episode_id = filename.replace(".txt", "")
        metadata = episode_metadata.get(episode_id, {})

        documents.append({
            "episode_id": episode_id,
            "title": metadata.get("title", ""),
            "location": metadata.get("location", []),
            "countries": metadata.get("country_related", []),
            "restaurant": metadata.get("restaurant", ""),
            "summary": metadata.get("episode_summary", ""),
            "topics": metadata.get("migration_themes", []),
            "food_items": metadata.get("food_items_discussed", []),
            "participants": metadata.get("key_people", []),
            "image_url": metadata.get("image_url", ""),
            "spotify_url": metadata.get("spotify_url", ""),
            "youtube_url": metadata.get("youtube_url", ""),
            "episode_url": metadata.get("episode_url", ""),
            "season": metadata.get("season", 1),
            "transcript": transcript
        })

    return documents


def create_chunks(documents, chunk_size=800, overlap=100):
    chunks = []

    for document in documents:
        transcript = document["transcript"]
        start = 0

        while start < len(transcript):
            end = start + chunk_size
            chunk_text = transcript[start:end].strip()

            if len(chunk_text) >= 200:
                chunk = {
                    key: value
                    for key, value in document.items()
                    if key != "transcript"
                }
                chunk["text"] = chunk_text
                chunks.append(chunk)

            start += chunk_size - overlap

    return chunks


documents = load_transcripts()
chunks = create_chunks(documents)

print(f"Loaded {len(documents)} transcripts")
print(f"Created {len(chunks)} transcript chunks")

chunk_texts = [
    f"""Title: {chunk['title']}
Restaurant: {chunk['restaurant']}
Location: {chunk['location']}
Countries: {chunk['countries']}
Topics: {chunk['topics']}
Food items: {chunk['food_items']}

Transcript:
{chunk['text']}"""
    for chunk in chunks
]

vectorizer = TfidfVectorizer(
    stop_words="english",
    ngram_range=(1, 2),
    max_features=50000
)

if chunk_texts:
    chunk_vectors = vectorizer.fit_transform(chunk_texts)
else:
    chunk_vectors = None

print("TF-IDF transcript index created!")


def search_transcripts(question, top_k=5, candidate_k=30):
    if not chunks or chunk_vectors is None:
        return []

    question_vector = vectorizer.transform([question])
    similarities = cosine_similarity(question_vector, chunk_vectors).flatten()

    ranked_indices = similarities.argsort()[::-1]
    results = []
    seen_episodes = set()

    for index in ranked_indices:
        if similarities[index] <= 0:
            break

        chunk = chunks[index]
        episode_id = chunk["episode_id"]

        if episode_id in seen_episodes:
            continue

        result = {
            key: value
            for key, value in chunk.items()
            if key != "season"
        }
        result["score"] = float(similarities[index])

        results.append(result)
        seen_episodes.add(episode_id)

        if len(results) >= top_k:
            break

    return results


if __name__ == "__main__":
    question = input("Enter a question about the podcast: ")
    results = search_transcripts(question)

    for result in results:
        print(f"\nTitle: {result['title']}")
        print(f"Score: {result['score']:.3f}")
        print(f"Transcript excerpt: {result['text'][:300]}")