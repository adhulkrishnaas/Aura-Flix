import React from "react";

const VideoTitle = ({ title, overview }) => {
  return (
    <div className="w-screen aspect-video pt-[14%] sm:pt-[16%] md:pt-[18%] px-6 md:px-16 absolute top-0 left-0 text-white bg-gradient-to-r from-slate-950 via-slate-950/70 to-transparent z-10 flex flex-col justify-start">
      <div className="max-w-2xl flex flex-col items-start space-y-3 md:space-y-4">
        {/* Glow Tag / Category Accent */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-400/20 text-indigo-300 text-[10px] sm:text-xs font-semibold tracking-wider uppercase backdrop-blur-md shadow-[0_0_15px_rgba(99,102,241,0.15)]">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
          </span>
          Featured Selection
        </div>

        {/* Dynamic Title */}
        <h1 className="text-2xl sm:text-4xl md:text-6xl font-black tracking-tight text-white leading-tight drop-shadow-[0_10px_20px_rgba(0,0,0,0.8)]">
          <span className="bg-gradient-to-r from-white via-slate-100 to-slate-300 bg-clip-text text-transparent">
            {title}
          </span>
        </h1>

        {/* Overview Paragraph */}
        <p className="text-xs sm:text-sm md:text-base text-slate-300/90 leading-relaxed font-normal max-w-xl line-clamp-2 md:line-clamp-3 drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]">
          {overview}
        </p>

        {/* Action Controls */}
        <div className="flex items-center gap-3 pt-2">
          {/* Primary Action */}
          <button className="group relative px-5 sm:px-6 py-2.5 sm:py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs sm:text-sm transition-all duration-300 flex items-center gap-2 shadow-[0_0_25px_rgba(79,70,229,0.4)] border border-indigo-400/30 cursor-pointer active:scale-95 overflow-hidden">
            <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out" />
            <svg
              className="w-4 h-4 fill-current group-hover:scale-110 transition-transform duration-200"
              viewBox="0 0 24 24"
            >
              <path d="M8 5v14l11-7z" />
            </svg>
            <span className="tracking-wide">Watch Now</span>
          </button>

          {/* Secondary Action */}
          <button className="px-5 sm:px-6 py-2.5 sm:py-3 rounded-xl bg-slate-900/60 hover:bg-slate-800/80 text-slate-200 hover:text-white font-semibold text-xs sm:text-sm transition-all duration-300 flex items-center gap-2 border border-white/15 hover:border-white/30 backdrop-blur-xl cursor-pointer active:scale-95 shadow-lg">
            <svg
              className="w-4 h-4 fill-none stroke-current stroke-[2.2]"
              viewBox="0 0 24 24"
            >
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="16" x2="12" y2="12" />
              <line x1="12" y1="8" x2="12.01" y2="8" />
            </svg>
            <span className="tracking-wide">More Info</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default VideoTitle;
