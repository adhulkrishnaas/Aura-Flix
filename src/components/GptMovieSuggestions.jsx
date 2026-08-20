import React from "react";
import { useSelector } from "react-redux";
import MovieCard from "./MovieCard";

const GptMovieSuggestions = () => {
  const gpt = useSelector((store) => store.gpt);
  const { movieResults, movieNames } = gpt;

  if (!movieNames || !movieResults) return null;

  const allMovies = movieResults.flat();

  return (
    <div className="w-full mt-4 flex flex-col gap-6">
      {/* Outer AURA Glassmorphic Container */}
      <div className="w-full p-6 md:p-8 rounded-3xl bg-slate-900/60 border border-white/10 backdrop-blur-2xl shadow-2xl shadow-indigo-950/40 relative overflow-hidden">
        {/* Ambient Glow Accents */}
        <div className="absolute -top-12 -right-12 w-48 h-48 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-12 -left-12 w-48 h-48 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Section Header with AI Indicator */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-6 mb-6 border-b border-white/10 relative z-10">
          <div className="flex items-center gap-3">
            <div className="w-1.5 h-7 bg-gradient-to-b from-indigo-500 to-purple-500 rounded-full shadow-[0_0_12px_rgba(99,102,241,0.6)]" />
            <div>
              <h2 className="text-xl md:text-2xl font-bold tracking-tight text-white flex items-center gap-2">
                AI Recommendations
              </h2>
              <p className="text-xs text-slate-400 font-normal">
                Curated neural search results based on your prompt
              </p>
            </div>
          </div>

          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-semibold self-start sm:self-auto">
            <span className="w-2 h-2 rounded-full bg-indigo-400 animate-pulse" />
            {allMovies.length} Matches Found
          </div>
        </div>

        {/* Dynamic Responsive Movie Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6 justify-items-center w-full relative z-10">
          {allMovies.map((movie) => {
            if (!movie || !movie.poster_path) return null;
            return <MovieCard key={movie.id} posterPath={movie.poster_path} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default GptMovieSuggestions;
