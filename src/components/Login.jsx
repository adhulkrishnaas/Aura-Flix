import { useRef, useState } from "react";
import Header from "./Header";
import { checkValidData } from "../utils/validate";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile, // ✅ Added this missing import
} from "firebase/auth";
import { auth } from "../utils/firebase";
import { LOGIN_BG_IMG_URL, USER_AVATAR } from "../utils/constant";

const Login = () => {
  const [isSignInForm, setIsSignInForm] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  // Create refs to read user input values
  const name = useRef(null); // ✅ Added ref for Full Name input
  const email = useRef(null);
  const password = useRef(null);

  const handleButtonClick = () => {
    // Validate form data pattern limits
    const message = checkValidData(email.current.value, password.current.value);
    setErrorMessage(message);
    if (message) return;

    if (!isSignInForm) {
      // 🚀 Sign Up Process
      createUserWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value,
      )
        .then((userCredential) => {
          const user = userCredential.user;

          // ✅ Cleanly update user profile metadata after creation
          updateProfile(user, {
            displayName: name.current.value, // Saves what they typed in the input
            photoURL: "https://githubusercontent.com", // A cool generic placeholder avatar
          })
            .then(() => {
              console.log("Profile updated successfully!");
              // Note: Body.jsx will automatically handle the navigate("/browse") via onAuthStateChanged
            })
            .catch((error) => {
              setErrorMessage(error.message);
            });
        })
        .catch((error) => {
          setErrorMessage(`${error.code} - ${error.message}`);
        });
    } else {
      // 🔐 Sign In Process
      signInWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value,
      )
        .then((userCredential) => {
          console.log("Logged In:", userCredential.user);
        })
        .catch((error) => {
          setErrorMessage(`${error.code} - ${error.message}`);
        });
    }
  };

  const toggleSignInForm = () => {
    setIsSignInForm(!isSignInForm);
  };

  return (
    <div>
      <Header />
      <div className="absolute">
        <img src={LOGIN_BG_IMG_URL} alt="background" />
      </div>
      <form
        onSubmit={(e) => e.preventDefault()}
        className="absolute bg-black/90 w-3/12 my-36 mx-auto right-0 left-0 text-white p-8 rounded-2xl"
      >
        <h1 className="font-bold text-3xl py-4">
          {isSignInForm ? "Sign In" : "Sign Up"}
        </h1>
        {!isSignInForm && (
          <input
            type="text"
            ref={name} // ✅ Linked the name ref here
            placeholder="Full Name"
            className="m-2 p-4 my-4 w-full bg-gray-800 rounded-lg"
          />
        )}
        <input
          type="text"
          ref={email}
          placeholder="Email Address"
          className="p-4 m-2 my-4 w-full bg-gray-800 rounded-lg"
        />
        <input
          type="password"
          ref={password}
          placeholder="Password"
          className="m-2 p-4 my-4 w-full bg-gray-800 rounded-lg"
        />
        <p className="text-red-500 font-bold text-lg ml-3 py-1">
          {errorMessage}
        </p>
        <button
          className="p-4 mx-2 my-6 bg-red-600 w-full rounded-lg font-bold"
          onClick={handleButtonClick}
        >
          {isSignInForm ? "Sign In" : "Sign Up"}
        </button>
        <p className="p-4 ml-2 cursor-pointer" onClick={toggleSignInForm}>
          {isSignInForm
            ? "New to Netflix? Sign Up Now"
            : "Already Registered? Sign In Now"}
        </p>
      </form>
    </div>
  );
};

export default Login;
