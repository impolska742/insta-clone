const asyncHandler = require("express-async-handler");
const User = require("../models/UserModel");
const Chat = require("../models/ChatModel");
const { path } = require("express/lib/application");

const accessChat = asyncHandler(async (req, res) => {
  try {
    const { user_id } = req.body;

    if (!user_id) {
      res.status(404);
      throw new Error("User ID not sent with request");
    }

    var currChat = await Chat.find({
      isGroupChat: false,
      $and: [
        { users: { $elemMatch: { $eq: req.user._id } } },
        { users: { $elemMatch: { $eq: user_id } } },
      ],
    })
      .populate("users", "-password")
      .populate("latestMessage");

    currChat = await User.populate(currChat, {
      path: "latestMessage.sender",
      select: "name userName displayPhoto",
    });

    if (currChat.length > 0) {
      res.status(200).send(currChat[0]);
    } else {
      var chatData = {
        chatName: "sender",
        isGroupChat: false,
        users: [req.user._id, user_id],
      };

      try {
        const createdChat = await Chat.create(chatData);
        const fullChat = await Chat.findOne({ _id: createdChat._id }).populate(
          "users",
          "-password"
        );
        res.status(200).send(fullChat);
      } catch (err) {
        res.status(400);
        throw new Error(error.message);
      }
    }
  } catch (error) {
    res.status(401);
    throw new Error("Could not start the chat.");
  }
});

const fetchChats = asyncHandler(async (req, res) => {
  try {
    Chat.find({
      users: { $elemMatch: { $eq: req.user._id } },
    })
      .populate("users", "-password")
      .populate("groupAdmin", "-password")
      .populate("latestMessage")
      .sort({ updatedAt: -1 })
      .then(async (results) => {
        results = await User.populate(results, {
          path: "latestMessage.sender",
          select: "name userName displayPhoto",
        });

        res.status(200).send(results);
      });
  } catch (err) {
    throw new Error(err.message);
  }
});

const createGroupChat = asyncHandler(async (req, res) => {
  try {
    if (!req.body.users || !req.body.name) {
      res.status(400);
      throw new Error("Please fill all the fields");
    }

    const users = JSON.parse(req.body.users);

    if (users.length < 2) {
      res.status(400);
      throw new Error("More than 2 users are required for group chat");
    }

    users.push(req.user._id);

    const check = await Chat.findOne({
      chatName: req.body.name,
      users: users,
    });

    if (check) {
      throw new Error("Chat already created.");
    }

    const groupChat = await Chat.create({
      chatName: req.body.name,
      users: users,
      isGroupChat: true,
      groupAdmin: req.user,
    });

    const fullChat = await Chat.findById(groupChat._id)
      .populate("users", "-password")
      .populate("groupAdmin", "-password");

    res.status(200).send(fullChat);
  } catch (err) {
    res.status(400);
    throw new Error(err.message);
  }
});

const updateGroupChat = asyncHandler(async (req, res) => {
  const { chatId, chatName, users } = req.body;
  const updateUsers = JSON.parse(users);

  const updatedChat = await Chat.findByIdAndUpdate(
    chatId,
    { chatName, users: updateUsers },
    { new: true }
  )
    .populate("users", "-password")
    .populate("groupAdmin", "-password");

  currChat = await User.populate(currChat, {
    path: "groupAdmin.friends",
    select: "name userName displayPhoto",
  });

  if (!updatedChat) {
    res.status(404);
    throw new Error("Chat not found");
  } else {
    res.status(200).send(updatedChat);
  }
});

const deleteGroupChat = asyncHandler(async (req, res) => {
  await Chat.findByIdAndDelete(req.params.chatId).then((result) =>
    res.send(result)
  );
});

const deleteNormalChat = asyncHandler(async (req, res) => {
  await Chat.findByIdAndDelete(req.params.chatId).then((result) =>
    res.send(result)
  );
});

module.exports = {
  accessChat,
  fetchChats,
  createGroupChat,
  deleteGroupChat,
  updateGroupChat,
  deleteNormalChat,
};
