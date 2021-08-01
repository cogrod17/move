import React, { useState } from "react";
import { connect } from "react-redux";
import { openModal } from "../../actions";
import img from "../../images/default_avatar.png";

const Avatar = ({ viewUser, user, openModal }) => {
  const [pic, setPic] = useState(
    `http://localhost:3001/profile/avatar/${viewUser.user.username}`
  );
  const [picLoading, setPicLoading] = useState(true);
  const { username } = viewUser.user;

  return (
    <div>
      <div className="avatar-container">
        <img
          src={pic}
          alt={"avatar"}
          className={`smooth-image image-${!picLoading ? "visible" : "hidden"}`}
          onLoad={() => setPicLoading(false)}
          onError={() => {
            setPic(img);
            setPicLoading(false);
          }}
        />
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
