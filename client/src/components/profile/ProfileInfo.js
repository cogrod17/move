import React, { Component } from "react";
import { connect } from "react-redux";

class ProfileInfo extends Component {
  render() {
    return (
      <div className="info-container">
        <h1>Info</h1>
      </div>
    );
  }
}

const mapStateToProps = (state) => state;

export default connect(mapStateToProps)(ProfileInfo);
