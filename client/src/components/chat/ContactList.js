import React, { useEffect } from "react";
import { connect } from "react-redux";
import { selectChat, openModal, getConvos } from "../../actions";

//socket
import socketClient from "socket.io-client";
const ENDPOINT = "https://move-ogrodnick.herokuapp.com/";
//const ENDPOINT = "http://127.0.0.1:3001";

const ContactList = (props) => {
  const { user, selectChat, openModal, conversations, getConvos } = props;
  const { username } = user;

  useEffect(() => {
    getConvos();
  }, [getConvos]);

  const renderConvos = () => {
    if (!conversations) return <p>loading...</p>;
    if (!conversations.length) return <h4>You have no conversations</h4>;

    return conversations.map((convo, i) => {
      let [friend] = convo.participants.filter((name) => name !== username);
      const { _id } = convo;

      return (
        <p
          onClick={() => selectChat(_id, friend, socketClient(ENDPOINT))}
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
      {renderConvos()}
    </div>
  );
};

const mapStateToProps = (state) => state;

export default connect(mapStateToProps, { selectChat, openModal, getConvos })(
  ContactList
);
