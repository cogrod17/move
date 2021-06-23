import React, { Component } from "react";
import { connect } from "react-redux";
import WorkoutCard from "./WorkoutCard";
import { server } from "../../api";
import { openModal, getWorkoutHistory } from "../../actions";

class WorkoutsHistory extends Component {
  componentDidUpdate(prevProps) {
    const { getWorkoutHistory, token } = this.props;
    if (!prevProps.token && token) getWorkoutHistory(token);
  }

  renderWorkoutList = () => {
    return this.props.workoutHistory.map((workout, i) => {
      return <WorkoutCard key={i} workout={workout} />;
    });
  };

  render() {
    const { workoutHistory } = this.props;

    return (
      <div className="history-container">
        <h1 onClick={() => this.props.openModal("newworkout")}>+</h1>
        <div className="history-list">
          {workoutHistory ? this.renderWorkoutList() : "Loading"}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => state;

export default connect(mapStateToProps, { openModal, getWorkoutHistory })(
  WorkoutsHistory
);
