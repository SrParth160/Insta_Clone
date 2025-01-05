import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";

export default function Home() {
  const navigate = useNavigate();
  const [data, setData] = useState([]);

  console.log(data);
  

  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (!token) {
      navigate("/signup");
    }

    // fatch posts
    fetch("http://localhost:5000/api/post/allposts", {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    })
      .then((res) => res.json())
      .then((result) => setData(result))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="home">
      {/* card */}
      {data.map((post) => {
        return (
          <div className="card">
            {/* {card Header} */}

            <div className="card-header">
              <div className="card-pic">
                <img
                  src="https://images.unsplash.com/photo-1640960543409-dbe56ccc30e2?q=80&w=2080&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  alt=""
                />
              </div>
              <h5>{post.postedBy ? post.postedBy.name : "Unknown User"}</h5>
            </div>
            {/* {card image} */}
            <div className="card-image">
              <img src={post.photo ? post.photo : "currept image"} />
            </div>
            {/* {card content} */}
            <div className="card-content">
              <span class="material-symbols-outlined">favorite</span>
              <p>{post.likes.length ? post.likes.length : "no data avaliable for"} likes</p>
              <p>{post.body ? post.body : "no caption"}</p>
            </div>
            {/* {add comment} */}
            <div className="add-comment">
              {/* <span class="material-symbols-outlined"></span> */}

              <input type="text" placeholder="Add Comment" />
              <button className="comment">post</button>
            </div>
          </div>
        );
      })}
    </div>
  );
}
