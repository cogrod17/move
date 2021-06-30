const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    default: new Date(),
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

const Post = mongoose.model("Post", postSchema);

module.exports = Post;
