const axios = require('axios');

async function fetchTimeZone(lat, lon) {
    const apiKey = process.env.TIMEZONE_API_KEY; // Используем API ключ из .env
    const url = `https://api.timezonedb.com/v2.1/get-time-zone?key=${apiKey}&format=json&by=position&lat=${lat}&lng=${lon}`;
    const response = await axios.get(url);
    
    const { zoneName, formatted } = response.data;
    return {
        zoneName,
        formattedTime: formatted
    };
}

module.exports = { fetchTimeZone };
