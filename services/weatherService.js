import fetch from 'node-fetch';

export async function getWeatherData(city){
    const response = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.WEATHER_API_KEY}&units=metric`);
    const data = await response.json();

    return{
        city: data.name,
        country: data.sys.country,
        temperature: data.main.temp,
        feelsLike: data.main.feels_like,
        humidity: data.main.humidity,
        description: data.weather[0].description,
        icon: data.weather[0].icon,
        pressure: data.main.pressure,
        windSpeed: data.wind.speed,
        rain: data.rain ? data.rain['3h']: 0,
        coord: data.coord
        
    }
}