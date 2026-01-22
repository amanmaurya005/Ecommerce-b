import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import instance from "../axiosConfig";
import { toast } from "react-toastify";
import { useAuth } from "../contexts/AuthProvider";
import { FiEye, FiEyeOff } from "react-icons/fi";


function Register() {
  const [data, setData] = useState({
    name: "",
    phone: "",
    username: "",
    email: "",
    password: "",
    role: "",
  });
  const { showPassword, setShowPassword } = useAuth();
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [isVerified, setIsVerified] = useState(false);
  const [emailForOtp, setEmailForOtp] = useState("");


  const navigate = useNavigate();

  function handleChange(e) {
    const { name, value } = e.target;

    if (name === "name") {
      if (!/^[a-zA-Z\s]*$/.test(value)) return;
    }

    if (name === "phone") {
      if (!/^\d*$/.test(value)) return;
      if (value.length > 10) return;
    }

    setData({ ...data, [name]: value });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const passwordRegex = /(?=.*\d)(?=.*[@]).+$/;

    if (!passwordRegex.test(data.password)) {
      toast.warning(
        "Password must contain at least:\n• 1 number\n• @ symbol"
      );
      return;
    }

    try {
      await instance.post("/user/register", data, {
        headers: { "Content-Type": "application/json" },
      });
    
     toast.success(data.message || "OTP sent to your email. Please verify.");

      setOtpSent(true);
      setEmailForOtp(data.email);

    } catch (error) {
      console.error("Registration Error:", error);

      if (error.response?.data?.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Registration failed. Check console for details.");
      }
    }
  }

   async function verifyOtpHandler() {
    try {
      const res = await instance.post("/user/verify-otp", {
        email: emailForOtp,
        otp: otp,
      });

      toast.success(res.data.message || "OTP verified successfully");
      setIsVerified(true);

      navigate("/login");
    } catch (error) {
      toast.error(error.response?.data?.message || "OTP verification failed");
    }
  }


  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">

        {/* Heading */}
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Register to Our E-commerce
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">

          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-gray-900 mb-1">
              Name
            </label>
            <input
              type="text"
              placeholder="Enter your name"
              name="name"
              value={data.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border rounded-lg text-sm outline-none border-gray-900 focus:ring-2 focus:ring-gray-900 focus:border-gray-900"
            />
          </div>

          {/* Phone */}
          <div>
            <label className="block text-sm font-medium text-gray-900 mb-1">
              Phone
            </label>
            <input
              type="tel"
              placeholder="Enter phone number"
              name="phone"
              maxLength={10}
              inputMode="numeric"
              value={data.phone}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border rounded-lg text-sm outline-none border-gray-900 focus:ring-2 focus:ring-gray-900 focus:border-gray-900"
            />
          </div>

          {/* Username */}
          <div>
            <label className="block text-sm font-medium text-gray-900 mb-1">
              Username
            </label>
            <input
              type="text"
              placeholder="Enter username"
              name="username"
              value={data.username}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border rounded-lg text-sm outline-none border-gray-900 focus:ring-2 focus:ring-gray-900 focus:border-gray-900"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-900 mb-1">
              Email
            </label>
            <input
              type="email"
              placeholder="Enter email"
              name="email"
              value={data.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border rounded-lg text-sm outline-none border-gray-900 focus:ring-2 focus:ring-gray-900 focus:border-gray-900"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-900 mb-1">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter password"
                name="password"
                value={data.password}
                onChange={handleChange}
                required
                className="w-full px-4 py-3  rounded-lg text-sm outline-none border border-gray-900 focus:ring-2 focus:ring-gray-900 focus:border-gray-900"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                {showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
              </button>
            </div>
            <p className="text-xs text-gray-500 mt-1">
              Must contain at least 1 number and 1 @ symbol
            </p>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={otpSent && !isVerified}
            className={`w-full py-3 rounded-lg font-medium transition ${
              otpSent && !isVerified
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-gray-600 text-white hover:bg-gray-700"
            }`}
          >
            Register
          </button>

            {/* 🔽 OTP SECTION */}
        {otpSent && !isVerified && (
          <div className="mt-6 space-y-4">
            <h3 className="text-center font-medium text-gray-800">
              Enter OTP sent to your email
            </h3>

            <input
              type="text"
              placeholder="Enter 6 digit OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="w-full px-4 py-3 border rounded-lg outline-none border-gray-900 focus:ring-2 focus:ring-gray-900"
            />

            <button
              type="button"
              onClick={verifyOtpHandler}
              className="w-full bg-indigo-600 text-white py-2 rounded-lg font-medium hover:bg-indigo-700 transition"
            >
              Verify OTP
            </button>
          </div>
        )}

        </form>

        {/* Login */}
        <p className="text-center text-sm text-gray-600 mt-6">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-indigo-600 hover:underline font-medium"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Register;
