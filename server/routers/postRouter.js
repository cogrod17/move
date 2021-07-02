const express = require("express");
const router = express.Router();
const Post = require("../models/postModel");
const auth = require("../middleware/auth");

//create
router.post("/post", auth, async (req, res) => {
  req.body.username = req.user.username;
  req.body.owner = req.user._id;
  const post = await new Post(req.body);

  try {
    await post.save();

    res.status(201).send(post);
  } catch (e) {
    console.log(e);
    res.status(400).send(e);
  }
});

//read all post
router.get("/post/feed", auth, async (req, res) => {
  try {
    const posts = await Post.find().sort({ date: -1 });

    res.status(200).send(posts);
  } catch (e) {
    console.log("here");
    res.status(400).send(e);
  }
});

//read posts from user
router.get("/post/profile", auth, async (req, res) => {
  try {
    const posts = await Post.find({ owner: req.user._id }).sort({ date: -1 });

    res.status(200).send(posts);
  } catch (e) {
    res.status(400).send(e);
  }
});

//update
router.patch("/post", auth, async (req, res) => {
  try {
    const post = await Post.findOne({ _id: req.body._id });

    post.text = req.body.text;

    await post.save();

    res.send(post);
  } catch (e) {
    res.status(404).send(e);
  }
});

//delete
router.delete("/post", auth, async (req, res) => {
  try {
    const post = await Post.findOne({ _id: req.body._id });

    await post.remove();
    res.send("deleted");
  } catch (e) {
    res.status(500).send();
  }
});

module.exports = router;
