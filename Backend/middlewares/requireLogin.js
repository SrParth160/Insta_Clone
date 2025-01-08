// const jwt = require("jsonwebtoken");
// const JWT_ = "mysecretkey";
// const mongoose = require("mongoose");
// const USER = mongoose.model("USER");

// module.exports = (req, res, next) => {
//     const { authorization } = req.headers;
//     if (!authorization) {
//         return res.status(401).json({ error: "You must be logged in" });
//     }
//     const token = authorization.replace("Bearer ", "");
//     jwt.verify(token, JWT_, (err, payload) => {
//         if (err) {
//             return res.status(401).json({ error: "You must be logged in" });
//         }
//         const { _id } = payload;

//         USER.findById(_id).then(userData => {
//             if (!userData) {
//                 return res.status(404).json({ error: "User not found" });
//             }
//             req.user = userData;
//             next();
//         }).catch(err => {
//             console.error(err);
//             res.status(500).json({ error: "Internal server error" });
//         });
//     });
// };
require("dotenv").config();
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const USER = require("../models/userModel");

// 🔥 Ensure you're correctly importing JWT_SECRET
const JWT_SECRET = process.env.JWT_SECRET;


module.exports = async (req, res, next) => {
    const { authorization } = req.headers;

    if (!authorization) {
        return res.status(401).json({ error: "You must be logged in" });
    }

    const token = authorization.replace("Bearer ", "");

    jwt.verify(token, JWT_SECRET, async (err, payload) => {
        if (err) {
            console.log("JWT Verification Error:", err);
            return res.status(401).json({ error: "Invalid token" });
        }
    
        console.log("Decoded Token Payload:", payload);  // 🔍 Debug
    
        try {
            const { _id } = payload;
            const user = await USER.findById(_id).select("_id name email Photo");
    
            if (!user) {
                console.log("User ID from Token:", _id);  // 🔍 Debug
                return res.status(401).json({ error: "User not found" });
            }
    
            req.user = user;
            console.log("Authenticated User:", req.user);  // 🔍 Debug
            next();
        } catch (error) {
            console.error("Error in authentication:", error);
            res.status(500).json({ error: "Server error in authentication" });
        }
    });
    
};
