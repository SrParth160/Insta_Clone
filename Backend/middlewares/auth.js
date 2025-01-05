require("dotenv").config();
const { config } = require("dotenv");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const USER = mongoose.model("USER");;
const JWT_SECRET = config;

// exports.generateToken = (userId) => {
//     return jwt.sign({ _id: userId }, JWT_SECRET, { expiresIn: "7d" });
// };

module.exports.createToken = (data) => {
    console.log(data);
    
  const token = jwt.sign({ data }, JWT_SECRET);
  return token;
};

module.exports.verifyToken = (login_token) => {
return jwt.verify(login_token, JWT_SECRET);
};

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
