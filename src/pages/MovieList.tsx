import { useState, useEffect } from "react";
import MovieItem from "../components/MovieItem";
import { getTrendingMovieData } from "../api/axios";
import { MovieProps } from "../types";

const MovieList = () => {
  const [movieData, setMovieData] = useState<MovieProps[]>([]);

  useEffect(() => {
    getTrendingMovieData().then((res) => {
      console.log("🚀 ~ res:", res);
      setMovieData(res ?? []);
    });
  }, []);

  return (
    <>
      <div className="movies-list">
        {movieData.map((movie, index) => (
          <MovieItem movie={movie} key={index} />
        ))}
      </div>
    </>
  );
};

export default MovieList;
