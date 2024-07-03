import React, { useEffect, useState } from "react";
import "./movie.css";
import { useParams } from "react-router-dom";

const Movie = () => {
    const [currentMovieDetail, setMovie] = useState();
    const [trailer, setTrailer] = useState("");
    const { id } = useParams();

    useEffect(() => {
        getData();
        window.scrollTo(0, 0);
    }, []);

    const getData = () => {
        fetch(
            `https://api.themoviedb.org/3/movie/${id}?api_key=4e44d9029b1270a757cddc766a1bcb63&language=en-US`,
        )
            .then((res) => res.json())
            .then((data) => setMovie(data));

        fetch(
            `https://api.themoviedb.org/3/movie/${id}/videos?api_key=4e44d9029b1270a757cddc766a1bcb63&language=en-US`,
        )
            .then((res) => res.json())
            .then((data) => {
                const trailer = data.results.find(
                    (video) =>
                        video.type === "Trailer" && video.site === "YouTube"
                );
                setTrailer(trailer ? trailer.key : "");
            });
    };

    return (
        <div className="movie">
            <div className="movie__intro">
                <img
                    className="movie__backdrop"
                    src={`https://image.tmdb.org/t/p/original${currentMovieDetail ? currentMovieDetail.backdrop_path : ""}`}
                    alt={currentMovieDetail ? currentMovieDetail.original_title : "Movie Backdrop"}
                />
            </div>
            <div className="movie__detail">
                <div className="movie__detailLeft">
                    <div className="movie__posterBox">
                        <img
                            className="movie__poster"
                            src={`https://image.tmdb.org/t/p/original${currentMovieDetail ? currentMovieDetail.poster_path : ""}`}
                            alt={currentMovieDetail ? currentMovieDetail.original_title : "Movie Poster"}
                        />
                    </div>
                </div>
                <div className="movie__detailRight">
                    <div className="movie__detailRightTop">
                        <div className="movie__name">
                            {currentMovieDetail ? currentMovieDetail.original_title : ""}
                        </div>
                        <div className="movie__tagline">
                            {currentMovieDetail ? currentMovieDetail.tagline : ""}
                        </div>
                        <div className="movie__rating">
                            {currentMovieDetail ? currentMovieDetail.vote_average : ""}{" "}
                            <i className="fas fa-star" />
                            <span className="movie__voteCount">
                                {currentMovieDetail ? `(${currentMovieDetail.vote_count} votes)` : ""}
                            </span>
                        </div>
                        <div className="movie__runtime">
                            {currentMovieDetail ? `${currentMovieDetail.runtime} mins` : ""}
                        </div>
                        <div className="movie__releaseDate">
                            {currentMovieDetail ? `Release date: ${currentMovieDetail.release_date}` : ""}
                        </div>
                        <div className="movie__genres">
                            {currentMovieDetail && currentMovieDetail.genres
                                ? currentMovieDetail.genres.map((genre) => (
                                      <span className="movie__genre" key={genre.id}>
                                          {genre.name}
                                      </span>
                                  ))
                                : ""}
                        </div>
                    </div>
                    <div className="movie__detailRightBottom">
                        <div className="synopsisText">Synopsis</div>
                        <div>{currentMovieDetail ? currentMovieDetail.overview : ""}</div>
                    </div>
                </div>
            </div>
            <div className="movie__videos">
                {trailer && (
                    <iframe
                        className="movie__video"
                        width="560"
                        height="315"
                        src={`https://www.youtube.com/embed/${trailer}`}
                        title="YouTube video player"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                    ></iframe>
                )}
            </div>
            <div className="movie__links">
    <div className="movie__heading">Useful Links</div>
    {currentMovieDetail && currentMovieDetail.homepage && (
        <div className="movie__linkContainer">
            <a
                href={currentMovieDetail.homepage}
                target="_blank"
                rel="noopener noreferrer"
                style={{ textDecoration: "none" }}
            >
                <p>
                    <span className="movie__homeButton movie__Button">
                        Homepage <i className="newTab fas fa-external-link-alt"></i>
                    </span>
                </p>
            </a>
        </div>
    )}
    {currentMovieDetail && currentMovieDetail.imdb_id && (
        <div className="movie__linkContainer">
            <a
                href={`https://www.imdb.com/title/${currentMovieDetail.imdb_id}`}
                target="_blank"
                rel="noopener noreferrer"
                style={{ textDecoration: "none" }}
            >
                <p>
                    <span className="movie__imdbButton movie__Button">
                        IMDb <i className="newTab fas fa-external-link-alt"></i>
                    </span>
                </p>
            </a>
        </div>
    )}
</div>

            <div className="movie__heading">Production companies</div>
            <div className="movie__production">
                {currentMovieDetail &&
                    currentMovieDetail.production_companies &&
                    currentMovieDetail.production_companies.map((company) => (
                        company.logo_path && (
                            <span className="productionCompanyImage" key={company.id}>
                                <img
                                    className="movie__productionCompany"
                                    src={`https://image.tmdb.org/t/p/original${company.logo_path}`}
                                    alt={company.name}
                                />
                                <span>{company.name}</span>
                            </span>
                        )
                    ))}
            </div>
        </div>
    );
};

export default Movie;
