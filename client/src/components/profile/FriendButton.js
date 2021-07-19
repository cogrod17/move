import React from "react";
import { connect } from "react-redux";
import {
  sendFriendReq,
  acceptReq,
  unfriend,
  openModal,
  getFriendRequests,
} from "../../actions";
import useFriendStatus from "../../hooks/useFriendStatus";

const FriendButton = (props) => {
  const {
    user,
    viewUser,
    sendFriendReq,
    acceptReq,
    unfriend,
    openModal,
    friendRequests,
  } = props;

  const [friendStatus] = useFriendStatus(user, viewUser, friendRequests);

  if (friendStatus.status === "loading")
    return <p className="add-friend">Loading...</p>;

  if (user.username === window.location.pathname.substring(9))
    return (
      <p className="add-friend" onClick={() => openModal("friend-requests")}>
        {`${
          friendRequests.filter((i) => i.sender !== user.username).length
        } Requests`}
      </p>
    );

  if (friendStatus.status === "friends")
    return (
      <p
        className="add-friend"
        onClick={() => unfriend(viewUser.user.username)}
      >
        Unfriend
      </p>
    );

  if (friendStatus.status === "not friends") {
    return (
      <p
        className="add-friend"
        onClick={() => {
          sendFriendReq(viewUser.user.username);
        }}
      >
        Add Friend
      </p>
    );
  }

  if (friendStatus.status === "pending")
    return <p className="add-friend">Pending</p>;

  if (friendStatus.status === "respond")
    return (
      <p
        className="add-friend"
        onClick={() => {
          acceptReq(viewUser.request[0]._id);
        }}
      >
        Accept Friend Request
      </p>
    );
};

const mapStateToProps = (state) => state;

const mapDispatchToProps = {
  sendFriendReq,
  acceptReq,
  unfriend,
  openModal,
  getFriendRequests,
};

export default connect(mapStateToProps, mapDispatchToProps)(FriendButton);
