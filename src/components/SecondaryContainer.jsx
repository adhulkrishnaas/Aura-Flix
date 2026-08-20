import React from "react";
import MovieList from "./MovieList";
import { useSelector } from "react-redux";

const SecondaryContainer = () => {
  const movies = useSelector((store) => store.movies);

  if (!movies.nowPlayingMovies) return null;

  return (
    <div className="bg-slate-950 relative z-20 pb-12">
      {/* Dynamic Floating Container over Main Hero */}
      <div className="-mt-16 sm:-mt-28 md:-mt-48 lg:-mt-60 relative z-30 space-y-6 md:space-y-10 pl-4 md:pl-12">
        <MovieList title={"Now Playing"} movies={movies.nowPlayingMovies} />
        <MovieList title={"Top Rated"} movies={movies.topratedMovies} />
        <MovieList title={"Popular"} movies={movies.popularMovies} />
        <MovieList title={"Upcoming"} movies={movies.upcomingMovies} />
      </div>

      {/* Subtle Ambient Background Glow for AURA Aesthetic */}
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 right-10 w-80 h-80 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />
    </div>
  );
};

export default SecondaryContainer;
