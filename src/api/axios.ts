import axios from "axios";
import { MovieListProps } from "../types";

export const axiosBase = axios.create({
  baseURL: "https://api.themoviedb.org",
  headers: {
    "Content-type": "application/json",
  },
});

export async function getTrendingMovieData(page: number = 1) {
  try {
    console.log("🚀 ~ getTrendingMovieData:");
    const res = await axiosBase.get<MovieListProps>(`/3/movie/upcoming`, {
      params: {
        api_key: import.meta.env.VITE_MOVIE_DB_TOKEN,
        page: page,
      },
    });
    return res?.data?.results;
  } catch (err) {
    console.log(err);
  }
}

export async function searchMovie(query: string) {
  console.log("Searching");
  try {
    const res = await axiosBase.get("/3/search/movie", {
      params: {
        api_key: import.meta.env.VITE_MOVIE_DB_TOKEN,
        query,
      },
    });
    return res;
  } catch (err) {
    console.log(err);
  }
}

export async function fetchSingleMovie(movieId: string) {
  axiosBase.get(`https://api.themoviedb.org/3/movie/${movieId}`);
  try {
    const res = await axiosBase.get("/3/movie", {
      params: {
        api_key: import.meta.env.VITE_MOVIE_DB_TOKEN,
      },
    });
    return res;
  } catch (err) {
    console.log(err);
  }
}
