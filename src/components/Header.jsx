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
      .catch((error) => {
        navigate("/error");
      });
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-6 py-4 transition-all duration-300">
      <div className="max-w-7xl mx-auto glass-panel rounded-2xl px-6 py-3 flex flex-col md:flex-row items-center justify-between gap-4 shadow-xl border border-white/10">
        {/* Brand Logo */}
        <div
          className="flex items-center gap-3 cursor-pointer"
          onClick={() => navigate("/browse")}
        >
          {LOGO ? (
            <img
              className="w-32 md:w-36 object-contain"
              src={LOGO}
              alt="logo"
            />
          ) : (
            <span className="text-xl font-extrabold tracking-wider bg-gradient-to-r from-white via-slate-200 to-indigo-300 bg-clip-text text-transparent">
              AURA
            </span>
          )}
        </div>

        {/* User Navigation Controls */}
        <div className="flex items-center gap-3">
          {/* AI Search Toggle CTA */}
          <button
            onClick={handleSearchGptClick}
            className={`px-4 py-2 rounded-xl font-medium text-sm transition-all duration-200 flex items-center gap-2 border ${
              showGptSearch
                ? "bg-slate-800 text-white border-slate-700 hover:bg-slate-700"
                : "bg-indigo-600 hover:bg-indigo-500 text-white border-indigo-400/30 shadow-lg shadow-indigo-600/20"
            }`}
          >
            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
              <path d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z" />
            </svg>
            {showGptSearch ? "Back to Browse" : "AI Search"}
          </button>

          {/* Profile & Sign Out Controls */}
          {user && (
            <div className="flex items-center gap-3 pl-3 border-l border-white/10">
              <img
                className="w-8 h-8 rounded-lg object-cover ring-2 ring-indigo-500/40"
                alt="user-icon"
                src={
                  user?.photoURL ||
                  "https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png"
                }
              />
              <button
                onClick={handleSignOut}
                className="px-3 py-1.5 text-xs font-semibold text-slate-300 hover:text-rose-400 bg-white/5 hover:bg-rose-500/10 border border-white/10 hover:border-rose-500/30 rounded-lg transition-all duration-150"
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
