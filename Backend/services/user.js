const USER = require("../models/userModel");
const POST = require("../models/postModel");

//   Get user profile
exports.getUserProfile = async (userId) => {
    try {
        const user = await USER.findOne({ _id: userId }).select("-password");
        if (!user) throw new Error("User not found");

        const posts = await POST.find({ postedBy: userId }).populate("postedBy", "_id");
        return { user, posts };
    } catch (error) {
        throw error;
    }
};

//   Follow user
exports.followUser = async (userId, followId) => {
    try {
        await USER.findByIdAndUpdate(followId, { $push: { followers: userId } }, { new: true });
        const updatedUser = await USER.findByIdAndUpdate(userId, { $push: { following: followId } }, { new: true });
        return updatedUser;
    } catch (error) {
        throw error;
    }
};

//   Unfollow user
exports.unfollowUser = async (userId, unfollowId) => {
    try {
        await USER.findByIdAndUpdate(unfollowId, { $pull: { followers: userId } }, { new: true });
        const updatedUser = await USER.findByIdAndUpdate(userId, { $pull: { following: unfollowId } }, { new: true });
        return updatedUser;
    } catch (error) {
        throw error;
    }
};

//  Upload profile picture
exports.uploadProfilePic = async (userId, picUrl) => {
    try {
        const updatedUser = await USER.findByIdAndUpdate(userId, { $set: { Photo: picUrl } }, { new: true });
        return updatedUser;
    } catch (error) {
        throw error;
    }
};
