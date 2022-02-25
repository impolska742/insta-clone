const express = require("express");
const {
  createPost,
  getParticularPost,
  allPosts,
  getAllUserPosts,
  addComment,
  deletePost,
  updatePost,
  deleteComment,
} = require("../controllers/postControllers");
const { protect } = require("../middlewares/authMiddleware");
const router = express.Router();

router.route("/all-posts").get(allPosts);
router.route("/").get(protect, getAllUserPosts);
router.route("/:id").get(protect, getParticularPost);
router.route("/create").post(protect, createPost);
router.route("/comment/:id").post(protect, addComment);
router.route("/comment/:id").delete(protect, deleteComment);
router.route("/delete/:id").delete(protect, deletePost);
router.route("/update/:id").patch(protect, updatePost);

module.exports = router;
