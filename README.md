# Weather Dashboard

# Frontend Developer - Assignment RiDiv Technologies

## Description

A weather dashboard application that shows the current weather and a 5-day forecast for a given city. Users can add cities to their favorites and view weather data for favorite cities. The application uses the OpenWeatherMap API and a JSON server for managing favorite cities.

## Features

- Search for a city and display current weather and a 5-day forecast.
- Add and remove cities from favorites.
- Display weather data for favorite cities.
- Persist the last searched city using local storage.
- Toggle between Celsius and Fahrenheit.

## Getting Started

### Prerequisites

- Node.js
- npm

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/weather-dashboard.git
   cd weather-dashboard
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Run the JSON server:

   ```bash
   npm run json-server
   ```

4. Run the React app:
   ```bash
   npm start
   ```

## Usage

1. Enter a city name in the search bar to fetch and display weather data.
2. Add cities to favorites by clicking the "Add to Favorites" button.
3. Remove cities from favorites by clicking the "Remove" button next to the favorite city.
4. Use the toggle to switch between Celsius and Fahrenheit.

## Obtaining an API Key

1. Sign up at [OpenWeatherMap](https://home.openweathermap.org/users/sign_up) to get an API key.
2. Replace `YOUR_API_KEY` in the `src/utils/api.js` file with your OpenWeatherMap API key.
