import React, { useEffect, useState } from "react";
import { connect } from "react-redux";

///arr = [username, chatUsername]
const createRoom = (arr) => {
  return arr.sort().join("_");
};

const Conversation = ({ socket, activeChat, user }) => {
  const [response, setResponse] = useState();

  useEffect(() => {
    if (!activeChat || !socket) return;

    socket.emit("create", createRoom([user.username, activeChat]));

    socket.on("receiveMessage", (message) => {
      console.log("message received");
      setResponse(message);
    });

    return () => socket.disconnect();
  }, [activeChat, socket]);

  return (
    <div className="conversation">
      <h3>{activeChat}</h3>
      <p className="received">{response}</p>
    </div>
  );
};

const mapStateToProps = (state) => state;

export default connect(mapStateToProps)(Conversation);
