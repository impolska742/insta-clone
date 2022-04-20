const FollowRequest = require("../models/FollowRequestModel");
const User = require("../models/UserModel");
const Post = require("../models/PostModel");
const asyncHandler = require("express-async-handler");

const sendFollowRequest = asyncHandler(async (req, res) => {
  const requester = req.user;
  const recipient = await User.findById(req.params.id);

  const alreadyFollowing = requester.friends.includes(recipient);

  if (requester === recipient) {
    res.status(400);
    throw new Error("You cannot send follow request to yourself.");
  }

  if (alreadyFollowing) {
    res.status(400);
    throw new Error(
      `You are already following 
      ${recipient.name ? recipient.name : recipient.userName}.`
    );
  } else if (!requester || !recipient) {
    res.status(400);
    throw new Error("Error occurred while sending request.");
  }

  const request = await FollowRequest.findOne({
    requester: requester,
    recipient: recipient,
  });

  if (request) {
    res.status(400);
    throw new Error("Request already present.");
  } else {
    const request = await FollowRequest.create({
      requester: requester,
      recipient: recipient,
    });

    if (request) {
      res.status(201).json({ message: "Follow Request sent!" });
    } else {
      res.status(400);
      throw new Error("Error occurred while creating new request.");
    }
  }
});

const getAllFollowRequests = asyncHandler(async (req, res) => {
  const requests = await FollowRequest.find({
    recipient: req.user,
  });

  let temp_requests = [];

  for (const request of requests) {
    const sender = await User.findById(request.requester);
    const curr_request = {
      _id: request._id,
      sender: sender,
    };
    temp_requests.push(curr_request);
  }

  if (requests) {
    res.status(201);
    res.json({
      requests: temp_requests,
    });
  } else {
    res.status(404);
    throw new Error("No requests found.");
  }
});

const acceptFollowRequest = asyncHandler(async (req, res) => {
  const request = await FollowRequest.findById(req.params.id);

  if (!request) {
    res.status(404);
    throw new Error("Friend request not found.");
  } else {
    const recipient = await User.findById(req.user._id);
    const requester = await User.findById(request.requester._id);

    requester.friends.push(recipient);
    recipient.followers++;

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

const rejectFollowRequest = asyncHandler(async (req, res) => {
  const request = await FollowRequest.findById(req.params.id);

  if (!request) {
    res.status(404);
    throw new Error("Friend request not found.");
  } else {
    await request.remove();
    res.status(200).json({ message: "Friend request rejected." });
  }
});

const getAllFriendsPosts = asyncHandler(async (req, res) => {
  let allPosts = [];

  for (const friend of req.user.friends) {
    const currFriend = await User.findById(friend);
    const friendPosts = await Post.find({ user: currFriend._id });
    for (const post of friendPosts) {
      allPosts.push(post);
    }
  }

  allPosts.sort((a, b) => b.updatedAt - a.updatedAt);

  if (allPosts) {
    res.status(201);
    res.json({ posts: allPosts });
  } else {
    res.status(404);
    throw new Error("Posts not found.");
  }
});

const checkSentRequest = asyncHandler(async (req, res) => {
  const userID = req.params.id;
  const recipient = await User.findById(userID);

  if (recipient) {
    const request = await FollowRequest.findOne({
      requester: req.user,
      recipient: recipient,
    });

    if (request) {
      res.status(201).json({
        requestStatus: true,
      });
    } else {
      res.status(201).json({
        requestStatus: false,
      });
    }
  } else {
    res.status(404);
    throw new Error("User not found.");
  }
});

const checkAlreadyFollowing = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    const me = await User.findById(req.user._id);

    const alreadyFollowing = me.friends.includes(req.params.id);

    res.status(201).json({
      alreadyFollowing: alreadyFollowing,
    });
  } else {
    res.status(404);
    throw new Error("User not found.");
  }
});

module.exports = {
  sendFollowRequest,
  getAllFriendsPosts,
  acceptFollowRequest,
  rejectFollowRequest,
  getAllFollowRequests,
  checkSentRequest,
  checkAlreadyFollowing,
};
