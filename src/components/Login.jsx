import { useRef, useState } from "react";
import Header from "./Header";
import { checkValidData } from "../utils/validate";
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

  // Input References
  const name = useRef(null);
  const email = useRef(null);
  const password = useRef(null);

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
    <div className="relative min-h-screen bg-slate-950 overflow-hidden text-slate-100 flex flex-col justify-between">
      {/* Dynamic Header Overlay */}
      <Header />

      {/* Cinematic Background Layer with Dark Vignette */}
      <div className="absolute inset-0 z-0">
        <img
          src={LOGIN_BG_IMG_URL}
          alt="Cinema Background"
          className="w-full h-full object-cover scale-105 filter brightness-45 contrast-125"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/70 to-slate-950/40" />
      </div>

      {/* Glassmorphic Form Card */}
      <div className="relative z-10 my-auto py-12 px-4 flex justify-center items-center">
        <form
          onSubmit={(e) => e.preventDefault()}
          className="w-full max-w-md p-8 md:p-10 rounded-2xl bg-slate-900/65 border border-white/10 backdrop-blur-2xl shadow-2xl shadow-indigo-950/60 flex flex-col gap-5 transition-all duration-300"
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
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-slate-300">
                Full Name
              </label>
              <input
                ref={name}
                type="text"
                placeholder="Adhul Krishna"
                className="w-full px-4 py-3 rounded-xl bg-slate-800/50 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition duration-200 text-sm"
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
              className="w-full px-4 py-3 rounded-xl bg-slate-800/50 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition duration-200 text-sm"
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
              className="w-full px-4 py-3 rounded-xl bg-slate-800/50 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition duration-200 text-sm"
            />
          </div>

          {/* Validation Banner */}
          {errorMessage && (
            <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs font-semibold flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-rose-400 animate-pulse" />
              {errorMessage}
            </div>
          )}

          {/* Action Trigger */}
          <button
            onClick={handleButtonClick}
            className="w-full py-3.5 mt-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-sm transition duration-200 shadow-lg shadow-indigo-600/30 border border-indigo-400/30 cursor-pointer active:scale-[0.98]"
          >
            {isSignInForm ? "Sign In" : "Sign Up"}
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
  );
};

export default Login;
