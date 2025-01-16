http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.WEATHER_API_KEY}&units=metric
http://api.timezonedb.com/v2.1/get-time-zone?key=${process.env.TIMEZONE_API_KEY}&format=json&by=position&lat=${lat}&lng=${lon}
http://dataservice.accuweather.com/forecasts/v1/daily/5day/${locationKey}?apikey=${process.env.ACCUWEATHER_API_KEY}&metric=true
https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png
http://openweathermap.org/img/wn/${weather.icon}@2x.png