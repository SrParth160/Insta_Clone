import React,{useEffect,useState} from 'react';
import logo from "../img/logo.png";
import "./SignUp.css";
import {Link, useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';


export default function SignUp() {
const [name, setName] = useState("")
const [email, setEmail] = useState("")
const [userName, setuserName] = useState("")
const [password, setPassword] = useState("")

  // Toast functions
  const notifyA = (msg) => toast.error(msg)
  const notifyB = (msg) => toast.success(msg)

const postData = () =>{

  fetch("http://localhost:5000/api/user/signup",{
    method:"post",
    headers:{
      "Content-Type":"application/json"
    },
    body:JSON.stringify({
      name:name,
      email:email,
      userName:userName,
      password:password
    })
  }).then(res=>res.json()).then(data=>{console.log(data);
  })
}

  return (
    <div className="signup">
      <div className="signup-container">
        <img src={logo} alt="Logo" className="signup-logo" />
        <h2 className="signup-header">Sign up to see photos and videos from your friends.</h2>
        <div className="signup-form">
          <input
          id="email"
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
            name="name"
            value={name}
            onChange={(e)=>{setName(e.target.value)}}
            placeholder="Full Name"
            className="signup-input"
            required
          />
          <input
            type="text"
            name="userName"
            value={userName}
            onChange={(e)=>{setuserName(e.target.value)}}
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
          <input type="submit" id="submit-btn" value={"Sign Up"} className="signup-button" onClick={()=>{ postData()}}/>
        </div>
        <p className="signup-terms">
          By signing up, you agree to our <span>Terms</span>, <span>Privacy Policy</span> and <span>Cookies Policy</span>.
        </p>
      </div>
      <div className="login-redirect">
        Have an account? <Link to="/login" className="login-link">Log in</Link>
      </div>
    </div>
  );
}
