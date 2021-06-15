import React, { Component } from "react";
import { connect } from "react-redux";
import InputFeed from "../feed/InputFeed";
import Conversation from "./Conversation";
import ContactList from "./ContactList";

class Messages extends Component {
  render() {
    return (
      <div className="messages">
        <Conversation />

        <InputFeed />
      </div>
    );
  }
}

const mapStateToProps = (state) => state;

export default connect(mapStateToProps)(Messages);
