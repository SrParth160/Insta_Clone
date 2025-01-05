const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;

const postSchema = new mongoose.Schema(
  {
    body: { type: String, required: true },
    photo: { type: String },
    postedBy: { type: ObjectId, ref: "USER" },
    likes: [{ type: ObjectId, ref: "USER" }],
    comments: [
      {
        comment: String,
        postedBy: { type: ObjectId, ref: "USER" },  
      },
    ],
  },
  { timestamps: true }
);

const POST = mongoose.model("POST", postSchema);

module.exports = POST;