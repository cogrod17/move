import React from "react";
import { connect } from "react-redux";
import { selectChat } from "../../actions";
import ChatInput from "./ChatInput";
import Conversation from "./Conversation";

const Messages = () => {
  return (
    <div className="messages">
      <Conversation />
      <ChatInput />
    </div>
  );
};

const mapStateToProps = (state) => state;

export default connect(mapStateToProps, { selectChat })(Messages);
