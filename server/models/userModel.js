const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const TOP_SECRET = require("./topSecret");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  friends: [String],
  tokens: [{ token: { type: String, required: true } }],
});

userSchema.virtual("workout", {
  ref: "Workout",
  localField: "_id",
  foreignField: "owner",
});

userSchema.virtual("summary", {
  ref: "Summary",
  localField: "_id",
  foreignField: "owner",
});

userSchema.methods.giveAuthToken = async function () {
  const token = jwt.sign({ _id: this._id.toString() }, TOP_SECRET);
  this.tokens = this.tokens.concat({ token });
  await this.save();
  return token;
};

userSchema.methods.toJSON = function () {
  const user = this.toObject();

  delete user.password;
  delete user.tokens;

  return user;
};

userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 8);
  }
  next();
});

userSchema.statics.removeFromFriends = async (username) => {
  const users = await User.find({ friends: username });
  users.forEach(async (user) => {
    await user.friends.filter((f) => f !== username);
    await user.save();
  });
};

const User = mongoose.model("User", userSchema);

module.exports = User;
