const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  country: {
    type: String,
    required: true,
    trim: true,
  },
  about: {
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
        return /^[\w-\.]+@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(value);
      },
      message: "Please enter a valid email address",
    },
  },
  sector: {
    type: String,
    required: true,
  },
  test: {
    type: [String],
  },
});

module.exports = mongoose.model("Company", schema);
