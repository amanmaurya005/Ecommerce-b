import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import instance from "../axiosConfig";
import { useAuth } from "../contexts/AuthProvider";
import { GoogleLogin } from "@react-oauth/google";
import { FiEye, FiEyeOff } from "react-icons/fi";


function Login() {
  const navigate = useNavigate();
  const { setIsLoggedIn, checkIsLoggedIn, showPassword, setShowPassword } = useAuth();

  const [data, setData] = useState({
    email: "",
    password: "",
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  }


  async function handleGoogleSuccess(credentialResponse) {
    console.log(credentialResponse);
    
    try {
      await instance.post("/user/google-login", {
        token: credentialResponse.credential,
      });

      alert("Google login successful");
      setIsLoggedIn(true);
      navigate("/");
    } catch (error) {
      console.error(error);
      alert("Google login failed");
    }
  }

  function handleGoogleError() {
    alert("Google Login Failed");
  }

  useEffect(() => {
  const params = new URLSearchParams(window.location.search);
  if (params.get("github") === "success") {
    setIsLoggedIn(true);
    navigate("/");
  }
}, []);


  function handleGithubLogin() {
    window.location.href = "http://localhost:3000/user/github";
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      await instance.post(
        "/user/login",
        data,
        { withCredentials: true }
      );

      checkIsLoggedIn();

      const params = new URLSearchParams(window.location.search);
      if (params.size > 0) {
        for (const [key, value] of params.entries()) {
          if (key === "nextPage") navigate(value);
        }
      } else {
        navigate("/");
      }
    } catch (error) {
      console.error("login error", error);
      alert("Invalid email or password");
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">

        {/* Heading */}
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Login to Your Account
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Email
            </label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={data.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border rounded-lg text-sm outline-none border-gray-900 focus:ring-2 focus:ring-gray-900 focus:border-gray-900"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Enter your password"
                value={data.password}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border rounded-lg text-sm outline-none border-gray-900 focus:ring-2 focus:ring-gray-900 focus:border-gray-900"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                {showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
              </button>
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-gray-600 text-white py-3 rounded-lg font-medium hover:bg-gray-700 transition"
          >
            Login
          </button>

          {/* Google Login */}
          <div className="flex justify-center">
            <GoogleLogin
              onSuccess={handleGoogleSuccess}
              onError={handleGoogleError}
            />
          </div>

          {/* GitHub Login */}
          <button
            type="button"
            onClick={handleGithubLogin}
            className="w-full border border-gray-300 py-3 rounded-lg text-sm font-medium hover:bg-gray-100 transition"
          >
            Continue with GitHub
          </button>

          {/* Register */}
          <p className="text-center text-sm text-gray-600">
            Don&apos;t have an account?{" "}
            <Link
              to="/register"
              className="text-indigo-600 hover:underline font-medium"
            >
              Register
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;
