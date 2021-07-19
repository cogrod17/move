const mongoose = require("mongoose");

const conversationSchema = new mongoose.Schema({
  participants: [String],
  created_at: Date,
});

conversationSchema.virtual("conversation", {
  ref: "Conversation",
  localField: "_id",
  foreignField: "conversation_id",
});

conversationSchema.pre("save", async function (next) {
  this.created_at = new Date();

  next();
});

const Conversation = mongoose.model("Conversation", conversationSchema);

module.exports = Conversation;
