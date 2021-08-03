const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
  parent_id: String, //_id of post or workout added to it
  text: { type: String, required: true },
  author: String, //Username
  date: String,
});

commentSchema.pre("save", async function (next) {
  this.date = new Date();

  next();
});

const Comment = mongoose.model("Comment", commentSchema);

module.exports = Comment;
