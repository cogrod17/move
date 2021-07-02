import React from "react";
import { connect } from "react-redux";

const ProfileInfo = ({ user }) => {
  if (!user) return null;

  const { username, email } = user;

  return (
    <div className="section row">
      <div className="avatar-container">
        <div className="avatar"></div>
      </div>
      <div className="profile-info">
        <h2>{username}</h2>
        <p>{email}</p>
        <p>Friends</p>
        <p>Settings</p>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => state;

export default connect(mapStateToProps)(ProfileInfo);
