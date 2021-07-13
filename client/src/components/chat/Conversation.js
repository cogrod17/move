import React, { useEffect, useState } from "react";
import { connect } from "react-redux";

//socket
import socketClient from "socket.io-client";
const ENDPOINT = "http://127.0.0.1:3001";

const Conversation = () => {
  const [response, setResponse] = useState(null);

  useEffect(() => {
    const socket = socketClient(ENDPOINT);
    socket.on("FromAPI", (data) => {
      setResponse(data);
    });

    return () => socket.disconnect();
  }, []);

  return (
    <div className="conversation">
      <p className="received">{response}</p>
    </div>
  );
};

const mapStateToProps = (state) => state;

export default connect(mapStateToProps)(Conversation);
