import React from "react";
import GptSearchBar from "./GptSearchBar";
import GptMovieSuggestions from "./GptMovieSuggestions";

const GptSearch = () => {
  return (
    <div className="relative min-h-screen w-screen bg-slate-950 overflow-x-hidden text-slate-100 flex flex-col selection:bg-indigo-500 selection:text-white">
      {/* Background Layer: Animated AI Neural Grid & Orbs */}
      <div className="fixed inset-0 -z-20 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.25),rgba(255,255,255,0))]" />

      {/* High-Tech Grid Pattern */}
      <div className="fixed inset-0 -z-10 bg-[linear-gradient(to_right,#1e293b15_1px,transparent_1px),linear-gradient(to_bottom,#1e293b15_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_30%,#000_70%,transparent_100%)]" />

      {/* Floating Glowing Energy Cores */}
      <div className="fixed top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-indigo-600/20 rounded-full blur-[150px] pointer-events-none -z-10 animate-pulse" />
      <div className="fixed top-1/3 right-10 w-96 h-96 bg-purple-600/15 rounded-full blur-[140px] pointer-events-none -z-10" />

      {/* Main Content Workspace */}
      <main className="relative z-10 pt-28 md:pt-36 pb-20 px-4 md:px-12 max-w-6xl mx-auto w-full flex flex-col gap-10">
        <GptSearchBar />
        <GptMovieSuggestions />
      </main>
    </div>
  );
};

export default GptSearch;
