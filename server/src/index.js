const express = require("express");
require("../database/mongoose");
const app = express();
const cors = require("cors");
const port = process.env.PORT || 3001;

///socket
const socketio = require("socket.io");
const http = require("http");
const server = http.createServer(app);
const io = socketio(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET"],
  },
});

//routers
const userRouter = require("../routers/userRouter");
const workoutRouter = require("../routers/workoutRouter");
const summaryRouter = require("../routers/summaryRouter");
const postRouter = require("../routers/postRouter");
const feedRouter = require("../routers/feedRouter");
const socketRouter = require("../routers/socketRouter");

app.use(express.json());

app.use(cors());

app.use(userRouter);
app.use(workoutRouter);
app.use(summaryRouter);
app.use(postRouter);
app.use(feedRouter);

app.use(socketRouter); //NOT SURE THIS IS NEEDED

//////////////////////////////
let interval;

io.on("connection", (socket) => {
  console.log("new client connected");
  if (interval) clearInterval(interval);

  interval = setInterval(() => sendMsg(socket), 1000);

  socket.on("disconnect", () => {
    console.log("client disconnected");
    clearInterval(interval);
  });
});

const sendMsg = (socket) => {
  const msg = "hello from the socket";
  socket.emit("FromAPI", msg);
};

//////////////////////////////

server.listen(port, () => {
  console.log("NODE IS RUNNING ON PORT " + port);
});
