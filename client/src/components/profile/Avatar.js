import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { openModal } from "../../actions";

const Avatar = ({ viewUser, user, openModal }) => {
  const { username } = viewUser.user;

  return (
    <div>
      <div className="avatar-container">
        <img src={`http://localhost:3001/profile/avatar/${username}`} />
      </div>
      {user.username === username ? (
        <div onClick={() => openModal("edit-avatar")} className="upload-btn">
          Upload Picture
        </div>
      ) : null}
    </div>
  );
};

const mapStateToProps = (state) => state;

export default connect(mapStateToProps, { openModal })(Avatar);
