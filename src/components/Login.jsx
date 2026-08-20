import { useRef, useState } from "react";
import Header from "./Header";
import { checkValidData } from "../utils/validate";
import { motion } from "framer-motion";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth } from "../utils/firebase";
import { LOGIN_BG_IMG_URL, USER_AVATAR } from "../utils/constant";

const Login = () => {
  const [isSignInForm, setIsSignInForm] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // Input References
  const name = useRef(null);
  const email = useRef(null);
  const password = useRef(null);

  // Track cursor coordinates across the form card for spotlight glow
  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const handleButtonClick = () => {
    // Null-safe ref reading
    const emailValue = email.current?.value || "";
    const passwordValue = password.current?.value || "";
    const nameValue = name.current?.value || "";

    // Validate Input Pattern
    const message = checkValidData(emailValue, passwordValue);
    setErrorMessage(message);
    if (message) return;

    if (!isSignInForm) {
      // 🚀 Sign Up Workflow
      createUserWithEmailAndPassword(auth, emailValue, passwordValue)
        .then((userCredential) => {
          const user = userCredential.user;

          updateProfile(user, {
            displayName: nameValue || "AURA Explorer",
            photoURL: USER_AVATAR,
          })
            .then(() => {
              // Body.jsx / onAuthStateChanged handles routing to /browse
            })
            .catch((error) => setErrorMessage(error.message));
        })
        .catch((error) => {
          setErrorMessage(`${error.code} - ${error.message}`);
        });
    } else {
      // 🔐 Sign In Workflow
      signInWithEmailAndPassword(auth, emailValue, passwordValue)
        .then(() => {})
        .catch((error) => {
          setErrorMessage(`${error.code} - ${error.message}`);
        });
    }
  };

  const toggleSignInForm = () => {
    setErrorMessage("");
    setIsSignInForm((prev) => !prev);
  };

  return (
    <div className="relative min-h-screen bg-slate-950 overflow-hidden text-slate-100 flex flex-col justify-between select-none">
      {/* Dynamic Header Overlay */}
      <Header />

      {/* Cinematic Animated Background Layer */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {/* Background Image with Slow Breathing Scale/Pulse */}
        <motion.img
          src={LOGIN_BG_IMG_URL}
          alt="Cinema Background"
          className="w-full h-full object-cover filter brightness-35 contrast-125"
          animate={{
            scale: [1, 1.12, 1],
            x: [0, -10, 0],
            y: [0, -10, 0],
          }}
          transition={{
            duration: 25,
            ease: "easeInOut",
            repeat: Infinity,
            repeatType: "reverse",
          }}
        />

        {/* Ambient Orbiting Color Orbs */}
        <div className="pointer-events-none absolute -top-40 -left-40 h-[600px] w-[600px] animate-[spin_20s_linear_infinite] rounded-full bg-indigo-600/20 blur-[150px]" />
        <div className="pointer-events-none absolute -bottom-40 -right-40 h-[600px] w-[600px] animate-[pulse_8s_ease-in-out_infinite] rounded-full bg-fuchsia-600/15 blur-[150px]" />

        {/* Vignette Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/70 to-slate-950/40" />
      </div>

      {/* Glassmorphic Form Card with Cursor Spotlight */}
      <div className="relative z-10 my-auto py-12 px-4 flex justify-center items-center">
        <div
          onMouseMove={handleMouseMove}
          className="group relative w-full max-w-md overflow-hidden rounded-2xl border border-white/10 bg-slate-900/65 p-8 md:p-10 backdrop-blur-2xl shadow-2xl shadow-indigo-950/60 transition-all duration-500 hover:border-white/20"
        >
          {/* Interactive Cursor Spotlight */}
          <div
            className="pointer-events-none absolute -inset-px opacity-0 transition-opacity duration-300 group-hover:opacity-100"
            style={{
              background: `radial-gradient(600px circle at ${mousePos.x}px ${mousePos.y}px, rgba(99, 102, 241, 0.15), transparent 40%)`,
            }}
          />

          <form
            onSubmit={(e) => e.preventDefault()}
            className="relative z-10 flex flex-col gap-5"
          >
            {/* Header Accent */}
            <div className="space-y-1.5">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-semibold uppercase tracking-widest mb-1 backdrop-blur-md">
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse" />
                {isSignInForm ? "Authentication" : "Join AURA"}
              </div>
              <h1 className="text-3xl font-black tracking-tight text-white">
                {isSignInForm ? "Welcome Back" : "Create Account"}
              </h1>
              <p className="text-xs text-slate-400 font-normal">
                {isSignInForm
                  ? "Sign in to access your curated streaming experience"
                  : "Sign up for next-gen AI movie recommendations"}
              </p>
            </div>

            {/* Form Fields */}
            {!isSignInForm && (
              <div className="flex flex-col gap-1.5 transition-all duration-300">
                <label className="text-xs font-semibold text-slate-300">
                  Full Name
                </label>
                <input
                  ref={name}
                  type="text"
                  placeholder="Adhul Krishna"
                  className="w-full px-4 py-3 rounded-xl bg-slate-800/50 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition duration-200 text-sm"
                />
              </div>
            )}

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-slate-300">
                Email Address
              </label>
              <input
                ref={email}
                type="text"
                placeholder="name@domain.com"
                className="w-full px-4 py-3 rounded-xl bg-slate-800/50 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition duration-200 text-sm"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-slate-300">
                Password
              </label>
              <input
                ref={password}
                type="password"
                placeholder="••••••••"
                className="w-full px-4 py-3 rounded-xl bg-slate-800/50 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition duration-200 text-sm"
              />
            </div>

            {/* Validation Banner */}
            {errorMessage && (
              <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs font-semibold flex items-center gap-2 animate-pulse">
                <span className="w-1.5 h-1.5 rounded-full bg-rose-400" />
                {errorMessage}
              </div>
            )}

            {/* Action Trigger Button with Shimmer */}
            <button
              onClick={handleButtonClick}
              className="group relative mt-2 w-full py-3.5 overflow-hidden rounded-xl bg-gradient-to-r from-indigo-600 via-indigo-500 to-indigo-600 text-white font-semibold text-sm transition-all duration-300 shadow-lg shadow-indigo-600/30 border border-indigo-400/30 cursor-pointer active:scale-[0.98] hover:shadow-indigo-600/50"
            >
              {/* Light Reflection Effect on Hover */}
              <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-1000 ease-in-out group-hover:translate-x-full" />
              <span className="relative z-10 tracking-wide">
                {isSignInForm ? "Sign In" : "Sign Up"}
              </span>
            </button>

            {/* Toggle Form Auth Mode */}
            <p className="text-xs text-center text-slate-400 pt-2">
              {isSignInForm ? "New to AURA? " : "Already registered? "}
              <span
                onClick={toggleSignInForm}
                className="text-indigo-400 font-semibold hover:underline cursor-pointer transition duration-150"
              >
                {isSignInForm ? "Sign up now." : "Sign in."}
              </span>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
