import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
const Signin = () => {
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleChangle = (e) => {
    // const { id, value } = e.target;
    // console.log(e.target.value);
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
    console.log(formData);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await fetch("/api/auth/signin", {
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
      navigate("/");
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };
  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-semibold my-7">Sign In</h1>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <input
          type="email"
          onChange={handleChangle}
          id="email"
          placeholder="email..."
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
          {loading ? "Loading..." : "Sign in"}
        </button>
      </form>
      <div className="flex gap-2 mt-5">
        <p>Dont have an account?</p>
        <Link to="/signup">
          <span className="text-blue-700">Sign out</span>
        </Link>
      </div>
      {error && <p className="text-center text-red-500">{error}</p>}
    </div>
  );
};

export default Signin;
