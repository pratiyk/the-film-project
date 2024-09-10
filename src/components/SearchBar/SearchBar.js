// src/components/SearchBar/SearchBar.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './SearchBar.css';

const SearchBar = () => {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const searchMovies = (e) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/search?query=${query}`);
    }
  };

  return (
    <form onSubmit={searchMovies} className="search-box">
      <input
        type="text"
        name="query"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search for Films..."
      />
      <button type="submit">Search</button>
    </form>
  );
};

export default SearchBar;
