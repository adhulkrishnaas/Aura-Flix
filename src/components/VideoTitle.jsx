import React from "react";

const VideoTitle = ({ title, overview }) => {
  return (
    <div className="pt-[20%] px-24 absolute text-white bg-linear-to-r to-blackb w-screen aspect-video">
      <h1 className="text-5xl font-bold">{title}</h1>
      <p className="py-6 text-m w-1/2">{overview}</p>
      <div>
        <button className="bg-gray-500 text-white p-4 px-14 rounded-sm mr-2 ">
          Play
        </button>
        <button className="bg-gray-500 text-white p-4 px-8 rounded-sm">
          More Info
        </button>
      </div>
    </div>
  );
};

export default VideoTitle;
