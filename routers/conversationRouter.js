const router = require("express").Router();
const Conversation = require("../models/chat-models/conversationModel");
const auth = require("../middleware/auth");

//create
router.post("/newconversation", auth, async (req, res) => {
  ///needs username of both in array
  //participants: ['username', 'username']
  const convo = await new Conversation(req.body);

  try {
    await convo.save();

    res.status(200).send(convo);
  } catch (e) {
    console.log(e);
    res.status(400).send(e);
  }
});

//read all convos for user
router.get("/conversation", auth, async (req, res) => {
  try {
    const convos = await Conversation.find({ participants: req.user.username });

    res.status(200).send(convos);
  } catch (e) {
    console.log(e);
    res.status(404).send(e);
  }
});

//update

//delete
router.delete("/conversation", auth, async (req, res) => {
  const { _id } = req.body;

  try {
    const convo = await Conversation.findOne({ _id });

    await convo.remove();

    res.status(200).send(convo);
  } catch (e) {
    console.log(e);
    res.status(400).send(e);
  }
});

module.exports = router;
