import { useEffect, useState } from 'react';
import { getWeather, getForecast } from '../utils/api';
import SearchBar from './SearchBar';
import Loader from './Loader';
import FavoriteCities from './Favorite';
import {
  addFavorite,
  getFavorites,
  removeFavorite,
} from '../utils/FavoritesApi';

const WeatherDashboard = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [forecastData, setForecastData] = useState(null);
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const fetchFavorites = async () => {
      const favoriteCities = await getFavorites();
      setFavorites(favoriteCities);
    };
    fetchFavorites();
  }, []);

  const handleSearch = async (cityName) => {
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
      setWeatherData(weatherResponse.data);
      setForecastData(forecastResponse.data);
    } catch (err) {
      setError('Failed to fetch data');
    }
    setLoading(false);
  };

  const addCityToFavorites = async (cityName) => {
    const cityExists = favorites.some((fav) => fav.city === cityName);

    if (cityExists) {
      alert('City is already added');
      return;
    }
    const newFavorite = await addFavorite(cityName);
    setFavorites([...favorites, newFavorite]);
  };

  const removeCityFromFavorites = async (city) => {
    const cityToRemove = favorites.find((fav) => fav.city === city);
    await removeFavorite(cityToRemove.id);
    setFavorites(favorites.filter((fav) => fav.city !== city));
  };

  const handleFavoriteClick = (cityName) => {
    handleSearch(cityName);
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
          <div>
            <div className="p-6-w-sm mx-auto mt-8 w-full max-w-lg items-center justify-center overflow-hidden rounded-lg bg-blue-100 p-4 shadow-xl">
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-5xl font-medium uppercase">
                  {weatherData.name}
                </h2>
                <button
                  className="rounded bg-green-500 px-4 py-2 text-white transition-colors hover:bg-green-700"
                  onClick={() => addCityToFavorites(weatherData.name)}
                >
                  Add
                </button>
              </div>
              <p className="text-5xl">{Math.floor(weatherData.main.temp)}°C</p>
              <div className="flex justify-end px-20">
                <img
                  src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}
                  alt={weatherData.weather[0].description}
                />
                <p className="py-9 text-4xl font-light uppercase">
                  {weatherData.weather[0].description}
                </p>
              </div>
              <FavoriteCities
                favorites={favorites}
                onRemoveFavorite={removeCityFromFavorites}
                onCitySelect={handleFavoriteClick}
              />
              <p>Humidity: {weatherData.main.humidity}%</p>
            </div>
          </div>
        )}
        {forecastData && (
          <div className="mx-auto mt-8 flex w-full max-w-6xl items-center justify-center gap-8 rounded-lg bg-blue-400 py-8 shadow-slate-300">
            <h2 className="px-8 text-2xl font-bold">Daily Forecast</h2>
            {getUniqueDates(forecastData.list).map((date, index) => {
              const dailyData = forecastData.list.find(
                (forecast) => formatDate(forecast.dt) === date,
              );
              return (
                <div key={index} className="mb-4">
                  <p className="justify-center">{date}</p>
                  <img
                    src={`https://openweathermap.org/img/wn/${dailyData.weather[0].icon}@2x.png`}
                    alt={dailyData.weather[0].description}
                  />
                  <p className="text-2xl font-light uppercase">
                    {dailyData.weather[0].description}
                  </p>
                  <p className="flex gap-2 py-4 uppercase">
                    H: {Math.floor(dailyData.main.temp_max)}°C L:{' '}
                    {Math.floor(dailyData.main.temp_min)}°C
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
