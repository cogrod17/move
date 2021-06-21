const express = require("express");
const router = express.Router();
const Workout = require("../models/workoutModel");
const auth = require("../middleware/auth");

///create workout
router.post("/workout", auth, async (req, res) => {
  const { _id } = req.user;

  try {
    req.body.owner = _id;
    const workout = await new Workout(req.body);

    await workout.save();
    res.status(201).send({ workout });
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

    res.status(200).send({ workout });
  } catch (e) {
    res.status(400).send(e);
    console.log(e);
  }
});

//Edit Workout
router.patch("/workout", auth, async (req, res) => {
  console.log(req);
  const updates = Object.keys(req.body);
  console.log(updates);

  //REMOVED THE _ID FROM THE UPDATES
  //UPDATES IS AN ARRAY

  const isAllowed = ["type", "distance", "duration", "description"];
  const isValid = updates.every((key) => isAllowed.includes(key));

  if (!isValid) res.status(400).send({ error: "invalid update" });

  try {
    //need to find the workout that is to be updated
    const workout = findOne({
      _id: req.body._id,
    });

    if (!workout) throw new Error();

    updates.forEach((key) => (workout[key] = req.body[key]));

    workout.save();
    res.send(workout);
  } catch (e) {
    console.log(e);
    res.status(404).send(e);
  }
});

//Delete Workout

module.exports = router;
