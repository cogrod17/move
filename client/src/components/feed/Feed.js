import React, { Component } from "react";
import { connect } from "react-redux";

class Feed extends Component {
  render() {
    return (
      <div className="feed">
        <h1>Feed</h1>
      </div>
    );
  }
}

const mapStateToProps = (state) => state;

export default connect(mapStateToProps)(Feed);
