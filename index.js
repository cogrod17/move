const express = require("express");
require("./database/mongoose"); ///
const app = express();
const path = require("path");

const port = process.env.PORT;

const production = "https://move-ogrodnick.herokuapp.com";
const development = "http://localhost:3000";
const url = process.env.NODE_ENV ? production : development;

app.use(
  require("cors")(),
  express.json(),
  require("./routers/userRouter"),
  require("./routers/friendRequestRouter"),
  require("./routers/workoutRouter"),
  require("./routers/summaryRouter"),
  require("./routers/postRouter"),
  require("./routers/feedRouter"),
  require("./routers/conversationRouter"),
  require("./routers/messageRouter"),
  require("./routers/imageRouter"),
  require("./routers/commentRouter")
);

/////////////////////////////
///SOCKET
const http = require("http");
const server = http.createServer(app);
const socketio = require("socket.io");
const io = socketio(server, {
  cors: {
    origin: url,
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

/////////////////////////////

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

server.listen(port, () => {
  console.log("NODE IS RUNNING ON PORT " + port);
});
