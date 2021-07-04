import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import InputFeed from "../feed/InputFeed";
import Conversation from "./Conversation";

const Messages = () => {
  return (
    <div className="messages">
      <Conversation />

      <InputFeed />
    </div>
  );
};

const mapStateToProps = (state) => state;

export default connect(mapStateToProps)(Messages);
