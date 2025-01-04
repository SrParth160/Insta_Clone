import React, { useEffect, useState } from "react";
import logo from "../img/logo.png";
import "./Login.css";
import {Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";


export default function Login() {

  const Navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
  
    // Toast functions
    const notifyERR = (message) => toast.error(message);
    const notifySUC = (message) => toast.success(message);
  
    //email and password regex
    // const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    // const passRegex =  /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/;
  
    const postData = () => {
      // if (!emailRegex.test(email)) {
      //   notifyERR("Invalid email format");
      //   return;
      // }
      // else if (!passRegex.test(password)) {
      //   notifyERR("Password must be at least 8 characters long and include uppercase, lowercase, number, and special character.");
      //   return;
      // }
  
      fetch("http://localhost:5000/api/user/login", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.error) {
            notifyERR(data.error);
          } else {
            notifySUC(data.message);
            Navigate("/login");
          }
          console.log(data);
        });
    };

    // login code

  return (
    <div className="login">
      <div className="login-container">
        <img src={logo} alt="Logo" className="login-logo" />
        <h2 className="login-header">Log in to your account</h2>
        <div className="signup-form form">
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            placeholder="Email"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            className="login-input"
            required
          />
          <input
            type="password"
            name="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            placeholder="Password"
            className="signup-input"
            required
          />
        <input
            type="submit"
            id="submit-btn"
            value={"Log in"}
            className="login-button"
            onClick={() => {
              postData();
            }}
          />
        </div>
        <p className="login-forgot">Forgot your password?</p>
      </div>
      <div className="signup-redirect">
        Don't have an account?  <Link to="/signup" className="login-link">
                  Sign Up
                </Link>
      </div>
    </div>
  );
}
