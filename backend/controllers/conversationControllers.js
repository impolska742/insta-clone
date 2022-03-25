const asyncHandler = require("express-async-handler");
const Message = require("../models/MessageModel");
const User = require("../models/UserModel");
const Conversation = require("../models/ConversationModel");

const getAllConversations = asyncHandler(async (req, res) => {
  try {
    const allConversations = await Conversation.find();
    if (allConversations) {
      res.status(201).json({
        conversations: allConversations,
      });
    } else {
      res.status(404);
      throw new Error("Conversations not found.");
    }
  } catch (err) {
    res.status(404);
    throw new Error("Conversations not found.");
  }
});

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

      res.status(201).json({
        message: message,
      });
    } else {
      res.status(400);
      throw new Error("Error occurred while sending the message.");
    }
  } else {
    res.status(404);
    throw new Error("There was some error starting the conversation.");
  }
});

const getConversationMessages = asyncHandler(async (req, res) => {
  try {
    // console.log(req.conversation);
    if (req.conversation) {
      let chatMessages = [];

      for (const message of req.conversation.messages) {
        const currMessage = await Message.findById(message);
        chatMessages.push(currMessage);
      }

      res.status(201).json({
        messages: chatMessages,
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

module.exports = {
  getConversation,
  sendMessage,
  getAllConversations,
  getConversationMessages,
};
