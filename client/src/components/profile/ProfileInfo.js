import React, { useEffect } from "react";
import { connect } from "react-redux";
import { openModal } from "../../actions";
import useInfo from "../../hooks/useInfo";
import FriendButton from "./FriendButton";

const ProfileInfo = ({ user, viewUser, openModal }) => {
  const [info, getInfo] = useInfo(user);

  useEffect(() => {
    if (!viewUser) return;
    getInfo(user, viewUser.user);
  }, [user, viewUser, getInfo]);

  if (!info) return null; /// NEED A LOADER
  const { username, email } = info;

  return (
    <div className="section row">
      <div className="avatar-container">
        <div className="avatar"></div>
      </div>
      <div className="profile-info">
        <h2>{username}</h2>
        <p>{email}</p>
        <p onClick={() => openModal("friends")} className="friends">
          {`${info.friends.length} Friends`}
        </p>
        <FriendButton />
      </div>
    </div>
  );
};

const mapStateToProps = (state) => state;

export default connect(mapStateToProps, { openModal })(ProfileInfo);
