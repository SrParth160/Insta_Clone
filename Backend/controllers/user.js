const userService = require("../services/userService");

//   Get user profile
exports.getUserProfile = async (req, res) => {
    try {
        const { user, posts } = await userService.getUserProfile(req.params.id);
        res.status(200).json({ user, posts });
    } catch (error) {
        console.error("Error fetching user profile:", error);
        res.status(404).json({ error: "User not found" });
    }
};

//   Follow user
exports.followUser = async (req, res) => {
    try {
        const result = await userService.followUser(req.user._id, req.body.followId);
        res.json(result);
    } catch (error) {
        console.error("Error following user:", error);
        res.status(422).json({ error: error.message });
    }
};

//   Unfollow user
exports.unfollowUser = async (req, res) => {
    try {
        const result = await userService.unfollowUser(req.user._id, req.body.followId);
        res.json(result);
    } catch (error) {
        console.error("Error unfollowing user:", error);
        res.status(422).json({ error: error.message });
    }
};

//   Upload profile picture
exports.uploadProfilePic = async (req, res) => {
    try {
        const result = await userService.uploadProfilePic(req.user._id, req.body.pic);
        res.json(result);
    } catch (error) {
        console.error("Error uploading profile picture:", error);
        res.status(422).json({ error: error.message });
    }
};
