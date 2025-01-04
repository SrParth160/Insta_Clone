const express = require("express");
const router = express.Router();
const userController = require("../controllers/userControllers");
JWT_SECRET= "mysecretkey"

router.get("/", (req, res) => {
    res.send("Welcome to instagram USER");
});

router.post("/signup", userController.signup);
router.post("/login", userController.login);

module.exports = router;
