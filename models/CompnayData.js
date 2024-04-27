const mongoose = require("mongoose");

const companySchema = new mongoose.Schema({
  companyName: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
  },
  phoneNumber: {
    type: String,
    required: true,
    trim: true,
  },
  address: {
    type: String,
    required: true,
    trim: true,
  },
  industry: {
    type: String,
    required: true,
    trim: true,
  },
  website: {
    type: String,
    trim: true,
  },
});

const Company = mongoose.model("Company", companySchema);

module.exports = Company;
