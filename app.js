// Import Packages
const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const path = require("path");

// Import DB
require("./config/db");

// Init Express App
const app = express();

// Set Express Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "/public")));
app.use(expressLayouts);

// Set View Engine
app.set("view engine", "ejs");

// Use Routes
app.use("/", require("./routes/posts"));

// Set Port
const port = 4500;

// Start Express App
app.listen(port, () => {
  console.log(`Server started at port ${port}...`);
});
