import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiLogOut } from "react-icons/fi";
import { FaShoppingCart, FaUser, FaSearch } from "react-icons/fa";
import "../App.css";
import instance from "../axiosConfig";
import { useAuth } from "../contexts/AuthProvider";


function Header() {
  const navigate = useNavigate();
  const { isLoggedIn, handleLogout } = useAuth()

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


        <Link to="/register" className="icon">
          <FaUser /> <span>Register</span>
        </Link>

        <Link to="/cart" className="icon">
          <FaShoppingCart /> <span>Cart</span>
        </Link>

        {isLoggedIn ?
          <Link onClick={handleLogout}><span onClick={logoutUser}>
            Logout <FiLogOut />
          </span></Link> :
          <Link to="/login" className="icon">
            <FaUser /> <span>Login</span>
          </Link>
        }




      </div>
    </header>
  );
}

export default Header;
