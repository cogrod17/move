const router = require("express").Router();
const FriendRequest = require("../models/friendRequestModel");
const User = require("../models/userModel");
const auth = require("../middleware/auth");

//create
router.post("/request", auth, async (req, res) => {
  const sender = req.user.username;
  const receiver = req.body.username;

  try {
    //check to see if they already sent a request
    const check = await FriendRequest.find({ sender, receiver });
    if (check.length > 0) throw new Error("already sent request");

    const request = await new FriendRequest({ sender, receiver });

    await request.save();

    res.send(request);
  } catch (e) {
    res.status(400).send(e);
  }
});

//read all requests for user as receiver
router.get("/request", auth, async (req, res) => {
  try {
    const received = await FriendRequest.find({ receiver: req.user.username });
    const sent = await FriendRequest.find({ sender: req.user.username });

    res.send({ received, sent });
  } catch (e) {
    res.status(404).send(e);
  }
});

//update
router.patch("/request", auth, async (req, res) => {
  //THe request will be sent from the client
  const { sender, receiver } = req.body;

  try {
    ///Change status
    const request = await FriendRequest.findOne({ _id: req.body._id });
    if (!request) throw new Error();

    //edit the users according to status
  } catch (e) {
    res.status(400).send(e);
  }
});

//delete
router.delete("/request", auth, async (req, res) => {});

module.exports = router;
