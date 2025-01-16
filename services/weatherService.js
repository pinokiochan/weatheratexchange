const axios = require('axios');

async function fetchWeather(city) {
    const apiKey = process.env.WEATHER_API_KEY; // Используем API ключ из .env
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    const response = await axios.get(url);
    const { main, weather, wind, coord, sys } = response.data;

    return {
        temperature: main.temp,
        feelsLike: main.feels_like,
        description: weather[0].description,
        humidity: main.humidity,
        pressure: main.pressure,
        windSpeed: wind.speed,
        coordinates: coord,
        countryCode: sys.country,
        rainVolume: response.data.rain ? response.data.rain['1h'] : 0
    };
}

module.exports = { fetchWeather };
