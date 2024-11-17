from openai import OpenAI

client = OpenAI(
    base_url="https://api.sambanova.ai/v1", 
    api_key="8202d9b3-560f-4201-84e1-ff0d2cf0861e"
)

completion = client.chat.completions.create(
  model="Meta-Llama-3.1-405B-Instruct",
  messages = [
      {"role": "system", "content": "Answer the question in a couple sentences."},
      {"role": "user", "content": "Share a happy story with me"}
    ],
  stream= True
)

for chunk in completion:
  print(chunk.choices[0].delta)