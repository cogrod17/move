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
  require("../routers/conversationRouter"),
  require("../routers/messageRouter"),
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

io.on("connection", (socket) => {
  console.log("new client connected");

  //sendMsg(socket);

  socket.on("create", (room) => {
    // console.log(room);
    socket.join(room);
    //io.to(room).emit("receiveMessage", `this is ${room}`);

    // socket.to(room).on("sendMessage", (message, callback) => {
    //   console.log(message, room);
    //   socket.to(room).broadcast.emit("receiveMessage", message);
    //   callback("delivered");
    //});
  });

  socket.on("sendMessage", (room, message) => {
    socket.to(room).emit("receiveMessage", message);
  });

  socket.on("disconnect", () => {
    console.log("client disconnected");
  });
});

// const sendMsg = (socket) => {
//   const msg = "connected to the socket";
//   socket.emit("FromAPI", msg);
// };
//////////////////////////////
//////////////////////////////

server.listen(port, () => {
  console.log("NODE IS RUNNING ON PORT " + port);
});
