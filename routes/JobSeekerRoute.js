const express = require("express");
const router = express.Router();
const JobSeeker = require("./../models/JobSeeker");

// POST route for jobSeeker signup
router.post("/signup", async (req, res) => {
  try {
    // Check if the email is already in use
    const existingJobSeeker = await Company.findOne({ email });
    if (existingJobSeeker) {
      return res.status(400).json({ error: "Email is already in use" });
    }
    const data = req.body;
    const newSeeker = new JobSeeker(data);

    // Save the new company to the database
    const response = await newSeeker.save();
    console.log("User added saved Sucessfully");
    res.status(201).json({ message: "Account created successfully" });
  } catch (error) {
    console.error("Signup error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
