import React,{useEffect,useState} from 'react';
import logo from "../img/logo.png";
import "./SignUp.css";
// import {Link} from "react-router-dom";



export default function SignUp() {
  const [name, setName] = useState("")
const [email, setEmail] = useState("")
const [username, setUserName] = useState("")
const [password, setPassword] = useState("") 

const postData=()=>{

  

  console.log({
    name,email,username,password
  })
}

  return (
    <div className="signup">
      <div className="signup-container">
        <img src={logo} alt="Logo" className="signup-logo" />
        <h2 className="signup-header">Sign up to see photos and videos from your friends.</h2>
        <form className="signup-form">
          <input
            type="email"
            name="email"
            value={email}
            placeholder="Email"
            onChange={(e)=>{setEmail(e.target.value)}}
            className="signup-input"
            required
          />
          <input
            type="text"
            name="fullName"
            value={name}
            onChange={(e)=>{setName(e.target.value)}}
            placeholder="Full Name"
            className="signup-input"
            required
          />
          <input
            type="text"
            name="username"
            value={username}
            onChange={(e)=>{setUserName(e.target.value)}}
            placeholder="Username"
            className="signup-input"
            required
          />
          <input
            type="password"
            name="password"
            value={password}
            onChange={(e)=>{setPassword(e.target.value)}}
            placeholder="Password"
            className="signup-input"
            required
          />
          <input value={"SignUp"} type="submit"  className="signup-button" onClick={()=>{postData()}}/>
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
