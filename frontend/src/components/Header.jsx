import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiLogOut } from "react-icons/fi";
import { FaShoppingCart, FaUser, FaSearch } from "react-icons/fa";
import "../App.css";
import instance from "../axiosConfig";


function Header() {
  const navigate = useNavigate();
  async function logoutUser() {
    let response = await instance.post("/user/logout");
    console.log(response)
    console.log(response.data.message)
    navigate("/login")
  }
  return (
    <header className="header">
      <div className="logo">
        <Link to="/">Ecommerce</Link>
      </div>

      <div className="icons">
        <Link to="/login" className="icon">
          <FaUser /> <span>Login</span>
        </Link>

        <Link to="/register" className="icon">
          <FaUser /> <span>Register</span>
        </Link>

        <Link to="/cart" className="icon">
          <FaShoppingCart /> <span>Cart</span>
        </Link>

        <span onClick={logoutUser}>
          <FiLogOut />
        </span>

      </div>
    </header>
  );
}

export default Header;
