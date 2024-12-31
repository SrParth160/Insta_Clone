require("dotenv").config();

const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const USER = mongoose.model("USER");;

exports.generateToken = (userId) => {
    return jwt.sign({ _id: userId }, JWT_SECRET, { expiresIn: "7d" });
};
// Use environment variable for JWT secret
const JWT_SECRET = process.env.JWT_SECRET;

module.exports = async (req, res, next) => {
    try {
        // Check for the 'Authorization' header
        const { authorization } = req.headers;

        if (!authorization) {
            return res.status(401).json({ error: "You must be logged in" });
        }

        // Extract the token
        const token = authorization.replace("Bearer ", "");

        // Verify the token
        const payload = jwt.verify(token, JWT_SECRET);

        // Find the user in the database
        const user = await USER.findById(payload._id);

        if (!user) {
            return res.status(401).json({ error: "User not found" });
        }

        // Attach user data to the request object
        req.user = user;
        next(); // Proceed to the next middleware/route handler
    } catch (err) {
        console.error("Authentication error:", err);
        res.status(401).json({ error: "Invalid or expired token" });
    }
};
