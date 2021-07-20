import React from "react";
import { connect } from "react-redux";
import { selectChat, openModal } from "../../actions";

//socket
import socketClient from "socket.io-client";
const ENDPOINT = "http://127.0.0.1:3001";

const ContactList = ({ user, selectChat, openModal }) => {
  const { username } = user;

  const renderFriends = () => {
    return user.friends.map((friend, i) => {
      return (
        <p
          onClick={() => selectChat(username, friend, socketClient(ENDPOINT))}
          key={i}
        >
          {friend}
        </p>
      );
    });
  };

  return (
    <div className=" contacts">
      <div>
        <h1>Chats</h1>
        <h1 onClick={() => openModal("new-chat")} className="new-chat">
          +
        </h1>
      </div>
      {renderFriends()}
    </div>
  );
};

const mapStateToProps = (state) => state;

export default connect(mapStateToProps, { selectChat, openModal })(ContactList);
