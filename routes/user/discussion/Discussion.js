const express = require("express");
const router = express.Router();
const Discussion = require('../../../schema/DiscussionSchema');
const {generateId} = require('../../../helper/utilFunctions');

router.get('/', async (req, res) => {
    try {
        const Discussions = await Discussion.find({});
        res.status(200).json({ "message": "Successful", "data": Discussions });
    } catch (error) {
        console.error("Error fetching Discussions:", error);
        res.status(400).json({ error: "Internal server error" });
    }
});

// Need : title, content
router.post('/', async (req, res) => {
    const { title, content } = req.body;
    try {
        const id = generateId();
        const newDiscussion = new Discussion({ id, title, content });
        await newDiscussion.save();
        res
            .status(201)
            .json({ message: "Discussion entry created successfully", data: newDiscussion });
    } catch (error) {
        console.error("Discussion entry creation error:", error);
        res.status(500).json({ error: "Internal server error" });
    }

});

// Need: Id, name, comment

router.put('/comment', async (req, res) => {
    const { id, name, content} = req.body;

    try {
        // Find the Discussion by ID
        const dis = await Discussion.findOne({ id: id });
        if (!dis) {
            return res.status(404).json({ error: "Discussion not found" });
        }
        console.log(dis);

        // Add the comment to the Discussion
        dis.comment.push({ name: name, comment: content });
        await dis.save();

        res.status(200).json({ message: "Comment added successfully", data: dis});
    } catch (error) {
        console.error("Error adding comment:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});




module.exports = router;