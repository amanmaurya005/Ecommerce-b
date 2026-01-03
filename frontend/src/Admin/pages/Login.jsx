import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import "../App.css";
import instance from "../../axiosConfig";


function AdminLogin() {
  const navigate = useNavigate();

  const [admin, setAdmin] = useState({
    email: "",
    password: "",
  });

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

      console.log("Admin Login Success:", response.data);
      alert("Admin logged in successfully!");

      navigate("/admin/dashboard");
    } catch (error) {
      console.error("Admin Login Error:", error);

      if (error.response) {
        alert(error.response.data.message);
      } else {
        alert("Something went wrong");
      }
    }
  }

  return (
    <div>
      <h2>Admin Login Panel</h2>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Admin Email</label>
          <input
            type="email"
            name="email"
            placeholder="Enter admin email"
            value={admin.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Admin Password</label>
          <input
            type="password"
            name="password"
            placeholder="Enter admin password"
            value={admin.password}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit">Login as Admin</button>

        <br />
        <span id="reg">
          Not an admin? <Link to="/login">User Login</Link>
        </span>
      </form>
    </div>
  );
}

export default AdminLogin;
