const express = require("express");
require("../database/mongoose"); ///
const app = express();
const path = require("path");
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
  require("../routers/conversationRouter"),
  require("../routers/messageRouter"),
  require("../routers/imageRouter"),
  ("/images", express.static(path.join(__dirname, "images")))
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

io.on("connection", (socket) => {
  socket.on("create", (room) => {
    socket.join(room);
  });

  socket.on("sendMessage", (room, message) => {
    socket.to(room).emit("receiveMessage", message);
  });

  socket.on("disconnect", () => {});
});

server.listen(port, () => {
  console.log("NODE IS RUNNING ON PORT " + port);
});
