const mongoose = require("mongoose");

const FollowRequestSchema = new mongoose.Schema({
  requester: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  recipient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

FollowRequestSchema.index({ createdAt: 1 }, { expireAfterSeconds: 864000 });
const FollowRequest = mongoose.model("FollowRequest", FollowRequestSchema);

module.exports = FollowRequest;
