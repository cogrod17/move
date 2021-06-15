import React, { Component } from "react";
import { connect } from "react-redux";
import ContactList from "./ContactList";
import Messages from "./Messages";
import "./chat.css";

class Chat extends Component {
  render() {
    return (
      <div className="chat-container  section ">
        <ContactList />
        <Messages />
      </div>
    );
  }
}

const mapStateToProps = (state) => state;

export default connect(mapStateToProps)(Chat);
