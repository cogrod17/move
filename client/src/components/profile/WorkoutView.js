import React, { Component } from "react";
import { connect } from "react-redux";

class WorkoutView extends Component {
  render() {
    return (
      <div className="workoutsview-container">
        <h1>Workout View</h1>
      </div>
    );
  }
}

const mapStateToProps = (state) => state;

export default connect(mapStateToProps)(WorkoutView);
