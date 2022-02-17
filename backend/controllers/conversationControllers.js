const Message = require("../models/MessageModel");
const asyncHandler = require("express-async-handler");
const User = require("../models/UserModel");

const getConversation = asyncHandler(async (req, res) => {
  try {
    const conversation = req.conversation;
    if (conversation) {
      res.status(201).json({
        conversation: conversation,
      });
    } else {
      res.status(404);
      throw new Error("Conversation not found.");
    }
  } catch (error) {
    res.status(404);
    throw new Error("Conversation not found.");
  }
});

const sendMessage = asyncHandler(async (req, res) => {
  const user_id = req.params.user_id;
  const user = await User.findById(user_id);
  const conversation = req.conversation;
  const main_user = req.user._id;

  if (conversation) {
    const { content, media } = req.body;
    const sender = main_user;
    const reciever = user;

    const message = await Message.create({
      sender,
      reciever,
      content,
      media,
    });

    if (message) {
      conversation.messages.push(message);
      await conversation.save();
    } else {
      res.status(400);
      throw new Error("Error occurred while sending the message.");
    }
  } else {
    res.status(404);
    throw new Error("There was some error starting the conversation.");
  }
});

module.exports = { getConversation, sendMessage };
