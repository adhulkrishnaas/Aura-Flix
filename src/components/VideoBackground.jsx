import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import useMovieTrailer from "../hooks/useMovieTrailer";

const VideoBackground = ({ movieId }) => {
  const [isVideoVisible, setIsVideoVisible] = useState(false);
  const trailerVideo = useSelector((store) => store.movies?.trailerVideo);

  // Custom hook to fetch and store trailer key
  useMovieTrailer(movieId);

  useEffect(() => {
    // Reveal video after 3-second blackout delay
    const timer = setTimeout(() => {
      setIsVideoVisible(true);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  if (!trailerVideo?.key) return null;

  return (
    <div className="relative w-screen aspect-video overflow-hidden pointer-events-none bg-slate-950">
      {/* Background YouTube Trailer Embed */}
      <iframe
        className={`w-full h-full scale-135 transform transition-opacity duration-1000 ease-in-out ${
          isVideoVisible ? "opacity-100" : "opacity-0"
        }`}
        src={`https://www.youtube.com/embed/${trailerVideo?.key}?autoplay=1&mute=1&controls=0&loop=1&playlist=${trailerVideo?.key}&showinfo=0&rel=0&iv_load_policy=3&disablekb=1&modestbranding=1`}
        title="Featured Movie Trailer"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      ></iframe>

      {/* AURA Vignette & Gradient Overlays */}
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-r from-slate-950/80 via-transparent to-slate-950/40 pointer-events-none" />
    </div>
  );
};

export default VideoBackground;
