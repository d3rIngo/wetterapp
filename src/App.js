import React, { useState } from 'react';
import './App.css';

function App() {
  // Zustand für die Benutzereingabe (Stadtname)
  const [city, setCity] = useState('');
  // Zustand für das Wetterergebnis
  const [weatherData, setWeatherData] = useState(null);

  // Funktion zum Abrufen des Wetters
  const fetchWeather = async () => {
    try {
      // Anfrage an das Backend senden, um das Wetter für die eingegebene Stadt abzurufen
      const response = await fetch(`http://localhost:3000/weather?city=${city}&lang=de`);
      // Antwort in JSON-Format konvertieren
      const data = await response.json();
      // Wetterdaten im Zustand speichern
      setWeatherData(data);
    } catch (error) {
      // Fehlerbehandlung bei der Anfrage
      console.error('Fehler beim Abrufen des Wetters:', error);
    }
  };

  return (
    <div className="App">
      <h1>Wetter-App</h1>
      {/* Eingabefeld für den Stadtname */}
      <input
        type="text"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        placeholder="Stadtname eingeben"
      />
      {/* Button zum Abrufen des Wetters */}
      <button onClick={fetchWeather}>Wetter abrufen</button>
      {/* Anzeige der Wetterdaten, wenn vorhanden */}
      {weatherData && (
        <div>
          {/* Anzeige des Stadtnamens */}
          <h2>{weatherData.name}</h2>
          {/* Anzeige der Temperatur */}
          <p>Temperatur: {weatherData.main.temp} °C</p>
          {/* Anzeige des allgemeinen Wetterzustands */}
          <p>Wetter: {weatherData.weather[0].description}</p>
        </div>
      )}
    </div>
  );
}

export default App;
