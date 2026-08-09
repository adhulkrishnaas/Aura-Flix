import Header from "./Header";

const Login = () => {
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
        <h1 className="font-bold text-3xl py-4">Sign In</h1>
        <input
          type="text"
          placeholder="Email Address"
          className="p-2 m-2  my-4 w-full bg-gray-800 rounded-lg"
        ></input>
        <input
          type="password"
          placeholder="Password"
          className="m-2 p-2 my-4 w-full bg-gray-800 rounded-lg"
        ></input>
        <button className="p-4  mx-2 my-6 bg-red-600 w-full rounded-lg">
          Sign In
        </button>
      </form>
    </div>
  );
};

export default Login;
