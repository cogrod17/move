import React, { Component } from "react";

import { connect } from "react-redux";
import { openModal } from "../../actions";

class HeaderBtns extends Component {
  render() {
    return (
      <div className="header-btns">
        <button
          onClick={() => this.props.openModal("login")}
          className="login-btn"
        >
          Login
        </button>
        <button
          onClick={() => this.props.openModal("signup")}
          className="signup-btn"
        >
          Sign Up
        </button>
      </div>
    );
  }
}

const mapStateToProps = (state) => state;

export default connect(mapStateToProps, { openModal })(HeaderBtns);
