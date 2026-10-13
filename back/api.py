from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from answer import answer_question
import json
from pathlib import Path

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://192.168.56.1:3000",
        "http://localhost:3000",
        "http://127.0.0.1:3000",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class QuestionRequest(BaseModel):
    question: str


@app.get("/")
def home():
    return {"message": "Migration Menu API is running"}


@app.post("/ask")
def ask_question(request: QuestionRequest):

    result = answer_question(request.question)

    return {
        "question": request.question,
        "answer": result["answer"],
        "sources": result["sources"]
    }


@app.get("/episodes")
def get_episodes():
    episodes_folder = Path(__file__).parent / "data" / "episodes"
    episodes = []

    for file_path in sorted(episodes_folder.glob("ep*.json")):
        with open(file_path, "r", encoding="utf-8") as file:
            episode = json.load(file)

        episodes.append(episode)

    return {"episodes": episodes}
