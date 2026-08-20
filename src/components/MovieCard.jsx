import React from "react";
import { IMG_CDN } from "../utils/constant";

const MovieCard = ({ posterPath }) => {
  return (
    <div className="w-48">
      <img alt="movie-card" src={IMG_CDN + posterPath} />
    </div>
  );
};

export default MovieCard;
