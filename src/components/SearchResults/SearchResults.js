// src/components/SearchResults/SearchResults.js
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './SearchResults.css'; // Adjust CSS as needed

const SearchResults = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const query = new URLSearchParams(location.search).get('query');
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      const url = `https://api.themoviedb.org/3/search/movie?api_key=3ebf3efa4eb9b0a543803687286633ed&language=en-US&query=${query}&page=1&include_adult=false`;
      try {
        const res = await axios.get(url);
        setMovies(res.data.results);
      } catch (err) {
        console.error(err);
      }
    };

    fetchMovies();
  }, [query]);

  const handleCardClick = (id) => {
    navigate(`/movie/${id}`);
  };

  return (
    <div className="search-results">
      <div className="movies-grid">
        {movies.map((movie) => (
          <div key={movie.id} className="cards" onClick={() => handleCardClick(movie.id)}>
            <img
              className="cards__img"
              src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
              alt={movie.title}
            />
            <div className="cards__overlay">
              <div className="card__title">{movie.original_title}</div>
              <div className="card__runtime">
                {movie.release_date}
                <span className="card__rating">
                  {movie.vote_average}
                  <i className="fas fa-star" />
                </span>
              </div>
              <div className="card__description">
                {movie.overview.slice(0, 118) + "..."}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchResults;
