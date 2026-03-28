const express = require("express");
const User = require("../models/User");
const auth = require("../middleware/auth");

const router = express.Router();

// Follow user
router.put("/follow/:id", auth, async (req, res) => {
    const user = await User.findById(req.params.id);
    user.followers.push(req.user);
    await user.save();
    res.json(user);
});

module.exports = router;