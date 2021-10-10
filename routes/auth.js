// Import Packages
const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

// Import User Model
const { User } = require("../models/User");

// Extract router from express
const router = express.Router();

// GET - Display Sign-Up Form
router.get("/sign-up", (req, res) => {
  res.render("sign-up");
});

// POST - Submit Sign-Up Data
router.post("/sign-up", (req, res) => {
  const user = new User(req.body);

  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(user.password, salt, (err, hash) => {
      if (err) throw err;
      user.password = hash;
    });
  });

  user
    .save()
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, process.env.SECRET_KEY, {
        expiresIn: "60 days",
      });
      // console.log(token);
      res.cookie("nToken", token, { maxAge: 900000, httpOnly: true });
      return res.redirect("/");
    })
    .catch((err) => {
      console.log(err.message);
    });
});

// Export router
module.exports = router;
