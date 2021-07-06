//////////////////////////////

const socketio = require("socket.io");
let io = socketio();

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

module.exports = {
  init: (server) => {
    io =
      (server,
      {
        cors: {
          origin: "http://localhost:3000",
          methods: ["GET"],
        },
      });
    return io;
  },
  get: () => {
    if (!io) throw new Error("socket is not initialized");
    return io;
  },
};
