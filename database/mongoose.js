const mongoose = require("mongoose");

mongoose
  .connect(process.env.DBURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => console.log("database connected"))
  .catch((e) => console.log("database NOT connected"));
