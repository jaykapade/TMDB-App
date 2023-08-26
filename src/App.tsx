import Layout from "./components/Layout";
import { Routes, Route, Navigate } from "react-router-dom";
import Movie from "./pages/Movie";
import MovieList from "./pages/MovieList";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<MovieList />} />
        <Route path="/movie/:movieId" element={<Movie />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Route>
    </Routes>
  );
}

export default App;
