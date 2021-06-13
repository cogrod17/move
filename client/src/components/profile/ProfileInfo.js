import React, { Component } from "react";
import { connect } from "react-redux";

class ProfileInfo extends Component {
  render() {
    return (
      <div className="section row">
        <div className="avatar-container">
          <div className="avatar"></div>
        </div>
        <div className="profile-info">
          <h2>Username</h2>
          <p>Email</p>
          <p>Friends</p>
          <p>Settings</p>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => state;

export default connect(mapStateToProps)(ProfileInfo);
