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
        comment: String,
        userName: String,
        userId: mongoose.Schema.Types.ObjectId,
      },
    ],
    userName: {
      type: String,
      required: true,
    },
    displayPhoto: {
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
