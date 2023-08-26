import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { CreditsProps, MovieListProps, MovieProps } from "../../types";
import { RootState } from "..";

type InitialStateProps = {
  status: "idle" | "loading" | "done" | "failed";
  movies: MovieProps[];
  page: number;
  totalMovies: number;
  error: { message: string } | null;
  selectedMovie?: MovieProps & CreditsProps;
  searchedMovieResults: MovieProps[] | undefined;
};

const initialState: InitialStateProps = {
  movies: [],
  page: 1,
  status: "idle", //'idle' | 'loading' | 'done' | 'failed'
  error: null,
  totalMovies: Infinity,
  searchedMovieResults: undefined,
};

// Export for Future axios calls
export const axiosBase = axios.create({
  baseURL: "https://api.themoviedb.org",
  headers: {
    "Content-type": "application/json",
  },
});

// Fetch Upcoming Movies
export const fetchMovies = createAsyncThunk(
  "movies/fetchMovies",
  async (page: number) => {
    const response = await axiosBase.get<MovieListProps>(`/3/movie/upcoming`, {
      params: {
        api_key: import.meta.env.VITE_MOVIE_DB_TOKEN,
        page: page,
      },
    });
    return response?.data;
  }
);
// Fetch Single Movie By Id
export const fetchMovieById = createAsyncThunk(
  "movies/fetchMovieById",
  async (
    movieId: string
    // { getState }
  ) => {
    //! Used to get movie data from store, but no movie time is available so have to call api again
    // const state = getState() as RootState;
    // const movie = getMovieById(state, Number(movieId));

    const creditsResponse = await axiosBase.get<CreditsProps>(
      `/3/movie/${movieId}/credits`,
      {
        params: {
          api_key: import.meta.env.VITE_MOVIE_DB_TOKEN,
        },
      }
    );
    // if (movie?.id) {
    //   return {
    //     ...movie,
    //     ...creditsResponse?.data,
    //   };
    // }
    const movieResponse = await axiosBase.get<MovieProps>(
      `/3/movie/${movieId}`,
      {
        params: {
          api_key: import.meta.env.VITE_MOVIE_DB_TOKEN,
        },
      }
    );

    return {
      ...movieResponse?.data,
      ...creditsResponse?.data,
    };
  }
);
// Search
export const fetchMoviesByName = createAsyncThunk(
  "movies/fetchMoviesByName",
  async (
    query: string
    // { getState }
  ) => {
    const res = await axiosBase.get<MovieListProps>("/3/search/movie", {
      params: {
        api_key: import.meta.env.VITE_MOVIE_DB_TOKEN,
        query,
      },
    });
    return res?.data;
  }
);

const moviesSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {
    clearSearchResults(state) {
      state.searchedMovieResults = undefined;
    },
  },
  extraReducers(builder) {
    builder.addCase(fetchMovies.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(fetchMovies.fulfilled, (state, action) => {
      state.status = "done";
      state.page = state.page + 1;
      state.totalMovies = action.payload.total_results;
      state.movies = state.movies.concat(action.payload?.results);
    });
    builder.addCase(fetchMovieById.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(fetchMovieById.fulfilled, (state, action) => {
      state.status = "done";
      state.selectedMovie = action.payload;
    });
    builder.addCase(fetchMoviesByName.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(fetchMoviesByName.fulfilled, (state, action) => {
      state.status = "done";
      state.searchedMovieResults = action.payload.results;
    });
  },
});

// Selectors
export const selectAllMovies = (state: RootState) => state.movies;
export const selectedMovie = (state: RootState) => {
  return {
    movie: state.movies.selectedMovie,
    status: state.movies.status,
  };
};

// Getters
export const getMovieById = (state: RootState, movieId: number) => {
  return state.movies.movies.find((movie) => movie.id === movieId);
};
// Actions
export const { clearSearchResults } = moviesSlice.actions;

// Reducers
export default moviesSlice.reducer;
