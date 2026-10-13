import json
import os


def load_episodes():

    episodes = []

    folder_path = "data/episodes"


    for filename in os.listdir(folder_path):

        if filename.endswith(".json"):

            file_path = os.path.join(folder_path, filename)

            with open(file_path, "r", encoding="utf-8") as file:

                episode = json.load(file)

                episodes.append(episode)


    return episodes



episodes = load_episodes()


print("Loaded episodes:", len(episodes))


for episode in episodes:

    print("--------------------")

    print("Title:", episode["title"])

    print("Guest:", episode["guest"])

    print("Topics:", episode["main_topics"])