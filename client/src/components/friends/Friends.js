import React, { useEffect } from "react";
import { connect } from "react-redux";
import { closeModal } from "../../actions";
import useInfo from "../../hooks/useInfo";

const Friends = ({ closeModal, activeModal, user, viewUser }) => {
  const [info, getInfo] = useInfo(null);

  // let friends;
  // if (window.location.pathname === "/profile") friends = user.friends;
  // if (window.location.pathname === "/viewuser") friends = viewUser.user.friends;

  useEffect(() => {
    if (user && !viewUser) getInfo(user.friends);
    if (viewUser) getInfo(user.friends, viewUser.user.friends);
  }, [getInfo, viewUser, user]);

  if (activeModal !== "friends") return null;

  const renderFriends = () => {
    if (!info) return <p>Loading...</p>;

    return info.map((name, i) => {
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
