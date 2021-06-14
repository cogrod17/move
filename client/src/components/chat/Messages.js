import React, { Component } from "react";
import { connect } from "react-redux";
import InputFeed from "../feed/InputFeed";
import Conversation from "./Conversation";

class Messages extends Component {
  render() {
    return (
      <div className="section messages">
        <h1>Messages</h1>
        <Conversation />
        <InputFeed />
      </div>
    );
  }
}

const mapStateToProps = (state) => state;

export default connect(mapStateToProps)(Messages);
