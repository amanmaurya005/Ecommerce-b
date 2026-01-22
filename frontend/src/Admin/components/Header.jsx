import React from "react";
import { Link } from "react-router-dom";
import { FiLogOut } from "react-icons/fi";
import { FaUserShield } from "react-icons/fa";

function AdminHeader() {
  return (
    <header className="w-full bg-slate-900 text-white px-6 py-4 flex items-center justify-between shadow-md">
      
      {/* Left - Logo / Title */}
      <div className="flex items-center gap-3">
        <FaUserShield className="text-2xl text-emerald-400" />
        <h1 className="text-xl font-semibold tracking-wide">
          Admin Dashboard
        </h1>
      </div>

      {/* Center - Navigation */}
      <nav className="hidden md:flex gap-6 text-sm font-medium">
        <Link to="/admin" className="hover:text-emerald-400 transition">
          Dashboard
        </Link>
        <Link to="/admin/products" className="hover:text-emerald-400 transition">
          Products
        </Link>
        <Link to="/admin/orders" className="hover:text-emerald-400 transition">
          Orders
        </Link>
        <Link to="/admin/coupons" className="hover:text-emerald-400 transition">
          Coupons
        </Link>
        <Link to="/admin/users" className="hover:text-emerald-400 transition">
          Users
        </Link>
      </nav>

      {/* Right - Admin Info */}
      <div className="flex items-center gap-4">
        <span className="hidden sm:block text-sm text-gray-300">
          Welcome, Admin
        </span>

        <button
          className="flex items-center gap-2 bg-red-500 hover:bg-red-600 px-3 py-1.5 rounded-md text-sm transition"
        >
          <FiLogOut />
          Logout
        </button>
      </div>
    </header>
  );
}

export default AdminHeader;
