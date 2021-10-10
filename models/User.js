// Import Packages
const mongoose = require("mongoose");

// Create Data Schema
const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

// Make Model with Data Schema
const User = mongoose.model("User", UserSchema);

// Export Model
exports.User = User;
