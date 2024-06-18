import React from 'react';

const FavoriteCities = ({ favorites, onRemoveFavorite, onCitySelect }) => {
  return (
    <div className="favorite-cities-container rounded-lg bg-white p-4 uppercase shadow-lg">
      <h2 className="favorite-cities-title mb-4 text-2xl font-bold">
        Favorite Cities
      </h2>
      <ul className="favorite-cities-list list-none p-0">
        {favorites.map((fav) => (
          <li
            key={fav.id}
            className="favorite-city-item mb-2 flex items-center justify-between border-b border-gray-200 p-2"
          >
            <span
              onClick={() => onCitySelect(fav.city)}
              className="favorite-city-name cursor-pointer text-lg text-blue-600 transition-colors hover:text-blue-800"
            >
              {fav.city}
            </span>
            <button
              onClick={() => onRemoveFavorite(fav.city)}
              className="remove-city-button rounded bg-red-500 px-3 py-1 text-white transition-colors hover:bg-red-700"
            >
              Remove
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FavoriteCities;
