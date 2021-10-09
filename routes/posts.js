// Import Packages
const express = require("express");

// Import Post Model
const { Post } = require("../models/Post");

// Extract router from Express
const router = express.Router();

// GET - New Post Route
router.get("/new", (req, res) => {
  res.render("posts-new");
});

// POST - New Post Route
router.post("/new", async (req, res) => {
  // Create a new post
  const post = new Post(req.body);
  // Save post to DB
  await post.save();
  return res.redirect("/");
});

// Export Router
module.exports = router;
