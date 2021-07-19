import React from "react";
import { connect } from "react-redux";
import { closeModal, acceptReq, declineReq } from "../../actions";
import "./friends.css";

const FriendRequests = ({
  user,
  activeModal,
  closeModal,
  acceptReq,
  declineReq,
  friendRequests,
}) => {
  if (activeModal !== "friend-requests") return null;

  const renderRequests = () => {
    let received = friendRequests.filter((req, i) => {
      return req.sender !== user.username;
    });

    if (!received.length) return <p>No Requests</p>;

    return friendRequests.map((req, i) => {
      if (req.sender === user.username) return null;

      return (
        <div className="request-item" key={i}>
          <p
            className="req-name"
            onClick={() => {
              closeModal();
              window.location.pathname = `/profile/${req.sender}`;
            }}
          >
            {req.sender}
          </p>
          <p className="accept-req" onClick={() => acceptReq(req._id)}>
            Accept
          </p>
          <p className="decline-req" onClick={() => declineReq(req._id)}>
            Decline
          </p>
        </div>
      );
    });
  };

  return (
    <div className="modal-dimmer">
      <div className="modal-container">
        <div className="friends-container">
          <p className="close-btn" onClick={closeModal}>
            X
          </p>
          <h1>Friend Requests</h1>
          <ul>{renderRequests()}</ul>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => state;

export default connect(mapStateToProps, { closeModal, acceptReq, declineReq })(
  FriendRequests
);
