import Layout from "./components/Layout";
import { Routes, Route } from "react-router-dom";
import Movie from "./pages/Movie";
import MovieList from "./pages/MovieList";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<MovieList />} />
        <Route path="/movie/:movieId" element={<Movie />} />
      </Route>
    </Routes>
  );
}

export default App;
