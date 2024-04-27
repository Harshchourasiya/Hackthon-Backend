const express = require("express");
const router = express.Router();
const Company = require("../../Schema/CompnaySchema");

// POST route for company signup
router.post("/signup", async (req, res) => {});

// login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find the user by email
    const user = await Company.findOne({ email });
    // Check if user exists
    if (!user) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    // Compare passwords
    if (password !== Company.password) {
      return res.status(401).json({ error: "Invalid email or password" });
    }
    // User is authenticated
    res.status(200).json({ message: "Login successful", Company });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
