const express = require("express");
const {
  accessChat,
  fetchChats,
  createGroupChat,
  renameGroup,
  addToGroup,
  removeFromGroup,
} = require("../controllers/chatControllers");

const { protect } = require("../middlewares/authMiddleware");
const router = express.Router();

router.route("").post(protect, accessChat);
router.route("").get(protect, fetchChats);
router.route("/rename").put(protect, renameGroup);
router.route("/group").post(protect, createGroupChat);
router.route("/add").put(protect, addToGroup);
router.route("/remove").put(protect, removeFromGroup);

module.exports = router;
