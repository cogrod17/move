import React from "react";
import { connect } from "react-redux";
import history from "../../history";

const Dropdown = ({ user, isDropdownOpen }) => {
  if (!isDropdownOpen) return null;

  const goToProfile = () => {
    window.location.pathname = `/profile/${user.username}`;
  };

  return (
    <div className="dropdown">
      <p onClick={() => history.push("/feed")}>Feed</p>
      <p onClick={() => history.push("/chat")}>Chat</p>
      <p onClick={goToProfile}>Profile</p>
      <p>Logout</p>
    </div>
  );
};

const mapStateToProps = (state) => state;

export default connect(mapStateToProps)(Dropdown);
