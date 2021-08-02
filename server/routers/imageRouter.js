const router = require("express").Router();
const Image = require("../models/imageModel");
const auth = require("../middleware/auth");
const multer = require("multer");

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

//create

//add avatar to user
router.post(
  "/image/avatar",
  auth,
  upload.single("image"),
  async (req, res) => {
    const oldImg = await Image.findOne({
      type: "avatar",
      parent: req.user.username,
    });

    if (!oldImg) {
      const img = await new Image({
        type: "avatar",
        parent: req.user.username,
        data: req.file.buffer,
      });
      await img.save();
    }

    if (oldImg) {
      oldImg.data = req.file.buffer;
      await oldImg.save();
    }

    res.send();
  },
  (error, req, res) => {
    res.status(400).send({ error: error.message });
  }
);

//create workout image
router.post(
  "/workout/image/:workout_id",
  auth,
  upload.single("image"),
  async (req, res) => {
    const oldImg = await Image.findOne({
      type: "workout",
      parent: req.params.workout_id,
    });

    if (!oldImg) {
      const img = await new Image({
        type: "workout",
        parent: req.params.workout_id,
        data: req.file.buffer,
      });
      await img.save();
    }

    if (oldImg) {
      oldImg.data = req.file.buffer;
      await oldImg.save();
    }

    res.send();
  },
  (error, req, res) => {
    res.status(400).send({ errorr: error.message });
  }
);

//read
router.get("/profile/avatar/:username", async (req, res) => {
  try {
    const avatar = await Image.findOne({ parent: req.params.username });

    if (!avatar) throw new Error();

    res.set("Content-Type", "image/jpg");
    res.send(avatar.data);
  } catch (e) {
    res.status(404).send(e);
  }
});

//read workout image
router.get("/workout/image/:workout_id", async (req, res) => {
  try {
    const img = await Image.findOne({ parent: req.params.workout_id });

    if (!img) throw new Error();

    res.set("Content-Type", "image/png");
    res.send(img.data);
  } catch (e) {
    res.status(404).send(e);
  }
});

//delete

module.exports = router;
