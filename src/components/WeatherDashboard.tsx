import { useState } from 'react';
import { getWeather, getForecast } from '../utils/api';
import SearchBar from './SearchBar';
import Loader from './Loader';
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
  const formatDate = (timestamp) => {
    return new Date(timestamp * 1000).toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'short',
      day: 'numeric',
    });
  };
  const getUniqueDates = (forecasts) => {
    const uniqueDates = [];
    forecasts.forEach((forecast) => {
      const date = formatDate(forecast.dt);
      if (!uniqueDates.includes(date)) {
        uniqueDates.push(date);
      }
    });
    return uniqueDates;
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
        {loading && <Loader />}
        {error && <p>{error}</p>}
        {weatherData && (
          <div className="p-6-w-sm mx-auto mt-8 w-full max-w-lg items-center justify-center overflow-hidden rounded rounded-lg bg-blue-100 p-4 shadow-xl">
            <h2 className="mb-2-xl mb-2 text-center text-5xl font-medium uppercase">
              {weatherData.name}
            </h2>
            <p className="text-5xl"> {Math.floor(weatherData.main.temp)}°C</p>

            <div className="flex justify-end px-20">
              <img
                src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}
                alt={weatherData.weather[0].description}
              />
              <p className="py-9 text-4xl font-light uppercase">
                {' '}
                {weatherData.weather[0].description}
              </p>
            </div>
            <p>Humidity: {weatherData.main.humidity}%</p>
          </div>
        )}
        {forecastData && (
          <div className="mx-auto mt-8 flex w-full max-w-6xl items-center justify-center gap-8 rounded rounded-lg bg-blue-400 py-8 shadow-slate-300">
            <h2 className="px-8 text-2xl font-bold">Daily Forecast</h2>
            {getUniqueDates(forecastData.list).map((date, index) => {
              const dailyData = forecastData.list.find(
                (forecast) => formatDate(forecast.dt) === date,
              );
              return (
                <div key={index} className="mb-4">
                  <p className="justify-center"> {date}</p>
                  <img
                    src={`https://openweathermap.org/img/wn/${dailyData.weather[0].icon}@2x.png`}
                    alt={dailyData.weather[0].description}
                  />
                  <p className="text-2xl font-light uppercase">
                    {' '}
                    {dailyData.weather[0].description}
                  </p>
                  <p className="flex gap-2 py-4 uppercase">
                    H: {Math.floor(dailyData.main.temp_max)}°C
                    <p> L: {Math.floor(dailyData.main.temp_min)}°C</p>
                  </p>
                </div>
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
};

export default WeatherDashboard;
