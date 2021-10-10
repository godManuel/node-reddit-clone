// Import Packages
const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const cookieParser = require("cookie-parser");
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
app.use(cookieParser());

// Set View Engine
app.set("view engine", "ejs");

// Use Routes
app.use("/", require("./routes/posts"));
app.use("/", require("./routes/comments"));
app.use("/auth", require("./routes/auth"));

// Set Port
const port = 4500;

// Start Express App
app.listen(port, () => {
  console.log(`Server started at port ${port}...`);
});
