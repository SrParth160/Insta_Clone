const mongoose = require("mongoose");
const postService = require("../services/postServices");

exports.getAllPosts = async (req, res) => {
  try {
    const posts = await postService.getAllPosts();
    res.json(posts);
  } catch (error) {
    console.error("Error fetching all posts:", error);
    res.status(500).json({ error: "Server error" });
  }
};

exports.createPost = async (req, res) => {
  try {
    const { body, photo } = req.body;

    if (!body || !photo) {
      return res.status(422).json({ error: "Please add all fields" });
    }

    if (!req.user) {
      return res.status(401).json({ error: "Unauthorized: User not found" });
    }

    const post = await postService.createPost({
      body,
      photo,
      user:req.user._id, // Send only user ID instead of full object
    });

    res.status(201).json({ post });
  } catch (err) {
    console.error("Error creating post:", err);
    res.status(500).json({ error: "Server error, please try again later" });
  }
};

exports.getMyPosts = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ error: "Unauthorized: User not found" });
    }

    const myPosts = await postService.getMyPosts(req.user._id);
    res.json(myPosts);
  } catch (error) {
    console.error("Error fetching user posts:", error);
    res.status(500).json({ error: "Server error" });
  }
};

exports.likePost = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ error: "Unauthorized: User not found" });
    }

    const updatedPost = await postService.likePost(req.body.postId, req.user._id);
    res.json(updatedPost);
  } catch (error) {
    console.error("Error liking post:", error);
    res.status(422).json({ error: "Unable to like post" });
  }
};

exports.unlikePost = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ error: "Unauthorized: User not found" });
    }

    const updatedPost = await postService.unlikePost(req.body.postId, req.user._id);
    res.json(updatedPost);
  } catch (error) {
    console.error("Error unliking post:", error);
    res.status(422).json({ error: "Unable to unlike post" });
  }
};

exports.addComment = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ error: "Unauthorized: User not found" });
    }

    const updatedPost = await postService.addComment(
      req.body.postId,
      req.body.text,
      req.user._id
    );
    res.json(updatedPost);
  } catch (error) {
    console.error("Error adding comment:", error);
    res.status(422).json({ error: "Unable to add comment" });
  }
};

exports.deletePost = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ error: "Unauthorized: User not found" });
    }

    const result = await postService.deletePost(req.params.postId, req.user._id);
    res.json(result);
  } catch (error) {
    console.error("Error deleting post:", error);
    res.status(500).json({ error: "Server error" });
  }
};

exports.getFollowingPosts = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ error: "Unauthorized: User not found" });
    }

    const posts = await postService.getFollowingPosts(req.data);
    res.json(posts);
    console.log(posts);
    
  } catch (error) {
    console.error("Error fetching following posts:", error);
    res.status(500).json({ error: "Server error" });
  }
};
