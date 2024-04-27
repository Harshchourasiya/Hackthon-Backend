const express = require("express");
const router = express.Router();
const Blog = require('../../../schema/BlogSchema');
const User = require('../../../schema/UserSchema');
const {generateId} = require('../../../helper/utilFunctions');
router.get('/', async (req, res) => {
    try {
        const blogs = await Blog.find();
        res.status(200).json({ blogs });
    } catch (error) {
        console.error("Error fetching blogs:", error);
        res.status(400).json({ error: "Internal server error" });
    }
});

// Need : title, content
router.post('/', async (req, res) => {
    const { title, content } = req.body;
    try {
        const id = generateId();
        const newBlog = new Blog({ id, title, content });
        await newBlog.save();
        res
            .status(201)
            .json({ message: "Blog entry created successfully", data: newBlog });
    } catch (error) {
        console.error("Blog entry creation error:", error);
        res.status(500).json({ error: "Internal server error" });
    }

});


router.post('/comment', async (req, res) => {
    const { id, name, comment } = req.body;

    try {
        // Find the blog by ID
        const blog = await Blog.findOne({ id: id });
        if (!blog) {
            return res.status(404).json({ error: "Blog not found" });
        }

        // Add the comment to the blog
        blog.comment.push({ name, comment });
        await blog.save();

        res.status(200).json({ message: "Comment added successfully", data: blog});
    } catch (error) {
        console.error("Error adding comment:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

// Need: blog Id

router.put("/like", async (req, res) => {
    const { id } = req.body;
    try {
      // Find the blog by ID
      const blog = await Blog.findOne({ id: id });
      if (!blog) {
        return res.status(404).json({ error: "Blog not found" });
      }
  
      // Increment the likes count for the blog by fetching the current count from the database
      blog.likes = (blog.likes || 0) + 1;
      await blog.save();
  
      res.status(200).json({ message: "Like added successfully", "data": blog });
    } catch (error) {
      console.error("Error adding like:", error);
      res.status(500).json({ error: "Internal server error" });
    }
});

// Need: email, id
router.put('/save', async(req, res)=> {
    const {email, id} = req.body;
    if (email && id) {
        const data = await User.findOne({email: email});
        try {
            data.blogs.push(id);
            await data.save();
            res.status(200).json({"message": "Success", "data": data});
        } catch (error) {               
            res.status(401).json({"message": "Failed"});
        }
    } else {
        res.status(401).json({"message" : "Invalid data"});
    }
});


module.exports = router;