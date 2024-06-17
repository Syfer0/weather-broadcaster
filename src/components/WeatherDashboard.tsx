import { useState } from 'react';
import { getWeather, getForecast } from '../utils/api';
import SearchBar from './SearchBar';

const WeatherDashboard = () => {
  const [weatherData, setWeatherData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [forecastData, setForecastData] = useState<any>(null);
  const handleSearch = async (cityName: string) => {
    setLoading(true);
    setError(null);
    setWeatherData(null);
    setForecastData(null);

    try {
      const weatherResponse = await getWeather(cityName);
      const forecastResponse = await getForecast(cityName);
      setWeatherData(weatherResponse.data);
      setForecastData(forecastResponse.data);
    } catch (err) {
      setError('Failed to fetch data');
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Weather Dashboard
          </h1>
        </div>
      </header>
      <main>
        <SearchBar onSearch={handleSearch} />
        {loading && <p>Loading...</p>}
        {error && <p>{error}</p>}
        {weatherData && (
          <div className="p-4">
            <h2 className="text-2xl font-bold">
              Weather in {weatherData.name}
            </h2>
            <p>Temperature: {weatherData.main.temp}°C</p>
            <p>Weather State: {weatherData.weather[0].description}</p>
            <p>Humidity: {weatherData.main.humidity}%</p>
          </div>
        )}
        {forecastData && (
          <div className="p-4">
            <h2 className="text-2xl font-bold">5-Day Forecast</h2>
            {/* Map through forecastData.list to display each day's forecast */}
            {forecastData.list.map((forecast, index) => (
              <div key={index}>
                <p>Date: {new Date(forecast.dt * 1000).toLocaleDateString()}</p>
                <p>Temperature: {forecast.main.temp}°C</p>
                <p>Weather State: {forecast.weather[0].description}</p>
                {/* Add more details as needed */}
              </div>
            ))}
          </div>
        )}
      </main>
      <footer className="bg-white">
        <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
          <p className="text-center text-sm text-gray-500">
            © 2024 Weather Dashboard. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default WeatherDashboard;
