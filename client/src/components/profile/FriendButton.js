import React from "react";
import { connect } from "react-redux";
import { getStatus } from "../../helperFunctions";

const FriendButton = ({ user, viewUser, friendRequests }) => {
  let status = getStatus();
  if (status === "user") return null;
  if (!friendRequests) return <p>Loading</p>;

  if (user.friends.includes(viewUser.user.username))
    return <p className="add-friend">Unfriend</p>;

  //if the user sent a request
  let sent = friendRequests.sent.filter(
    (req) => req.receiver === viewUser.user.username && req.status === 1
  );
  if (sent.length >= 1) return <p className="add-friend">Pending</p>;

  //if the user received a request
  let received = friendRequests.received.filter(
    (req) => req.sender === viewUser.user.username && req.status === 1
  );
  if (received.length >= 1)
    return <p className="add-friend">Accept Friend Request</p>;

  return <p className="add-friend">Add Friend</p>;
};

const mapStateToProps = (state) => state;

export default connect(mapStateToProps)(FriendButton);

/*
  1) Send request  ---> Add Friend
  2) Accept Request ----> Accept Request
  3) Pending ---> Pending
  */
