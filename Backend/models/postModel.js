const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;

const postSchema = new mongoose.Schema(
    {
        body: {
            type: String,
            required: true,
            trim: true, // Removes leading/trailing whitespace
        },
        photo: {
            type: String,
            required: true,
        },
        likes: [
            {
                type: ObjectId,
                ref: "USER",
            },
        ],
        comments: [
            {
                comment: {
                    type: String,
                    required: true, // Ensure comments aren't empty
                },
                postedBy: {
                    type: ObjectId,
                    ref: "USER",
                    required: true,
                },
            },
        ],
        postedBy: {
            type: ObjectId,
            ref: "USER",
            required: true,
        },
    },
    { timestamps: true }
);

mongoose.model("POST", postSchema);
