import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { IoMdClose } from "react-icons/io";
import { MdMood } from "react-icons/md";
import { IoMdHeartEmpty } from "react-icons/io";
import { IoMdHeart } from "react-icons/io";
import { BsChat } from "react-icons/bs";

export default function Home() {
  const [data, setData] = useState([]);
  const navigate = useNavigate();
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
        console.log(newData);
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

  return (
    <div className="home">
      {data.map( (post) => {
        return (
          <div className="col-9">
            <div className="card">
              {/* Post Header */}
              <div className="top">
                <div className="userDetails">
                  <div className="profilepic">
                    <div className="profile_img">
                      <div className="image">
                        <img src={post.postedBy.Photo} alt="img8" />
                      </div>
                    </div>
                  </div>
                  <h3>
                    <Link
                      to={post.postedBy ? `/profile/${post.postedBy._id}` : "#"}
                      style={{ color: "black" }}
                    >
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
                <img
                  src={post.photo ? post.photo : "corrupt image"}
                  alt="Post"
                />
              </div>

              {/* Post Actions */}
              <div className="bottom">
                <div className="actionBtns">
                  <div className="left">
                    {/* Like Button */}
                    <div className="heart">
                      {post.likes.includes(
                        JSON.parse(localStorage.getItem("user"))._id
                      ) ? (
                        <IoMdHeart
                          style={{ color: "red", fontSize: "30px" }}
                          onClick={() => unlikePost(post._id)}
                        ></IoMdHeart>
                      ) : (
                        <IoMdHeartEmpty
                          style={{ color: "black", fontSize: "30px" }}
                          onClick={() => likePost(post._id)}
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
                      onClick={() => toggleComment(post)}
                    ></BsChat>
                  </div>
                </div>

                {/* Likes Count */}
                <p className="likes">{post.likes.length} likes</p>

                {/* Post Caption */}
                <p className="message">
                  <b>{post.body ? post.body : "No caption"}</b>
                </p>

                {/* Comments Section */}
                <h4 onClick={() => toggleComment(post)} className="comments">
                  View all {post.comments.length} comments
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
                    onClick={() => makeComment(comment, post._id)}
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
                      <MdMood style={{fontSize:"22px", cursor:"pointer"}}></MdMood>
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
