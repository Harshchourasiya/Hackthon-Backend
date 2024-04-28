const express = require("express");
const router = express.Router();
const UserSchema = require("../../schema/UserSchema.js");
const Test = require("../../schema/TestSchema.js");
const Home = require("./homepage/Home.js");
const Blog = require("./blog/Blog.js");
const Discussion = require('./discussion/Discussion.js');
router.use('/blog', Blog);
router.use('/home', Home);
router.use('/discussion', Discussion);

// POST route for jobSeeker signup
router.post("/signup", async (req, res) => {
  const { name, email, password, resumelink, degree} =
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
      degree,
    });

    // Save the new user to the database
    await newUser.save();

    res
      .status(201)
      .json({ message: "User created successfully", user: newUser });
  } catch (error) {
    console.error("User creation error:", error);
    res.status(400).json({ error: "Internal server error" });
  }
});

// login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find the user by email
    const user = await UserSchema.findOne({ email: email, password : password });
    // Check if user exists
    if (!user) {
      return res.status(401).json({ error: "Invalid email or password" });
    }
    // User is authenticated
    res.status(200).json({ message: "Login successful", user });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});


router.post("/apply", async(req, res)=> {
  // applyed

  res.status(200).json({"message": "applied"});
});


module.exports = router;
