import { useEffect, useMemo, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import debounce from "lodash.debounce";

import { useAppDispatch, useAppSelector } from "../store/hooks";

import Home from "../assets/icons/home.svg";
import Search from "../assets/icons/search.svg";
import {
  clearSearchResults,
  fetchMoviesByName,
  selectAllMovies,
} from "../store/slices/movieSlice";

const Header = () => {
  const location = useLocation();
  const dispatch = useAppDispatch();

  const [searchTerm, setSearchTerm] = useState("");
  const { searchedMovieResults } = useAppSelector(selectAllMovies);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };
  const debouncedonChange = useMemo(() => debounce(onChange, 500), []);
  useEffect(() => {
    if (searchTerm) dispatch(fetchMoviesByName(searchTerm));
    else if (!searchTerm && Array.isArray(searchedMovieResults))
      dispatch(clearSearchResults());
  }, [searchTerm, dispatch]);

  useEffect(() => {
    return () => {
      debouncedonChange.cancel();
    };
  });

  if (location?.pathname.includes("/movie"))
    return (
      <header className="header">
        <h1 className="header-title">Movie Details</h1>
        <Link to={"/"}>
          <img src={Home} className="home-icon" alt="home" />
        </Link>
      </header>
    );

  return (
    <div className="header">
      <div className="header-input-container">
        <img src={Search} className="search-icon" alt="home" />
        <input
          type="search"
          className="header-input"
          placeholder="Search"
          onChange={debouncedonChange}
        />
      </div>
      <Link to={"/"}>
        <img src={Home} className="home-icon" alt="home" />
      </Link>
    </div>
  );
};

export default Header;
