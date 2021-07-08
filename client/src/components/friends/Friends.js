import React from "react";
import { connect } from "react-redux";
import { closeModal } from "../../actions";

const Friends = ({ closeModal, activeModal, user, viewUser }) => {
  if (activeModal !== "friends") return null;

  let friends;
  if (window.location.pathname === "/profile") friends = user.friends;
  if (window.location.pathname === "/viewuser") friends = viewUser.user.friends;

  const renderFriends = () => {
    return friends.map((name, i) => {
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
