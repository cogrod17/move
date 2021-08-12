import React from "react";
import { connect } from "react-redux";
import ContactList from "./ContactList";
import Messages from "./Messages";
import "./chat.css";

const Chat = () => {
  return (
    <div className="chat-container  section ">
      <ContactList />
      <Messages />
    </div>
  );
};

const mapStateToProps = (state) => state;

export default connect(mapStateToProps)(Chat);
