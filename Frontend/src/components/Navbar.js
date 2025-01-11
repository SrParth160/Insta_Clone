import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { LoginContext } from "../context/loginContext";
import { useNavigate } from "react-router-dom";
import logo from "../img/logo.png";
import "./Navbar.css";

export default function Navbar({ login }) {
  const navigate = useNavigate();
  const { setModalOpen } = useContext(LoginContext);

  const loginStatus = () => {
    const token = localStorage.getItem("jwt");
    if (login || token) {
      return (
        <>
          <li key={"/profile"}>
            <Link to="/profile" className="navbar-link mobile desktop">
              Profile
            </Link>
          </li>
          <li key={"/createpost"} className="create-center">
            <Link to="/createpost" className="navbar-link mobile desktop">
              Create Post
            </Link>
          </li>
          <li key={"/myfollowingpost"}>
            <Link to="/myfollowingpost" className="navbar-link mobile desktop">
              Following
            </Link>
          </li>
          <li key={"logout"}>
            <button className="nav-item logout-btn mobile-top desktop" onClick={() => setModalOpen(true)}>
              Logout
            </button>
          </li>
        </>
      );
    } else {
      return (
        <>
          <li key={"/signup"}>
            <Link to="/signup" className="navbar-link mobile desktop">
              Sign Up
            </Link>
          </li>
          <li key={"/login"}>
            <Link to="/login" className="navbar-link mobile desktop">
              Login
            </Link>
          </li>
        </>
      );
    }
  };

  return (
    <>
      {/* Desktop Navbar */}
      <nav className="navbar desktop-navbar">
        <div className="navbar-container">
          <Link to="/Home" className="navbar-logo">
            <img src={logo} alt="Logo" className="logo" />
          </Link>
          <ul className="navbar-links">
            {loginStatus()}
          </ul>
        </div>
      </nav>

      {/* Mobile Top Navbar - Logo Left, Logout Right */}
      <nav className="navbar mobile-top-navbar">
        <Link to="/Home" className="navbar-logo">
          <img src={logo} alt="Logo" className="logo" />
        </Link>
        <button className="nav-item logout-btn mobile-top" onClick={() => setModalOpen(true)}>
          <span className="material-icons">logout</span>
        </button>
      </nav>

      {/* Mobile Bottom Navbar - Home, Search, Create (Center), Following, Profile */}
      <nav className="navbar mobile-navbar">
        <ul className="navbar-links">
          <li>
            <Link to="/" className="navbar-link">
              <span className="material-icons">home</span>
              <span>Home</span>
            </Link>
          </li>
          <li>
            <Link to="/search" className="navbar-link">
              <span className="material-icons">search</span>
              <span>Search</span>
            </Link>
          </li>
          <li>
            <Link to="/createpost" className="navbar-link">
              <span className="material-icons">add_box</span>
              <span>Create</span>
            </Link>
          </li>
          <li>
            <Link to="/myfollowingpost" className="navbar-link">
              <span className="material-icons">favorite</span>
              <span>Following</span>
            </Link>
          </li>
          <li>
            <Link to="/profile" className="navbar-link">
              <span className="material-icons">person</span>
              <span>Profile</span>
            </Link>
          </li>
        </ul>
      </nav>
    </>
  );
}
