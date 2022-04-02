const express = require("express");
const {
  accessChat,
  fetchChats,
  createGroupChat,
  updateGroupChat,
  deleteGroupChat,
} = require("../controllers/chatControllers");

const { protect } = require("../middlewares/authMiddleware");
const router = express.Router();

router.route("").post(protect, accessChat);
router.route("").get(protect, fetchChats);
router.route("/delete-group/:chatId").delete(protect, deleteGroupChat);
router.route("/update-group").put(protect, updateGroupChat);
router.route("/group").post(protect, createGroupChat);

module.exports = router;
