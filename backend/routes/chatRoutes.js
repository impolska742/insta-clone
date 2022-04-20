const express = require("express");
const {
  accessChat,
  fetchChats,
  createGroupChat,
  updateGroupChat,
  deleteGroupChat,
  deleteNormalChat,
} = require("../controllers/chatControllers");

const { protect } = require("../middlewares/authMiddleware");
const router = express.Router();

router.route("").post(protect, accessChat);
router.route("").get(protect, fetchChats);
router.route("/delete-group/:chatId").delete(protect, deleteGroupChat);
router.route("/delete-normal/:chatId").delete(protect, deleteNormalChat);
router.route("/update-group").put(protect, updateGroupChat);
router.route("/group").post(protect, createGroupChat);

module.exports = router;
