// Import Packages
const express = require("express");

// Init Express App
const app = express();

// Set View Engine
app.set("view engine", "ejs");

// GET - Index Route
app.get("/", (req, res) => {
  res.render("home");
});

// Set Port
const port = 4500;

// Start Express App
app.listen(port, () => {
  console.log(`Server started at port ${port}...`);
});
