import React, { Component } from "react";

class HeaderBtns extends Component {
  state = { isLoggedIn: false };

  render() {
    if (this.state.isLoggedIn) {
      return (
        <div className="header-btns">
          <button className="logout-btn">Logout</button>
        </div>
      );
    }

    if (!this.state.isLoggedIn) {
      return (
        <div className="header-btns">
          <button className="login-btn">Login</button>
          <button className="signup-btn">Sign Up</button>
        </div>
      );
    }
  }
}

export default HeaderBtns;
