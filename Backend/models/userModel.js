const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    userName: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    // bio: {
    //     type: String,
    //     default: "",
    // },
    profilePhoto: {
        type: String,
        default: "defaultProfilePhotoUrl",
    },
    // followers: [{ type: ObjectId, ref: "USER" }],
    // following: [{ type: ObjectId, ref: "USER" }],
    // posts: [{ type: ObjectId, ref: "POST" }],
    // createdAt: {
    //     type: Date,
    //     default: Date.now,
    // },
});

const USER = mongoose.model("USER", userSchema);                               

module.exports = USER