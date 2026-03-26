# from groq import Groq
# import os
# from dotenv import load_dotenv

# load_dotenv()

# client = Groq(api_key=os.getenv("GROQ_API_KEY"))

# def get_reply(message: str):
#     response = client.chat.completions.create(
#         model="llama-3.1-8b-instant",  # ✅ updated
#         messages=[
#             {"role": "user", "content": message}
#         ]
#     )

#     return response.choices[0].message.content

from groq import Groq
import os
from dotenv import load_dotenv

load_dotenv()

client = Groq(api_key=os.getenv("GROQ_API_KEY"))

def get_reply(message: str):
    try:
        response = client.chat.completions.create(
            model="llama-3.1-8b-instant",  # ✅ fast & working
            messages=[
                {"role": "user", "content": message}
            ],
            temperature=0.7,   # 🔥 more natural replies
            max_tokens=500     # ⚡ control response length
        )

        return response.choices[0].message.content

    except Exception as e:
        print("ERROR:", str(e))
        return "⚠️ Something went wrong. Please try again."