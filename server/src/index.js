const express = require("express");
require("../database/mongoose"); ///
const app = express();
const port = process.env.PORT || 3001;

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

//let interval;

io.on("connection", (socket) => {
  console.log("new client connected");
  // if (interval) clearInterval(interval);
  sendMsg(socket);

  socket.on("sendMessage", (message, callback) => {
    socket.broadcast.emit("receiveMessage", message);
    callback("delivered");
  });

  socket.on("disconnect", () => {
    console.log("client disconnected");
    // clearInterval(interval);
  });
});

const sendMsg = (socket) => {
  const msg = "connected to the socket";
  socket.emit("FromAPI", msg);
};
//////////////////////////////
//////////////////////////////

server.listen(port, () => {
  console.log("NODE IS RUNNING ON PORT " + port);
});
