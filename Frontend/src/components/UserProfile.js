import React, { useEffect, useState } from "react";
import PostDetail from "./PostDetail";
import "./Profile.css";
import { useParams } from "react-router-dom";


export default function UserProfie() {
  var picLink = "https://cdn-icons-png.flaticon.com/128/3177/3177440.png";
  const { _id } = useParams();
  const [isFollow, setIsFollow] = useState(false);
  const [user, setUser] = useState("");
  const [posts, setPosts] = useState([]);
    const [show, setShow] = useState(false)
  
    const toggleDetails = (posts) => {
      if (show) {
        setShow(false);
      } else {
        setShow(true);
        setPosts(posts);
      }
    };

  // to follow user
  const followUser = (_id) => {
    fetch("https://insta-clone-dahi.onrender.com/follow", {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        followId: _id,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        setIsFollow(true);
      });
  };

  // to unfollow user
  const unfollowUser = (_id) => {
    fetch("https://insta-clone-dahi.onrender.com/unfollow", {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        followId: _id,
      }),
    })
      .then((res) => {
        res.json();
      })
      .then((data) => {
        setIsFollow(false);
      });
  };

  useEffect(() => {
    fetch(`https://insta-clone-dahi.onrender.com/user/${_id}`, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    })
      .then((res) => res.json())
      .then((result) => {
        setUser(result.user);
        setPosts(result.post);
        if (
          result.user.followers.includes(
            JSON.parse(localStorage.getItem("user"))._id
          )
        ) {
          setIsFollow(true);
        }
      });
  }, [isFollow]);
  

  

  return (
    <div className="profile">
      {/* Profile frame */}
      <div className="profile-frame">
        {/* profile-pic */}
        <div className="profile-pic">
          <img src={user.Photo ? user.Photo : picLink} alt="" />
        </div>
        {/* profile-data */}
        <div className="pofile-data">
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <h1>{user.name}</h1>
          
          </div>
          <div className="profile-info" style={{ display: "flex" }}>
          <div className="h2C">
              <h2 className="h2Count">{posts? posts.length : "0"}</h2>
              <p> posts</p>
            </div>
            <div className="h2C">
              <h2 className="h2Count">
                {user.followers ? user.followers.length : "0"}
              </h2>
              <p> followers</p>
            </div>
            <div className="h2C">
              <h2 className="h2Count">
                {user.following ? user.following.length : "0"}
              </h2>
              <p> following</p>
            </div>
          </div>
        </div>
        
      </div>
      <center><button
              className="followBtn"
              onClick={() => {
                if (isFollow) {
                  unfollowUser(user._id);
                } else {
                  followUser(user._id);
                }
                
              }}
            >
              {isFollow ? "Unfollow" : "Follow"}
            </button></center>
      
      <hr
        style={{
          width: "90%",

          opacity: "0.8",
          margin: "25px auto",
        }}
      />
      {/* Gallery */}
      <div className="grid">
        {posts.map((pics) => {
          return (
            <div className="box">
            <img 
              key={pics._id}
              src={pics.photo}
              className="grid__photo"
              alt="post"/>
      </div>
           
          );
        })}
      </div>
       
           
    </div>
  );
}