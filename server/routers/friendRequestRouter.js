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
    const check = await FriendRequest.find({
      $or: [
        {
          $and: [
            { sender: req.user.username },
            { receiver: req.body.username },
          ],
        },
        {
          $and: [
            { sender: req.body.username },
            { receiver: req.user.username },
          ],
        },
      ],
      status: 1,
    });

    const user = await User.find({ username: receiver });
    if (check.length > 0) throw new Error("request already exists");
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
    // const received = await FriendRequest.find({
    //   receiver: req.user.username,
    // });
    // const sent = await FriendRequest.find({
    //   sender: req.user.username,
    // });

    const requests = await FriendRequest.find({
      $or: [{ sender: req.user.username }, { receiver: req.user.username }],
    });

    res.send(requests);
    //res.send({ sent, received });
  } catch (e) {
    res.status(404).send(e);
  }
});

//update
router.patch("/request/accept", auth, async (req, res) => {
  //will have the _id of request

  const receiver = req.user;
  const { _id } = req.body;

  try {
    ///Change status
    const request = await FriendRequest.findOne({ _id });
    if (!request) throw new Error();

    const sender = await User.findOne({ username: request.sender });

    sender.friends.push(receiver.username);
    receiver.friends.push(sender.username);

    await sender.save();
    await receiver.save();
    await request.remove();
    res.status(200).send(receiver);
  } catch (e) {
    res.status(400).send(e);
  }
});

//delete
router.delete("/request/decline", auth, async (req, res) => {
  try {
    const request = await FriendRequest.findOne({ _id: req.body._id });

    if (!request) throw new Error();

    await request.remove();

    res.status(200).send(request);
  } catch (e) {
    res.status(404).send(e);
  }
});

router.patch("/request/unfriend", auth, async (req, res) => {
  const { username } = req.body;
  const { user } = req;

  try {
    if (!username) throw new Error();

    // const [request] = await FriendRequest.find({
    //   $or: [
    //     { $and: [{ sender: username }, { receiver: user.username }] },
    //     { $and: [{ sender: user.username }, { receiver: username }] },
    //   ],
    //   status: 2,
    // });

    const [user2] = await User.find({ username });

    user.friends = user.friends.filter((friend) => {
      return friend !== user2.username;
    });

    user2.friends = user2.friends.filter((friend) => {
      return friend !== user.username;
    });

    await user.save();
    await user2.save();
    // await request.remove();

    res.status(200).send(user);
  } catch (e) {
    res.status(400).send(e);
  }
});

module.exports = router;
