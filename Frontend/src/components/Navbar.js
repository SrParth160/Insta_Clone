import React, { useContext } from 'react';
import { Link } from "react-router-dom";
import logo from "../img/logo.png";
import "./Navbar.css";
import { LoginContext } from "../context/loginContext";
import { useNavigate

 } from 'react-router-dom';

  export default function Navbar({ login }) {
    const navigate = useNavigate();
  const { setModalOpen } = useContext(LoginContext );  
  const loginStatus = () =>{
  const token = localStorage.getItem("jwt");
    if(login || token){
      return[
        <>
        <li key={"/profile"}>
          <Link to="/profile" className="navbar-link">Profile</Link>
        </li>
        <li key={"/createpost"}>
          <Link to="/createpost" className="navbar-link">Create Post</Link>
        </li>
        <li key={"/followingposts"}>
        <Link to="/myfollowingpost" className="navbar-link">
            My Following
          </Link>
        </li>
        <li key={""}>
          <Link to={""} > <button className='primeryBtn' onClick={()=>setModalOpen(true)}>Log Out</button> </Link>
        </li>
        </>
        
      ]
    }
    else{
      return[
        <>
        <li key={"/signup"}>
          <Link to="/signup" className="navbar-link">Sign Up</Link>
        </li>
        <li key={"/login"}>
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
        <Link to="/Home" className="navbar-logo">
          <img src={logo} alt="Logo" className="logo"  />
        </Link>

        {/* Navigation Links */}
        <ul className="navbar-links">
        {loginStatus()}
        </ul>
      </div>
    </nav>
  );
}
