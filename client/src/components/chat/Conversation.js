import React, { useEffect, useRef } from "react";
import { connect } from "react-redux";
import { getChatHistory, receiveMessage, selectChat } from "../../actions";
import { formatDate } from "../../helperFunctions";

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
      receiveMessage(message);
      scrollToBottom();
    });

    return () => socket.disconnect();
  }, [activeChat, getChatHistory, receiveMessage]);
  ////////////////////////////

  ////////////////////////////
  if (!activeChat)
    return (
      <h2 className="conversation no-active">Pick a friend to chat with!</h2>
    );
  ////////////////////////////

  const renderHistory = () => {
    if (!activeChat.room) return;

    let [{ messages }] = conversations
      .filter((convo) => convo._id === activeChat.room)
      .reverse();

    if (!messages) return null;

    return messages.map((msg, i) => {
      if (messages.length - 1 === i) console.log(i);
      if (msg.author === user.username) {
        return (
          <div className="msg sent" key={i}>
            <p id="msg" ref={i === 0 ? ref : null}>
              {msg.message}
            </p>
            <p>{formatDate(msg.created_at)}</p>
          </div>
        );
      } else {
        return (
          <div className="received " key={i}>
            <p id="msg" ref={i === 0 ? ref : null}>
              {msg.message}
            </p>

            <p>{formatDate(msg.created_at)}</p>
          </div>
        );
      }
    });
  };

  ////////////////////////////
  scrollToBottom();

  return (
    <div>
      <h3 className="chat-username">{activeChat.username}</h3>

      <div className="conversation">{renderHistory()}</div>
    </div>
  );
};

const mapStateToProps = (state) => state;

export default connect(mapStateToProps, {
  getChatHistory,
  receiveMessage,
  selectChat,
})(Conversation);
