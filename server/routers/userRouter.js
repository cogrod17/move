const router = require("express").Router();
const User = require("../models/userModel");
const Summary = require("../models/summaryModel");
const Workout = require("../models/workoutModel");
const Post = require("../models/postModel");
const FriendRequest = require("../models/friendRequestModel");
const sortByDate = require("./helperFunctions");
const auth = require("../middleware/auth");
const bcrypt = require("bcryptjs");

///create user
router.post("/create/user", async (req, res) => {
  const user = await new User(req.body);
  const summary = await new Summary({ owner: user._id });

  try {
    await user.save();

    await summary.save();
    const token = await user.giveAuthToken();
    res.status(201).send({ user, token });
  } catch (e) {
    res.status(400).send(e);
  }
});

//Login User
router.post("/login", async (req, res) => {
  try {
    const password = req.body.password;
    const user = await User.findOne({
      email: req.body.email,
    });

    if (!user) throw new Error("Incorrect email or password");

    const correctPassword = await bcrypt.compare(password, user.password);

    if (!correctPassword) throw new Error("Incorrect email or password");

    const token = await user.giveAuthToken();
    res.status(200).send({ user, token });
  } catch (e) {
    res.status(400).send(e);
  }
});

//Logout User
router.post("/logout", auth, async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter((token) => {
      return req.token !== token.token;
    });

    await req.user.save();
    res.send("logged out");
  } catch (e) {
    res.status(500).send();
  }
});

//Read My Profile
router.get("/profile/user", auth, async (req, res) => {
  res.send(req.user);
});

//Read other users profile
router.get("/viewuser", auth, async (req, res) => {
  try {
    const user = await User.findOne({ username: req.headers.username });

    if (!user) throw new Error();

    delete user.tokens;
    delete user.password;

    const workouts = await Workout.find({ owner: user._id });
    const summary = await Summary.find({ owner: user._id });
    const posts = await Post.find({ owner: user._id });

    workouts.sort(sortByDate);
    posts.sort(sortByDate);

    const viewUser = {
      user,
      workouts,
      summary,
      posts,
    };

    res.status(200).send(viewUser);
  } catch (e) {
    console.log(e);
    res.status(400).send(e);
  }
});

//Update User
router.patch("/update/user", auth, async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ["username", "email", "password"];
  const isValid = updates.every((key) => allowedUpdates.includes(key));

  if (!isValid) res.status(400).send({ error: "invalid updates" });

  try {
    updates.forEach((key) => (req.user[key] = req.body[key]));
    await req.user.save();
    res.send(req.user);
  } catch (e) {
    res.status(404).send(e);
  }
});

//add friend to friends list
router.patch("/addfriend", auth, async (req, res) => {
  const { user } = req;

  try {
    user.friends.push(req.body.username);

    await user.save();

    res.send(user);
  } catch (e) {
    res.status(400).send(e);
  }
});

//delete friend from friends list
router.patch("/deletefriend", auth, async (req, res) => {
  const { user, body } = req;

  try {
    const friend = await User.findOne({ username: body.username });

    user.friends = user.friends.filter((friend) => friend !== body.username);

    if (friend) {
      friend.friends = friend.friends.filter((f) => f !== user.username);
    }

    await user.save();
    await friend.save();

    res.status(200).send(user);
  } catch (e) {
    res.sendStatus(400);
  }
});

//Delete User
router.delete("/delete/user", auth, async (req, res) => {
  try {
    /*    Delete the user from other users friends
    const users = await User.find({ friends: req.user.username });
    await users.forEach((user) =>
      user.friends.filter((f) => f !== req.user.username)
    );
    await users.forEach((user) => user.save());
    */

    await req.user.remove();

    //delete all workouts and posts

    //delete summary

    res.send(req.user);
  } catch (e) {
    res.status(500).send();
  }
});

module.exports = router;
