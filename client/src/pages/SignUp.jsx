import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import OAuth from "../components/OAuth";

export default function SignIn() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  function handleChange(e) {
    setFormData((prevValue) => ({
      ...prevValue,
      [e.target.id]: e.target.value,
    }));
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError(null);

      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (data.success === false) {
        setError(data.message || "Signup failed");
        return;
      }
      navigate("/sign-in");
    } catch (err) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-semibold my-7">Sign Up</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          id="username"
          className="p-3 border rounded-xl border-slate-300"
          type="text"
          placeholder="Enter your name"
          onChange={handleChange}
          value={formData.username}
          required
        />
        <input
          id="email"
          className="p-3 border rounded-xl border-slate-300"
          type="email"
          placeholder="Enter your email"
          onChange={handleChange}
          value={formData.email}
          required
        />
        <input
          id="password"
          className="p-3 border rounded-xl border-slate-300"
          type="password"
          placeholder="Enter your password"
          onChange={handleChange}
          value={formData.password}
          required
        />
        <button
          disabled={loading}
          className="bg-slate-700 text-white p-3 rounded-lg hover:opacity-90"
        >
          {loading ? "Loading..." : "Sign Up"}
        </button>
        <OAuth />
      </form>

      <div className="flex gap-2 mt-5">
        <p>Already have an account?</p>
        <Link to="/sign-in" className="text-blue-700 hover:underline">
          Click Here
        </Link>
      </div>

      {error && <p className="text-red-600 mt-4">{error}</p>}
    </div>
  );
}
