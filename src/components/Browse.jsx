import React from "react";
import Header from "./Header";
import { useSelector } from "react-redux";
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

  return (
    <div className="relative min-h-screen w-full bg-slate-950 text-white overflow-x-hidden">
      <Header />
      {showGptSearch ? (
        <GptSearch />
      ) : (
        <main className="relative z-10">
          <MainContainer />
          <SecondaryContainer />
        </main>
      )}
    </div>
  );
};

export default Browse;
