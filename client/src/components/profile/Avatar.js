import React, { useState } from "react";
import { connect } from "react-redux";
import { openModal } from "../../actions";
import img from "../../images/default_avatar.png";

const Avatar = ({ viewUser, user, openModal }) => {
  const [pic, setPic] = useState(
    `${window.location.origin}/profile/avatar/${viewUser.user.username}`
  );
  const [picLoading, setPicLoading] = useState(true);
  const { username } = viewUser.user;

  return (
    <div
      className={`avatar-container ${user.username === username ? "edit" : ""}`}
    >
      <div>
        <p onClick={() => openModal("edit-avatar")}>Edit</p>
      </div>
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
  );
};

const mapStateToProps = (state) => state;

export default connect(mapStateToProps, { openModal })(Avatar);
