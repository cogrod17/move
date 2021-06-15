import React, { Component } from "react";
import Dropdown from "./Dropdown";
import history from "../../history";
import { connect } from "react-redux";
import { toggleDropdown, openModal } from "../../actions";

class Menu extends Component {
  render() {
    return (
      <div>
        <Dropdown />
        <div onClick={this.props.toggleDropdown} className="menu-icon">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
        <div className="menu-list">
          <p onClick={() => history.push("/feed")}>Feed</p>
          <p onClick={() => history.push("/chat")}>Chat</p>
          <p onClick={() => history.push("/profile")}>Profile</p>

          <p onClick={() => this.props.openModal("logout")}>Logout</p>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => state;

export default connect(mapStateToProps, { toggleDropdown, openModal })(Menu);
