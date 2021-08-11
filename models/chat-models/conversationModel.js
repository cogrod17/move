const mongoose = require("mongoose");
const Message = require("./messageModel");

const conversationSchema = new mongoose.Schema({
  participants: [String],
  created_at: Date,
});

conversationSchema.virtual("message", {
  ref: "Message",
  localField: "_id",
  foreignField: "conversation_id",
});

conversationSchema.pre("save", async function (next) {
  this.created_at = new Date();

  next();
});

conversationSchema.statics.deleteAllConvos = async (username) => {
  const convos = await Conversation.find({ participants: username });
  convos.forEach(async (convo) => {
    await Message.deleteMany({ conversation_id: convo._id });
    await Conversation.deleteOne({ _id: convo._id });
  });
};

const Conversation = mongoose.model("Conversation", conversationSchema);

module.exports = Conversation;
