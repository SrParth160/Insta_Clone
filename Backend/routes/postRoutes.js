const express = require("express");
const router = express.Router();
const requireLogin = require("../middlewares/requireLogin");
const postController = require("../controllers/postController");

router.get("/", (req, res) => {
    res.send("Welcome to instagram POST");
});

// Routes
router.get("/allposts", requireLogin, postController.getAllPosts);
router.post("/createPost",requireLogin, postController.createPost);
router.get("/myposts", requireLogin, postController.getMyPosts);
router.put("/like", requireLogin, postController.likePost);
router.put("/unlike", requireLogin, postController.unlikePost);
router.put("/comment", requireLogin, postController.addComment);
router.delete("/deletePost/:postId", requireLogin, postController.deletePost);
router.get("/myfollwingpost", requireLogin, postController.getFollowingPosts);

// to show following post
router.get("/myfollwingposts", requireLogin, (req, res) => {
    POST.find({ postedBy: { $in: req.user.following } })
        .populate("postedBy", "_id name")
        .populate("comments.postedBy", "_id name")
        .then(posts => {
            res.json(posts)
        })
        .catch(err => { console.log(err) })
})

module.exports = router;
