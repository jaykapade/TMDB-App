# A Simple Movie App to check and search upcoming Movies

This project was bootstrapped with [Vite](https://vitejs.dev/).
This project uses [The Movie Database (TMDb) API](https://www.themoviedb.org/).

## Available Scripts

In the project directory, you can run:

### `npm run dev`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

## Learn More

You can learn more in the [Vite documentation](https://vitejs.dev/guide/).
To learn React, check out the [React documentation](https://reactjs.org/).

## Features Done

- Search Functionality
- Infinite Scrolling
- Single Movie review Page

## Further Improvements that can be done

- Infinite scrolling search suggestions
- Remove Single Movie Review page api calls if cast details and movie timings are available in a single api

## Note

- [Upcoming Api](https://developer.themoviedb.org/reference/movie-upcoming-list) doesn't have sort functionality. therefore not implemented as sorting in infinite scrolling is causing all data to get sorted.
  -- Can use discover api to get data in sorted order. You can replace fetchMovies code with below code for future movies:

  ```
  // Fetch Movies Coming in next Month
  export const fetchMovies = createAsyncThunk(
  "movies/fetchMovies",
  async (page: number) => {
    const currentDate = new Date();
    const currentDateString = currentDate.toISOString().split("T")[0];
    // One Month ahead
    const futureDate = new Date(
      currentDate.setMonth(currentDate.getMonth() + 1)
    );
    const futureDateString = futureDate.toISOString().split("T")[0];

    const response = await axiosBase.get<MovieListProps>(`/3/discover/movie`, {
      params: {
        api_key: import.meta.env.VITE_MOVIE_DB_TOKEN,
        page: page,
        "primary_release_date.gte": currentDateString,
        "primary_release_date.lte": futureDateString,
        sort_by: "primary_release_date.desc",
        "vote_average.gte": 0,
        "vote_average.lte": 10,
        "vote_count.gte": 0,
      },
    });
    return response?.data;
  }
  );
  ```
