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
    validate: {
      validator: function (value) {
        return /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,7})$/.test(
          value
        );
      },
      message: "Please enter a valid email address",
    },
  },
  password: {
    type: String,
    required: true,
  },
  resumelink: {
    type: String,
    required: true,
    validate: {
      validator: function (value) {
        return /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/.test(
          value
        );
      },
      message: "Please enter a valid URL",
    },
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
