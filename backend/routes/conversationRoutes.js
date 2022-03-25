const express = require("express");
const {
  getConversation,
  sendMessage,
  getAllConversations,
  getConversationMessages,
} = require("../controllers/conversationControllers");

const { protect } = require("../middlewares/authMiddleware");
const { createConversation } = require("../middlewares/conversationMiddleware");
const router = express.Router();

router.route("/").get(getAllConversations);
router.route("/:user_id").get(protect, createConversation, getConversation);
router
  .route("/:user_id/messages")
  .get(protect, createConversation, getConversationMessages);
router.route("/:user_id").post(protect, createConversation, sendMessage);

module.exports = router;
