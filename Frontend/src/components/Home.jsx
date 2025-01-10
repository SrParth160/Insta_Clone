import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { IoMdClose } from "react-icons/io";
import { FaRegComment } from "react-icons/fa";
import { MdMood } from "react-icons/md";



export default function Home() {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [comment, setComment] = useState("");
  const [show, setShow] = useState(false);
  const [item, setItem] = useState([]);

  console.log(data);
  

  // Toast functions
  const notifyERR = (message) => toast.error(message);
  const notifySUC = (message) => toast.success(message);

  // console.log(data);

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

  const likePost = (id) => {
    fetch("http://localhost:5000/api/post/like", {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        postId: id,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        const newData = data.map((post) => {
          if (post._id === result._id) {
            return result;
          } else {
            return post;
          }
        });
        setData(newData);
        console.log(newData)
      });
  };
  const unlikePost = (id) => {
    fetch("http://localhost:5000/api/post/unlike", {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        postId: id,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        const newData = data.map((post) => {
          if (post._id === result._id) {
            return result;
          } else {
            return post;
          }
        });
        setData(newData);
        // console.log(result);
      });
  };

  const makeComment = (text, id) => {
    fetch("http://localhost:5000/api/post/comment", {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        text: text,
        postId: id,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        const newData = data.map((posts) => {
          if (posts._id == result._id) {
            return result;
          } else {
            return posts;
          }
        });
        setData(newData);
        setComment("");
        notifySUC("Comment posted");
        console.log(result);
      });
  };
  // show comment
  const toggleComment = (post) => {
    if (show) {
      setShow(false);
      setItem([]);
    } else {
      setShow(true);
      setItem(post);
    }
  };
console.log(item);

  return (
  <main>
    {data.map((post) => {
      return (
          <div className="col-9">
            <div className="card">
              {/* Post Header */}
              <div className="top">
                <div className="userDetails">
                  <div className="profilepic">
                    <div className="profile_img">
                      <div className="image">
                        <img src={ post.postedBy.Photo} alt="img8" />
                      </div>
                    </div>
                  </div>
                  <h3>
                    <Link to={post.postedBy ? `/profile/${post.postedBy._id}` : "#"} style={{ color: "black" }}>
                      {post.postedBy ? post.postedBy.name : "Unknown User"}
                    </Link>
                    <br />
                    <span>From Earth</span>
                  </h3>
                </div>
                <div>
                  <span className="dot">
                    <i className="fas fa-ellipsis-h"></i>
                  </span>
                </div>
              </div>

              {/* Post Image */}
              <div className="imgBx">
                <img src={post.photo ? post.photo : "corrupt image"} alt="Post" />
              </div>

              {/* Post Actions */}
              <div className="bottom">
                <div className="actionBtns">
                  <div className="left">
                    {/* Like Button */}
                    <div className="heart">
                      {post.likes.includes(JSON.parse(localStorage.getItem("user"))._id) ? (
                        <svg onClick={() => unlikePost(post._id)} aria-label="Unlike" color="#ff0000" fill="#ff0000" height="24" role="img" viewBox="0 0 48 48" width="24">
                          <path d="M34.6 6.1c5.7 0 10.4 5.2 10.4 11.5 0 6.8-5.9 11-11.5 16S25 41.3 24 41.9c-1.1-.7-4.7-4-9.5-8.3-5.7-5-11.5-9.2-11.5-16C3 11.3 7.7 6.1 13.4 6.1c4.2 0 6.5 2 8.1 4.3 1.9 2.6 2.2 3.9 2.5 3.9.3 0 .6-1.3 2.5-3.9 1.6-2.3 3.9-4.3 8.1-4.3z"></path>
                        </svg>
                      ) : (
                        <svg onClick={() => likePost(post._id)} aria-label="Like" color="#000000" fill="#000000" height="24" role="img" viewBox="0 0 48 48" width="24">
                          <path d="M34.6 6.1c5.7 0 10.4 5.2 10.4 11.5 0 6.8-5.9 11-11.5 16S25 41.3 24 41.9c-1.1-.7-4.7-4-9.5-8.3-5.7-5-11.5-9.2-11.5-16C3 11.3 7.7 6.1 13.4 6.1c4.2 0 6.5 2 8.1 4.3 1.9 2.6 2.2 3.9 2.5 3.9.3 0 .6-1.3 2.5-3.9 1.6-2.3 3.9-4.3 8.1-4.3z"></path>
                        </svg>
                      )}
                    </div>
                    {/* Comment Button */}
                    <svg onClick={() => toggleComment(post)} aria-label="Comment" color="#000000" fill="" height="24" role="img" viewBox="0 0 48 48" width="24">
                      <path d="M47.5 46.1l-2.8-11c1.8-3.3 2.8-7.1 2.8-11.1C47.5 11 37 .5 24 .5S.5 11 .5 24 11 47.5 24 47.5c4 0 7.8-1 11.1-2.8l11 2.8c.8.2 1.6-.6 1.4-1.4z"></path>
                    </svg>
                  </div>
                </div>

                {/* Likes Count */}
                <p className="likes">{post.likes.length} likes</p>

                {/* Post Caption */}
                <p className="message">
                  <b>{post.body ? post.body : "No caption"}</b>
                </p>

                {/* Comments Section */}
                <h4 onClick={() => toggleComment(post)} className="comments">View all {post.comments.length} comments</h4>
                <h5 className="postTime">2 hours ago</h5>

                {/* Add Comment */}
                <div className="addComments">
                
                  <input class=" text" type="text" placeholder="Add Comment" value={comment} onChange={(e) => setComment(e.target.value)} />
                  <button className="comment" onClick={() => makeComment(comment, post._id)}>Post</button>
                </div>
              </div>
            </div>

            {/* Show Comments Modal */}
            {show && (
        
        <div className="showComment">
          <div className="container">
            <div className="postPic">
              <img src={item.photo} alt="" />
            </div>
            <div className="details">
              {/* card header */}
              <div
                className="card-header"
                style={{ borderBottom: "1px solid #00000029" }}
              >
                <div className="card-pic">
                  <img
                    src={item.postedBy.Photo}
                    alt=""
                  />
                </div>
                <h5>{item.postedBy.name}</h5>
              </div>
              {/* commentSection */}
              <div
                className="comment-section"
                style={{ borderBottom: "1px solid #00000029" }}
              >
                {item.comments.map((comment) => {
                  return (
                    <p className="comm">
                      <span
                        className="commenter"
                        style={{ fontWeight: "bolder" }}
                      >
                        {comment.postedBy.name}{" "}
                      </span>
                      <span className="commentText">{comment.comment}</span>
                    </p>
                  );
                })}
              </div>
              {/* card content */}
              <div className="card-content">
                <p>{item.likes.length} Likes</p>
                <p>{item.body}</p>
              </div>

              {/* add Comment */}
              <div className="add-comment">
                <span className="material-symbols-outlined">mood</span>
                <input
                  type="text"
                  placeholder="Add a comment"
                  value={comment}
                  onChange={(e) => {
                    setComment(e.target.value);
                  }}
                />
                <button
                  className="comment"
                  onClick={() => {
                    makeComment(comment, item._id);
                    toggleComment();
                  }}
                >
                  Post
                </button>
              </div>
            </div>
          </div>
          <div
            className="close-comment"
            onClick={() => {
              toggleComment();
            }}
          >
            <span className="material-symbols-outlined material-symbols-outlined-comment">
            <IoMdClose />
            </span>
          </div>
        </div>
      )}
        </div>
      );
    })}
  </main>
);
}
