const User = require("../models/UserModel");
const Post = require("../models/PostModel");
const asyncHandler = require("express-async-handler");

const getAllPosts = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  if (user) {
    res.status(201).json({
      posts: user.posts,
    });
  } else {
    res.status(404);
    throw new Error("User not found.");
  }
});

const createPost = asyncHandler(async (req, res) => {
  const { photo, caption } = req.body;
  const user = await User.findById(req.user._id);

  if (!user) {
    res.status(404);
    throw new Error("User not found.");
  }

  if (!photo || !caption) {
    res.status(400);
    throw new Error("Invalid photo or caption.");
  }

  const post = await Post.create({
    photo,
    caption,
  });

  if (post) {
    user.posts.push(post);
    await user.save();

    res.status(201).json({
      post: post,
    });
  } else {
    res.status(400);
    throw new Error("Error occurred while creating post.");
  }
});

const getParticularPost = asyncHandler(async (req, res) => {
  const postID = req.params.id;
  const post = await Post.findById(postID);
  if (post) {
    res.status(201).json({
      post: post,
    });
  } else {
    res.status(404);
    throw new Error("Post not found.");
  }
});

module.exports = { getAllPosts, createPost, getParticularPost };
