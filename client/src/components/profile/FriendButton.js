import React from "react";
import { connect } from "react-redux";
import { getStatus, searchRequests } from "../../helperFunctions";

const FriendButton = ({ user, viewUser, friendRequests }) => {
  let status = getStatus();

  if (status === "user") return <p>Settings</p>;

  if (!friendRequests) return <p>Loading</p>;
  /*
  1) Send request  ---> Add Friend
  2) Accept Request ----> Accept Request
  3) Pending ---> Pending
  */
  searchRequests(friendRequests, viewUser.user.username);

  return <p className="add-friend">Add Friend</p>;
};

const mapStateToProps = (state) => state;

export default connect(mapStateToProps)(FriendButton);
