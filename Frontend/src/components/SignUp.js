import React from 'react';
import logo from "../img/logo.png";
import "./SignUp.css";

export default function SignUp() {
  return (
    <div className="signup">
      <div className="signup-container">
        <img src={logo} alt="Logo" className="signup-logo" />
        <h2 className="signup-header">Sign up to see photos and videos from your friends.</h2>
        <form className="signup-form">
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="signup-input"
            required
          />
          <input
            type="text"
            name="fullName"
            placeholder="Full Name"
            className="signup-input"
            required
          />
          <input
            type="text"
            name="username"
            placeholder="Username"
            className="signup-input"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="signup-input"
            required
          />
          <button type="submit" className="signup-button">Sign Up</button>
        </form>
        <p className="signup-terms">
          By signing up, you agree to our <span>Terms</span>, <span>Privacy Policy</span> and <span>Cookies Policy</span>.
        </p>
      </div>
      <div className="login-redirect">
        Have an account? <a href="/login" className="login-link">Log in</a>
      </div>
    </div>
  );
}
