import React from "react";

const ProfileInfo = ({ user, status }) => {
  if (!user) return null;

  const { username, email } = user;

  const options = status ? (
    <p className="add-friend">Add Friend</p>
  ) : (
    <p>Settings</p>
  );

  return (
    <div className="section row">
      <div className="avatar-container">
        <div className="avatar"></div>
      </div>
      <div className="profile-info">
        <h2>{username}</h2>
        <p>{email}</p>
        <p className="friends">Friends</p>
        {options}
      </div>
    </div>
  );
};

export default ProfileInfo;
