import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import OAuth from "../components/OAuth";
const Signup = () => {
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleChangle = (e) => {
    // const { id, value } = e.target;
    console.log(e.target.value);
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
    // console.log(formData);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      // console.log(data);

      if (data.success === false) {
        setError(data.message);
        setLoading(false);
        return;
      }
      setLoading(false);
      setError(null);
      navigate("/signin");
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };
  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-semibold my-7">Sign Up</h1>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <input
          type="text"
          onChange={handleChangle}
          id="fullName"
          placeholder="Full Name..."
          className="border p-3 rounded-lg focus:outline-none"
        />
        <input
          type="text"
          onChange={handleChangle}
          id="username"
          placeholder="User Name..."
          className="border p-3 rounded-lg focus:outline-none"
        />
        <input
          type="text"
          onChange={handleChangle}
          id="ugr"
          placeholder="UGR..."
          className="border p-3 rounded-lg focus:outline-none"
        />
        <input
          type="text"
          onChange={handleChangle}
          id="department,"
          placeholder="Department..."
          className="border p-3 rounded-lg focus:outline-none"
        />

        <input
          type="email"
          onChange={handleChangle}
          id="email"
          placeholder="Email..."
          className="border p-3 rounded-lg focus:outline-none"
        />
        <input
          type="password"
          onChange={handleChangle}
          id="password"
          placeholder="password..."
          className="border p-3 rounded-lg focus:outline-none"
        />
        <button
          disabled={loading}
          className="bg-slate-500 hover:opacity-95 uppercase text-white p-3 rounded-lg disabled:opacity-80"
        >
          {loading ? "Loading..." : "Sign Up"}
        </button>
        <OAuth />
      </form>
      <div className="flex gap-2 mt-5">
        <p>have an account?</p>
        <Link to="/signin">
          <span className="text-blue-700">Sign in</span>
        </Link>
      </div>
      {error && <p className="text-center text-red-500">{error}</p>}
    </div>
  );
};

export default Signup;
