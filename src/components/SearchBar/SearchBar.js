import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import './SearchBar.css';

const SearchBar = () => {
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState([]);
  const navigate = useNavigate(); // Initialize useNavigate

  const searchMovies = async (e) => {
    e.preventDefault();

    const url = `https://api.themoviedb.org/3/search/movie?api_key=3ebf3efa4eb9b0a543803687286633ed&language=en-US&query=${query}&page=1&include_adult=false`;

    try {
      const res = await axios.get(url);
      setMovies(res.data.results);
    } catch (err) {
      console.error(err);
    }
  };

  const handleCardClick = (id) => {
    navigate(`/movie/${id}`); // Navigate to the movie details page
  };

  return (
    <form onSubmit={searchMovies}>
      <input
        type="text"
        name="query"
        placeholder="Search for a movie"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button type="submit">Show All</button>
      {movies.map((movie) => (
        <div key={movie.id} className="cards" onClick={() => handleCardClick(movie.id)}>
          <img
            className="cards__img"
            src={`https://image.tmdb.org/t/p/original${movie ? movie.poster_path : ""}`}
            alt={movie.title}
          />
          <div className="cards__overlay">
            <div className="card__title">
              {movie ? movie.original_title : ""}
            </div>
            <div className="card__runtime">
              {movie ? movie.release_date : ""}
              <span className="card__rating">
                {movie ? movie.vote_average : ""}
                <i className="fas fa-star" />
              </span>
            </div>
            <div className="card__description">
              {movie ? movie.overview.slice(0, 118) + "..." : ""}
            </div>
          </div>
        </div>
      ))}
    </form>
  );
};

export default SearchBar;
