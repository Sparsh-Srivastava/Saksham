const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    ngo_name: {
      type: String,
      required: "{PATH} is required!",
    },
    founder_name: {
      type: String,
      required: "{PATH} is required!",
    },
    email: {
      type: String,
      required: "{PATH} is required!",
    },
    password: {
      type: String,
      required: "{PATH} is required!",
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
