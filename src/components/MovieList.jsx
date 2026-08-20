import React from "react";
import MovieCard from "./MovieCard";
import { useSelector } from "react-redux";

const MovieList = ({ title, movies }) => {
  if (!movies || movies.length === 0) return null;
  return (
    <div className="px-6 text-white bg-black">
      <div className="className=py-4">
        <h1 className="text-2xl md:text-2xl font-bold py-4">{title}</h1>
      </div>
      <div className="flex overflow-x-scroll no-scrollbar cursor-pointer">
        <div className="flex gap-4">
          {movies.map((movieItem) => {
            const movie = movieItem?.[0] || movieItem;

            if (!movie) return null;

            return <MovieCard key={movie.id} posterPath={movie?.poster_path} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default MovieList;
