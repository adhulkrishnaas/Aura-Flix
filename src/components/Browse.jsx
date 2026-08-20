import React, { useEffect } from "react";
import Header from "./Header";
import { API_OPTIONS } from "../utils/constant";
import { useDispatch, useSelector } from "react-redux";
import { addNowPlayingMovies } from "../utils/movieSlice";
import useNowPlayingMovies from "../hooks/useNowPlayingMovies";
import MainContainer from "./MainContainer";
import SecondaryContainer from "./SecondaryContainer";
import usePopularMovies from "../hooks/usePopularMovies.jsx";
import useUpcomingMovies from "../hooks/useUpcomingMovies.jsx";
import useTopratedMovies from "../hooks/useTopratedMovies.jsx";
import GptSearch from "./GptSearch.jsx";

const Browse = () => {
  const showGptSearch = useSelector((store) => store.gpt?.showGptSearch);
  useNowPlayingMovies();
  usePopularMovies();
  useUpcomingMovies();
  useTopratedMovies();
  const openaiKey = import.meta.env.VITE_OPEN_AI_API_KEY;

  return (
    <div>
      <Header />
      {showGptSearch ? (
        <GptSearch />
      ) : (
        <>
          <MainContainer />
          <SecondaryContainer />
        </>
      )}

      {/*
      Main Container
        -VideoBacgground
        -VIdeo titile
      SecondaryContainer
        -MovieList * n
          -Cards*n


      */}
      {console.log("Your secure key loaded successfully:", openaiKey)}
    </div>
  );
};

export default Browse;
