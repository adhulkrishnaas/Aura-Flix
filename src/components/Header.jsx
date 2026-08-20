import React from "react";
import { auth } from "../utils/firebase";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { LOGO } from "../utils/constant";
import { toggleGptSearchView } from "../utils/gptSlice";

const Header = () => {
  const user = useSelector((store) => store.user);
  const showGptSearch = useSelector((store) => store.gpt?.showGptSearch);
  const navigate = useNavigate();
  const dispatch = useDispatch();

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
    <header className="fixed top-0 left-0 right-0 z-50 px-4 md:px-6 py-4 transition-all duration-300">
      <div className="max-w-7xl mx-auto bg-slate-900/70 backdrop-blur-2xl rounded-2xl px-5 py-3 flex flex-row items-center justify-between gap-4 shadow-2xl border border-white/10">
        {/* Brand Logo */}
        <div
          className="flex items-center gap-3 cursor-pointer select-none"
          onClick={() => navigate("/browse")}
        >
          {LOGO ? (
            <img
              className="w-28 md:w-36 object-contain"
              src={LOGO}
              alt="logo"
            />
          ) : (
            <span className="text-xl font-black tracking-widest bg-gradient-to-r from-white via-slate-200 to-indigo-300 bg-clip-text text-transparent">
              AURA
            </span>
          )}
        </div>

        {/* Navigation & Controls */}
        <div className="flex items-center gap-3">
          {/* Siri-Inspired AI Trigger Button */}
          <button
            onClick={handleSearchGptClick}
            className={`group relative inline-flex items-center gap-2.5 px-4 py-2 rounded-full text-xs md:text-sm font-semibold transition-all duration-300 overflow-hidden cursor-pointer active:scale-95 border ${
              showGptSearch
                ? "bg-slate-800/80 text-slate-200 border-white/15 hover:bg-slate-700/80 hover:border-white/25"
                : "text-white border-transparent shadow-[0_0_20px_rgba(168,85,247,0.35)]"
            }`}
          >
            {/* Animated Siri/Apple Intelligence Fluid Mesh Gradient background */}
            {!showGptSearch && (
              <>
                <span className="absolute inset-0 bg-gradient-to-r from-fuchsia-600 via-indigo-500 via-cyan-400 to-amber-400 animate-[spin_4s_linear_infinite] opacity-90 blur-[1px] group-hover:scale-110 transition-transform duration-500" />
                <span className="absolute inset-[1.5px] rounded-full bg-slate-950/85 backdrop-blur-md transition-all duration-300 group-hover:bg-slate-950/70" />
              </>
            )}

            {/* Siri Orb / Dynamic Icon */}
            <span className="relative z-10 flex items-center justify-center">
              {showGptSearch ? (
                <svg
                  className="w-4 h-4 fill-current text-slate-400"
                  viewBox="0 0 24 24"
                >
                  <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
                </svg>
              ) : (
                <span className="relative flex h-3.5 w-3.5 items-center justify-center">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-gradient-to-r from-fuchsia-400 to-cyan-300 shadow-[0_0_8px_#38bdf8]" />
                </span>
              )}
            </span>

            {/* Button Text */}
            <span className="relative z-10 tracking-wide">
              {showGptSearch ? "Back to Browse" : "Ask Neural AI"}
            </span>

            {/* Shimmer overlay effect */}
            {!showGptSearch && (
              <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out" />
            )}
          </button>

          {/* User Profile & Sign Out */}
          {user && (
            <div className="flex items-center gap-3 pl-3 border-l border-white/10">
              <img
                className="w-8 h-8 rounded-full object-cover ring-2 ring-indigo-500/40 shadow-inner"
                alt="user-icon"
                src={
                  user?.photoURL ||
                  "https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png"
                }
              />
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
