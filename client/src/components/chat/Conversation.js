import React, { useEffect, useState } from "react";
import { connect } from "react-redux";

///arr = [username, chatUsername]
// const createRoom = (arr) => {
//   return arr.sort().join("_");
// };

const Conversation = ({ activeChat }) => {
  const [response, setResponse] = useState();

  useEffect(() => {
    if (!activeChat) return;
    let { socket, room } = activeChat;

    socket.emit("create", room);

    socket.on("receiveMessage", (message) => {
      console.log("message received");

      setResponse(message);
    });

    return () => {
      console.log("disconnect");
      socket.disconnect();
    };
  }, [activeChat]);

  if (!activeChat)
    return <h1 className="conversation">Pick a friend to chat with!</h1>;

  return (
    <div className="conversation">
      <h3>{activeChat.username}</h3>

      <p className="received">{response}</p>
    </div>
  );
};

const mapStateToProps = (state) => state;

export default connect(mapStateToProps)(Conversation);
