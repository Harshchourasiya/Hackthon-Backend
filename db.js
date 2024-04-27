const mongoose = require("mongoose");

// Define the mongdodb url
const mongoUrl = "mongodb://localhost:27017/thirdparty";

mongoose
  .connect(mongoUrl)
  .then(() => console.log("Connected to MongoDB server"))
  .catch((error) => console.error("Connection error:", error));

const db = mongoose.connection;

db.on("disconnected", () => {
  console.log("MongoDB Disconnected  ");
});

// Export DB
module.exports = db;
