const mongoose = require("mongoose");

const imageSchema = new mongoose.Schema({
  type: String, //workout or avatar
  parent: String, //workout _id or username
  data: Buffer,
});

const Image = mongoose.model("Image", imageSchema);

module.exports = Image;
