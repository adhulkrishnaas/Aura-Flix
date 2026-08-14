import React from "react";
import { auth } from "../utils/firebase";
import { getAuth, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { LOGO } from "../utils/constant";

const Header = () => {
  const user = useSelector((store) => store.user);
  const navigate = useNavigate();

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        navigate("/");
      })
      .catch((error) => {
        navigate("/error");
      });
  };
  return (
    <div className="absolute  px-10 py-6 z-10 w-full bg-linear-to-b from-black flex justify-between">
      <div>
        <img className="absolute w-50 " src={LOGO} alt="logo" />
      </div>

      <div className="flex p-2">
        <img
          alt="user-icon"
          className="w-10 h-10"
          src="https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png?utm_source=commons.wikimedia.org&utm_campaign=index&utm_content=original"
        />
        <button
          onClick={handleSignOut}
          className="px-3 mx-4 bg-red-600 w-full rounded-lg cursor-pointer font-bold"
        >
          Signout
        </button>
      </div>
    </div>
  );
};

export default Header;
