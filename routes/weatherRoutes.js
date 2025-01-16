import express from 'express';
import {getWeatherData} from '../services/weatherService.js';
import {getForecastData} from '../services/forecastService.js';
import {getTimezoneData} from '../services/timezoneService.js';

const router = express.Router();

router.get('/api/weather/:city', async (req, res) => {
    try{
        const city = req.params.city
        const weatherData = await getWeatherData(city);
        const forecastData = await getForecastData(city);
        const timezoneData = await getTimezoneData(weatherData.coord.lat, weatherData.coord.lon);

        res.json({
            weather: weatherData,
            forecast: forecastData,
            timezone: timezoneData,
            mapCoord: weatherData.coord
        })
        
    }catch(error){
        res.status(500).json({error: 'Error fetching weather data'})
        console.error(error)
    }
})
export default router;