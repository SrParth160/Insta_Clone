import React, { useState, useEffect } from "react";
import "./Home.css";

const Home = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    // Fetch posts from backend (Replace with actual API call)
    setPosts([
      {
        id: 1,
        user: "john_doe",
        userProfile: "https://via.placeholder.com/40",
        image: "https://via.placeholder.com/500",
        caption: "Beautiful sunset! 🌅 #nature",
        likes: 120,
        comments: [{ user: "alice", text: "Wow, amazing view!" }],
      },
      {
        id: 2,
        user: "jane_smith",
        userProfile: "https://via.placeholder.com/40",
        image: "https://via.placeholder.com/500",
        caption: "My new pet! 🐶",
        likes: 250,
        comments: [{ user: "bob", text: "So cute! 🥰" }],
      },
    ]);
  }, []);

  return (
    <div className="home">
      {posts.map((post) => (
        <div key={post.id} className="post-card">
          {/* Post Header */}
          <div className="post-header">
            <img src={post.userProfile} alt="profile" className="profile-pic" />
            <h4>{post.user}</h4>
          </div>

          {/* Post Image */}
          <img src={post.image} alt="Post" className="post-image" />

          {/* Post Actions */}
          <div className="post-actions">
            <span>❤️ {post.likes} Likes</span>
          </div>

          {/* Caption */}
          <p className="post-caption">
            <strong>{post.user}</strong> {post.caption}
          </p>

          {/* Comments */}
          <div className="post-comments">
            {post.comments.map((comment, index) => (
              <p key={index}>
                <strong>{comment.user}</strong> {comment.text}
              </p>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Home;
