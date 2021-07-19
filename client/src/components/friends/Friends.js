import React from "react";
import { connect } from "react-redux";
import { closeModal } from "../../actions";

const Friends = ({ closeModal, activeModal, user, viewUser }) => {
  if (activeModal !== "friends") return null;

  const renderFriends = () => {
    // if (!viewUser) return <p>Loading...</p>;
    return viewUser.user.friends.map((name, i) => {
      return <li key={i}>{name}</li>;
    });
  };

  return (
    <div className="modal-dimmer">
      <div className="modal-container">
        <div className="friends-container">
          <p className="close-btn" onClick={closeModal}>
            X
          </p>
          <h1>Friends</h1>
          <ul>{renderFriends()}</ul>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => state;

export default connect(mapStateToProps, { closeModal })(Friends);
