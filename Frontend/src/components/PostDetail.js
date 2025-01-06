import React from 'react'
import "./PostDetail.css"
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
export default function PostDetail({item,toggleDetails}) {
     const Navigate = useNavigate();
      const notifyERR = (message) => toast.error(message);
      const notifySUC = (message) => toast.success(message);
    const removePost = (postId)=>{

        if(window.confirm("Are you sure you want to delete this post?")){
            
        fetch(`http://localhost:5000/api/post/deletePost/${postId}`,{

            method:"delete",
            headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
        }) .then((res) => res.json())
      .then((result) => {
        notifySUC("Deleted successful");
        Navigate("/Home");
        console.log(result)
    });
        }

    }
  return (
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
              src="https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8cGVyc29ufGVufDB8MnwwfHw%3D&auto=format&fit=crop&w=500&q=60"
              alt=""
            />
          </div>
          <h5>{item.postedBy.name}</h5>
         <div className="deletePost" onClick={()=>{removePost(item._id)}}>X</div>

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
            // value={comment}
            // onChange={(e) => {
            //   setComment(e.target.value);
            // }}
          />
          <button
            className="comment"
            // onClick={() => {
            //   makeComment(comment, item._id);
            //   toggleComment();
            // }}
          >
            Post
          </button>
        </div>
      </div>
    </div>
    <div
      className="close-comment"
      onClick={() => {
        toggleDetails();
      }}
    >
      <span className="material-symbols-outlined material-symbols-outlined-comment">
        close
      </span>
    </div>
  </div>
  )
}
