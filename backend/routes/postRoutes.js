const express = require("express");
const {
  getAllPosts,
  createPost,
  getParticularPost,
} = require("../controllers/postControllers");
const { protect } = require("../middlewares/authMiddleware");
const router = express.Router();

router.route("/").get(protect, getAllPosts);
router.route("/:id").get(protect, getParticularPost);
router.route("/create").post(protect, createPost);

module.exports = router;
