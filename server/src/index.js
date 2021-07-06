const express = require("express");
require("../database/mongoose"); ///
const app = express();
const port = process.env.PORT || 3001;

/*
const cors = require("cors");
const userRouter = require("../routers/userRouter");
const workoutRouter = require("../routers/workoutRouter");
const summaryRouter = require("../routers/summaryRouter");
const postRouter = require("../routers/postRouter");
const feedRouter = require("../routers/feedRouter");
const friendRequestRouter = require("../routers/friendRequestRouter");
const socketRouter = require("../routers/socketRouter");
app.use(cors())
app.use(express.json())
*/

app.use(
  require("cors")(),
  express.json(),
  require("../routers/userRouter"),
  require("../routers/friendRequestRouter"),
  require("../routers/workoutRouter"),
  require("../routers/summaryRouter"),
  require("../routers/postRouter"),
  require("../routers/feedRouter"),
  require("../routers/socketRouter") //don't think we need this
);
/////////////////////////////

/////////////////////////////
///SOCKET
const http = require("http");
const server = http.createServer(app);
const socketio = require("socket.io");
const io = socketio(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET"],
  },
});

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
//////////////////////////////

server.listen(port, () => {
  console.log("NODE IS RUNNING ON PORT " + port);
});
