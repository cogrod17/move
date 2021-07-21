const router = require("express").Router();
const Message = require("../models/chat-models/messageModel");
const auth = require("../middleware/auth");

//create
router.post("/newmessage", auth, async (req, res) => {
  const { message, conversation_id } = req.body;

  const msg = await new Message({
    author: req.user.username,
    message,
    conversation_id,
  });

  try {
    await msg.save();

    res.status(200).send(msg);
  } catch (e) {
    console.log(e);
    res.status(400).send(e);
  }
});

//read
//read all messages in conversation
router.get("/message", async (req, res) => {
  const { conversation_id } = req.headers;

  try {
    const msgs = await Message.find({ conversation_id });

    await msgs.reverse();

    res.status(200).send(msgs);
  } catch (e) {
    console.log(e);
    res.status(404).send(e);
  }
});

//update

//delete

module.exports = router;
