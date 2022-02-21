const express = require("express");
const {
  createPost,
  getParticularPost,
  allPosts,
  getAllUserPosts,
  addComment,
} = require("../controllers/postControllers");
const { protect } = require("../middlewares/authMiddleware");
const router = express.Router();

router.route("/all-posts").get(allPosts);
router.route("/").get(protect, getAllUserPosts);
router.route("/:id").get(protect, getParticularPost);
router.route("/create").post(protect, createPost);
router.route("/:id").post(protect, addComment);

module.exports = router;
