// Import Packages
const mongoose = require("mongoose");

// Create Data Schema
const PostSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
    summary: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

// Make Model with Data Schema
const Post = mongoose.model("Post", PostSchema);

// Export Model
exports.Post = Post;
