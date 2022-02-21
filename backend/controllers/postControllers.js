const User = require("../models/UserModel");
const Post = require("../models/PostModel");
const asyncHandler = require("express-async-handler");

const allPosts = asyncHandler(async (req, res) => {
  const posts = await Post.find();
  if (posts) {
    res.status(201).json({
      posts: posts,
    });
  } else {
    res.status(404);
    throw new Error("Posts not found.");
  }
});

const getAllUserPosts = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  const posts = await Post.find({ user: req.user });

  if (user) {
    res.status(201).json({
      posts: posts,
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

  const userName = user.userName;

  const post = await Post.create({
    photo,
    caption,
    user,
    userName,
  });

  if (post) {
    res.status(201).json({
      post: post,
    });
  } else {
    res.status(400);
    throw new Error("Error occurred while creating post.");
  }
});

const deletePost = asyncHandler(async (req, res) => {
  const postID = req.params.id;
  const post = await Post.findById(postID);
  if (post) {
    await post.remove();
    res.json({ message: "Post deleted." });
  } else {
    res.status(404);
    throw new Error("Post not found.");
  }
});

const updatePost = asyncHandler(async (req, res) => {
  const postID = req.params.id;
  const post = await Post.findById(postID);
  if (post) {
    await post.save();
    res.json({ message: "Post deleted." });
  } else {
    res.status(404);
    throw new Error("Post not found.");
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

const addComment = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.id);
  const userName = req.user.userName;
  const { comment } = req.body;

  if (post) {
    post.comments.push({ comment: comment, userName: userName });
    await post.save();

    res
      .status(200)
      .json({ message: `Comment has been added on Post`, post: post });
  } else {
    res.status(404);
    throw new Error("Post not found.");
  }
});

module.exports = {
  getAllUserPosts,
  createPost,
  getParticularPost,
  allPosts,
  deletePost,
  addComment,
};
