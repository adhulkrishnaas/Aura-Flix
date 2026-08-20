import React from "react";
import { useSelector } from "react-redux";
import MovieCard from "./MovieCard"; // ✅ 1. Import your MovieCard component directly

const GptMovieSuggestions = () => {
  const gpt = useSelector((store) => store.gpt);
  const { movieResults, movieNames } = gpt;

  if (!movieNames || !movieResults) return null;

  const allMovies = movieResults.flat();

  return (
    <div className="mx-4 md:mx-12 my-6 p-6 text-white bg-black/80 backdrop-blur-md rounded-2xl shadow-2xl border border-white/10">
      <div className="pb-3 border-b border-white/10 mb-6">
        <h2 className="text-xl font-medium text-gray-400">
          AI Suggested Movie Matches
        </h2>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 justify-items-center w-full">
        {allMovies.map((movie) => {
          if (!movie || !movie.poster_path) return null;
          return <MovieCard key={movie.id} posterPath={movie.poster_path} />;
        })}
      </div>
    </div>
  );
};

export default GptMovieSuggestions;
