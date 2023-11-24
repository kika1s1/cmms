import { Link } from "react-router-dom";
const Signin = () => {
  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-semibold my-7">Sign In</h1>
      <form className="flex flex-col gap-4">
        <input
          type="text"
          id="username"
          placeholder="username..."
          className="border p-3 rounded-lg focus:outline-none"
        />
        <input
          type="email"
          id="email"
          placeholder="email..."
          className="border p-3 rounded-lg focus:outline-none"
        />
        <input
          type="password"
          id="password"
          placeholder="password..."
          className="border p-3 rounded-lg focus:outline-none"
        />
        <button className="bg-slate-500 hover:opacity-95 uppercase text-white p-3 rounded-lg disabled:opacity-80">
          Sign in
        </button>
      </form>
      <div className="flex gap-2 mt-5">
        <p>have an account?</p>
        <Link to="/signin">
          <span className="text-blue-700">Sign In</span>
        </Link>
      </div>
    </div>
  );
};

export default Signin;
