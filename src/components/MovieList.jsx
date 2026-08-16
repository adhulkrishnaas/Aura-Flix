import React from "react";
import MovieCard from "./MovieCard";
import { useSelector } from "react-redux";

const MovieList = ({ title, movies }) => {
  console.log(movies);
  if (!movies || movies.length === 0) return null;
  return (
    <div>
      <div>
        <h1>{title}</h1>
      </div>
      <div className="flex">
        {movies.map((movie) => (
          <MovieCard key={movie.id} posterPath={movie.poster_path} />
        ))}
        <MovieCard posterPath={movies[0].poster_path} />
      </div>
    </div>
  );
};

export default MovieList;
