// Import Packages
const express = require("express");

// Import Post Model
const { Post } = require("../models/Post");

// Extract router from Express
const router = express.Router();

// GET - Create Post
router.get("/new", (req, res) => {
  res.render("posts-new");
});

// POST - Create Post
router.post("/new", (req, res) => {
  const post = new Post(req.body);
  post
    .save()
    .then((post) => {
      res.redirect("/");
    })
    .catch((err) => {
      console.log(err);
    });
});

// GET - Display Posts
router.get("/", (req, res) => {
  Post.find({})
    .lean()
    .then((posts) => {
      res.render("posts-index", { posts });
    })
    .catch((err) => {
      console.log(err.message);
    });
});

// GET - Display Single Post
router.get("/posts/:id", (req, res) => {
  Post.findById(req.params.id)
    .lean()
    .populate("comments")
    .then((post) => {
      res.render("post-single", { post });
    })
    .catch((err) => {
      console.log(err.message);
    });
});

// GET - Display Post(s) for Subreddit
router.get("/n/:subreddit", (req, res) => {
  Post.find({ subreddit: req.params.subreddit })
    .lean()
    .then((posts) => {
      res.render("posts-index", { posts });
    })
    .catch((err) => {
      console.log(err.message);
    });
});

// Export Router
module.exports = router;
