import os
from flask import Flask, request, jsonify
from pinecone import Pinecone
from pinecone_plugins.assistant.models.chat import Message
from dotenv import load_dotenv
from flask_cors import CORS

app = Flask(__name__)
CORS(app, origins=["http://localhost:3000", "https://fleetview.vercel.app"])

load_dotenv()

PINECONE_API_KEY = os.environ.get("PINECONE_API_KEY")
ASSISTANT_NAME = "vehicle-helper"  # Our assistant's name

# Initialize Pinecone client and assistant
pc = Pinecone(api_key=PINECONE_API_KEY)
assistant = pc.assistant.Assistant(assistant_name=ASSISTANT_NAME)

@app.route("/api/assistant/chat", methods=["POST"])
def chat():
    data = request.get_json()
    user_message = data.get("message")
    if not user_message:
        return jsonify({"error": "No message provided"}), 400

    msg = Message(content=user_message)
    try:
        resp = assistant.chat(messages=[msg])
        return jsonify({"response": resp["message"]["content"]})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=8080)