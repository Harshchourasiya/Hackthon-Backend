const mongoose = require("mongoose");

const jobSeekerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
  mobileNumber: {
    type: String,
    required: true,
    trim: true,
  },
  gender: {
    type: String,
    enum: ["Male", "Female", "Other"],
    required: true,
  },
  education: {
    type: String,
    required: true,
    trim: true,
  },
  resumeLink: {
    type: String,
    required: true,
    trim: true,
  },
});

const JobSeeker = mongoose.model("JobSeeker", jobSeekerSchema);

module.exports = JobSeeker;
