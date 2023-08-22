import { Link } from "react-router-dom";
import { MovieProps } from "../types";

type MovieItemProps = {
  movie: MovieProps;
};

const MovieItem = ({ movie }: MovieItemProps) => {
  return (
    <Link to={`/movie/${movie.id}`} className="movie_item">
      <img src={`https://image.tmdb.org/t/p/w200/${movie.poster_path}`} />
      <h1 className="movie_name">
        {movie.original_title ? movie.original_title : movie.original_name}
      </h1>
      <p className="movie_name">{movie.overview}</p>
    </Link>
  );
};

export default MovieItem;
