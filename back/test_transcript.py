import os

TRANSCRIPTS_DIR = "data/transcripts"

filename = "ep1.txt"
filepath = os.path.join(TRANSCRIPTS_DIR, filename)

with open(filepath, "r", encoding="utf-8") as file:
    transcript = file.read()

print("Transcript loaded successfully!")
print(f"Characters: {len(transcript)}")

print("\nFirst 1000 characters:\n")
print(transcript[:1000])