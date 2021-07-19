import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { selectChat } from "../../actions";
import ChatInput from "./ChatInput";
import Conversation from "./Conversation";

//socket
import socketClient from "socket.io-client";
const ENDPOINT = "http://127.0.0.1:3001";

const Messages = ({ activeChat, selectChat }) => {
  //const [socket, setSocket] = useState(socketClient(ENDPOINT));
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    if (!activeChat) return;
    setSocket(socketClient(ENDPOINT));

    // socket.on("FromAPI", (data) => {
    //   //setResponse(data);
    //   console.log(data);
    // });
  }, [activeChat]);

  return (
    <div className="messages">
      <Conversation socket={socket} />
      <ChatInput socket={socket} />
    </div>
  );
};

const mapStateToProps = (state) => state;

export default connect(mapStateToProps, { selectChat })(Messages);
