import os
import json

from sentence_transformers import SentenceTransformer, util


TRANSCRIPTS_DIR = "data/transcripts"
EPISODES_DIR = "data/episodes"


# --------------------------------------------------
# Load episode metadata
# --------------------------------------------------

def load_episode_metadata():

    episodes = {}

    for filename in sorted(os.listdir(EPISODES_DIR)):

        if not filename.endswith(".json"):
            continue

        filepath = os.path.join(EPISODES_DIR, filename)

        with open(filepath, "r", encoding="utf-8") as file:
            episode = json.load(file)

        # ep1.json -> ep1
        episode_id = filename.replace(".json", "")

        episodes[episode_id] = episode

    return episodes


# --------------------------------------------------
# Load transcripts
# --------------------------------------------------

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


# --------------------------------------------------
# Create transcript chunks
# --------------------------------------------------

def create_chunks(documents, chunk_size=800, overlap=100):

    chunks = []

    for document in documents:

        transcript = document["transcript"]
        episode_id = document["episode_id"]

        start = 0

        while start < len(transcript):

            end = start + chunk_size

            chunk_text = transcript[start:end].strip()

            if len(chunk_text) >= 200:

                chunks.append({
                    "episode_id": episode_id,
                    "title": document["title"],
                    "location": document["location"],
                    "countries": document["countries"],
                    "restaurant": document["restaurant"],
                    "summary": document["summary"],
                    "topics": document["topics"],
                    "food_items": document["food_items"],
                    "participants": document["participants"],
                    "image_url": document["image_url"],
                    "spotify_url": document["spotify_url"],
                    "youtube_url": document["youtube_url"],
                    "episode_url": document["episode_url"],
                    "season": document["season"],
                    "text": chunk_text
                })

            start += chunk_size - overlap

    return chunks


# --------------------------------------------------
# Load model and create embeddings
# --------------------------------------------------

model = SentenceTransformer("all-MiniLM-L6-v2")

documents = load_transcripts()

chunks = create_chunks(documents)

print(f"Loaded {len(documents)} transcripts")
print(f"Created {len(chunks)} transcript chunks")


chunk_texts = [
    f"""
Title: {chunk["title"]}
Restaurant: {chunk["restaurant"]}
Location: {chunk["location"]}
Countries: {chunk["countries"]}
Topics: {chunk["topics"]}
Food items: {chunk["food_items"]}

Transcript:
{chunk["text"]}
"""
    for chunk in chunks
]

chunk_embeddings = model.encode(
    chunk_texts,
    convert_to_tensor=True
)

print("Transcript embeddings created!")


# --------------------------------------------------
# Search transcripts
# --------------------------------------------------

def search_transcripts(question, top_k=5, candidate_k=30):

    question_embedding = model.encode(
        question,
        convert_to_tensor=True
    )

    similarities = util.cos_sim(
        question_embedding,
        chunk_embeddings
    )[0]

    results = []

    for index, score in enumerate(similarities):

        results.append({
            "score": float(score),
            "episode_id": chunks[index]["episode_id"],
            "title": chunks[index]["title"],
            "location": chunks[index]["location"],
            "countries": chunks[index]["countries"],
            "restaurant": chunks[index]["restaurant"],
            "summary": chunks[index]["summary"],
            "topics": chunks[index]["topics"],
            "food_items": chunks[index]["food_items"],
            "participants": chunks[index]["participants"],
            "image_url": chunks[index]["image_url"],
            "spotify_url": chunks[index]["spotify_url"],
            "youtube_url": chunks[index]["youtube_url"],
            "episode_url": chunks[index]["episode_url"],
            
            "text": chunks[index]["text"]
        })

    results.sort(
        key=lambda x: x["score"],
        reverse=True
    )

    # Only consider the strongest 30 transcript chunks
    candidates = results[:candidate_k]

    # Keep only the best result from each episode
    unique_results = []
    seen_episodes = set()

    for result in candidates:

        if result["episode_id"] not in seen_episodes:

            unique_results.append(result)
            seen_episodes.add(result["episode_id"])

        if len(unique_results) == top_k:
            break

    return unique_results


# --------------------------------------------------
# Test search
# --------------------------------------------------

if __name__ == "__main__":

    question = input("\nAsk a question about the podcast: ")

    results = search_transcripts(question)

    print("\nTop results:\n")

    for result in results:

        print("--------------------------------")
        print(f"Episode: {result['episode_id']}")
        print(f"Title: {result['title']}")
        print(f"Location: {result['location']}")
        print(f"Countries: {result['countries']}")
        print(f"Restaurant: {result['restaurant']}")
        print(f"Similarity: {result['score']:.4f}")
        print("--------------------------------")

        print(result["text"][:500])
        print()