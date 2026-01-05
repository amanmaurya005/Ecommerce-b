import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiLogOut } from "react-icons/fi";
import { FaShoppingCart, FaUser } from "react-icons/fa";
import instance from "../axiosConfig";
import { useAuth } from "../contexts/AuthProvider";
import { useCart } from "../contexts/CartContext";
import { toast } from "react-toastify";

function Header() {
  const navigate = useNavigate();
  const { isLoggedIn, handleLogout } = useAuth();
  const { cartItems } = useCart();

  async function logoutUser() {
    try {
      await instance.post(
        "/user/logout",
        {},
        { withCredentials: true }
      );

      toast.success("Logged out successfully");
      handleLogout(); // keep auth state clean
      navigate("/login");
    } catch (error) {
      console.error(error);
      toast.error("Logout failed");
    }
  }

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        
        {/* Logo */}
        <Link
          to="/"
          className="text-2xl font-bold text-gray-900 tracking-wide"
        >
          Ecommerce
        </Link>

        {/* Right Icons */}
        <div className="flex items-center space-x-6 text-gray-900">

          {/* Register */}
          {!isLoggedIn && (
            <Link
              to="/register"
              className="flex items-center gap-2 hover:text-gray-600 transition text-sm"
            >
              <FaUser />
              <span>Register</span>
            </Link>
          )}

          {/* Cart */}
          <Link
            to="/cart"
            className="relative flex items-center gap-2 hover:text-gray-600 transition text-sm"
          >
            <FaShoppingCart />
            <span>Cart</span>

            {/* Cart Count */}
            {cartItems.length > 0 && (
              <span className="absolute -top-2 -right-3 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                {cartItems.length}
              </span>
            )}
          </Link>

          {/* Login / Logout */}
          {isLoggedIn ? (
            <button
              onClick={logoutUser}
              className="flex items-center gap-2 text-sm text-red-500 hover:text-red-600 transition"
            >
              Logout <FiLogOut />
            </button>
          ) : (
            <Link
              to="/login"
              className="flex items-center gap-2 hover:text-gray-600 transition text-sm"
            >
              <FaUser />
              <span>Login</span>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
