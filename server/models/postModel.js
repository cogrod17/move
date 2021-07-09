const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  date: {
    type: String,
  },
  text: {
    type: String,
    required: true,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
});

postSchema.pre("save", async function (next) {
  this.date = new Date();
  next();
});

const Post = mongoose.model("Post", postSchema);

module.exports = Post;
