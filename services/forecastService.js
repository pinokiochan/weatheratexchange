import fetch from 'node-fetch';

export async function getForecastData(city){
    const locationResponse = await fetch(`http://dataservice.accuweather.com/locations/v1/cities/search?apikey=${process.env.ACCUWEATHER_API_KEY}&q=${city}`);
    const locationData = await locationResponse.json();
    const locationKey = locationData[0].Key;

    const forecastResponse = await fetch(`http://dataservice.accuweather.com/forecasts/v1/daily/5day/${locationKey}?apikey=${process.env.ACCUWEATHER_API_KEY}&metric=true`);
    const forecastData = await forecastResponse.json();

    return forecastData.DailyForecasts.map(day => ({
        date: day.Date,
        minTemp: day.Temperature.Minimum.Value,
        maxTemp: day.Temperature.Maximum.Value,
        dayPhrase: day.Day.IconPhrase,
        nightPhrase: day.Night.IconPhrase
    }));
}