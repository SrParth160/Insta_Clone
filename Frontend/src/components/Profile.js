import React, { useEffect, useState } from "react";
import PostDetail from "./PostDetail";
import "./Profile.css";
// import ProfilePic from "./ProfilePic";

export default function Profile() {
  // var picLink = "https://cdn-icons-png.flaticon.com/128/3177/3177440.png"
  const [pic, setPic] = useState([]);
  const [show, setShow] = useState(false)
  const [posts, setPosts] = useState([]);
  const [user, setUser] = useState("")
  // const [changePic, setChangePic] = useState(false)

  const toggleDetails = (post) => {
    if (show) {
      setShow(false);
      setPosts([]);
    } else {
      setShow(true);
      setPosts(post);
    }
  };

  useEffect(() => {
    fetch("http://localhost:5000/api/post/myposts", {
    // fetch(`http://localhost:5000/api/user/${JSON.parse(localStorage.getItem("user"))._id}`, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result)
        setPic(result);
        // setUser(result.postedBy.userName);
        // console.log(pic);
      });
  }, []);
  return (
    <div className='profile'>
      {/* Profile frame */}
      <div className="profile-frame">
        {/* profile pic */}
        <div className="profile-pic">
          <img src="https://images.unsplash.com/photo-1640960543409-dbe56ccc30e2?q=80&w=2080&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" />
        </div>
        {/* profile data */}
        <div className="profile-data">
          <h1>{JSON.parse(localStorage.getItem("user")).name }</h1>
          <div className="profile-info" >
            <p>{pic.length} post </p>
            <p>40 followers </p>
            <p>40 following </p>

          </div>
        </div>
        
      </div>
    {/* gallery */}
        <div className="gallery">
        {pic.map((pics) => {
          return <img src={pics.photo}
            onClick={() => {
              toggleDetails(pics)
            }}
            className="item" />;
        })}
        {/* <img src="https://images.unsplash.com/photo-1640960543409-dbe56ccc30e2?q=80&w=2080&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" /> */}
        </div>
        {show &&  
        <PostDetail item={posts} toggleDetails={toggleDetails} />}
    </div>
  )
}
