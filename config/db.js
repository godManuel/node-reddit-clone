// Import Packages
const mongoose = require("mongoose");

// Connect to MongoDB Compass
mongoose
  .connect("mongodb://localhost/reddit-clone", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("MongoDB Connection Successfully...");
  })
  .catch((err) => {
    console.log("MongoDB Connection Failed!", err);
  });

// Export Mongoose
module.exports = { mongoose };
