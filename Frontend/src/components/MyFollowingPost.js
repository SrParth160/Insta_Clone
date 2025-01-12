import React, { useEffect, useState } from "react";
import "./Home.css";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { IoMdHeartEmpty } from "react-icons/io";
import { IoMdHeart } from "react-icons/io";
import { BsChat } from "react-icons/bs";
import { IoMdClose } from "react-icons/io";
import { MdMood } from "react-icons/md";


export default function MyFolliwngPost() {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [comment, setComment] = useState("");
  const [show, setShow] = useState(false);
  const [item, setItem] = useState([]);

  // Toast functions
  const notifyA = (msg) => toast.error(msg);
  const notifyB = (msg) => toast.success(msg);

  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (!token) {
      navigate("./signup");
    }

    // Fetching all posts
    fetch("http://localhost:5000/api/post/myfollowingpost", {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        setData(result);
      })
      .catch((err) => console.log(err));
  }, []);

  // to show and hide comments
  const toggleComment = (posts) => {
    if (show) {
      setShow(false);
    } else {
      setShow(true);
      setItem(posts);
    }
  };

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
        const newData = data.map((posts) => {
          if (posts._id == result._id) {
            return result;
          } else {
            return posts;
          }
        });
        setData(newData);
        console.log(result);
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
        const newData = data.map((posts) => {
          if (posts._id == result._id) {
            return result;
          } else {
            return posts;
          }
        });
        setData(newData);
        console.log(result);
      });
  };

  

  // function to make comment
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
        notifyB("Comment posted");
        console.log(result);
      });
  };

  return (
    <div className="home">
      {/* card */}
      {data.map((posts) => {
        return (
          <div className="col-9">
            <div className="card">
              {/* Post Header */}
              <div className="top">
                <div className="userDetails">
                  <div className="profilepic">
                    <div className="profile_img">
                      <div className="image">
                        <img src={ posts.postedBy.Photo } />
                      </div>
                    </div>
                  </div>
                  
                  <h3>
                    <Link
                      to={
                        posts.postedBy ? `/profile/${posts.postedBy._id}` : "#"
                      }
                      style={{ color: "black" }}
                    >
                      {posts.postedBy ? posts.postedBy.name : "Unknown User"}
                    </Link>
                    <br />
                    <span>From Earth </span>
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
                <img
                  src={posts.photo ? posts.photo : "corrupt image"}
                  alt="Post"
                />
              </div>

              {/* Post Actions */}
              <div className="bottom">
                <div className="actionBtns">
                  <div className="left">
                    {/* Like Button */}
                    <div className="heart">
                      {posts.likes.includes(
                        JSON.parse(localStorage.getItem("user"))._id
                      ) ? (
                        <IoMdHeart
                          style={{ color: "red", fontSize: "30px" }}
                          onClick={() => unlikePost(posts._id)}
                        ></IoMdHeart>
                      ) : (
                        <IoMdHeartEmpty
                          style={{ color: "black", fontSize: "30px" }}
                          onClick={() => likePost(posts._id)}
                        ></IoMdHeartEmpty>
                      )}
                    </div>
                    {/* Comment Button */}
                    <BsChat
                      style={{
                        color: "black",
                        fontSize: "25px",
                        margin: "1px 0 0 0",
                        transform: "rotateY(180deg)",
                      }}
                      onClick={() => toggleComment(posts)}
                    ></BsChat>
                  </div>
                </div>

                {/* Likes Count */}
                <p className="likes">{posts.likes.length} likes </p>

                {/* Post Caption */}
                <p className="message">
                  <b>{posts.body ? posts.body : "No caption"}</b>
                </p>

                {/* Comments Section */}
                <h4 onClick={() => toggleComment(posts)} className="comments">
                  View all {posts.comments.length} comments
                </h4>
                <h5 className="postTime">2 hours ago</h5>

                {/* Add Comment */}

                <div className="addComments">
                                <MdMood style={{fontSize:"22px", cursor:"pointer"}}></MdMood>
                
                  <input
                    class=" text"
                    type="text"
                    placeholder="Add Comment"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                  />
                  <button
                    className="comment"
                    onClick={() => makeComment(comment, posts._id)}
                  >
                    Post
                  </button>
                </div>
              </div>
            </div>

            {/* Show Comments Modal */}
            {show && (
              <>
                <div className="modal-overlay" onClick={toggleComment}></div>

                <div className="showComment">
                  <div className="commentContainer">
                    <div className="postPic">
                      <div>
                        <img
                          src={item.photo}
                          alt=""
                          className="h-auto max-w-full rounded-lg"
                        />
                        <div
                          className="card-header"
                          style={{ borderBottom: "1px solid #00000029" }}
                        >
                          <div className="card-pic">
                            <img
                              className=""
                              src={item.postedBy.Photo}
                              alt=""
                            />
                          </div>
                          <h5>{item.postedBy.name}</h5>
                        </div>
                        <div
                          style={{ display: "flex" }}
                          className="items-center"
                        >
                          <IoMdHeart
                            className="mr-1"
                            style={{ color: "red", fontSize: "16px" }}
                            onClick={() => unlikePost(posts._id)}
                          ></IoMdHeart>{" "}
                          <p className="mt-0" style={{ fontWeight: "bold" }}>
                            {item.likes.length} Likes
                          </p>
                        </div>
                        <p
                          style={{ borderBottom: "1px solid #00000029" }}
                          className="font-semibold mt-0 text-sm text-start text-zinc-900 "
                        >
                          {item.body}
                        </p>
                      </div>
                    </div>
                    <div className="details">
                      {/* card header */}

                      {/* commentSection */}
                      <div className="comment-section">
                        {item.comments.map((comment) => {
                          return (
                            <p className="comm">
                              <span
                                className="commenter"
                                style={{ fontWeight: "bolder" }}
                              >
                                {comment.postedBy.name}{" "}
                              </span>
                              <span className="commentText">
                                {comment.comment}
                              </span>
                            </p>
                          );
                        })}
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
              </>
            )}
          </div>
        );
      })}
    </div>
  );
}
