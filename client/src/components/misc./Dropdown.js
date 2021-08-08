import React from "react";
import { connect } from "react-redux";
import { openModal, toggleDropdown, logout } from "../../actions";
import history from "../../history";

const Dropdown = ({
  user,
  isDropdownOpen,
  openModal,
  toggleDropdown,
  logout,
}) => {
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
          openModal({ type: "confirm", action: logout, header: "Logout?" });
        }}
      >
        Logout
      </p>
    </div>
  );
};

const mapStateToProps = (state) => state;

export default connect(mapStateToProps, { openModal, toggleDropdown, logout })(
  Dropdown
);
