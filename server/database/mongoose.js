const mongoose = require("mongoose");

const URL = "mongodb://127.0.0.1:27017/move";

mongoose
  .connect(URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => console.log("database connected"))
  .catch((e) => console.log("database NOT connected"));

/* 
database
/Users/Cole/MongoDB/bin/mongod --dbpath="MongoDB-data"
*/
