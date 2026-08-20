import React, { useRef } from "react";
import openai from "../utils/openai";
import { API_OPTIONS } from "../utils/constant";
import { addGptMovies } from "../utils/gptSlice";
import { useDispatch } from "react-redux";

const GptSearchBar = () => {
  const dispatch = useDispatch();
  const searchText = useRef(null);

  // 1. ✅ FIXED: Return json.results (the actual array of movies) instead of the whole payload!
  const searchMovieTMDB = async (movieName) => {
    try {
      const data = await fetch(
        `https://api.themoviedb.org/3/search/movie?query=${movieName}&include_adult=false&language=en-US&page=1`,
        API_OPTIONS,
      );
      const json = await data.json();
      return json.results; // 👈 This needs to be the array of matching movies
    } catch (error) {
      console.error("TMDB error:", error);
      return null;
    }
  };

  const handleGptSearchClick = async () => {
    const userQuery = searchText.current?.value;
    if (!userQuery) return;

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
      if (!gptResponseText) return;

      const gptMovies = gptResponseText.split(",").map((movie) => movie.trim());

      const promiseArray = gptMovies.map((movie) => searchMovieTMDB(movie));
      const tmdbResults = await Promise.all(promiseArray);

      const cleanGptMoviesList = tmdbResults
        .map((resultArray) => resultArray && [resultArray[0]]) // Grabs the best single movie object match
        .filter((movie) => movie !== null && movie !== undefined);

      console.log("Found TMDB Movie Objects:", cleanGptMoviesList);

      // Dispatch the working cleaned data directly to Redux
      dispatch(
        addGptMovies({
          movieNames: gptMovies,
          movieResults: cleanGptMoviesList,
        }),
      );
    } catch (error) {
      console.error("GPT search operation failed:", error);
    }
  };

  return (
    <div className="pt-[10%] flex justify-center">
      <form
        onSubmit={(e) => e.preventDefault()}
        className="text-white bg-black opacity-90 w-1/2 grid grid-cols-12 rounded-lg p-2"
      >
        <input
          ref={searchText}
          className="p-4 m-4 col-span-9 border border-white rounded-lg bg-transparent text-white outline-none"
          type="text"
          placeholder="What would you like to watch today?"
        />
        <button
          type="button"
          onClick={handleGptSearchClick}
          className="py-2 px-3 m-4 bg-red-700 text-white rounded-lg col-span-3 font-bold cursor-pointer"
        >
          Search
        </button>
      </form>
    </div>
  );
};

export default GptSearchBar;
