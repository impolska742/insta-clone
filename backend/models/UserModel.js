const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const UserSchema = mongoose.Schema({
  name: {
    type: String,
  },
  profileStatus: {
    type: String,
  },
  userName: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  bio: {
    type: String,
  },
  password: {
    type: String,
    required: true,
  },
  displayPhoto: {
    type: String,
    default: process.env.TEMP_IMAGE,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  friends: [
    {
      type: mongoose.Schema.Types.ObjectId,
    },
  ],
});

UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  } else {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  }
});

UserSchema.method("matchPasswords", async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
