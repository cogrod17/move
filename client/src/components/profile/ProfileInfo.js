import React from "react";
import { connect } from "react-redux";
import { openModal } from "../../actions";
import useWindowStatus from "../../hooks/useWindowStatus";
import FriendButton from "./FriendButton";

const ProfileInfo = ({ user, viewUser, openModal }) => {
  const [windowStatus, getWindowStatus] = useWindowStatus();
  if (!user && !viewUser) return null;

  let show;
  if (windowStatus === "user") {
    show = user;
  } else {
    show = viewUser.user;
  }
  const { username, email } = show;

  return (
    <div className="section row">
      <div className="avatar-container">
        <div className="avatar"></div>
      </div>
      <div className="profile-info">
        <h2>{username}</h2>
        <p>{email}</p>
        <p onClick={() => openModal("friends")} className="friends">
          {`${show.friends.length} Friends`}
        </p>
        {windowStatus === "user" ? <p>Settings</p> : <FriendButton />}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => state;

export default connect(mapStateToProps, { openModal })(ProfileInfo);
