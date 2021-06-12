import React, { Component } from "react";
import { connect } from "react-redux";
import WorkoutCard from "./WorkoutCard";

class WorkoutsHistory extends Component {
  render() {
    return (
      <div className="history-container">
        <WorkoutCard />
        <WorkoutCard />
        <WorkoutCard />
        <WorkoutCard />
        <WorkoutCard />
      </div>
    );
  }
}

const mapStateToProps = (state) => state;

export default connect(mapStateToProps)(WorkoutsHistory);
