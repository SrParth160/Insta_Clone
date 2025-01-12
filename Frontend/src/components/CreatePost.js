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
      fetch("http://localhost:5000/api/post/createPost", {
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
    <div className="card1" style={{backgroundColor:"#E9EEF1"}}>
      {/* header */}
      <div
        className="card-header"
        style={{ display: "flex", justifyContent: "space-between" }}
      >
        <>
          <h4 style={{ margin: "1px", alignItems: "left" }}>Create New Post</h4>
        </>
        <>
          <button
            class="card__btn"
            id="post-btn"
            onClick={() => {
              postDetails();
            }}
          >
            Post
          </button>
        </>
      </div>
      <div className="card1">
        {/* image preview */}
        <div className="card__hero">
          <img
            id="output"
            src="https://miro.medium.com/v2/resize:fit:250/1*DSNfSDcOe33E2Aup1Sww2w.jpeg"
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
        <footer class="card__footer">
          <div class="card__job-summary">
            <div class="card__job-icon card-pic">
              <img
                src={JSON.parse(localStorage.getItem("user")).Photo}
                alt=""
              />
            </div>
            <div class="card__job">
              <p class="card__job-title">
                {JSON.parse(localStorage.getItem("user")).name}
                
              </p>
            </div>
          </div>
        </footer>
        <div class="container_chat_bot">
          <div class="container-chat-options">
            <div class="chat">
              <div class="chat-bot">
                <textarea
                  value={body}
                  onChange={(e) => setBody(e.target.value)}
                  id="chat_bot"
                  name="chat_bot"
                  placeholder="Type Something...✦˚"
                ></textarea>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
