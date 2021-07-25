import React from "react";
import { connect } from "react-redux";
import { closeModal } from "../../actions";
import history from "../../history";

const Friends = ({ closeModal, activeModal, viewUser }) => {
  if (activeModal !== "friends") return null;

  const renderFriends = () => {
    if (!viewUser.user) return null;
    return viewUser.user.friends.map((name, i) => {
      return (
        <div className="friend-item">
          <p key={i}>{name}</p>
          <p
            onClick={() => {
              closeModal();
              history.push(`/profile/${name}`);
            }}
            className="accept-req"
          >
            View Profile
          </p>
        </div>
      );
    });
  };

  return (
    <div className="modal-dimmer">
      <div className="modal-container">
        <p className="close-btn" onClick={closeModal}>
          X
        </p>
        <h1>Friends</h1>
        <ul>{renderFriends()}</ul>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => state;

export default connect(mapStateToProps, { closeModal })(Friends);
