const mongoose = require("mongoose");

const PostSchema = mongoose.model(
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
  },
  { timestamps: true }
);

const Post = mongoose.model("Post", PostSchema);

module.exports = Post;
