import React from "react";
import { connect } from "react-redux";
import { openModal } from "../../actions";
import history from "../../history";

const Dropdown = ({ user, isDropdownOpen, openModal }) => {
  if (!isDropdownOpen) return null;

  return (
    <div className="dropdown">
      <p onClick={() => history.push("/feed")}>Feed</p>
      <p onClick={() => history.push("/chat")}>Chat</p>
      <p onClick={() => history.push(`/profile/${user.username}`)}>Profile</p>
      <p onClick={() => openModal("logout")}>Logout</p>
    </div>
  );
};

const mapStateToProps = (state) => state;

export default connect(mapStateToProps, { openModal })(Dropdown);
