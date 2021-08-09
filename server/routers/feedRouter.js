const express = require("express");
const router = express.Router();
const Workout = require("../models/workoutModel");
const Post = require("../models/postModel");
const auth = require("../middleware/auth");
const sortByDate = require("./helperFunctions");

//get all posts and workouts
router.get("/feed", auth, async (req, res) => {
  const { page, limit, filter } = req.query;
  const { user } = req;
  console.log(filter);

  try {
    let feed;
    let workouts;
    let posts;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    if (filter.toLowerCase() === "none") {
      workouts = await Workout.find();
      posts = await Post.find();
      feed = [...workouts, ...posts];
    }

    if (filter.toLowerCase() === "friends") {
      workouts = await Workout.find({
        $or: [{ username: user.friends }, { username: user.username }],
      });
      posts = await Post.find({
        $or: [{ username: user.friends }, { username: user.username }],
      });
      feed = [...workouts, ...posts];
    }

    if (filter.toLowerCase() === "workouts") {
      feed = await Workout.find();
    }

    if (filter.toLowerCase() === "posts") {
      feed = await Post.find();
    }

    feed.sort(sortByDate);

    const result = feed.slice(startIndex, endIndex);

    res.status(200).send(result);
  } catch (e) {
    res.status(400).send(e);
  }
});

module.exports = router;
