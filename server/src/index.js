const express = require("express");
require("../database/mongoose");
const app = express();
const cors = require("cors");
const port = process.env.PORT || 3001;
const userRouter = require("../routers/userRouter");
const workoutRouter = require("../routers/workoutRouter");

app.use(express.json());

app.use(cors());

app.use(userRouter);
app.use(workoutRouter);

app.listen(port, () => {
  console.log("NODE IS RUNNING ON PORT:" + port);
});
