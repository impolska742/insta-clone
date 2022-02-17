const asyncHandler = require("express-async-handler");
const User = require("../models/UserModel");
const Conversation = require("../models/ConversationModel");

const createConversation = asyncHandler(async (req, res, next) => {
  try {
    const user_id = req.params.user_id;
    const user = await User.findById(user_id);

    if (!user) {
      res.status(404);
      throw new Error("User not found.");
    } else {
      const main_user = req.user._id;

      const conversation = await Conversation.find({
        participants: { $all: [user, main_user] },
      });

      if (conversation) {
        req.conversation = conversation;
        next();
      } else {
        const created_conversation = await Conversation.create({
          participants: [user, main_user],
        });

        req.conversation = created_conversation;
        next();
      }
    }
  } catch (error) {
    res.status(401);
    throw new Error("Could not start the conversation.");
  }
});

module.exports = { createConversation };
