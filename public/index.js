let map;

async function getWeather() {
    const city = document.getElementById('cityInput').value;
    try {
        const response = await fetch(`/api/weather/${city}`);
        if (!response.ok) {
            throw new Error('Failed to fetch weather data');
        }
        const data = await response.json();

        displayWeatherInfo(data.weather);
        displayTimezoneInfo(data.timezone);
        displayForecastInfo(data.forecast);
        initializeMap(data.mapCoord);
    } catch (error) {
        console.error('Error:', error);
        document.getElementById('weatherInfo').innerHTML = `<p>Error: ${error.message}</p>`;
    }
}

function displayWeatherInfo(weather) {
    const weatherInfo = document.getElementById('weatherInfo');
    const iconUrl = `http://openweathermap.org/img/wn/${weather.icon}@2x.png`;

    weatherInfo.innerHTML = `
        <h2>Weather in ${weather.city}, ${weather.country}</h2>
        <img src="${iconUrl}" alt="${weather.description}" />
        <p>Temperature: ${weather.temperature}°C</p>
        <p>Feels like: ${weather.feelsLike}°C</p>
        <p>Description: ${weather.description}</p>
        <p>Humidity: ${weather.humidity}%</p>
        <p>Pressure: ${weather.pressure} hPa</p>
        <p>Wind Speed: ${weather.windSpeed} m/s</p>
        <p>Rain (last 3h): ${weather.rain} mm</p>
    `;
}

function displayTimezoneInfo(timezone) {
    const timezoneInfo = document.getElementById('timezoneInfo');
    timezoneInfo.innerHTML = `
        <h2>Timezone Information</h2>
        <p>Timezone: ${timezone.zoneName}</p>
        <p>Local Time: ${timezone.localTime}</p>
    `;
}

function displayForecastInfo(forecast) {
    const forecastInfo = document.getElementById('forecastInfo');
    let forecastHtml = '<h2>5-Day Forecast</h2>';

    forecast.forEach(day => {
        const date = new Date(day.date);
        forecastHtml += `
            <div class="forecast-day">
                <h3>${date.toDateString()}</h3>
                <p>Min: ${day.minTemp}°C</p>
                <p>Max: ${day.maxTemp}°C</p>
                <p>Day: ${day.dayPhrase}</p>
                <p>Night: ${day.nightPhrase}</p>
            </div>
        `;
    });

    forecastInfo.innerHTML = forecastHtml;
}

function initializeMap(coord) {
    if (map) {
        map.remove();
    }
    
    map = L.map('map').setView([coord.lat, coord.lon], 10);
    
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
    }).addTo(map);

    L.marker([coord.lat, coord.lon]).addTo(map)
        .bindPopup('City Location')
        .openPopup();
}

