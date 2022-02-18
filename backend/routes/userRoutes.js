const express = require("express");
const {
  loginUser,
  registerUser,
  updateUser,
  getAllUsers,
  sendFriendRequest,
  acceptFriendRequest,
  rejectFriendRequest,
  getAllFriendRequests,
} = require("../controllers/userControllers");
const { protect } = require("../middlewares/authMiddleware");
const router = express.Router();

router.route("/").get(getAllUsers);
router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/profile").patch(protect, updateUser);

router.route("/friend-request/all").get(protect, getAllFriendRequests);
router.route("/friend-request/send/:id").post(protect, sendFriendRequest);
router.route("/friend-request/accept/:id").post(protect, acceptFriendRequest);
router.route("/friend-request/reject/:id").post(protect, rejectFriendRequest);

module.exports = router;
