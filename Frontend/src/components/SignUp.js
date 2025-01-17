import React, { useEffect, useState, useContext } from "react";
import logo from "../img/logo.png";
import { useForm } from "react-hook-form";
import "./SignUp.css";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { LoginContext } from "../context/loginContext";

export default function SignUp() {
  const { setUserLogin } = useContext(LoginContext);
  const Navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [userName, setuserName] = useState("");
  const [password, setPassword] = useState("");

  // Toast functions
  const notifyERR = (message) => toast.error(message);
  const notifySUC = (message) => toast.success(message);

  //email and password regex
  // const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  // const passRegex =  /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/;

  const continueWithGoogle = (credentialResponse) => {
    console.log("Google Response:", credentialResponse);
  
    const jwtDetail = jwtDecode(credentialResponse.credential);
    console.log("Decoded JWT:", jwtDetail);
  
    fetch("https://insta-clone-dahi.onrender.com/api/user/googleLogin", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: jwtDetail.name,
        email: jwtDetail.email,
        userName: jwtDetail.given_name || jwtDetail.name,  // 🛠️ Ensure userName is sent
        email_verified: jwtDetail.email_verified,
        clientId: credentialResponse.clientId,
        Photo: jwtDetail.picture,
      }),
    })
    
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          notifyERR(data.error);
        } else {
          notifySUC("Login successful");
          console.log("Token:", data.token);
  
          localStorage.setItem("jwt", data.token);
          localStorage.setItem("user", JSON.stringify(data.user));
  
          setUserLogin(true);
          Navigate("/");
          setTimeout(() => {
            window.location.href = "/"; // ✅ Fallback if Navigate() fails
          }, 500);
        }
      })
      .catch((err) => console.error("Google Login Error:", err));
  };
  

  const postData = () => {
    // if (!emailRegex.test(email)) {
    //   notifyERR("Invalid email format");
    //   return;
    // }
    // else if (!passRegex.test(password)) {
    //   notifyERR("Password must be at least 8 characters long and include uppercase, lowercase, number, and special character.");
    //   return;
    // }

    fetch("https://insta-clone-dahi.onrender.com/api/user/signup", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        email: email,
        userName: userName,
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
      });
  };

  return (
    <div className="signup">
      <div className="signup-container">
        <img src={logo} alt="Logo" className="signup-logo" />
        <h2 className="signup-header">
          Sign up to see photos and videos from your friends.
        </h2>
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
            className="signup-input"
            required
          />
          <input
            type="text"
            name="name"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
            placeholder="Full Name"
            className="signup-input"
            required
          />
          <input
            type="text"
            name="userName"
            value={userName}
            onChange={(e) => {
              setuserName(e.target.value);
            }}
            placeholder="Username"
            className="signup-input"
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
            value={"Sign Up"}
            className="signup-button"
            onClick={() => {
              postData();
            }}
          />
          <hr style={{margin:"5px 0"}} />
          <center>
          <GoogleLogin
            onSuccess={(credentialResponse) => {
              continueWithGoogle(credentialResponse);
            }}
            onError={() => {
              console.log("Login Failed");
            }}
          />
            
          </center>
        </div>
        <p className="signup-terms">
          By signing up, you agree to our <span>Terms</span>,{" "}
          <span>Privacy Policy</span> and <span>Cookies Policy</span>.
        </p>
      </div>

      <div className="login-redirect">
        Have an account?{" "}
        <Link to="/login" className="login-link">
          Log in
        </Link>
      </div>
    </div>
  );
}
