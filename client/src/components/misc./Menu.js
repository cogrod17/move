import React from "react";
import Dropdown from "./Dropdown";
import history from "../../history";
import { connect } from "react-redux";
import { toggleDropdown, openModal, logout } from "../../actions";

const Menu = ({ user, toggleDropdown, openModal, logout }) => {
  return (
    <div>
      <Dropdown />
      <div onClick={toggleDropdown} className="menu-icon">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
      <div className="menu-list">
        <p onClick={() => history.push("/feed")}>Feed</p>
        <p onClick={() => history.push("/chat")}>Chat</p>
        <p onClick={() => history.push(`/profile/${user.username}`)}>Profile</p>
        <p
          onClick={() =>
            openModal({ type: "confirm", action: logout, header: "Logout?" })
          }
        >
          Logout
        </p>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => state;

export default connect(mapStateToProps, { toggleDropdown, openModal, logout })(
  Menu
);
