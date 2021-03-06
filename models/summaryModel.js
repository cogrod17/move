const mongoose = require("mongoose");

const summarySchema = new mongoose.Schema({
  moveDays: {
    type: Number,
    default: 0,
  },
  moveMin: {
    type: Number,
    default: 0,
  },
  cardioDays: {
    type: Number,
    default: 0,
  },
  milesRun: {
    type: Number,
    default: 0,
  },
  cardioMin: {
    type: Number,
    default: 0,
  },
  avgPace: {
    type: Number,
    default: 0,
  },
  strengthDays: {
    type: Number,
    default: 0,
  },
  hiitDays: {
    type: Number,
    default: 0,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
});

summarySchema.methods.add = function (newWorkout) {
  this.moveDays += 1;
  this.moveMin += newWorkout.duration;

  if (newWorkout.type.toLowerCase() === "cardio") {
    this.cardioDays += 1;
    this.milesRun += newWorkout.distance;
    this.cardioMin += newWorkout.duration;
    this.avgPace = this.cardioMin / this.milesRun;
  }
  if (newWorkout.type.toLowerCase() === "strength") this.strengthDays += 1;
  if (newWorkout.type.toLowerCase() === "hiit") this.hiitDays += 1;
};

summarySchema.methods.delete = function (workout) {
  this.moveDays -= 1;
  this.moveMin -= workout.duration;

  if (workout.type.toLowerCase() === "cardio") {
    this.cardioDays -= 1;
    this.milesRun -= workout.distance;
    this.cardioMin -= workout.duration;
    this.avgPace = this.cardioMin / this.milesRun;
  }
  if (workout.type.toLowerCase() === "strength") this.strengthDays -= 1;
  if (workout.type.toLowerCase() === "hiit") this.hiitDays -= 1;
};

const Summary = mongoose.model("Summary", summarySchema);

module.exports = Summary;
