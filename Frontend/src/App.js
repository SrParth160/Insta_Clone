import React, { createContext, useState } from "react";
import Navbar from "./components/Navbar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./components/Home";
import SignUp from "./components/SignUp";
import LogIn from "./components/LogIn";
import Profile from "./components/Profile";
import CreatePost from "./components/CreatePost";
import { LoginContext } from "./context/loginContext";
import Modal from "./components/Modal";
import UserProfile from "./components/UserProfile";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import MyFolliwngPost from "./components/MyFollowingPost";


function App() {
  const [userLogin, setUserLogin] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  return (
    <BrowserRouter>
      <div className="App">
      <LoginContext.Provider value={{setUserLogin,setModalOpen}}>
        <Navbar Login={userLogin}  />
        <Routes>
          <Route path="/Home" element={<Home/>}></Route>
          <Route path="/signup" element={<SignUp/>}></Route>
          <Route path="/login" element={<LogIn/>}></Route>
          <Route exact path="/profile" element={<Profile/>}></Route>
          <Route path="/createpost" element={<CreatePost/>}></Route>
          <Route path="/profile/:_id" element={<UserProfile/>}></Route>
          <Route path="/followingposts" element={<MyFolliwngPost/>}></Route>


 </Routes>
        <ToastContainer theme="dark"/>
       {modalOpen && <Modal></Modal>}
       </LoginContext.Provider>
      </div>
    </BrowserRouter>
  );
}

export default App;
