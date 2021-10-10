// Import Packages
const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

// Import User Model
const { User } = require("../models/User");

// Extract router from express
const router = express.Router();

// GET - Display User Sign-Up Form
router.get("/sign-up", (req, res) => {
  res.render("sign-up");
});

// POST - Create User
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
      res.cookie("nToken", token, { maxAge: 900000, httpOnly: true });
      return res.redirect("/");
    })
    .catch((err) => {
      console.log(err.message);
    });
});

// GET - Display User Login Form
router.get("/log-in", (req, res) => {
  res.render("log-in");
});

// POST - Login user
router.post("/log-in", (req, res) => {
  const { username, password } = req.body;

  User.findOne({ username }, "username password")
    .then((user) => {
      if (!user) {
        return res
          .status(401)
          .send({ message: "Username or password incorrect!" });
      }

      bcrypt.compare(password, user.password, (err, isMatch) => {
        if (!isMatch) {
          return res
            .status(401)
            .send({ message: "Username or password incorrect!" });
        }
      });

      const token = jwt.sign(
        { _id: user._id, username: user.username },
        process.env.SECRET_KEY
      );

      res.cookie("nToken", token, { maxAge: 900000, httpOnly: true });
    })
    .catch((err) => {
      console.log(err.message);
      x;
    });
});

// GET - Logout User
router.get("/logout", (req, res) => {
  res.clearCookie("nToken");
  res.redirect("/");
});

// Export router
module.exports = router;
