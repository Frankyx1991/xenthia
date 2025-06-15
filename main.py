from flask import Flask, request, jsonify
import os

app = Flask(__name__)

@app.route('/')
def home():
    return "Xenthia Backend Operativo"

@app.route('/api/analizar', methods=['POST'])
def analizar():
    data = request.json
    return jsonify({"resultado": f"Análisis realizado para: {data.get('texto', '')}"})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=int(os.environ.get("PORT", 8080)))
