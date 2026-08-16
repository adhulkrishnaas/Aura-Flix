import React, { useEffect } from "react";
import Header from "./Header";
import { API_OPTIONS } from "../utils/constant";
import { useDispatch } from "react-redux";
import { addNowPlayingMovies } from "../utils/movieSlice";
import useNowPlayingMovies from "../hooks/useNowPlayingMovies";
import MainContainer from "./MainContainer";
import SecondaryContainer from "./SecondaryContainer";
import usePopularMovies from "../hooks/usePopularMovies.jsx";
import useUpcomingMovies from "../hooks/useUpcomingMovies.jsx";
import useTopratedMovies from "../hooks/useTopratedMovies.jsx";

const Browse = () => {
  useNowPlayingMovies();
  usePopularMovies();
  useUpcomingMovies();
  useTopratedMovies();
  return (
    <div>
      <Header />
      <MainContainer />
      <SecondaryContainer />
      {/*
      Main Container
        -VideoBacgground
        -VIdeo titile
      SecondaryContainer
        -MovieList * n
          -Cards*n


      */}
    </div>
  );
};

export default Browse;
