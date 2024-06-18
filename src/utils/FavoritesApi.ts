import axios from 'axios';

const BASE_URL = 'http://localhost:5000/favorites';

export const addFavorite = async (city: string) => {
  try {
    const response = await axios.post(BASE_URL, { city });
    return response.data;
  } catch (error) {
    console.error('Error adding favorite city:', error);
  }
};

export const getFavorites = async () => {
  try {
    const response = await axios.get(BASE_URL);
    return response.data;
  } catch (error) {
    console.error('Error fetching favorite cities:', error);
  }
};

export const removeFavorite = async (id: string) => {
  try {
    await axios.delete(`${BASE_URL}/${id}`);
  } catch (error) {
    console.error('Error removing favorite city:', error);
  }
};
