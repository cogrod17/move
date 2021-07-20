import React, { useEffect, useState, useRef } from "react";
import { connect } from "react-redux";
import { getChatHistory, receiveMessage } from "../../actions";

const Conversation = (props) => {
  const {
    activeChat,
    getChatHistory,
    conversations,
    user,
    receiveMessage,
  } = props;

  const ref = useRef();

  const scrollToBottom = () => {
    if (!ref.current) return;
    console.log("running");
    console.log(ref.current);
    ref.current.scrollIntoView({ behavior: "smooth" });
  };

  ////////////////////////////
  useEffect(() => {
    scrollToBottom();
    if (!activeChat) return;
    let { socket, room } = activeChat;
    getChatHistory(activeChat.room);

    socket.emit("create", room);

    socket.on("receiveMessage", (message) => {
      receiveMessage(message);
    });

    return () => {
      console.log("disconnect");
      socket.disconnect();
    };
  }, [activeChat, getChatHistory]);
  ////////////////////////////

  ////////////////////////////
  if (!activeChat)
    return <h1 className="conversation">Pick a friend to chat with!</h1>;
  ////////////////////////////

  const renderHistory = () => {
    scrollToBottom();
    let [{ messages }] = conversations.filter(
      (convo) => convo._id === activeChat.room
    );

    if (!messages) return null;

    return messages.map((msg, i) => {
      if (msg.author === user.username)
        return (
          <p className="sent" key={i}>
            {msg.message}
          </p>
        );

      if (msg.author !== user.username)
        return (
          <p className="received" key={i}>
            {msg.message}
          </p>
        );
    });
  };

  ////////////////////////////

  return (
    <div className="conversation">
      <h3>{activeChat.username}</h3>
      {renderHistory()}
      <br />
      <div style={{ float: "left", clear: "both" }} ref={ref}></div>
    </div>
  );
};

const mapStateToProps = (state) => state;

export default connect(mapStateToProps, { getChatHistory, receiveMessage })(
  Conversation
);
