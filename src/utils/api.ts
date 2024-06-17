import axios from 'axios';

const API_KEY = 'add820bdc561fe3474efa2afac106bc3';
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

export const getWeather = (city: string) => {
  return axios.get(`${BASE_URL}/weather`, {
    params: {
      q: city,
      appid: API_KEY,
      units: 'metric',
    },
  });
};
export const getForecast = (city: string) => {
  return axios.get(`${BASE_URL}/forecast`, {
    params: {
      q: city,
      appid: API_KEY,
      units: 'metric',
    },
  });
};
