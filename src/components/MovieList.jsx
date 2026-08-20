import React from "react";
import MovieCard from "./MovieCard";

const MovieList = ({ title, movies }) => {
  if (!movies || movies.length === 0) return null;

  return (
    <div className="py-4 pr-4 md:pr-12">
      {/* Category Section Header */}
      <div className="flex items-center gap-3 mb-4">
        <div className="w-1 h-6 bg-indigo-500 rounded-full shadow-[0_0_10px_#6366f1]" />
        <h2 className="text-xl md:text-2xl font-bold tracking-tight text-slate-100 drop-shadow">
          {title}
        </h2>
      </div>

      {/* Horizontal Scroll Container */}
      <div className="flex overflow-x-auto scrollbar-none scroll-smooth pb-4 pt-1 -ml-1 pl-1">
        <div className="flex gap-4 md:gap-6">
          {movies.map((movieItem) => {
            const movie = movieItem?.[0] || movieItem;
            if (!movie?.poster_path) return null;

            return <MovieCard key={movie.id} posterPath={movie.poster_path} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default MovieList;
