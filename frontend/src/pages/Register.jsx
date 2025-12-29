import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "../App.css";
import instance from "../axiosConfig";

function Register() {
  const [data, setData] = useState({
    name: "",
    phone: "",
    username: "",
    email: "",
    password: "",
    role:"",
  });

  const navigate = useNavigate();

  function handleChange(e) {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const response = await instance.post(
        "/user/register",
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log("User Registered:", response.data);
      
        alert("User registration successful!");
        navigate("/login");
    
    } catch (error) {
      console.error("Registration Error:", error);

      // If backend sends custom error message
      if (error.response?.data?.message) {
        alert(error.response.data.message);
      } else {
        alert("Registration failed. Check console for details.");
      }
    }
  }

  return (
    <div>
      <h2>Register To Our E-commerce</h2>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Name</label>
          <input
            type="text"
            placeholder="Enter your name"
            name="name"
            value={data.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Phone</label>
          <input
            type="tel"
            placeholder="Enter phone number"
            name="phone"
            value={data.phone}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Username</label>
          <input
            type="text"
            placeholder="Enter username"
            name="username"
            value={data.username}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            placeholder="Enter email"
            name="email"
            value={data.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            placeholder="Enter password"
            name="password"
            value={data.password}
            onChange={handleChange}
            required
          />
        </div>

       

        <button type="submit">Register</button>
      </form>

      <p>
        Already have an account? <Link to="/login">Login</Link>
      </p>
    </div>
  );
}

export default Register;
