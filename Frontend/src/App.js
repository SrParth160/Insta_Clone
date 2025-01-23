import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import "./App.css";
import Home from "./components/Home";
import SignUp from "./components/SignUp";
import LogIn from "./components/LogIn";
import Profile from "./components/Profile";
import CreatePost from "./components/CreatePost";
import { LoginContext } from "./context/loginContext";
import Modal from "./components/Modal";
import UserProfile from "./components/UserProfile";
import MyFollowingPost from "./components/MyFollowingPost";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { GoogleOAuthProvider } from '@react-oauth/google';

function App() {
  const [modalOpen, setModalOpen] = useState(false);
  const [userLogin, setUserLogin] = useState(false);

  return (
    <BrowserRouter>
      <div className="App">
      <GoogleOAuthProvider clientId="631926972352-sjr36o7ojtd70mqsdvb199j5oppotahq.apps.googleusercontent.com">
        <LoginContext.Provider value={{ userLogin, setUserLogin, modalOpen, setModalOpen }}>
          <Navbar Login={userLogin} />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/login" element={<LogIn />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/createpost" element={<CreatePost />} />
            <Route path="/profile/:_id" element={<UserProfile />} />
            <Route path="/myfollowingpost" element={<MyFollowingPost />} />
          </Routes>
          <ToastContainer theme="dark" />
          {modalOpen && <Modal />}
        </LoginContext.Provider>
        </GoogleOAuthProvider>
      </div>
    </BrowserRouter>
  );
}

export default App;
