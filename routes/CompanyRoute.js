const express = require("express");
const router = express.Router();
const Company = require("./../models/CompnayData");

// POST route for company signup
router.post("/signup", async (req, res) => {
  //   const {
  //     companyName,
  //     email,
  //     password,
  //     phoneNumber,
  //     address,
  //     industry,
  //     website,
  //   } = req.body;

  try {
    // Check if the email is already in use
    const existingCompany = await Company.findOne({ email });
    if (existingCompany) {
      return res.status(400).json({ error: "Email is already in use" });
    }
    const data = req.body;
    const newCompany = new Company(data);

    // Save the new company to the database
    const response = await newCompany.save();
    console.log("Company added saved Sucessfully");
    res.status(201).json({ message: "Company created successfully" });
  } catch (error) {
    console.error("Company signup error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
