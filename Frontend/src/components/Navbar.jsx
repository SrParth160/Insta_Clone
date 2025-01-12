import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { LoginContext } from "../context/loginContext";
import logo from "../img/logo.png";
import "./Navbar.css";

export default function Navbar({ login }) {
  const { setModalOpen } = useContext(LoginContext);
  const [visible, setVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > lastScrollY) {
        // Scrolling Down - Hide Navbar
        setVisible(false);
      } else {
        // Scrolling Up - Show Navbar
        setVisible(true);
      }
      setLastScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollY]);


  const loginStatus = () => {
    const token = localStorage.getItem("jwt");
    if (login || token) {
      return (
        <>
          <li>
            <Link to="/profile" className="navbar-link">
              <span className="desktop-text">Profile</span>
              <span className="mobile-icon material-icons">person</span>
            </Link>
          </li>
          <li>
            <Link to="/createpost" className="navbar-link">
              <span className="desktop-text">Create Post</span>
              <span className="mobile-icon material-icons">add_box</span>
            </Link>
          </li>
          <li>
            <Link to="/myfollowingpost" className="navbar-link">
              <span className="desktop-text">Following</span>
              <span className="mobile-icon material-icons">favorite</span>
            </Link>
          </li>
          <li>
            <button className="nav-item logout-btn" onClick={() => setModalOpen(true)}>
              <span className="desktop-text">Logout</span>
              <span className="mobile-icon material-icons">logout</span>
            </button>
          </li>
        </>
      );
    } else {
      return (
        <>
          <li>
            <Link to="/signup" className="navbar-link">
              <span className="desktop-text">Sign Up</span>
              <span className="mobile-icon material-icons">person_add</span>
            </Link>
          </li>
          <li>
            <Link to="/login" className="navbar-link">
              <span className="desktop-text">Login</span>
              <span className="mobile-icon material-icons">login</span>
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
          <ul className="navbar-links">{loginStatus()}</ul>
        </div>
      </nav>

      {/* Mobile Top Navbar (Only Logo and Logout) */}
      <nav className="navbar mobile-top-navbar">
        <Link to="/Home" className="navbar-logo">
          <img src={logo} alt="Logo" className="logo" />
        </Link>
        <button className="logout-btn" onClick={() => setModalOpen(true)}>
          <span className="material-icons">logout</span>
        </button>
      </nav>

      {/* Mobile Bottom Navbar */}
      <nav className="navbar mobile-navbar ">
        <ul className="navbar-links">
          <li>
            <Link to="/Home" className="navbar-link">
              <span className="mobile-icon material-icons">home</span>
            </Link>
          </li>
          <li>
            <Link to="/search" className="navbar-link">
              <span className="mobile-icon material-icons">search</span>
            </Link>
          </li>
          <li>
            <Link to="/createpost" className="navbar-link">
              <span className="mobile-icon material-icons">add_box</span>
            </Link>
          </li>
          <li>
            <Link to="/myfollowingpost" className="navbar-link">
              <span className="mobile-icon material-icons">favorite</span>
            </Link>
          </li>
          <li>
            <Link to="/profile" className="navbar-link">
              <span className="mobile-icon material-icons">person</span>
            </Link>
          </li>
        </ul>
      </nav>
      
    </>
    
  );
  
}
