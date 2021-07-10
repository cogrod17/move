import React from "react";
import { connect } from "react-redux";
import { getUserStatus, getFriendStatus } from "../../helperFunctions";
import { sendFriendReq, respondToRequest } from "../../actions";

const FriendButton = (props) => {
  const {
    user,
    viewUser,
    friendRequests,
    sendFriendReq,
    respondToRequest,
  } = props;

  const status = getUserStatus();

  if (status === "user") return <p className="add-friend">Settings</p>;
  // if (!friendStatus) getFriendStatus(user, viewUser, friendRequests);
  if (viewUser.friendStatus.length === 0)
    return <p>THERES A GLITCH IN THE MATRIX</p>;
  let isFriend = viewUser.friendStatus[0];

  if (isFriend.status === 2) return <p className="add-friend">Unfriend</p>;

  if (isFriend.status === 1 && isFriend.sender === user.username)
    return <p className="add-friend">Pending</p>;

  if (isFriend.status === 1 && isFriend.receiver === user.username)
    return <p className="add-friend">Accept Friend Request</p>;

  if (!isFriend)
    return (
      <p
        className="add-friend"
        onClick={() => sendFriendReq(viewUser.user.username)}
      >
        Add Friend
      </p>
    );
};

const mapStateToProps = (state) => state;

const mapDispatchToProps = { sendFriendReq, respondToRequest };

export default connect(mapStateToProps, mapDispatchToProps)(FriendButton);

/*
  1) Send request  ---> Add Friend
  2) Accept Request ----> Accept Request
  3) Pending ---> Pending
  */
