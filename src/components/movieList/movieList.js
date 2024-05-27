import React, { useEffect, useState } from "react";
import "./movieList.css";
import { useParams } from "react-router-dom";
import Cards from "../card/card";

const MovieList = () => {
    const [movieList, setMovieList] = useState([]);
    const { type } = useParams();

    useEffect(() => {
        getData();
    }, []);

    useEffect(() => {
        getData();
    }, [type]);

    const getData = () => {
        fetch(
            `https://api.themoviedb.org/3/movie/${type ? type : "now_playing"}?api_key=3ebf3efa4eb9b0a543803687286633ed&language=en-US`,
        )
            .then((res) => res.json())
            .then((data) => setMovieList(data.results));
    };

    return (
        <div className="movie__list">
            <h2 className="list__title">
                {(type ? type : "now_playing").toUpperCase()}
            </h2>
            <div className="list__cards">
                {movieList.map((movie) => (
                    <Cards movie={movie} />
                ))}
            </div>
        </div>
    );
};

export default MovieList;
