import React, { Component } from "react";
import { connect } from "react-redux";

class Friends extends Component {
  render() {
    return (
      <div className="friends-container">
        <h1>Friends</h1>
      </div>
    );
  }
}

const mapStateToProps = (state) => state;

export default connect(mapStateToProps)(Friends);
