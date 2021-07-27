import React, { useEffect } from "react";
import { connect } from "react-redux";
import { openModal } from "../../actions";
import pic from "../../images/default_avatar.png";

const Avatar = ({ viewUser, user, openModal }) => {
  const { avatar, username } = viewUser.user;

  return (
    <div>
      <div className="avatar-container">
        <img src={avatar ? `data:image/png;base64,${avatar}` : pic} />
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
