const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  resumelink: {
    type: String,
    required: true,
  },
  participate: {
    type: [String],
  },
  degree: {
    type: String,
    required: true,
  },
  blogs: {
    type: [String],
  },
});

const User = mongoose.model("User", userSchema);
module.exports = User;
