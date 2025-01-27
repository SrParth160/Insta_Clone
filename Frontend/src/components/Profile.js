import React, { useEffect, useState } from "react";
import PostDetail from "./PostDetail";
import "./Profile.css";
import ProfilePic from "./ProfilePic";

export default function Profie() {
  var picLink = "https://cdn-icons-png.flaticon.com/128/3177/3177440.png";
  const [pic, setPic] = useState([]);
  const [show, setShow] = useState(false);
  const [posts, setPosts] = useState([]);
  const [user, setUser] = useState("");
  const [changePic, setChangePic] = useState(false);

  const toggleDetails = (posts) => {
    if (show) {
      setShow(false);
    } else {
      setShow(true);
      setPosts(posts);
    }
  };

  const changeprofile = () => {
    if (changePic) {
      setChangePic(false);
    } else {
      setChangePic(true);
    }
  };

  useEffect(() => {
    fetch(
      `https://insta-clone-dahi.onrender.com/user/${
        JSON.parse(localStorage.getItem("user"))._id
      }`,
      {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("jwt"),
        },
      }
    )
      .then((res) => res.json())
      .then((result) => {
        setPic(result.post);
        setUser(result.user);
      });
  }, []);

  return (
    <div className="profile" style={{ marginTop: "40px" }}>
    {/* Profile frame */}
    <div className="profile-back">
      <div className="profile-frame">
        {/* profile-pic */}
        <div className="profile-pic">
          <img
            onClick={changeprofile}
            src={user.Photo ? user.Photo : picLink}
          />
        </div>
        <center>
      <h2 className="M100">{JSON.parse(localStorage.getItem("user")).name}</h2>
</center>
        {/* profile-data */}
        <div className="pofile-data">
          <div className="profile-info" style={{ display: "flex" }}>
            <div className="h2C">
              <h2 className="h2Count">{pic ? pic.length : "0"}</h2>
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
      </div>
    

      {/* Gallery */}
      <div className="grid">
        {pic.map((pics) => {
          return (
            <div
              className="box"
              key={pics._id}
              onClick={() => toggleDetails(pics)}
            >
              <img className="grid__photo" src={pics.photo} alt="post" />
            </div>
          );
        })}
      </div>

      {show && <PostDetail item={posts} toggleDetails={toggleDetails} />}
      {changePic && <ProfilePic changeprofile={changeprofile} />}
    </div>
  );
}