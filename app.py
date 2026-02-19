import os
from flask import Flask, request, jsonify
from flask_cors import CORS
import google.generativeai as genai

app = Flask(__name__)
CORS(app)  # Allow requests from your frontend origin

@app.route('/chat', methods=['POST'])
def chat():
    """Simple chatbot endpoint. Expects JSON: { "message": "your text", "api_key": "your_gemini_api_key" }"""
    data = request.get_json()
    if not data or 'message' not in data or 'api_key' not in data:
        return jsonify({'error': 'Missing "message" or "api_key" in request.'}), 400

    user_message = data['message']
    api_key = data['api_key']
    prompt = user_message  # You can prepend system instructions if needed

    try:
        genai.configure(api_key=api_key)
        model = genai.GenerativeModel("gemini-1.5-flash")
        response = model.generate_content(
            prompt,
            generation_config={
                "temperature": 0.7,
                "top_p": 1.0,
                "top_k": 1,
            }
        )
        if not response.parts:
            return jsonify({'error': 'AI model returned an empty response.'}), 500
        return jsonify({'response': response.text.strip()})
    except Exception as e:
        return jsonify({'error': f"AI error: {e}"}), 500
    


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)

