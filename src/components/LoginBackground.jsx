import React from "react";

const LoginBackground = () => {
  return (
    <div className="fixed inset-0 -z-10 bg-slate-950 overflow-hidden select-none pointer-events-none">
      {/* 1. Dynamic Grid Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b15_1px,transparent_1px),linear-gradient(to_bottom,#1e293b15_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]" />

      {/* 2. Iridescent Ambient Glow Orbs - Promoted to GPU Layer */}
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-fuchsia-600/30 rounded-full blur-[100px] transform-gpu will-change-transform animate-[pulse_8s_ease-in-out_infinite]" />

      <div className="absolute top-1/3 -right-20 w-[30rem] h-[30rem] bg-indigo-600/25 rounded-full blur-[110px] transform-gpu will-change-transform animate-[pulse_10s_ease-in-out_infinite_2s]" />

      <div className="absolute -bottom-40 left-1/3 w-[35rem] h-[35rem] bg-cyan-500/20 rounded-full blur-[120px] transform-gpu will-change-transform animate-[pulse_12s_ease-in-out_infinite_4s]" />

      {/* 3. Central Siri/Aura Rotating Focal Light */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[40rem] h-[40rem] pointer-events-none">
        <div className="w-full h-full bg-gradient-to-tr from-fuchsia-600/15 via-indigo-500/15 to-cyan-400/15 rounded-full blur-[80px] transform-gpu will-change-transform animate-[spin_25s_linear_infinite]" />
      </div>
    </div>
  );
};

export default LoginBackground;
