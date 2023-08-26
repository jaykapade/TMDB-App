import { useEffect } from "react";
import MovieItem from "../components/MovieItem";
import InfiniteScroll from "react-infinite-scroll-component";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { fetchMovies, selectAllMovies } from "../store/slices/movieSlice";
import Spinner from "../components/Spinner";

const MovieList = () => {
  const { movies, status, page, totalMovies, searchedMovieResults } =
    useAppSelector(selectAllMovies);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!movies.length) dispatch(fetchMovies(1));
  }, [dispatch]);

  if (status === "loading" && !movies.length) {
    return <Spinner />;
  }

  if (searchedMovieResults !== undefined) {
    if (searchedMovieResults?.length)
      return (
        <div className="movies-list">
          {searchedMovieResults.map((movie, index) => (
            <MovieItem movie={movie} key={index} />
          ))}
        </div>
      );
    else <div>No Results Found!</div>;
  }

  return (
    <>
      <InfiniteScroll
        dataLength={movies.length}
        next={() => dispatch(fetchMovies(page + 1))}
        hasMore={movies.length < totalMovies}
        loader={"Loading..."}
        height={window.innerHeight - 64}
      >
        <div className="movies-list">
          {movies.map((movie, index) => (
            <MovieItem movie={movie} key={index} />
          ))}
        </div>
      </InfiniteScroll>
    </>
  );
};

export default MovieList;
