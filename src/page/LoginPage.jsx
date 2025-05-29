import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "@/context/AuthContext";

export default function LoginPage() {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false); // Spinner state

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true); // Start loading

    try {
      const response = await axios.post("https://airepro-solution-server.vercel.app/api/auth/login", {
        email,
        password,
      });

      login(response.data.token); // Set token and trigger user fetch
      navigate("/"); // Redirect to home
    } catch (err) {
      if (err.response && err.response.data.message) {
        setError(err.response.data.message);
      } else {
        setError("Login failed. Please try again.");
      }
    } finally {
      setIsLoading(false); // Stop loading
    }
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center bg-[#041643] flex items-center justify-center"
      style={{ backgroundImage: "url('/login-Bg.png')" }}
    >
      <div className="bg-white/10 backdrop-blur-md p-8 rounded-xl shadow-lg w-[90%] max-w-md">
        <img src="/logo.png" alt="Logo" className="h-14 mx-auto" />
        <h2 className="text-2xl mt-2 font-bold text-center text-white mb-6">
          Welcome Back Airepro Solution
        </h2>

        {error && <p className="text-red-500 text-sm mb-3 text-center">{error}</p>}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-white">
              Email
            </label>
            <input
              id="email"
              type="email"
              className="mt-1 w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="example@mail.com"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-white">
              Password
            </label>
            <input
              id="password"
              type="password"
              className="mt-1 w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="********"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-[#041643] text-white py-2 rounded-md hover:bg-blue-700 transition flex items-center justify-center"
            disabled={isLoading}
          >
            {isLoading ? (
              <span className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
            ) : (
              "Login"
            )}
          </button>
        </form>

        <p className="mt-4 text-center text-sm text-white">
          Don't have an account?{" "}
          <Link to="/register" className="text-blue-300 font-medium hover:underline">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}
