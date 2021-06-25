const express = require("express");
const router = express.Router();
const Summary = require("../models/summaryModel");
const auth = require("../middleware/auth");

//get summary numbers
router.get("/summary", auth, async (req, res) => {
  try {
    const summary = await Summary.findOne({
      owner: req.user._id,
    });

    if (!summary) throw new Error();

    res.status(200).send(summary);
  } catch (e) {
    res.status(404).send(e);
  }
});

module.exports = router;
