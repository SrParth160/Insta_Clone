const express = require("express");
const router = express.Router();
const userController = require("../controllers/userControllers");

router.get("/", (req, res) => {
    res.send("Welcome to instagram USER");
});

router.post("/signup", userController.signup);
router.post("/login", userController.signin);

module.exports = router;
