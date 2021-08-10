import React from "react";
import { connect } from "react-redux";
import { closeModal, createConvo } from "../../actions";
import history from "../../history";

//modal
const NewChat = (props) => {
  const { activeModal, user, closeModal, createConvo, conversations } = props;
  if (activeModal !== "new-chat") return null;

  const render = () => {
    return user.friends.map((friend, i) => {
      if (
        conversations.filter((convo) => convo.participants.includes(friend))
          .length !== 0
      )
        return null;

      return (
        <div className="request-item" key={i}>
          <p
            onClick={() => {
              closeModal();
              history.push(`/profile/${friend}`);
            }}
            className="req-name"
          >
            {friend}
          </p>
          <p
            onClick={() => {
              closeModal();
              createConvo([user.username, friend]);
            }}
            className="accept-req"
          >
            Chat
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
        <h1>New Chat</h1>
        <ul>{render()}</ul>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => state;

export default connect(mapStateToProps, { closeModal, createConvo })(NewChat);
