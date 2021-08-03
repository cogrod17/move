const router = require("express").Router();
const Comment = require("../models/commentModel");
const auth = require("../middleware/auth");

//create
router.post("/comments/:parent_id", auth, async (req, res) => {
  try {
    const comment = await new Comment({
      parent_id: req.params.parent_id,
      text: req.headers.text,
      author: req.user.username,
    });

    await comment.save();

    res.status(200).send(comment);
  } catch (e) {
    res.status(400).send(e);
  }
});

//read
//read all comments for a post
router.get("/comments/:parent_id", async (req, res) => {
  try {
    const comments = await Comment.find({ parent_id: req.params.parent_id });

    res.status(200).send(comments);
  } catch (e) {
    res.status(404).send(e);
  }
});

//delete single comment
router.delete("/comments/:comment_id", auth, async (req, res) => {
  try {
    const comment = await Comment.findOne({ _id: req.params.comment_id });

    if (!comment) throw new Error();

    await comment.remove();

    res.sendStatus(200);
  } catch (e) {
    res.status(404).send(e);
  }
});

//delete all for post
router.delete("/comments/deleteall/:parent_id", async (req, res) => {
  try {
    const comments = await Comment.find({ parent_id: req.params.parent_id });

    if (!comments.length) throw new Error();

    await comments.forEach((comment) => comment.remove());

    res.send();
  } catch (e) {
    res.status(404).send(e);
  }
});

module.exports = router;
