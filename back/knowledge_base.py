import json
import os

EPISODES_DIR = "data/episodes"


def load_episodes():
    episodes = []

    for filename in sorted(os.listdir(EPISODES_DIR)):
        if filename.endswith(".json"):
            filepath = os.path.join(EPISODES_DIR, filename)

            with open(filepath, "r", encoding="utf-8") as file:
                episode = json.load(file)

            episodes.append(episode)

    return episodes


def create_knowledge_base():
    episodes = load_episodes()

    knowledge_base = []

    for episode in episodes:
        knowledge_base.append({
            "episode_id": episode.get("episode_id"),
            "title": episode.get("title"),
            "series": episode.get("series"),
            "countries": episode.get("country_focus", []),
            "location": episode.get("primary_location"),
            "episode_summary": episode.get("episode_summary", ""),
            "topics": episode.get("migration_themes", []),
            "keywords": episode.get("keywords", []),
            "food_items": episode.get("food_items_discussed", []),
            "guest": episode.get("guest", {}),
            "hosts": episode.get("hosts", {}),
        })

    return knowledge_base


if __name__ == "__main__":
    knowledge_base = create_knowledge_base()

    print(f"Loaded {len(knowledge_base)} episodes")

    for episode in knowledge_base:
        print(
            f"{episode['episode_id']} - {episode['food_items_discussed']}"
        )