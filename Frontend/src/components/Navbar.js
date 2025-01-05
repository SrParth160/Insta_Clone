import React from 'react';
import { Link } from "react-router-dom";
import logo from "../img/logo.png";
import "./Navbar.css";

export default function Navbar({login}) {

  const loginStatus = () =>{
  const token = localStorage.getItem("jwt");
    if(login || token){
      return[
        <><li>
          <Link to="/profile" className="navbar-link">Profile</Link>
        </li>
        <li>
          <Link to="/createpost" className="navbar-link">Create Post</Link>
        </li>
        </>
        
      ]
    }
    else{
      return[
        <>
        <li>
          <Link to="/signup" className="navbar-link">Sign Up</Link>
        </li>
        <li>
          <Link to="/login" className="navbar-link">Log In</Link>
        </li>
        </>
      ]
    }
  } 
  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Logo */}
        <Link to="/" className="navbar-logo">
          <img src={logo} alt="Logo" className="logo" />
        </Link>

        {/* Navigation Links */}
        <ul className="navbar-links">
        {loginStatus()}
        </ul>
      </div>
    </nav>
  );
}
