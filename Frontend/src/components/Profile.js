import React from 'react'

export default function profile() {
    return (
        <div className="profile">
          <div className="profile-header">
            {/* Profile Picture */}
            <img src="https://cdn.pixabay.com/photo/2015/03/04/22/35/avatar-659652_640.png" alt="Profile" className="profile-pic" />
    
            {/* User Info */}
            <div className="profile-info">
              <h2 className="profile-username">Username</h2>
              <div className="profile-stats">
                <span><strong>42</strong> posts</span>
                <span><strong>1,230</strong> followers</span>
                <span><strong>345</strong> following</span>
              </div>
              <p className="profile-bio">
                <strong>Full Name</strong><br />
                Passionate about coding, design, and technology.<br />
                🌍 Living the tech life.<br />
              </p>
            </div>
          </div>
    
          {/* Posts Section */}
          <div className="profile-posts">
            <h3>Posts</h3>
            <div className="posts-grid">
              <div className="post"></div>
              <div className="post"></div>
              <div className="post"></div>
              <div className="post"></div>
              <div className="post"></div>
              <div className="post"></div>
            </div>
          </div>
        </div>
      );
}
