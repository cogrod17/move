import React from "react";
import { connect } from "react-redux";
import { openModal, toggleDropdown } from "../../actions";
import history from "../../history";

const Dropdown = ({ user, isDropdownOpen, openModal, toggleDropdown }) => {
  if (!isDropdownOpen) return null;

  const go = (path) => {
    toggleDropdown();
    history.push(path);
  };

  return (
    <div className="dropdown">
      <p onClick={() => go("/feed")}>Feed</p>
      <p onClick={() => go("/chat")}>Chat</p>
      <p onClick={() => go(`/profile/${user.username}`)}>Profile</p>
      <p
        onClick={() => {
          toggleDropdown();
          openModal("logout");
        }}
      >
        Logout
      </p>
    </div>
  );
};

const mapStateToProps = (state) => state;

export default connect(mapStateToProps, { openModal, toggleDropdown })(
  Dropdown
);
