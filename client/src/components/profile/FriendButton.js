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

  let status = getUserStatus();
  if (status === "user") return <p className="add-friend">Settings</p>;
  if (!friendRequests) return null;
  let friendStatus = getFriendStatus(user, viewUser, friendRequests);

  if (friendStatus === "friends") return <p className="add-friend">Unfriend</p>;
  if (friendStatus === "sent") return <p className="add-friend">Pending</p>;
  if (friendStatus === "respond")
    return <p className="add-friend">Accept Friend Request</p>;
  if (friendStatus === "not friends")
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
