import React from "react";

const VideoTitle = ({ title, overview }) => {
  return (
    <div className="w-screen aspect-video pt-[18%] px-8 md:px-16 absolute text-white bg-gradient-to-r from-slate-950 via-slate-950/60 to-transparent z-10 flex flex-col justify-start">
      {/* Glow Tag / Category Accent */}
      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 text-xs font-semibold uppercase tracking-widest mb-4 w-fit backdrop-blur-md">
        <span className="w-2 h-2 rounded-full bg-indigo-400 animate-pulse"></span>
        Featured Selection
      </div>

      <h1 className="text-3xl md:text-6xl font-black tracking-tight max-w-2xl bg-gradient-to-r from-white via-slate-100 to-slate-300 bg-clip-text text-transparent drop-shadow-xl">
        {title}
      </h1>

      <p className="py-4 text-sm md:text-base w-11/12 md:w-1/2 max-w-xl leading-relaxed text-slate-300/90 line-clamp-3 font-normal drop-shadow">
        {overview}
      </p>

      {/* Action Controls */}
      <div className="flex items-center gap-4 pt-2">
        <button className="px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-sm transition-all duration-200 flex items-center gap-2 shadow-lg shadow-indigo-600/30 border border-indigo-400/30 cursor-pointer active:scale-95">
          <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
            <path d="M8 5v14l11-7z" />
          </svg>
          Watch Now
        </button>

        <button className="px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-sm transition-all duration-200 flex items-center gap-2 border border-white/15 backdrop-blur-md cursor-pointer active:scale-95">
          <svg
            className="w-4 h-4 fill-none stroke-current stroke-2"
            viewBox="0 0 24 24"
          >
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="16" x2="12" y2="12" />
            <line x1="12" y1="8" x2="12.01" y2="8" />
          </svg>
          Details
        </button>
      </div>
    </div>
  );
};

export default VideoTitle;
