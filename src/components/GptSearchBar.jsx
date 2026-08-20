import React, { useRef } from "react";
import openai from "../utils/openai";

const GptSearchBar = () => {
  const searchText = useRef(null);

  const handleGptSearchClick = async () => {
    const gptQuery =
      "Act as a movie recommendation system and suggest some movies for the query:" +
      searchText.current.value +
      ".only give me names of 5 movies, comma seperated like the example result given ahead:Gadar,Sholay,don,golmaal,koi mil gaya";
    const gptResults = await openai.responses.create({
      model: "gpt-3.5-turbo",
      instructions: "You are a movie recommendation assistant",
      input: gptQuery,
    });
    console.log(gptResults.output_text);
  };

  return (
    <div className="pt-[10%] flex justify-center">
      <form
        onSubmit={(e) => e.preventDefault()}
        className=" text-white bg-black opacity-90 w-1/2 grid grid-cols-12 rounded-lg"
      >
        <input
          ref={searchText}
          className="p-4 m-4 col-span-9 border border-white rounded-lg"
          type="text"
          placeholder="What would you like to watch today?"
        />
        <button
          onClick={handleGptSearchClick}
          className="py-2 px-3 m-4 bg-red-700 text-white rounded-lg col-span-3"
        >
          Search
        </button>
      </form>
    </div>
  );
};

export default GptSearchBar;
