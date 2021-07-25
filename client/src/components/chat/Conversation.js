import React, { useEffect, useRef } from "react";
import { connect } from "react-redux";
import { getChatHistory, receiveMessage, selectChat } from "../../actions";

const Conversation = (props) => {
  const {
    activeChat,
    getChatHistory,
    conversations,
    user,
    receiveMessage,
    selectChat,
  } = props;

  const ref = useRef();

  const scrollToBottom = () => {
    if (!ref.current) return;
    ref.current.scrollIntoView({ behavior: "smooth" });
  };

  ////////////////////////////
  useEffect(() => {
    if (!activeChat) return;
    let { socket, room } = activeChat;
    scrollToBottom();

    getChatHistory(activeChat.room);

    socket.emit("create", room);
    socket.on("receiveMessage", (message) => {
      scrollToBottom();
      receiveMessage(message);
    });

    return () => socket.disconnect();
  }, [activeChat, getChatHistory, receiveMessage]);
  ////////////////////////////

  ////////////////////////////
  if (!activeChat)
    return <h1 className="conversation">Pick a friend to chat with!</h1>;
  ////////////////////////////

  const renderHistory = () => {
    if (!activeChat.room) return;

    let [{ messages }] = conversations
      .filter((convo) => convo._id === activeChat.room)
      .reverse();

    if (!messages) return null;
    scrollToBottom();

    let length = messages.length;

    return messages.map((msg, i) => {
      if (msg.author === user.username) {
        return (
          <p className="sent" key={i}>
            {msg.message}
          </p>
        );
      } else {
        return (
          <p className="received" key={i}>
            {msg.message}
          </p>
        );
      }
    });
  };

  ////////////////////////////

  return (
    <div>
      <h3 className="chat-username">{activeChat.username}</h3>

      <div className="conversation">
        <div
          style={{
            padding: "20px",
          }}
          ref={ref}
        ></div>
        {renderHistory()}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => state;

export default connect(mapStateToProps, {
  getChatHistory,
  receiveMessage,
  selectChat,
})(Conversation);
