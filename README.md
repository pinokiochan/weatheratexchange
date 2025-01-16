# Weather API Application

This application provides real-time weather information, timezone data, and a 5-day forecast for a given city using multiple APIs.

## Features

- Current weather information including temperature, description, humidity, pressure, wind speed, and more
- Timezone information for the searched location
- 5-day weather forecast
- Interactive map showing the location of the searched city

## APIs Used

1. OpenWeatherMap API: For current weather data
2. TimezoneDB API: For timezone information
3. AccuWeather API: For 5-day weather forecast

## Setup Instructions

1. Clone this repository:
   \`\`\`
   git clone https://github.com/yourusername/weather-api-app.git
   \`\`\`
2. Navigate to the project directory:
   \`\`\`
   cd weather-api-app
   \`\`\`
3. Install the dependencies:
   \`\`\`
   npm install
   \`\`\`
4. Create a `.env` file in the root directory with the following content:
   \`\`\`
   WEATHER_API_KEY=your_openweathermap_api_key
   TIMEZONE_API_KEY=your_timezonedb_api_key
   ACCUWEATHER_API_KEY=your_accuweather_api_key
   \`\`\`
   Replace `your_*_api_key` with your actual API keys.

5. Start the server:
   \`\`\`
   npm start
   \`\`\`
6. Open your browser and navigate to `http://localhost:3000`

## Project Structure

- `index.js`: Main server file containing the Express.js setup and API endpoint
- `public/`: Directory for static files
  - `index.html`: Main HTML file
  - `index.js`: Client-side JavaScript for handling user interactions and displaying data
  - `style.css`: CSS styles for the application

## API Usage

The application exposes a single API endpoint:

- `GET /api/weather/:city`: Fetches weather, timezone, and forecast data for the specified city

Example: `http://localhost:3000/api/weather/London`

## Design Decisions

1. Server-side API calls: All API calls are made on the server-side to keep API keys secure and reduce the load on the client.
2. Data processing: Weather data is processed on the server to provide a consistent and optimized response to the client.
3. Responsive design: The application uses CSS to ensure a good user experience across different device sizes.
4. Interactive map: Leaflet.js is used to provide an interactive map showing the location of the searched city.

## Future Improvements

- Add error handling for invalid city names
- Implement caching to reduce API calls for frequently searched cities
- Add unit tests for both server-side and client-side code
- Enhance the UI with more detailed weather information and icons

