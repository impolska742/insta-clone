const User = require("../models/UserModel");
const asyncHandler = require("express-async-handler");
const generateToken = require("../utils/generateToken");

const getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.find();
  if (users) {
    res.status(201).json({ users: users });
  } else {
    res.status(404);
    throw new Error("No users found.");
  }
});

const registerUser = asyncHandler(async (req, res) => {
  const { name, userName, password, email } = req.body;

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
      name,
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

    if (req.body.password) {
      user.password = req.body.password;
    }

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      userName: updatedUser.userName,
      email: updatedUser.email,
      displayPhoto: updatedUser.displayPhoto,
      token: generateToken(updatedUser._id),
    });
  } else {
    res.status(404);
    throw new Error("User not found.");
  }
});

module.exports = { registerUser, loginUser, updateUser, getAllUsers };
