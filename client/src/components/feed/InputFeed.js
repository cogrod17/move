import React, { Component } from "react";
import { connect } from "react-redux";

class InputFeed extends Component {
  render() {
    return (
      <div className="input-feed">
        <input placeholder="What's your motivation?" />
      </div>
    );
  }
}

const mapStateToProps = (state) => state;

export default connect(mapStateToProps)(InputFeed);
