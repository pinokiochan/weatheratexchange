const express = require('express');
const path = require('path');
const dotenv = require('dotenv');
const { fetchWeather } = require('./services/weatherService');
const { fetchTimeZone } = require('./services/timeZoneService');
const { fetchExchangeRate } = require('./services/exchangeRateService');

dotenv.config(); // Загружаем переменные окружения из .env

const app = express();
const port = 3000;

app.use(express.static(path.join(__dirname, 'public')));

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/api/weather', async (req, res) => {
    const { city } = req.query;
    if (!city) {
        return res.status(400).json({ error: 'City name is required' });
    }
    try {
        const weatherData = await fetchWeather(city);
        res.json(weatherData);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching weather data' });
    }
});

app.get('/api/time-zone', async (req, res) => {
    const { lat, lon } = req.query;
    if (!lat || !lon) {
        return res.status(400).json({ error: 'Latitude and longitude are required' });
    }
    try {
        const timeZoneData = await fetchTimeZone(lat, lon);
        res.json(timeZoneData);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching time zone data' });
    }
});

app.get('/api/exchange-rate', async (req, res) => {
    try {
        const exchangeRateData = await fetchExchangeRate();
        res.json(exchangeRateData);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching exchange rate data' });
    }
});

app.listen(port, () => {
    console.log(`Server is listening at http://localhost:${port}`);
});
