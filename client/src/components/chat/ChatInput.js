import React, { useState } from "react";
import { connect } from "react-redux";

const ChatInput = ({ activeChat }) => {
  const [message, setMessage] = useState("");

  const sendMessage = (e) => {
    e.preventDefault();
    if (message === "" || !activeChat) return;
    const { socket, room } = activeChat;
    socket.emit("sendMessage", room, message);
    setMessage("");
  };

  return (
    <form onSubmit={(e) => sendMessage(e)} className="input-feed">
      <input
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Send Message"
        value={message}
      />
    </form>
  );
};

const mapStateToProps = (state) => state;

export default connect(mapStateToProps)(ChatInput);
