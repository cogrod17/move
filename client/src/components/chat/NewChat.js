import React from "react";
import { connect } from "react-redux";
import { closeModal } from "../../actions";
import history from "../../history";

//modal
const NewChat = ({ activeModal, user, closeModal }) => {
  if (activeModal !== "new-chat") return null;

  const renderFriends = () => {
    return user.friends.map((friend, i) => {
      return (
        <div className="request-item" key={i}>
          <p
            style={{ marginLeft: "40px" }}
            onClick={() => {
              closeModal();
              history.push(`/profile/${friend}`);
            }}
            className="req-name"
          >
            {friend}
          </p>
          <p className="accept-req">Chat</p>
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
        <h1>New Chat</h1>
        <ul>{renderFriends()}</ul>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => state;

export default connect(mapStateToProps, { closeModal })(NewChat);
