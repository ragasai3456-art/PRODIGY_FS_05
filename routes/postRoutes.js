const express = require("express");
const Post = require("../models/Post");
const auth = require("../middleware/auth");

const router = express.Router();

// Create post
router.post("/", auth, async (req, res) => {
    const post = new Post({
        user: req.user,
        content: req.body.content,
        image: req.body.image
    });

    await post.save();
    res.json(post);
});

// Get all posts
router.get("/", async (req, res) => {
    const posts = await Post.find().populate("user", "username");
    res.json(posts);
});

// Like
router.put("/like/:id", auth, async (req, res) => {
    const post = await Post.findById(req.params.id);

    post.likes.push(req.user);
    await post.save();

    res.json(post);
});

// Comment
router.post("/comment/:id", auth, async (req, res) => {
    const post = await Post.findById(req.params.id);

    post.comments.push({
        user: req.user,
        text: req.body.text
    });

    await post.save();
    res.json(post);
});

module.exports = router;