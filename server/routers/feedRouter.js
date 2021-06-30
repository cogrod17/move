const express = require("express");
const router = express.Router();
const Workout = require("../models/workoutModel");
const Post = require("../models/postModel");
const auth = require("../middleware/auth");

//HOW TO GET TWO COLLECTIONS AT ONCE AND SORT BY DATE

//get all posts and workouts
router.get("/feed", auth, async (req, res) => {
  try {
    const workouts = await Workout.find();

    const posts = await Post.find().sort({ date: -1 });

    console.log(posts);

    let feed = [...workouts, ...posts];

    await feed.sort({ date: -1 });

    res.status(200).send(feed);
  } catch (e) {
    console.log(e);
    res.status(400).send(e);
  }
});

module.exports = router;
