import React, { Component } from "react";
import { connect } from "react-redux";
import WorkoutItem from "./WorkoutItem";

class WorkoutsHistory extends Component {
  render() {
    return (
      <div className="history-container">
        <h1>History</h1>
        <WorkoutItem />
        <WorkoutItem />
        <WorkoutItem />
        <WorkoutItem />
        <WorkoutItem />
        <WorkoutItem />
      </div>
    );
  }
}

const mapStateToProps = (state) => state;

export default connect(mapStateToProps)(WorkoutsHistory);
