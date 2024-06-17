import { useState } from 'react';
import { getWeather, getForecast } from '../utils/api';
import SearchBar from './SearchBar';

const WeatherDashboard = () => {
  const [weatherData, setWeatherData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [forecastData, setForecastData] = useState<any>(null);

  const handleSearch = async (cityName: string) => {
    if (cityName === '') {
      alert('Enter the City Name');
      return;
    }
    setLoading(true);
    setError(null);
    setWeatherData(null);
    setForecastData(null);

    try {
      const weatherResponse = await getWeather(cityName);
      const forecastResponse = await getForecast(cityName);
      console.log(forecastResponse.data);
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
            <p>Temperature: {Math.floor(weatherData.main.temp)}°C</p>
            <p>Weather State: {weatherData.weather[0].description}</p>
            <p>Humidity: {weatherData.main.humidity}%</p>
            <img
              src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}
              alt={weatherData.weather[0].description}
            />
          </div>
        )}
        {forecastData && (
          <div className="p-4">
            <h2 className="text-2xl font-bold">5-Day Forecast</h2>
            {forecastData.list.map((forecast, index) => (
              <div key={index} className="mb-4">
                <p>Date: {new Date(forecast.dt * 1000).toLocaleDateString()}</p>
                <p>Temperature: {forecast.main.temp}°C</p>
                <p>Weather State: {forecast.weather[0].description}</p>
                <img
                  src={`https://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png`}
                  alt={forecast.weather[0].description}
                />
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
