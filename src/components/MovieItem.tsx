import { Link } from "react-router-dom";
import { MovieProps } from "../types";

import DefaultImage from "../assets/icons/default-movie.svg";

type MovieItemProps = {
  movie: MovieProps;
};

const MovieItem = ({ movie }: MovieItemProps) => {
  return (
    <Link to={`/movie/${movie.id}`} target="_blank" className="movie-item">
      {movie.poster_path ? (
        <img
          src={`https://image.tmdb.org/t/p/w200/${movie.poster_path}`}
          className="movie-poster"
        />
      ) : (
        <img src={DefaultImage} alt="default-image" className="movie-poster" />
      )}
      <p className="movie-rating">({movie.vote_average})</p>
      <h1 className="movie-name">
        {movie.original_title ? movie.original_title : movie.original_name}
      </h1>
      <p className="movie-overview line-clamp">{movie.overview}</p>
    </Link>
  );
};

export default MovieItem;
