import React from "react";
import { auth } from "../utils/firebase";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { LOGO } from "../utils/constant";
import { toggleGptSearchView } from "../utils/gptSlice";

const Header = () => {
  const user = useSelector((store) => store.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSearchGptClick = () => {
    //Toggle Gpt Search page
    dispatch(toggleGptSearchView());
  };

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        navigate("/");
      })
      .catch((error) => {
        navigate("/error");
      });
  };

  return (
    <div className="absolute top-0 left-0 px-10 py-6 z-30 w-full bg-gradient-to-b from-black/80 flex justify-between items-center">
      <div>
        <img className="w-40 md:w-50" src={LOGO} alt="logo" />
      </div>

      <div className="flex p-2 items-center">
        <button
          onClick={handleSearchGptClick}
          className="px-4 py-2 mx-4 bg-gray-800 text-white rounded-md cursor-pointer font-bold hover:bg-red-700 transition duration-200"
        >
          Gpt Search
        </button>
        <img
          alt="user-icon"
          className="w-10 h-10 rounded-md"
          src={
            user?.photoURL ||
            "https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png"
          }
        />

        {user && (
          <button
            onClick={handleSignOut}
            className="px-4 py-2 mx-4 bg-red-600 text-white rounded-md cursor-pointer  hover:bg-red-700 transition duration-200"
          >
            Sign Out
          </button>
        )}
      </div>
    </div>
  );
};

export default Header;
