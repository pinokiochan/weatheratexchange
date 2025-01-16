const axios = require('axios');

async function fetchExchangeRate() {
    const apiKey = process.env.EXCHANGE_API_KEY; // Используем API ключ из .env
    const url = `https://v6.exchangerate-api.com/v6/${apiKey}/latest/USD`;

    const response = await axios.get(url);
    const kztRate = response.data.conversion_rates.KZT;
    return {
        kztRate
    };
}

module.exports = { fetchExchangeRate };
