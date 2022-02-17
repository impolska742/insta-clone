const mongoose = require("mongoose");

const MessageModel = mongoose.Schema(
  {
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    reciever: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    content: {
      type: String,
    },
    media: {
      type: Buffer,
    },
  },
  {
    timestamps: true,
  }
);

const Message = mongoose.model("Message", MessageModel);

module.exports = Message;
