const express = require("express");
const {
  loginUser,
  registerUser,
  updateUser,
  getAllUsers,
  getUserDetails,
  getUserFriends,
} = require("../controllers/userControllers");

const {
  sendFollowRequest,
  acceptFollowRequest,
  rejectFollowRequest,
  getAllFollowRequests,
  getAllFriendsPosts,
} = require("../controllers/friendControllers");

const { protect } = require("../middlewares/authMiddleware");
const router = express.Router();

router.route("/").get(getAllUsers);
router.route("/user-friends").get(protect, getUserFriends);
router.route("/friends-posts").get(protect, getAllFriendsPosts);
router.route("/:id").get(getUserDetails);

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/update").patch(protect, updateUser);

router.route("/friend-request/all").get(protect, getAllFollowRequests);
router.route("/friend-request/send/:id").post(protect, sendFollowRequest);
router.route("/friend-request/accept/:id").post(protect, acceptFollowRequest);
router.route("/friend-request/reject/:id").post(protect, rejectFollowRequest);

module.exports = router;
