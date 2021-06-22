import React, { Component } from "react";
import { connect } from "react-redux";
import WorkoutCard from "./WorkoutCard";
import { server } from "../../api";
import { openModal, getWorkoutHistory } from "../../actions";

class WorkoutsHistory extends Component {
  renderWorkoutList = (history) => {
    return history.map((workout) => {
      return <WorkoutCard workout={workout} />;
    });
  };

  render() {
    const { getWorkoutHistory, token, workoutHistory } = this.props;

    if (token) getWorkoutHistory(token);

    //add loader here to wait for the async call

    return (
      <div className="history-container">
        <h1 onClick={() => this.props.openModal("newworkout")}>+</h1>
        <div className="history-list">
          {this.renderWorkoutList(workoutHistory)}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => state;

export default connect(mapStateToProps, { openModal, getWorkoutHistory })(
  WorkoutsHistory
);
