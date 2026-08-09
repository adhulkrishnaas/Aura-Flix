import { useState } from "react";
import Header from "./Header";

const Login = () => {
  const [isSignInForm, setIsSignInForm] = useState(true);
  const toggleSignInForm = () => {
    setIsSignInForm(!isSignInForm);
  };
  return (
    <div>
      <Header />
      <div className="absolute ">
        <img
          className=""
          src="https://assets.nflxext.com/ffe/siteui/vlv3/0ce6c17e-e188-4f13-aaf2-6366e12ba739/web/GB-en-20260803-TRIFECTA-perspective_57dfa914-f47d-4ecb-86e0-1618d416fb6e_large.jpg"
          alt=""
        />
      </div>
      <form className="absolute bg-black/90 w-3/12 my-36 mx-auto right-0 left-0 text-white  p-8 rounded-2xl ">
        <h1 className="font-bold text-3xl py-4">
          {isSignInForm ? "Sign In" : "Sign Up"}
        </h1>
        {!isSignInForm && (
          <input
            type="text"
            placeholder="Full Name"
            className="m-2 p-4 my-4 w-full bg-gray-800 rounded-lg"
          ></input>
        )}
        <input
          type="text"
          placeholder="Email Address"
          className="p-4 m-2  my-4 w-full bg-gray-800 rounded-lg"
        ></input>

        <input
          type="password"
          placeholder="Password"
          className="m-2 p-4 my-4 w-full bg-gray-800 rounded-lg"
        ></input>
        <button className="p-4  mx-2 my-6 bg-red-600 w-full rounded-lg">
          {isSignInForm ? "Sign In" : "Sign Up"}
        </button>
        <p className="p4-4 ml-2 cursor-pointer" onClick={toggleSignInForm}>
          {isSignInForm
            ? "New to Netflix? Sign Up Now"
            : "Already Registered Sign In Now"}
        </p>
      </form>
    </div>
  );
};

export default Login;
