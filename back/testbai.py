import os
import requests
from dotenv import load_dotenv

load_dotenv()

api_key = os.getenv("BAI_API_KEY")

response = requests.post(
    "https://api.b.ai/v1/chat/completions",
    headers={
        "Authorization": f"Bearer {api_key}",
        "Content-Type": "application/json",
    },
    json={
        "model": "qwen3.8-flash",
        "messages": [
            {
                "role": "user",
                "content": "Say hello in one short sentence."
            }
        ],
        "stream": False,
        "temperature": 0.7,
        "max_tokens": 100,
    },
)

print("Status:", response.status_code)
print(response.text)