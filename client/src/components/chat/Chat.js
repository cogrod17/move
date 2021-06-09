import React, { Component } from "react";
import { connect } from "react-redux";

class Chat extends Component {
  render() {
    return (
      <div className="chat-container">
        <h1>Chat</h1>
      </div>
    );
  }
}

const mapStateToProps = (state) => state;

export default connect(mapStateToProps)(Chat);
