import React, { useState, useEffect } from "react";
import { auth } from "../utils/firebase";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toggleGptSearchView } from "../utils/gptSlice";
import UserAvatar from "./UserAvatar";

const Header = () => {
  const user = useSelector((store) => store.user);
  const showGptSearch = useSelector((store) => store.gpt?.showGptSearch);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isScrolled, setIsScrolled] = useState(false);

  // Dynamic header glass elevation on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSearchGptClick = () => {
    dispatch(toggleGptSearchView());
  };

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        navigate("/");
      })
      .catch(() => {
        navigate("/error");
      });
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-3 sm:px-6 py-3 transition-all duration-300">
      <div
        className={`max-w-7xl mx-auto rounded-2xl px-4 sm:px-6 py-2.5 flex flex-row items-center justify-between gap-4 transition-all duration-300 border ${
          isScrolled
            ? "bg-slate-950/85 backdrop-blur-2xl border-white/15 shadow-[0_10px_30px_rgba(0,0,0,0.8)]"
            : "bg-slate-900/60 backdrop-blur-xl border-white/10 shadow-xl"
        }`}
      >
        {/* Brand Logo with Iridescent Aura Orb */}
        <div
          className="flex items-center gap-3 cursor-pointer select-none group"
          onClick={() => navigate("/browse")}
        >
          <div className="relative flex items-center justify-center w-9 h-9">
            <span className="absolute inset-0 rounded-xl bg-gradient-to-tr from-fuchsia-600 via-indigo-500 to-cyan-400 opacity-75 blur-sm group-hover:opacity-100 group-hover:scale-110 transition-all duration-300" />
            <div className="relative w-full h-full rounded-xl bg-slate-950 border border-white/20 flex items-center justify-center overflow-hidden">
              <svg
                className="w-5 h-5 text-indigo-400 group-hover:rotate-12 group-hover:scale-110 transition-all duration-300"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z"
                />
              </svg>
            </div>
          </div>
          <span className="text-xl font-black tracking-widest text-white group-hover:text-indigo-300 transition-colors duration-300">
            AURA
          </span>
        </div>

        {/* Navigation & Controls */}
        <div className="flex items-center gap-3">
          {/* Siri/Apple Intelligence Audio Wave Trigger */}
          <button
            onClick={handleSearchGptClick}
            className={`group relative inline-flex items-center gap-2.5 px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all duration-300 overflow-hidden cursor-pointer active:scale-95 border ${
              showGptSearch
                ? "bg-slate-800/90 text-slate-200 border-indigo-500/40 hover:bg-slate-700/90 hover:border-indigo-400/60 shadow-[0_0_15px_rgba(99,102,241,0.2)]"
                : "text-white border-transparent shadow-[0_0_22px_rgba(168,85,247,0.4)]"
            }`}
          >
            {/* Rotating Siri Mesh Gradient */}
            {!showGptSearch && (
              <>
                <span className="absolute inset-0 bg-gradient-to-r from-fuchsia-600 via-indigo-500 via-cyan-400 to-amber-400 animate-[spin_3.5s_linear_infinite] opacity-90 blur-[1px] group-hover:scale-125 transition-transform duration-500" />
                <span className="absolute inset-[1.5px] rounded-full bg-slate-950/85 backdrop-blur-md transition-all duration-300 group-hover:bg-slate-950/70" />
              </>
            )}

            {/* Dynamic Icon Switcher */}
            <span className="relative z-10 flex items-center justify-center">
              {showGptSearch ? (
                /* Active Siri Audio Wave Indicator */
                <span className="flex items-center gap-0.5 h-3.5">
                  <span className="w-0.5 h-3 bg-indigo-400 rounded-full animate-bounce" />
                  <span className="w-0.5 h-2 bg-fuchsia-400 rounded-full animate-bounce [animation-delay:0.15s]" />
                  <span className="w-0.5 h-3.5 bg-cyan-400 rounded-full animate-bounce [animation-delay:0.3s]" />
                </span>
              ) : (
                /* Pulsing Orb */
                <span className="relative flex h-3.5 w-3.5 items-center justify-center">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-gradient-to-r from-fuchsia-400 to-cyan-300 shadow-[0_0_8px_#38bdf8]" />
                </span>
              )}
            </span>

            {/* Button Label */}
            <span className="relative z-10 tracking-wide">
              {showGptSearch ? "Back to Browse" : "Ask Neural AI"}
            </span>

            {/* Shimmer Sweper */}
            {!showGptSearch && (
              <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out" />
            )}
          </button>

          {/* User Profile & Sign Out */}
          {user && (
            <div className="flex items-center gap-3 pl-3 border-l border-white/10">
              <div className="relative">
                {user?.photoURL ? (
                  <div className="relative">
                    <img
                      className="w-8 h-8 rounded-full object-cover ring-2 ring-indigo-500/40 shadow-inner"
                      alt="user-icon"
                      src={user.photoURL}
                    />
                    <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 rounded-full ring-2 ring-slate-950" />
                  </div>
                ) : (
                  <UserAvatar />
                )}
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 rounded-full ring-2 ring-slate-950" />
              </div>
              <button
                onClick={handleSignOut}
                className="hidden sm:inline-flex px-3 py-1.5 text-xs font-semibold text-slate-300 hover:text-rose-400 bg-white/5 hover:bg-rose-500/10 border border-white/10 hover:border-rose-500/30 rounded-full transition-all duration-150 cursor-pointer"
              >
                Sign Out
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
