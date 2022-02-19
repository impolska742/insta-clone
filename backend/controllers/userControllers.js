const User = require("../models/UserModel");
const Post = require("../models/PostModel");
const FriendRequest = require("../models/FriendRequestModel");
const asyncHandler = require("express-async-handler");
const generateToken = require("../utils/generateToken");

const getAllFriendsPosts = asyncHandler(async (req, res) => {
  let allPosts = [];

  for (const friend of req.user.friends) {
    const currFriend = await User.findById(friend);
    const friendPosts = await Post.find({ user: currFriend._id });
    for (const post of friendPosts) {
      allPosts.push(post);
    }
  }

  if (allPosts) {
    res.status(201);
    res.json({ posts: allPosts });
  } else {
    res.status(404);
    throw new Error("Posts not found.");
  }
});

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

const sendFriendRequest = asyncHandler(async (req, res) => {
  const requester = req.user;
  const recipient = await User.findById(req.params.id);

  const alreadyFriends = requester.friends.includes(recipient);

  if (requester === recipient) {
    res.status(400);
    throw new Error("You cannot send request to yourself.");
  }

  if (alreadyFriends) {
    res.status(400);
    throw new Error(
      `${requester.name ? requester.name : requester.userName} and 
      ${
        recipient.name ? recipient.name : recipient.userName
      } are already friends.`
    );
  } else if (!requester || !recipient) {
    res.status(400);
    throw new Error("Error occurred while sending request.");
  }

  const request = await FriendRequest.findOne({
    requester: requester,
    recipient: recipient,
  });

  if (request) {
    res.status(400);
    throw new Error("Request already present.");
  } else {
    const request = await FriendRequest.create({
      requester: requester,
      recipient: recipient,
    });

    if (request) {
      res.status(201).json({ request: request });
    } else {
      res.status(400);
      throw new Error("Error occurred while creating new request.");
    }
  }
});

const getAllFriendRequests = asyncHandler(async (req, res) => {
  const requests = await FriendRequest.find({
    recipient: req.user,
  });

  if (requests) {
    res.status(201);
    res.json({
      requests: requests,
    });
  } else {
    res.status(404);
    throw new Error("No requests found.");
  }
});

const acceptFriendRequest = asyncHandler(async (req, res) => {
  const request = await FriendRequest.findById(req.params.id);

  if (!request) {
    res.status(404);
    throw new Error("Friend request not found.");
  } else {
    const recipient = await User.findById(req.user._id);
    const requester = await User.findById(request.requester._id);

    recipient.friends.push(requester);
    requester.friends.push(recipient);

    await recipient.save();
    await requester.save();

    await request.remove();
    res.status(200).json({
      message: `Congratulations you are now friends with ${
        requester.name ? requester.name : requester.userName
      }`,
    });
  }
});

const rejectFriendRequest = asyncHandler(async (req, res) => {
  const request = await FriendRequest.findById(req.params.id);

  if (!request) {
    res.status(404);
    throw new Error("Friend request not found.");
  } else {
    await request.remove();
    res.status(200).json({ message: "Friend request rejected." });
  }
});

module.exports = {
  registerUser,
  loginUser,
  updateUser,
  getAllUsers,
  getAllFriendsPosts,
  sendFriendRequest,
  acceptFriendRequest,
  rejectFriendRequest,
  getAllFriendRequests,
};
