import React, { useRef, useState } from "react";
import openai from "../utils/openai";
import { API_OPTIONS } from "../utils/constant";
import { addGptMovies } from "../utils/gptSlice";
import { useDispatch } from "react-redux";

const GptSearchBar = () => {
  const dispatch = useDispatch();
  const searchText = useRef(null);
  const [isLoading, setIsLoading] = useState(false);

  const quickPrompts = [
    "Mind-bending Sci-Fi thrillers like Inception",
    "Understated 90s indie comedies with dark humor",
    "Atmospheric cyberpunk anime series",
    "Gripping crime dramas based on true events",
  ];

  const searchMovieTMDB = async (movieName) => {
    try {
      const data = await fetch(
        `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(
          movieName,
        )}&include_adult=false&language=en-US&page=1`,
        API_OPTIONS,
      );
      const json = await data.json();
      return json.results;
    } catch (error) {
      console.error("TMDB error:", error);
      return null;
    }
  };

  const handleGptSearchClick = async () => {
    const userQuery = searchText.current?.value;
    if (!userQuery) return;

    setIsLoading(true);

    const gptQuery =
      "Act as a movie recommendation system and suggest some movies for the query: " +
      userQuery +
      ". Only give me names of 7 movies, comma separated like the example result given ahead: Gadar, Sholay, Don, Golmaal, Koi Mil Gaya";

    try {
      const gptResults = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: gptQuery }],
      });

      const gptResponseText = gptResults.choices[0]?.message?.content;
      if (!gptResponseText) {
        setIsLoading(false);
        return;
      }

      const gptMovies = gptResponseText.split(",").map((movie) => movie.trim());
      const promiseArray = gptMovies.map((movie) => searchMovieTMDB(movie));
      const tmdbResults = await Promise.all(promiseArray);

      const cleanGptMoviesList = tmdbResults
        .map((resultArray) => resultArray && [resultArray[0]])
        .filter((movie) => movie !== null && movie !== undefined);

      dispatch(
        addGptMovies({
          movieNames: gptMovies,
          movieResults: cleanGptMoviesList,
        }),
      );
    } catch (error) {
      console.error("GPT search operation failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePromptClick = (prompt) => {
    if (searchText.current) {
      searchText.current.value = prompt;
    }
  };

  return (
    <div className="w-full flex flex-col items-center gap-6">
      {/* AI Header Badge */}
      <div className="flex flex-col items-center text-center gap-3">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 text-xs font-semibold tracking-wider uppercase backdrop-blur-xl shadow-[0_0_15px_rgba(99,102,241,0.2)]">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
          </span>
          AURA Neural Engine
        </div>

        <h1 className="text-3xl md:text-5xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-100 to-indigo-200 drop-shadow-md">
          What are you in the mood for?
        </h1>
        <p className="text-sm md:text-base text-slate-400 max-w-lg font-normal">
          Describe a scene, mood, tone, or specific plot point to get AI
          recommendations.
        </p>
      </div>

      {/* Floating Glassmorphic Search Form */}
      <div className="w-full max-w-3xl p-[1px] rounded-2xl bg-gradient-to-r from-indigo-500/40 via-purple-500/30 to-indigo-500/40 shadow-[0_0_40px_rgba(99,102,241,0.25)] transition-all duration-300">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleGptSearchClick();
          }}
          className="w-full p-2.5 md:p-3 rounded-[15px] bg-slate-900/90 backdrop-blur-2xl flex flex-col sm:flex-row items-center gap-3"
        >
          {/* AI Sparkle Icon */}
          <div className="hidden sm:flex items-center justify-center pl-3 text-indigo-400">
            <svg
              className={`w-6 h-6 ${isLoading ? "animate-spin" : "animate-pulse"}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13 10V3L4 14h7v7l9-11h-7z"
              />
            </svg>
          </div>

          <input
            ref={searchText}
            type="text"
            placeholder="e.g. Retro-futuristic cyberpunk mystery set in Tokyo..."
            className="w-full px-4 py-3 bg-transparent text-white placeholder-slate-500 focus:outline-none text-sm md:text-base"
          />

          <button
            type="submit"
            disabled={isLoading}
            className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-bold text-sm tracking-wide transition-all duration-200 shadow-lg shadow-indigo-600/30 border border-indigo-400/30 cursor-pointer flex items-center justify-center gap-2 shrink-0 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span>{isLoading ? "Analyzing..." : "Analyze"}</span>
            {!isLoading && (
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path
                  d="M5 12h14M12 5l7 7-7 7"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            )}
          </button>
        </form>
      </div>

      {/* Quick Prompt Suggestion Chips */}
      <div className="flex flex-wrap items-center justify-center gap-2 max-w-3xl pt-1">
        <span className="text-xs font-semibold text-slate-500 mr-1">
          Try asking:
        </span>
        {quickPrompts.map((prompt, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => handlePromptClick(prompt)}
            className="px-3.5 py-1.5 rounded-full bg-slate-900/60 hover:bg-indigo-500/15 border border-white/10 hover:border-indigo-500/40 text-slate-300 hover:text-indigo-200 text-xs transition duration-200 backdrop-blur-md cursor-pointer"
          >
            "{prompt}"
          </button>
        ))}
      </div>
    </div>
  );
};

export default GptSearchBar;
