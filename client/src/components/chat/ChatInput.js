import React, { useState } from "react";
import { connect } from "react-redux";
import { newMessage } from "../../actions";

const ChatInput = ({ activeChat, newMessage }) => {
  const [message, setMessage] = useState("");

  const sendMessage = (e) => {
    e.preventDefault();
    if (message === "" || !activeChat) return;

    const { socket, room } = activeChat;
    newMessage(message, room, socket);
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

export default connect(mapStateToProps, { newMessage })(ChatInput);
