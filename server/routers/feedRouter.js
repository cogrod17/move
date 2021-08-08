const express = require("express");
const router = express.Router();
const Workout = require("../models/workoutModel");
const Post = require("../models/postModel");
const auth = require("../middleware/auth");
const sortByDate = require("./helperFunctions");

//get all posts and workouts
router.get("/feed", async (req, res) => {
  const { page, limit } = req.query;

  try {
    const workouts = await Workout.find();

    const posts = await Post.find();

    let feed = await [...workouts, ...posts];

    await feed.sort(sortByDate);

    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    const result = feed.slice(startIndex, endIndex);

    res.status(200).send(result);
  } catch (e) {
    res.status(400).send(e);
  }
});

module.exports = router;
