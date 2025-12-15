import React from "react";
import { Link } from "react-router-dom";
import { FaShoppingCart, FaUser, FaSearch } from "react-icons/fa";
import "../App.css";

function Header() {
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

        <Link to="/" className="icon">
          <FaShoppingCart /> <span>Cart</span>
        </Link>
      </div>
    </header>
  );
}

export default Header;
