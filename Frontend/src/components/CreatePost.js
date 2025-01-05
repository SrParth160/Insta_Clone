import React, { useState, useEffect } from "react";
import "./CreatePost.css";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function CreatePost() {
  const [body, setBody] = useState("");
  const [image, setImage] = useState("");
  const [url, setUrl] = useState("");
  const notifyERR = (message) => toast.error(message);
  const notifySUC = (message) => toast.success(message);

  const navigate = useNavigate();
  // Toast functions

  useEffect(() => {
    // saving post to mongodb
    if (url) {
    fetch("http://localhost:5000/api/post/createpost", {
        method: "post",
        headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("jwt"),
        },
        body: JSON.stringify({
            body,
            photo: url, // Ensure the key matches the server-side code
        }),
    })
    .then((res) => res.json())
    .then((data) => {
        if (data.error) {
            notifyERR(data.error);
        } else {
            notifySUC("Post created successfully");
        }
    })
    .catch((err) => {
        console.error("Error:", err);
    });
}
}, [url]);

  // posting image to cloudinary

  const postDetails = () => {
    console.log(body, image);
    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", "insta-clone");
    data.append("cloud_name", "dnig1wwzx");
    fetch("https://api.cloudinary.com/v1_1/dnig1wwzx/image/upload", {
      method: "post",
      body: data,
    })
      .then((res) => res.json())
      .then((data) => setUrl(data.url))
      .catch((err) => console.log(err));
  };

  const loadfile = (event) => {
    var output = document.getElementById("output");
    output.src = URL.createObjectURL(event.target.files[0]);
    output.onload = function () {
      URL.revokeObjectURL(output.src); // free memory
    };
  };

  return (
    <div className="createPost">
      {/* header */}
      <div className="post-header">
        <h4 style={{ margin: "3px auto" }}>Create New Post</h4>
        <button
          id="post-btn"
          onClick={() => {
            postDetails();
          }}
        >
          Share
        </button>
      </div>
      {/* image preview */}
      <div className="main-div">
        <img
          id="output"
          src="https://static.thenounproject.com/png/11204-200.png"
        />
        <input
          type="file"
          accept="image/*"
          onChange={(event) => {
            loadfile(event);
            setImage(event.target.files[0]);
          }}
        />
      </div>
      {/* details  */}
      <div className="details">
        <div className="card-header">
          <div className="card-pic">
            <div className="card-header">
              <div>
                <img
                  src="https://images.unsplash.com/photo-1640960543409-dbe56ccc30e2?q=80&w=2080&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  alt=""
                />
              </div>
              <h5>Ramesh</h5>
            </div>
            <textarea
              value={body}
              onChange={(e) => setBody(e.target.value)}
              type="text"
              placeholder="Write A Caption"
              name=""
              id=""
            ></textarea>
          </div>
        </div>
      </div>
    </div>
  );
}
