import React from "react";
import "../App.css";
import { Link } from "react-router-dom";

function AdminDashboard() {
  return (
    <div className="admin-container">

      {/* Sidebar */}
      <aside className="admin-sidebar">
        <h2 className="admin-logo">ADMIN</h2>

        <ul>
          <li><Link to="/admin/dashboard">Dashboard</Link></li>
          <li><Link to="/admin/products">Manage Products</Link></li>
          <li><Link to="/admin/add-products">Add Products</Link></li>
          <li><Link to="/admin/createCoupon">Create Coupon</Link></li>
        </ul>

        <button className="logout-btn">Logout</button>
      </aside>

      {/* Main Dashboard */}
      <main className="admin-main">
        <header className="admin-header">
          <h1>Admin Dashboard</h1>
        </header>

        {/* Stats Cards */}
        <div className="stats-container">
          <div className="stat-card">
            <h3>Total Users</h3>
            <p>120</p>
          </div>

          <div className="stat-card">
            <h3>Total Products</h3>
            <p>56</p>
          </div>

          <div className="stat-card">
            <h3>Total Orders</h3>
            <p>89</p>
          </div>

          <div className="stat-card">
            <h3>Revenue</h3>
            <p>₹72,300</p>
          </div>
        </div>

        {/* Chart Placeholder */}
        <div className="chart-box">
          <h3>Sales Chart</h3>
          <p>Chart Component Here (You can add Recharts or Chart.js later)</p>
        </div>
      </main>
    </div>
  );
}

export default AdminDashboard;
