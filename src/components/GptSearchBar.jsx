import React from "react";

const GptSearchBar = () => {
  return (
    <div className="pt-[10%] flex justify-center">
      <form className=" text-white bg-black w-1/2 grid grid-cols-12 rounded-lg">
        <input
          className="p-4 m-4 col-span-9 border border-white rounded-lg"
          type="text"
          placeholder="What would you like to watch today?"
        />
        <button className="py-2 px-3 m-4 bg-red-700 text-white rounded-lg col-span-3">
          Search
        </button>
      </form>
    </div>
  );
};

export default GptSearchBar;
