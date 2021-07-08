const router = require("express").Router();
const FriendRequest = require("../models/friendRequestModel");
const User = require("../models/userModel");
const auth = require("../middleware/auth");

//create
//needs body with username of receiver
router.post("/request", auth, async (req, res) => {
  const sender = req.user.username;
  const receiver = req.body.username;

  try {
    //check to see if they already sent a request and if user exists
    const check = await FriendRequest.find({ sender, receiver, status: 1 });
    const user = await User.find({ username: receiver });
    if (check.length > 0 && check.status !== 3)
      throw new Error("request already exists");
    if (!user) throw new Error("User does not exist");

    const request = await new FriendRequest({ sender, receiver });

    await request.save();

    res.send(request);
  } catch (e) {
    res.status(400).send(e);
  }
});

//read all requests for user
router.get("/request", auth, async (req, res) => {
  try {
    const received = await FriendRequest.find({
      receiver: req.user.username,
      status: 1,
    });
    const sent = await FriendRequest.find({
      sender: req.user.username,
      status: 1,
    });

    res.send({ received, sent });
  } catch (e) {
    res.status(404).send(e);
  }
});

//update
router.patch("/request/response", auth, async (req, res) => {
  //THe request will be sent from the client
  //will have the _id of request and 'accept' or 'decline'

  const receiver = req.user;
  const { _id, action } = req.body;

  try {
    ///Change status
    const request = await FriendRequest.findOne({ _id });
    if (!request) throw new Error();

    //edit the users according to status
    const sender = await User.findOne({ username: request.sender });
    // const receiver = await User.findOne({ username: request.receiver });

    if (action === "accept") {
      //add eachother as friend
      sender.friends.push(receiver.username);
      receiver.friends.push(sender.username);
      request.status = 2;

      await sender.save();
      await receiver.save();
      await request.save();
      res.status(200).send(request);
    }

    if (action === "decline") {
      request.status = 3;
      await request.save();
      res.sendStatus(200);
    }
  } catch (e) {
    res.status(400).send(e);
  }
});

//delete
router.delete("/request", auth, async (req, res) => {
  try {
    const request = await FriendRequest.findOne({ _id: req.body._id });

    if (!request) throw new Error();

    await request.remove();

    res.sendStatus(200);
  } catch (e) {
    res.status(404).send(e);
  }
});

module.exports = router;
