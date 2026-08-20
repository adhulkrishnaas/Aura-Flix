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

  const name = useRef(null);
  const email = useRef(null);
  const password = useRef(null);

  const handleButtonClick = () => {
    const emailValue = email.current?.value || "";
    const passwordValue = password.current?.value || "";
    const nameValue = name.current?.value || "";

    const message = checkValidData(emailValue, passwordValue);
    setErrorMessage(message);
    if (message) return;

    if (!isSignInForm) {
      createUserWithEmailAndPassword(auth, emailValue, passwordValue)
        .then((userCredential) => {
          const user = userCredential.user;
          updateProfile(user, {
            displayName: nameValue || "AURA Explorer",
            photoURL: USER_AVATAR,
          })
            .then(() => {})
            .catch((error) => setErrorMessage(error.message));
        })
        .catch((error) => {
          setErrorMessage(`${error.code} - ${error.message}`);
        });
    } else {
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
    <div className="relative min-h-screen bg-slate-950 overflow-hidden text-slate-100 flex flex-col justify-between selection:bg-indigo-500 selection:text-white">
      {/* Header Overlay */}
      <Header />

      {/* Hero Background Layer with Dark Vignette */}
      <div className="absolute inset-0 z-0">
        <img
          src={LOGIN_BG_IMG_URL}
          alt="Cinema Background"
          className="w-full h-full object-cover scale-105 filter brightness-[0.35] contrast-125"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-slate-950/40" />
      </div>

      {/* Ambient Glowing Background Orbs */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-600/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/2 left-1/3 w-80 h-80 bg-purple-600/15 rounded-full blur-[100px] pointer-events-none" />

      {/* Ultra Glassmorphic Form Card Wrapper */}
      <div className="relative z-10 my-auto py-12 px-4 flex justify-center items-center">
        {/* Glowing Gradient Border Container */}
        <div className="w-full max-w-md p-[1px] rounded-3xl bg-gradient-to-b from-white/20 via-indigo-500/20 to-white/5 shadow-2xl shadow-indigo-950/80">
          <form
            onSubmit={(e) => e.preventDefault()}
            className="w-full p-8 md:p-10 rounded-[23px] bg-slate-900/80 backdrop-blur-2xl flex flex-col gap-5"
          >
            {/* Header Pill & Title */}
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 text-[11px] font-semibold uppercase tracking-widest backdrop-blur-md">
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-ping" />
                {isSignInForm ? "Authentication" : "Join AURA Network"}
              </div>
              <h1 className="text-3xl md:text-4xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-100 to-slate-400">
                {isSignInForm ? "Welcome Back" : "Create Account"}
              </h1>
              <p className="text-xs text-slate-400 font-normal leading-relaxed">
                {isSignInForm
                  ? "Enter your details to access your custom streaming portal."
                  : "Sign up to unlock personalized AI-curated recommendation lists."}
              </p>
            </div>

            {/* Input Group */}
            <div className="space-y-4 pt-2">
              {!isSignInForm && (
                <div className="space-y-1">
                  <label className="text-[11px] font-semibold tracking-wider uppercase text-slate-400">
                    Full Name
                  </label>
                  <div className="relative">
                    <input
                      ref={name}
                      type="text"
                      placeholder="Adhul Krishna"
                      className="w-full px-4 py-3.5 pl-11 rounded-xl bg-slate-950/60 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all duration-200 text-sm"
                    />
                    <svg
                      className="w-4 h-4 text-slate-500 absolute left-4 top-1/2 -translate-y-1/2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      />
                    </svg>
                  </div>
                </div>
              )}

              <div className="space-y-1">
                <label className="text-[11px] font-semibold tracking-wider uppercase text-slate-400">
                  Email Address
                </label>
                <div className="relative">
                  <input
                    ref={email}
                    type="text"
                    placeholder="name@domain.com"
                    className="w-full px-4 py-3.5 pl-11 rounded-xl bg-slate-950/60 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all duration-200 text-sm"
                  />
                  <svg
                    className="w-4 h-4 text-slate-500 absolute left-4 top-1/2 -translate-y-1/2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-semibold tracking-wider uppercase text-slate-400">
                  Password
                </label>
                <div className="relative">
                  <input
                    ref={password}
                    type="password"
                    placeholder="••••••••"
                    className="w-full px-4 py-3.5 pl-11 rounded-xl bg-slate-950/60 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all duration-200 text-sm"
                  />
                  <svg
                    className="w-4 h-4 text-slate-500 absolute left-4 top-1/2 -translate-y-1/2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                    />
                  </svg>
                </div>
              </div>
            </div>

            {/* Error Indicator */}
            {errorMessage && (
              <div className="p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/25 text-rose-400 text-xs font-semibold flex items-center gap-2.5 animate-shake">
                <span className="w-2 h-2 rounded-full bg-rose-400 animate-pulse" />
                {errorMessage}
              </div>
            )}

            {/* Glowing Action Button */}
            <button
              onClick={handleButtonClick}
              className="w-full py-3.5 mt-2 rounded-xl bg-gradient-to-r from-indigo-600 via-indigo-500 to-indigo-600 hover:from-indigo-500 hover:to-indigo-400 text-white font-bold text-sm tracking-wide transition-all duration-300 shadow-[0_0_25px_rgba(99,102,241,0.4)] hover:shadow-[0_0_35px_rgba(99,102,241,0.6)] border border-indigo-400/40 cursor-pointer active:scale-[0.98]"
            >
              {isSignInForm ? "Sign In to Workspace" : "Create Account"}
            </button>

            {/* Mode Switcher */}
            <div className="text-center pt-2">
              <p className="text-xs text-slate-400">
                {isSignInForm ? "New to AURA? " : "Already registered? "}
                <button
                  type="button"
                  onClick={toggleSignInForm}
                  className="text-indigo-400 font-semibold hover:text-indigo-300 hover:underline cursor-pointer transition duration-150 ml-1"
                >
                  {isSignInForm ? "Create an account now" : "Sign in here"}
                </button>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
