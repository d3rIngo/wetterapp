// Füge hier deinen JavaScript-Code für die Wetter-App hinzu
console.log('Wetter-App gestartet');

// Funktion zum Abrufen des Wetters
async function fetchWeather(city) {
  try {
    const response = await fetch(`http://localhost:3000/weather?city=${city}&lang=de`);
    const data = await response.json();
    displayWeather(data);
  } catch (error) {
    console.error('Fehler beim Abrufen des Wetters:', error);
  }
}

// Funktion zum Anzeigen des Wetters
function displayWeather(weatherData) {
  const weatherInfo = document.querySelector('.weather-info');
  weatherInfo.innerHTML = `
    <h2>${weatherData.name}</h2>
    <p>Temperatur: ${weatherData.main.temp} °C</p>
    <p>Wetter: ${weatherData.weather[0].description}</p>
  `;
}

// Event-Listener für das Formular
const form = document.querySelector('form');
form.addEventListener('submit', (e) => {
  e.preventDefault();
  const city = document.querySelector('#city').value;
  fetchWeather(city);
});
