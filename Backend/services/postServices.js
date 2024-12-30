const mongoose = require("mongoose");
const POST = require("../models/postModel")

exports.getAllPosts = () => {
    return POST.find()
        .populate("postedBy", "_id name Photo")
        .populate("comments.postedBy", "_id name")
        .sort("-createdAt");
};

exports.createPost = ({ body, pic, user }) => {
    const post = new POST({
        body,
        photo: pic,
        postedBy: user,
    });

    return post.save();
};

exports.getMyPosts = (userId) => {
    return POST.find({ postedBy: userId })
        .populate("postedBy", "_id name")
        .populate("comments.postedBy", "_id name")
        .sort("-createdAt");
};

exports.likePost = (postId, userId) => {
    return POST.findByIdAndUpdate(
        postId,
        { $push: { likes: userId } },
        { new: true }
    ).populate("postedBy", "_id name Photo");
};

exports.unlikePost = (postId, userId) => {
    return POST.findByIdAndUpdate(
        postId,
        { $pull: { likes: userId } },
        { new: true }
    ).populate("postedBy", "_id name Photo");
};

exports.addComment = (postId, text, userId) => {
    const comment = { comment: text, postedBy: userId };

    return POST.findByIdAndUpdate(
        postId,
        { $push: { comments: comment } },
        { new: true }
    )
        .populate("comments.postedBy", "_id name")
        .populate("postedBy", "_id name Photo");
};

exports.deletePost = async (postId, userId) => {
    const post = await POST.findOne({ _id: postId }).populate("postedBy", "_id");

    if (!post) {
        throw new Error("Post not found");
    }

    if (post.postedBy._id.toString() !== userId.toString()) {
        throw new Error("Unauthorized action");
    }

    await post.remove();
    return { message: "Successfully deleted" };
};

exports.getFollowingPosts = (following) => {
    return POST.find({ postedBy: { $in: following } })
        .populate("postedBy", "_id name")
        .populate("comments.postedBy", "_id name");
};
