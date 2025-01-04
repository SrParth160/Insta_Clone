import React from "react";
import "./CreatePost.css";

export default function CreatePost() {
  
    const loadfile =(event)=>{
        var output = document.getElementById('output');
    output.src = URL.createObjectURL(event.target.files[0]);
    output.onload = function() {
      URL.revokeObjectURL(output.src) // free memory
    }
}
    return (
    <div className="createPost">
      {/* header */}
      <div className="post-header">
        <h4 style={{ margin: "3px auto" }}>Create New Post</h4>
        <button id="post-btn">Share</button>
      </div>
      {/* image preview */}
      <div className="main-div">
        <img id="output" src="https://static.thenounproject.com/png/11204-200.png" />
        <input type="file" accept="image/*" onChange={(event=>{loadfile(event)})} />
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
