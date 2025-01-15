const express = require("express");
const router = express.Router();
const userController = require("../controllers/userControllers");
const jwt = require("jsonwebtoken"); // ✅ Import JWT
const USER = require("../models/userModel");
require("dotenv").config(); // ✅ Load environment variables

router.get("/", (req, res) => {
  res.send("Welcome to Instagram USER");
});

router.post("/signup", userController.signup);
router.post("/login", userController.login);

router.post("/googleLogin", async (req, res) => {
  try {
    const { email_verified, email, name, clientId, userName, Photo } = req.body;

    if (!email_verified) {
      return res.status(400).json({ error: "Email is not verified!" });
    }

    let savedUser = await USER.findOne({ email }).catch((err) => {
      console.error("Database error:", err);
      return res.status(500).json({ error: "Database error" });
    });

    if (savedUser) {
      const token = jwt.sign({ _id: savedUser._id }, process.env.JWT_SECRET, { expiresIn: "7d" });
      return res.json({ token, user: savedUser });
    }

    const password = email + clientId;
    const newUser = new USER({
      name,
      email,
      userName,
      password,
      Photo,
    });

    await newUser.save();

    const token = jwt.sign({ _id: newUser._id }, process.env.JWT_SECRET, { expiresIn: "7d" });

    return res.json({ token, user: newUser });

  } catch (error) {
    console.error("Google Login Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
