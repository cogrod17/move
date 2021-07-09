const mongoose = require("mongoose");

const workoutSchema = new mongoose.Schema({
  title: {
    type: String,
  },
  type: {
    type: String,
    required: true,
  },
  date: {
    type: String,
  },
  distance: {
    type: Number,
  },
  duration: {
    type: Number,
    required: true,
  },
  pace: {
    type: Number,
    default: 0,
  },
  description: {
    type: String,
  },
  username: {
    type: String,
    required: true,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
});

workoutSchema.methods.calcPace = function () {
  if (this.type !== "cardio") return;
  this.pace = (this.duration / this.distance).toFixed(2);
};

workoutSchema.pre("save", async function (next) {
  this.date = new Date();

  next();
});

const Workout = mongoose.model("Workout", workoutSchema);

module.exports = Workout;
