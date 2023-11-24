import { Link } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
const Header = () => {
  return (
    <header className="bg-slate-200 shadow-md">
      <div className="flex justify-between items-center max-w-6xl mx-auto p-3">
        <Link to="/">
          <h1 className="font-bold text-sm sm:text-xl flex flex-wrap">
            <span className="text-slate-500">Club</span>
            <span className="text-slate-700">MMS</span>
          </h1>
        </Link>
        <form className="bg-slate-100 p-3 rounded-lg flex items-center">
          <input
            type="text"
            placeholder="Search..."
            name=""
            id=""
            className="bg-transparent focus:outline-none w-24 sm:w-64"
          />
          <FaSearch className="text-slate-600" />
        </form>
        <ul className="flex justify-between items-center gap-4">
          <li className="hidden sm:inline text-slate-700 hover:underline cursor-pointer">
            <Link to="/">Home</Link>
          </li>
          <li className="hidden sm:inline text-slate-700 hover:underline cursor-pointer">
            <Link to="/about">About</Link>
          </li>
          <li className="hidden sm:inline text-slate-700 hover:underline cursor-pointer">
            <Link to="/signin">Sign in</Link>
          </li>
        </ul>
      </div>
    </header>
  );
};

export default Header;
