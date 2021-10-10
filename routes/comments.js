// Import Packages
const express = require("express");

// Extract router from Express
const router = express.Router();

// Import Comment & Post Model
const { Comment } = require("../models/Comment");
const { Post } = require("../models/Post");

// POST - Create comment
router.post("/posts/:postId/comments", (req, res) => {
  const comment = new Comment(req.body);

  comment
    .save()
    .then(() => Post.findById(req.params.postId))
    .then((post) => {
      post.comments.unshift(comment);
    })
    .then(() => {
      res.redirect("/");
    })
    .catch((err) => {
      console.log(err.message);
    });
});

module.exports = router;
