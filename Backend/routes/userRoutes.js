const express = require("express");
const router = express.Router();
const userController = require("../controllers/userControllers");

router.get("/", (req, res) => {
    res.send("Welcome to instagram");
});

router.post("/signup", userController.signup);
router.post("/signin", userController.signin);

module.exports = router;
