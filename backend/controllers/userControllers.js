const User = require("../models/UserModel");
const Post = require("../models/PostModel");
const asyncHandler = require("express-async-handler");
const generateToken = require("../utils/generateToken");

const getAllUsers = asyncHandler(async (req, res) => {
  const keyword = req.query.search
    ? {
        $or: [
          { name: { $regex: req.query.search, $options: "i" } },
          { email: { $regex: req.query.search, $options: "i" } },
        ],
      }
    : {};

  const users = await User.find(keyword).find({ _id: { $ne: req.user._id } });
  res.send(users);
});

const registerUser = asyncHandler(async (req, res) => {
  const { userName, password, email } = req.body;

  const userWithEmailExists = await User.findOne({ email });
  const userWithUserNameExists = await User.findOne({ userName });

  if (userWithEmailExists) {
    res.status(400);
    throw new Error("User already exists.");
  } else if (userWithUserNameExists) {
    res.status(400);
    throw new Error("Username not available.");
  } else {
    const user = await User.create({
      userName,
      email,
      password,
    });

    if (user) {
      res.status(201).json({
        id: user._id,
        name: user.name,
        userName: user.userName,
        email: user.email,
        token: generateToken(user._id),
        firstUser: true,
      });
    } else {
      res.status(400);
      throw new Error("Error occurred while creating user.");
    }
  }
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user && (await user.matchPasswords(password))) {
    res.json({
      id: user._id,
      name: user.name,
      userName: user.userName,
      email: user.email,
      displayPhoto: user.displayPhoto,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid Email or Password.");
  }
});

const updateUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    user.name = req.body.name || user.name;
    user.displayPhoto = req.body.displayPhoto || user.displayPhoto;
    user.email = req.body.email || user.email;
    user.userName = req.body.userName || user.userName;
    user.bio = req.body.bio || user.bio;
    user.isPrivate = req.body.isPrivate || user.isPrivate;

    if (req.body.password) {
      user.password = req.body.password;
    }

    await user.save();

    res.json({
      message: "User updated successfully!!",
    });
  } else {
    res.status(404);
    throw new Error("User not found.");
  }
});

const getUserDetails = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  const userPosts = await Post.find({ user: user._id });

  if (user) {
    res.status(201);
    res.json({ user: user, posts: userPosts });
  } else {
    res.status(404);
    throw new Error("No user found.");
  }
});

const getUserFriends = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id).populate(
    "friends",
    "-password"
  );
  if (user.friends) {
    res.status(201).json({
      friends: user.friends,
    });
  } else {
    res.status(404);
    throw new Error("No users found.");
  }
});

const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  if (!user) {
    throw new Error("No user found.");
  } else {
    await user.remove();
    res.json({
      message: "User Deleted Successfully.",
    });
  }
});

module.exports = {
  registerUser,
  loginUser,
  updateUser,
  getAllUsers,
  deleteUser,
  getUserDetails,
  getUserFriends,
};
