import React from "react";
import { connect } from "react-redux";
import { openModal } from "../../actions";
import Friends from "../friends/Friends";
import FriendButton from "./FriendButton";

const ProfileInfo = ({ user, viewUser, status, openModal }) => {
  if (!user && !viewUser) return null;

  let username, email;
  if (window.location.pathname === "/profile") {
    username = user.username;
    email = user.email;
  }
  if (window.location.pathname === "/viewuser") {
    username = viewUser.user.username;
    email = viewUser.user.email;
  }

  return (
    <div className="section row">
      <Friends />
      <div className="avatar-container">
        <div className="avatar"></div>
      </div>
      <div className="profile-info">
        <h2>{username}</h2>
        <p>{email}</p>
        <p onClick={() => openModal("friends")} className="friends">
          Friends
        </p>
        <FriendButton />
      </div>
    </div>
  );
};

const mapStateToProps = (state) => state;

export default connect(mapStateToProps, { openModal })(ProfileInfo);
