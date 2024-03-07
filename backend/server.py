from flask import Flask, send_from_directory
from flask_cors import CORS
import os

app = Flask(__name__, static_folder="../build", static_url_path="/")
CORS(app)

@app.route('/')
def serve_index():
    return send_from_directory(app.static_folder, 'index.html')

@app.route('/weather')
def get_weather():
    # Die Stadt aus der Anfrage extrahieren
    city = request.args.get('city')

    # Den API-Schlüssel aus der Umgebungsvariable lesen
    api_key = os.getenv('WEATHER_API_KEY')

    # Überprüfen, ob der API-Schlüssel vorhanden ist
    if not api_key:
        # Wenn der API-Schlüssel nicht gefunden wird, wird ein Fehler zurückgegeben
        return jsonify({'error': 'API key not found'}), 500

    # Die API-Anfrage an die Wetter-API senden
    url = f'http://api.openweathermap.org/data/2.5/weather?q={city}&appid={api_key}'
    response = requests.get(url)
    
    # Die Antwort der Wetter-API als JSON zurückgeben
    data = response.json()
    return jsonify(data)

if __name__ == '__main__':
    # Den Flask-Server starten
    app.run(debug=True)
