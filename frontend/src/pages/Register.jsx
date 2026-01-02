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
    role: "",
  });

  
  

  const navigate = useNavigate();

  function handleChange(e) {
    const { name, value } = e.target;

      if (name === "name") {
    if (!/^[a-zA-Z\s]*$/.test(value)) return;
  }

  // Phone: allow only numbers & max 10 digits
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
    alert(
      "Password must contain at least:\n• 1 number\n• @ symbol"
    );
    return;
  }

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
            maxLength={10}
  inputMode="numeric"
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


      <div>
        <button className="regBtn" type="submit">Register</button> 
        
      </div>

      </form>

     


      <p>
        Already have an account? <Link to="/login">Login</Link>
      </p>
    </div>
  );
}

export default Register;
