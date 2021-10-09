// Import Packages
const mongoose = require("mongoose");

// Create Data Schema
const CommentSchema = new mongoose.Schema(
  {
    content: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

// Make Model with Data Schema
const Comment = mongoose.model("Comment", CommentSchema);

// Export Model
exports.Comment = Comment;
