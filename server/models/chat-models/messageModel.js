const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
  conversation_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Conversation",
  },
  author: String, //username or _id
  message: String,
  created_at: Date,
});

messageSchema.pre("save", async function (next) {
  this.created_at = new Date();

  next();
});

const Message = mongoose.model("Message", messageSchema);

module.exports = Message;
