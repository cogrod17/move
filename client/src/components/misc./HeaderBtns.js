import React, { Component } from "react";

import { connect } from "react-redux";
import { openForm } from "../../actions";

class HeaderBtns extends Component {
  render() {
    return (
      <div className="header-btns">
        <button
          onClick={() => this.props.openForm("login")}
          className="login-btn"
        >
          Login
        </button>
        <button
          onClick={() => this.props.openForm("signup")}
          className="signup-btn"
        >
          Sign Up
        </button>
      </div>
    );
  }
}

const mapStateToProps = (state) => state;

export default connect(mapStateToProps, { openForm })(HeaderBtns);
