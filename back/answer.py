import os
from pathlib import Path
from dotenv import load_dotenv
from openai import OpenAI
from search_knowledge import search_transcripts

load_dotenv(Path(__file__).parent / ".env")

client = OpenAI(
    base_url="https://api.groq.com/openai/v1",
    api_key=os.environ["GROQ_API_KEY"]
)


NO_MATCH = "I couldn't find any relevant information in the podcast."


def explain_episode(question, result):
    prompt = f"""
You help users discover episodes of The Migration Menu podcast.

USER SEARCH:
{question}

EPISODE TITLE:
{result["title"]}

RESTAURANT:
{result["restaurant"]}

LOCATION:
{result["location"]}

COUNTRIES:
{result["countries"]}

EPISODE TRANSCRIPT EXCERPT:
{result["text"]}

TASK:
Decide whether this specific episode has a meaningful connection to the user's search.

If it does, write a concise explanation of approximately 2-4 sentences.
Explain the actual connection between the user's query and the information
discussed in this episode.

Rules:
- Use only the episode information provided above.
- Do not use outside knowledge or invent facts.
- Do not repeat the general episode summary.
- Focus on details relevant to the user's specific search.
- Do not claim a restaurant is the best or recommend it unless the transcript
  explicitly supports that claim.
- A broad cultural or geographical association alone is not enough.
- Do not claim that a food, country, restaurant or person is discussed unless
  the supplied transcript excerpt supports it.
- If the episode is not meaningfully relevant, respond with exactly:
  NOT_RELEVANT

Return only the explanation or NOT_RELEVANT. Do not include the episode title.
"""

    response = client.chat.completions.create(
        model="openai/gpt-oss-120b",
        messages=[
            {
                "role": "user",
                "content": prompt
            }
        ]
    )

    explanation = response.choices[0].message.content or ""
    explanation = explanation.strip()

    if explanation.upper() == "NOT_RELEVANT":
        return None

    return explanation


def answer_question(question):
    results = search_transcripts(
        question,
        top_k=5
    )

    sources = []

    for result in results:
        explanation = explain_episode(question, result)

        if not explanation:
            continue

        sources.append({
            "episode_id": result["episode_id"],
            "title": result["title"],
            "score": result["score"],
            "location": result["location"],
            "countries": result["countries"],
            "restaurant": result["restaurant"],
            "summary": result["summary"],
            "topics": result["topics"],
            "food_items": result["food_items"],
            "image_url": result["image_url"],
            "spotify_url": result["spotify_url"],
            "youtube_url": result["youtube_url"],
            "episode_url": result["episode_url"],
            "explanation": explanation
        })

    if not sources:
        return {
            "answer": NO_MATCH,
            "sources": []
        }

    return {
        "answer": "",
        "sources": sources
    }


if __name__ == "__main__":
    question = input("\nAsk a question about the podcast: ")

    result = answer_question(question)

    print("\nRelevant episodes:\n")

    if not result["sources"]:
        print(NO_MATCH)

    for source in result["sources"]:
        print(f"\n{source['title']}")
        print(source["explanation"])
