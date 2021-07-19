import React, { useState } from "react";
import { connect } from "react-redux";

const ChatInput = ({ socket }) => {
  const [message, setMessage] = useState("");

  const sendMessage = (e) => {
    e.preventDefault();
    if (message === "" || !socket) return;
    socket.emit("sendMessage", message, (callback) => {
      console.log(callback);
    });
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
