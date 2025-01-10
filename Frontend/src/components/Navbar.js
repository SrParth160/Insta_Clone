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
            <Link to="/profile" className="navbar-link">
              <span className="material-icons">person</span>
              <span className="nav-text">Profile</span>
            </Link>
          </li>
          <li key={"/createpost"}>
            <Link to="/createpost" className="navbar-link">
              <span className="material-icons">add_box</span>
              <span className="nav-text">Create</span>
            </Link>
          </li>
          <li key={"/myfollowingpost"}>
            <Link to="/myfollowingpost" className="navbar-link">
              <span className="material-icons">favorite</span>
              <span className="nav-text">Following</span>
            </Link>
          </li>
          <li key={"logout"}>
            <button className="nav-item logout-btn" onClick={() => setModalOpen(true)}>
              <span className="material-icons">logout</span>
              <span className="nav-text">Logout</span>
            </button>
          </li>
        </>
      );
    } else {
      return (
        <>
          <li key={"/signup"}>
            <Link to="/signup" className="navbar-link">
              <span className="material-icons">person_add</span>
              <span className="nav-text">Sign Up</span>
            </Link>
          </li>
          <li key={"/login"}>
            <Link to="/login" className="navbar-link">
              <span className="material-icons">login</span>
              <span className="nav-text">Log In</span>
            </Link>
          </li>
        </>
      );
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/Home" className="navbar-logo">
          <img src={logo} alt="Logo" className="logo" />
        </Link>
        <ul className="navbar-links">
          <li>
            <Link to="/Home" className="navbar-link">
              <span className="material-icons">home</span>
              <span className="nav-text">Home</span>
            </Link>
          </li>
          <li>
            <Link to="/search" className="navbar-link">
              <span className="material-icons">search</span>
              <span className="nav-text">Search</span>
            </Link>
          </li>
          {loginStatus()}
        </ul>
      </div>
    </nav>
  );
}
