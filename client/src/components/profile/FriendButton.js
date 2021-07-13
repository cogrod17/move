import React from "react";
import { connect } from "react-redux";
import { getUserStatus } from "../../helperFunctions";
import { sendFriendReq, acceptReq, unfriend, openModal } from "../../actions";
import useFriendStatus from "../../hooks/useFriendStatus";

const FriendButton = (props) => {
  const {
    user,
    viewUser,
    sendFriendReq,
    acceptReq,
    unfriend,
    friendRequests,
    openModal,
  } = props;

  const [friendStatus] = useFriendStatus(user, viewUser, friendRequests);

  const reqBtn = (friendRequests) => {
    if (!friendRequests) return <p className="add-friend">Loading...</p>;

    return (
      <p className="add-friend" onClick={() => openModal("friend-requests")}>
        {`${
          friendRequests.filter((i) => i.sender !== user.username).length
        } Requests`}
      </p>
    );
  };

  if (getUserStatus() === "user") return reqBtn(friendRequests);

  if (friendStatus.status === "loading")
    return <p className="add-friend">loading...</p>;

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

  if (friendStatus.status === "friends")
    return (
      <p
        className="add-friend"
        onClick={() => unfriend(viewUser.user.username)}
      >
        Unfriend
      </p>
    );

  if (friendStatus.status === "pending")
    return <p className="add-friend">Pending</p>;

  if (friendStatus.status === "respond")
    return (
      <p
        className="add-friend"
        onClick={() => {
          acceptReq(friendStatus._id);
        }}
      >
        Accept Friend Request
      </p>
    );
};

const mapStateToProps = (state) => state;

const mapDispatchToProps = { sendFriendReq, acceptReq, unfriend, openModal };

export default connect(mapStateToProps, mapDispatchToProps)(FriendButton);

/*
  1) Send request  ---> Add Friend
  2) Accept Request ----> Accept Request
  3) Pending ---> Pending
  */

//let status = getUserStatus();
// if (status === "user") return <p className="add-friend">Settings</p>;

// if (user.friends.includes(viewUser.user.username))
//   return (
//     <p className="add-friend" onClick={unfriend}>
//       Unfriend
//     </p>
//   );

// let relation = viewUser.friendStatus[0];

// if (!relation)

// if (relation.status === 1 && relation.sender === user.username)

// if (relation.status === 1 && relation.receiver === user.username)
//   return (
//     <p
//       className="add-friend"
//       onClick={() => {
//         acceptReq(relation._id, "accept");
//       }}
//     >
//       Accept Friend Request
//     </p>
//   );
