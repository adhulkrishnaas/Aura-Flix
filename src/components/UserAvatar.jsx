import React from "react";

const UserAvatar = ({ className = "w-8 h-8" }) => {
  return (
    <div
      className={`relative flex items-center justify-center ${className} select-none group`}
    >
      {/* Outer Glow Ring */}
      <span className="absolute inset-0 rounded-full bg-gradient-to-tr from-fuchsia-600 via-indigo-500 to-cyan-400 opacity-70 blur-[2px] group-hover:opacity-100 transition-opacity duration-300" />

      {/* Avatar Container */}
      <div className="relative w-full h-full rounded-full bg-slate-950 border border-white/20 flex items-center justify-center overflow-hidden">
        {/* Subtle Background Radial Pattern */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-indigo-900/40 via-slate-950 to-slate-950" />

        {/* User Vector Glyph */}
        <svg
          className="relative z-10 w-1/2 h-1/2 text-indigo-300 group-hover:scale-110 transition-transform duration-300"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z"
            clipRule="evenodd"
          />
        </svg>
      </div>

      {/* Live Status Badge */}
      <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 rounded-full ring-2 ring-slate-950" />
    </div>
  );
};

export default UserAvatar;
