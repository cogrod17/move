import React from "react";
import { connect } from "react-redux";
import { openModal } from "../../actions";
import FriendButton from "./FriendButton";
import Avatar from "./Avatar";

const ProfileInfo = ({ viewUser, openModal }) => {
  const { username, email, friends } = viewUser.user;

  return (
    <div className="section row">
      <Avatar />
      <div className="profile-info">
        <h2>{username}</h2>
        <p>{email}</p>
        <p onClick={() => openModal("friends")} className="friends">
          {`${friends.length} Friends`}
        </p>
        <FriendButton />
        <p
          onClick={() => openModal("edit-account")}
          className="edit-account-btn"
        >
          Edit account
        </p>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => state;

export default connect(mapStateToProps, { openModal })(ProfileInfo);
