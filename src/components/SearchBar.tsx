import { useState } from 'react';

interface SearchBarProps {
  onSearch: (city: string) => void;
}

const SearchBar = ({ onSearch }: SearchBarProps) => {
  const [city, setCity] = useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSearch(city);
  };

  return (
    <form onSubmit={handleSubmit} className="mt-4 flex justify-center">
      <input
        type="text"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        placeholder="Enter city name"
        className="rounded-l-lg border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button
        type="submit"
        className="rounded-r-lg bg-blue-500 p-2 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        Search
      </button>
    </form>
  );
};

export default SearchBar;
