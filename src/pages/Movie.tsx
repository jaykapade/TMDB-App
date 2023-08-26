import { useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  clearSearchResults,
  fetchMovieById,
  selectedMovie,
} from "../store/slices/movieSlice";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import Spinner from "../components/Spinner";

const Movie = () => {
  // const [movie, setMovie] = useState<MovieProps & CreditsProps>();
  // const [isLoading, setIsLoading] = useState(false);
  const { movieId } = useParams();
  const dispatch = useAppDispatch();

  const { movie, status } = useAppSelector(selectedMovie);

  useEffect(() => {
    // if (movieId) getMovieData(movieId);
    dispatch(clearSearchResults());
    if (movieId) dispatch(fetchMovieById(movieId));
  }, [movieId, dispatch]);

  if (status === "loading") return <Spinner />;
  return (
    <section className="movie-section">
      <img
        src={`https://image.tmdb.org/t/p/w400/${movie?.poster_path}`}
        alt="movie poster"
        className="movie-poster"
      />
      <div className="movie-info">
        <div className="movie-title">
          {movie?.original_title}{" "}
          <span className="movie-rating">({movie?.vote_average})</span>
        </div>
        <div className="movie-subtitle">
          {movie?.release_date.split("-")[0]} | {movie?.runtime + "mins"} |{" "}
          {movie?.crew?.[0]?.name}
        </div>
        {/* //TODO loop and slice at 2 */}
        <div className="movie-cast">
          {movie?.cast.slice(0, 2).map((cast, index) => (
            <span key={`cast-${index}`}>
              {cast.name}
              {index < 1 && " | "}
            </span>
          ))}
          {movie && movie.cast.length > 2 && <span>...</span>}
        </div>
        <div className="movie-desc">
          <span>Description: &nbsp;</span>
          {movie?.overview}
        </div>
      </div>
    </section>
  );
};

export default Movie;
