const weatherApiKey = "your_openweathermap_api_key";
const exchangeApiKey = "your_exchangerate_api_key";
const timeZoneApiKey = "your_timezonedb_api_key";
let map, marker;

document.getElementById('get-weather-btn').addEventListener('click', () => {
    const city = document.getElementById('city-input').value;
    fetchWeatherByCity(city);
});

function fetchWeatherByCity(city) {
    fetch(`/api/weather?city=${city}`)
    .then(response => response.json())
    .then(data => {
        const weatherInfo = `
            <h2>Current weather in ${city}</h2>
            <p>Temperature: ${data.temperature}°C</p>
            <p>Feels like: ${data.feelsLike}°C</p>
            <p>Description: ${data.description}</p>
            <p>Humidity: ${data.humidity}%</p>
            <p>Pressure: ${data.pressure}hPa</p>
            <p>Wind Speed: ${data.windSpeed}m/s</p>
            <p>Coordinates: ${data.coordinates.lat}, ${data.coordinates.lon}</p>
            <p>Rain Volume: ${data.rainVolume} mm</p>
        `;
        document.getElementById('weather-info').innerHTML = weatherInfo;
        updateMap(data.coordinates.lat, data.coordinates.lon);
        fetchTimeZone(data.coordinates.lat, data.coordinates.lon);
    }).catch(error => {
        document.getElementById('weather-info').innerHTML = `<p>Error fetching weather data</p>`;
    });
}

function updateMap(lat, lon) {
    if (!map) {
        map = L.map('map').setView([lat, lon], 13);
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
            attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);
    } else {
        map.setView([lat, lon], 13);
    }

    if (marker) {
        marker.setLatLng([lat, lon]);
    } else {
        marker = L.marker([lat, lon]).addTo(map);
    }
}

function fetchTimeZone(lat, lon) {
    fetch(`/api/time-zone?lat=${lat}&lon=${lon}`)
    .then(response => response.json())
    .then(data => {
        const timeZoneInfo = `<h3>Timezone: ${data.zoneName}</h3>
                              <p>Current Time: ${data.formattedTime}</p>`;
        document.getElementById('timezone-info').innerHTML = timeZoneInfo;
    });
}

fetch(`/api/exchange-rate`)
    .then(response => response.json())
    .then(data => {
        const exchangeRateInfo = `<h3>Exchange Rate (USD to KZT): ${data.kztRate}</h3>`;
        document.getElementById('exchange-rate-info').innerHTML = exchangeRateInfo;
    });
