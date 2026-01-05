import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import instance from "../../axiosConfig";
import { toast } from "react-toastify";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { useAuth } from "../../contexts/AuthProvider";

function AdminLogin() {
  const navigate = useNavigate();

  const [admin, setAdmin] = useState({
    email: "",
    password: "",
  });
  const {showPassword,setShowPassword}=useAuth();


  function handleChange(e) {
    const { name, value } = e.target;
    setAdmin({ ...admin, [name]: value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const response = await instance.post(
        "/admin/login",
        admin,
        { withCredentials: true }
      );

      toast.success("Admin logged in successfully!");
      navigate("/admin/dashboard");
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Something went wrong"
      );
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
        
        {/* Heading */}
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Admin Login
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          
          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Admin Email
            </label>
            <input
              type="email"
              name="email"
              placeholder="admin@example.com"
              value={admin.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border rounded-lg text-sm outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Admin Password
            </label>

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Enter your password"
                value={admin.password}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 pr-11 border rounded-lg text-sm outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
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
            Login as Admin
          </button>

          {/* Footer */}
          <p className="text-center text-sm text-gray-600">
            Not an admin?{" "}
            <Link
              to="/login"
              className="text-indigo-600 hover:underline font-medium"
            >
              User Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default AdminLogin;
