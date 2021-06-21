const mongoose = require("mongoose");

const workoutSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  distance: {
    type: Number,
    required: true,
  },
  duration: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
});

// workoutSchema.pre("save", function (next) {
//   this.pace = this.duration / this.distance;

//   next();
// });

const Workout = mongoose.model("Workout", workoutSchema);

module.exports = Workout;
