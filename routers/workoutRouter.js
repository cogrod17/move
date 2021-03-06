const express = require("express");
const router = express.Router();
const Workout = require("../models/workoutModel");
const Summary = require("../models/summaryModel");
const auth = require("../middleware/auth");
const sortByDate = require("./helperFunctions");

///create workout
router.post("/workout", auth, async (req, res) => {
  req.body.owner = req.user._id;
  req.body.username = req.user.username;

  delete req.body.file;

  if (req.body.type !== "cardio") delete req.body.distance;

  const workout = await new Workout(req.body);
  const summary = await Summary.findOne({ owner: req.user._id });

  try {
    await workout.calcPace();
    await workout.save();
    await summary.add(workout);
    await summary.save();

    res.status(201).send(workout);
  } catch (e) {
    res.status(400).send(e);
  }
});

//Read Workout
router.get("/workout", auth, async (req, res) => {
  try {
    const workout = await Workout.findOne({
      _id: req.body._id,
    });

    if (!workout) throw new Error();

    res.status(200).send(workout);
  } catch (e) {
    res.status(400).send(e);
  }
});

//get workouts history for user
router.get("/workout/history", auth, async (req, res) => {
  const { _id } = req.user;

  try {
    let history = await Workout.find({ owner: _id });

    await history.sort(sortByDate);

    res.status(200).send(history);
  } catch (e) {
    res.status(404).send(e);
  }
});

//get all workouts for feed
router.get("/workout/feed", async (req, res) => {
  try {
    let feed = await Workout.find();

    await feed.sort(sortByDate);

    res.status(200).send(feed);
  } catch (e) {
    res.status(400).send(e);
  }
});

//Get cardio history to plot pace graph
// router.get("/workout/cardio_history", async (req, res) => {
//   try {
//     const cardios = await Workout.find({
//       username: req.headers.username,
//       type: "cardio",
//     });

//     const paceHistory = cardios.map((w) => {
//       return { pace: w.pace, date: w.date };
//     });

//     res.status(200).send(paceHistory);
//   } catch (e) {
//     console.log(e);
//     res.status(404).send(e);
//   }
// });

//Edit Workout
//BE CAREFUL UPDATIING THE WORKOUT
//will have to edit the summary too
router.patch("/workout", auth, async (req, res) => {
  const { _id } = req.body;
  delete req.body._id;

  const updates = Object.keys(req.body);
  const isAllowed = ["type", "distance", "duration", "description"];
  const isValid = updates.every((key) => isAllowed.includes(key));

  if (!isValid) res.status(400).send({ error: "invalid update" });

  try {
    const workout = await Workout.findOne({ _id: _id });
    const summary = await Summary.findOne({ owner: req.user._id });

    if (!workout || !summary) throw new Error();

    await summary.delete(workout);

    updates.forEach((key) => (workout[key] = req.body[key]));

    await workout.save();
    await summary.add(workout);
    await summary.save();
    res.send(workout);
  } catch (e) {
    res.status(404).send(e);
  }
});

//Delete Workout
router.delete("/workout/:workout_id", auth, async (req, res) => {
  try {
    const workout = await Workout.findOne({ _id: req.params.workout_id });
    const summary = await Summary.findOne({ owner: req.user._id });

    if (!workout || !summary) throw new Error();

    await summary.delete(workout);

    await workout.remove();
    await summary.save();
    res.send(workout);
  } catch (e) {
    res.status(500).send();
  }
});

module.exports = router;
