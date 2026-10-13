from openai import OpenAI

client = OpenAI(
    base_url="http://127.0.0.1:31415/v1",
    api_key="freellmapi-7eaf2d98195584867ebed198beaa64569399a45ac13cf570"
)

response = client.chat.completions.create(
    model="auto",
    messages=[
        {
            "role": "user",
            "content": "Reply with exactly: FreeLLMAPI is working from Python."
        }
    ]
)

print(response.choices[0].message.content)