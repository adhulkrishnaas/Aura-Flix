import React from "react";
import { IMG_CDN } from "../utils/constant";

const MovieCard = ({ posterPath }) => {
  if (!posterPath) return null;

  return (
    <div className="w-36 md:w-48 flex-none group relative transition-all duration-300 ease-out hover:scale-105 hover:-translate-y-1 z-10 hover:z-30 cursor-pointer">
      {/* Outer Glass Container */}
      <div className="relative overflow-hidden rounded-2xl bg-slate-900/60 border border-white/10 group-hover:border-indigo-500/50 shadow-md group-hover:shadow-[0_0_25px_rgba(99,102,241,0.25)] transition-all duration-300">
        {/* Movie Poster Image */}
        <img
          className="w-full h-auto object-cover rounded-2xl transform transition-transform duration-500 group-hover:scale-105"
          alt="Movie Poster"
          src={IMG_CDN + posterPath}
          loading="lazy"
        />

        {/* Hover Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

        {/* Ambient Hover Glow Ring */}
        <div className="absolute -inset-px rounded-2xl border border-indigo-400/0 group-hover:border-indigo-400/40 transition-colors duration-300 pointer-events-none" />
      </div>
    </div>
  );
};

export default MovieCard;
