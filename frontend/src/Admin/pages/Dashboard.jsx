import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../contexts/AuthProvider";

function AdminDashboard() {
  const { users, fetchUsers } = useAuth();
  const user = users.filter(user => user.role === "user");


  return (
    <div className="min-h-screen flex bg-gray-100">

      {/* Sidebar */}
      <aside className="w-64 bg-gray-900 text-gray-100 flex flex-col">
        <div className="p-6 text-center border-b border-gray-700">
          <h2 className="text-2xl font-bold tracking-wider">ADMIN</h2>
        </div>

        <ul className="flex-1 px-4 py-6 space-y-2">
          <li>
            <Link
              to="/admin/dashboard"
              className="block px-4 py-2 rounded-lg hover:bg-gray-800 transition"
            >
              Dashboard
            </Link>
          </li>

          <li>
            <Link
              to="/admin/userList"
              className="block px-4 py-2 rounded-lg hover:bg-gray-800 transition"
            >
              Users
            </Link>
          </li>

          <li>
            <Link
              to="/admin/products"
              className="block px-4 py-2 rounded-lg hover:bg-gray-800 transition"
            >
              Manage Products
            </Link>
          </li>

          <li>
            <Link
              to="/admin/createCoupon"
              className="block px-4 py-2 rounded-lg hover:bg-gray-800 transition"
            >
              Create Coupon
            </Link>
          </li>
          <li>
            <Link
              to="/admin/addCategory"
              className="block px-4 py-2 rounded-lg hover:bg-gray-800 transition"
            >
              Add Category
            </Link>
          </li>
        </ul>

        <div className="p-4 border-t border-gray-700">
          <button className="w-full py-2 rounded-lg bg-red-600 hover:bg-red-700 transition">
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        {/* Header */}
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800">
            Admin Dashboard
          </h1>
          <p className="text-sm text-gray-500">
            Overview of your store
          </p>
        </header>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          <div className="bg-white rounded-xl shadow p-6">
            <h3 className="text-sm text-gray-500">Total Users</h3>
            <p className="text-2xl font-bold text-gray-800 mt-2"  >{user.length}</p>
          </div>

          <div className="bg-white rounded-xl shadow p-6">
            <h3 className="text-sm text-gray-500">Total Products</h3>
            <p className="text-2xl font-bold text-gray-800 mt-2">-</p>
          </div>

          <div className="bg-white rounded-xl shadow p-6">
            <h3 className="text-sm text-gray-500">Total Orders</h3>
            <p className="text-2xl font-bold text-gray-800 mt-2">-</p>
          </div>

          <div className="bg-white rounded-xl shadow p-6">
            <h3 className="text-sm text-gray-500">Revenue</h3>
            <p className="text-2xl font-bold text-green-600 mt-2">
              -
            </p>
          </div>
        </div>

        {/* Chart Box */}
        <div className="bg-white rounded-xl shadow p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">
            Sales Chart
          </h3>
          <p className="text-sm text-gray-500">
            Chart Component Here (Add Recharts or Chart.js)
          </p>

          <div className="mt-6 h-64 flex items-center justify-center border-2 border-dashed border-gray-300 rounded-lg text-gray-400">
            Chart Area
          </div>
        </div>
      </main>
    </div>
  );
}

export default AdminDashboard;
