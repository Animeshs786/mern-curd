const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name must be required."],
  },
  email: {
    type: String,
    required: [true, "Email must be required."],
    unique: [true, "Email already exit."],
    validate: [validator.isEmail, "Please provide correct email."],
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

const User = mongoose.model("User", userSchema);
module.exports = User;
