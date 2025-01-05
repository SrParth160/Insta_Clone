const express = require("express");
const router = express.Router();
const requireLogin = require("../middlewares/requireLogin");
const postController = require("../controllers/postController");

router.get("/", (req, res) => {
    res.send("Welcome to instagram POST");
});

// Routes
router.get("/allposts", requireLogin, postController.getAllPosts);
router.post("/createpost", requireLogin, postController.createPost);
router.get("/myposts", requireLogin, postController.getMyPosts);
router.put("/like", requireLogin, postController.likePost);
router.put("/unlike", requireLogin, postController.unlikePost);
router.put("/comment", requireLogin, postController.addComment);
router.delete("/deletePost/:postId", requireLogin, postController.deletePost);
router.get("/myfollowingpost", requireLogin, postController.getFollowingPosts);

module.exports = router;
