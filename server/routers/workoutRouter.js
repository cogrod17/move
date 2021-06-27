const express = require("express");
const router = express.Router();
const Workout = require("../models/workoutModel");
const Summary = require("../models/summaryModel");
const auth = require("../middleware/auth");

///create workout
router.post("/workout", auth, async (req, res) => {
  req.body.owner = req.user._id;
  const workout = await new Workout(req.body);
  const summary = await Summary.findOne({ owner: req.user._id });

  try {
    await workout.calcPace();
    await workout.save();
    await summary.add(workout);
    await summary.save();

    res.status(201).send(workout);
  } catch (e) {
    console.log(e);
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
    console.log(e);
  }
});

//get workouts history
router.get("/workout/history", auth, async (req, res) => {
  const { _id } = req.user;

  try {
    let history = await Workout.find({ owner: _id });

    res.status(200).send(history);
  } catch (e) {
    res.status(404).send(e);
  }
});

//Edit Workout
//BE CAREFUL UPDATIING THE WORKOUT
//HOW CAN I UPDATE THE SUMMARY AS WELL
router.patch("/workout", auth, async (req, res) => {
  const { _id } = req.body;
  delete req.body._id;

  const updates = Object.keys(req.body);
  const isAllowed = ["type", "distance", "duration", "description"];
  const isValid = updates.every((key) => isAllowed.includes(key));

  if (!isValid) res.status(400).send({ error: "invalid update" });

  try {
    const workout = await Workout.findOne({ _id: _id });

    if (!workout) throw new Error();

    updates.forEach((key) => (workout[key] = req.body[key]));

    workout.save();
    res.send(workout);
  } catch (e) {
    res.status(404).send(e);
  }
});

//Delete Workout
router.delete("/workout", auth, async (req, res) => {
  try {
    const workout = await Workout.findOne({ _id: req.body._id });

    if (!workout) throw new Error();

    await workout.remove();
    res.send(workout);
  } catch (e) {
    res.status(500).send();
  }
});

module.exports = router;
