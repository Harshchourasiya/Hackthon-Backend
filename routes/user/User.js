const express = require("express");
const router = express.Router();
const UserSchema = require("../../Schema/UserSchema.js");
const Test = require("../../schema/TestSchema.js");
const Home = require("./homepage/Home.js");

router.use('/home', Home);

// POST route for jobSeeker signup
router.post("/signup", async (req, res) => {
  const { name, email, password, resumelink, participate, degree, Blogs } =
    req.body;

  try {
    const existingUser = await UserSchema.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "Email is already exist" });
    }

    const newUser = new UserSchema({
      name,
      email,
      password,
      resumelink,
      participate,
      degree,
      Blogs,
    });

    // Save the new user to the database
    await newUser.save();

    res
      .status(201)
      .json({ message: "User created successfully", user: newUser });
  } catch (error) {
    console.error("User creation error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find the user by email
    const user = await UserSchema.findOne({ email });
    // Check if user exists
    if (!user) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    // Compare passwords
    if (password !== user.password) {
      return res.status(401).json({ error: "Invalid email or password" });
    }
    // User is authenticated
    res.status(200).json({ message: "Login successful", user });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// recommend test
router.get("/:degree", async (req, res) => {
  const { degree } = req.params;
  try {
    // const user = await
  } catch (error) {}
});

// All test
router.get("/tests", async (req, res) => {
  try {
    // Fetch all tests from the database
    const tests = await Test.find({}, { _id: 0 });
    // Return the tests in JSON format
    res.status(200).json({ tests });
  } catch (error) {
    console.error("Error fetching tests:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
