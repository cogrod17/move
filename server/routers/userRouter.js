const router = require("express").Router();
const User = require("../models/userModel");
const Summary = require("../models/summaryModel");
const Workout = require("../models/workoutModel");
const Post = require("../models/postModel");
const FriendRequest = require("../models/friendRequestModel");
const sortByDate = require("./helperFunctions");
const auth = require("../middleware/auth");
const bcrypt = require("bcryptjs");
const multer = require("multer");

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

    const requests = await FriendRequest.find({
      receiver: user.username,
    });

    const token = await user.giveAuthToken();
    res.status(200).send({ user, token, requests });
  } catch (e) {
    console.log(e);
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
  const requests = await FriendRequest.find({
    receiver: req.user.username,
  });

  res.send({ user: req.user, requests });
});

//Read other users profile
router.get("/viewuser", auth, async (req, res) => {
  const { username } = req.headers;

  try {
    const user =
      username === req.user.username
        ? req.user
        : await User.findOne({ username });
    //console.log(user);

    if (!user) throw new Error();

    delete user.tokens;
    delete user.password;

    const workouts = await Workout.find({ owner: user._id });
    const [summary] = await Summary.find({ owner: user._id });
    const posts = await Post.find({ owner: user._id });

    workouts.sort(sortByDate);
    posts.sort(sortByDate);

    // const request = await FriendRequest.find({
    //   $or: [
    //     {
    //       $and: [{ sender: req.user.username }, { receiver: username }],
    //     },
    //     {
    //       $and: [{ sender: username }, { receiver: req.user.username }],
    //     },
    //   ],
    //   status: 1,
    // });

    const viewUser = {
      user,
      workouts,
      summary,
      posts,
      //request,
    };

    res.status(200).send(viewUser);
  } catch (e) {
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

const upload = multer({
  limits: {
    fileSize: 15999999,
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(jpg|jpeg|png|JPG)$/)) {
      return cb(new Error("please upload an image"));
    }

    cb(undefined, true);
  },
});

//add avatar to user
router.post(
  "/avatar",
  auth,
  upload.single("avatar"),
  async (req, res) => {
    req.user.avatar = req.file.buffer;
    await req.user.save();
    res.send(req.user);
  },
  (error, req, res) => {
    console.log(error);
    res.status(400).send({ error: error.message });
  }
);

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
router.patch("/unfriend", auth, async (req, res) => {
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
