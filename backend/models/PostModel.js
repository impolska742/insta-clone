const mongoose = require("mongoose");

const PostSchema = mongoose.Schema(
  {
    photo: {
      type: String,
      required: true,
    },
    caption: {
      type: String,
    },
    comments: [
      {
        type: String,
        userName: String,
      },
    ],
    userName: {
      type: String,
      required: true,
    },
    imageUrl: {
      type: String,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Post = mongoose.model("Post", PostSchema);

module.exports = Post;
