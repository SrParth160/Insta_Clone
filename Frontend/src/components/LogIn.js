import React from 'react';
import logo from "../img/logo.png";
import "./Login.css";

export default function Login() {
  return (
    <div className="login">
      <div className="login-container">
        <img src={logo} alt="Logo" className="login-logo" />
        <h2 className="login-header">Log in to your account</h2>
        <form className="login-form">
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="login-input"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="login-input"
            required
          />
          <button type="submit" className="login-button">Log In</button>
        </form>
        <p className="login-forgot">Forgot your password?</p>
      </div>
      <div className="signup-redirect">
        Don't have an account? <a href="/signup" className="signup-link">Sign up</a>
      </div>
    </div>
  );
}
