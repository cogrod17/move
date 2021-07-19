import React, { useEffect, useState } from "react";
import { connect } from "react-redux";

//socket
// import socketClient from "socket.io-client";
// const ENDPOINT = "http://127.0.0.1:3001";

const Conversation = ({ socket, activeChat }) => {
  const [response, setResponse] = useState("hi");

  useEffect(() => {
    if (!activeChat || !socket) return;
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
