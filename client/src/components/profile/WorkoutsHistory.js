import React, { Component } from "react";
import { connect } from "react-redux";

class WorkoutsHistory extends Component {
  render() {
    return (
      <div className="workouts-history">
        <h1>Workouts History</h1>
      </div>
    );
  }
}

const mapStateToProps = (state) => state;

export default connect(mapStateToProps)(WorkoutsHistory);
