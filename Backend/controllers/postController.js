const mongoose = require("mongoose");
const postService = require("../services/postServices");
const POST = require("../models/postModel");


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
    const { body, photo } = req.body;
    // console.log(photo)
    if (!body) {
        return res.status(422).json({ error: "Please add all the fields" })
    }
    
    const post = new POST({
        body,
        photo: photo,
        postedBy: req.user
    })
    post.save().then((result) => {
        return res.json({ post: result })
    }).catch(err => console.log(err))
};

exports.getMyPosts = async (req, res) => {
    try {
        const myPosts = await postService.getMyPosts(req.user._id);
        res.json(myPosts);
    } catch (error) {
        console.error("Error fetching user posts:", error);
        res.status(500).json({ error: "Server error" });
    }
};

exports.likePost = async (req, res) => {
    try {
        const updatedPost = await postService.likePost(req.body.postId, req.user._id);
        res.json(updatedPost);
    } catch (error) {
        console.error("Error liking post:", error);
        res.status(422).json({ error });
    }
};

exports.unlikePost = async (req, res) => {
    try {
        const updatedPost = await postService.unlikePost(req.body.postId, req.user._id);
        res.json(updatedPost);
    } catch (error) {
        console.error("Error unliking post:", error);
        res.status(422).json({ error });
    }
};

exports.addComment = async (req, res) => {
    try {
        const updatedPost = await postService.addComment(req.body.postId, req.body.text, req.user._id);
        res.json(updatedPost);
    } catch (error) {
        console.error("Error adding comment:", error);
        res.status(422).json({ error });
    }
};

exports.deletePost = async (req, res) => {
    try {
        const result = await postService.deletePost(req.params.postId, req.user._id);
        res.json(result);
    } catch (error) {
        console.error("Error deleting post:", error);
        res.status(500).json({ error });
    }
};

exports.getFollowingPosts = async (req, res) => {
    try {
        const posts = await postService.getFollowingPosts(req.user.following);
        res.json(posts);
    } catch (error) {
        console.error("Error fetching following posts:", error);
        res.status(500).json({ error: "Server error" });
    }
};
