import React from 'react'
import logo from "../img/logo.png";
import "./Navbar.css";
import {Link} from "react-router-dom"
export default function Navbar() {
  return (
    <div className='navbar'>
        <img src={logo} alt='instagram logo'/>
        <ul>
            <Link to={"/signup"}><li className='nav-menu'>Sign Up</li></Link>
        <Link to={"LogIn"}><li className='nav-menu'>Log in</li></Link>
        <Link to={"Profile"}><li className='nav-menu'>Profile</li></Link>
        </ul>
    </div>
  )
}
