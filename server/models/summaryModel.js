const mongoose = require("mongoose");

const summarySchema = new mongoose.Schema({
  moveDays: {
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

summarySchema.methods.update = async function (newWorkout) {
  console.log(newWorkout);
  this.movesDays += 1;
};

const Summary = mongoose.model("Summary", summarySchema);

module.exports = Summary;
