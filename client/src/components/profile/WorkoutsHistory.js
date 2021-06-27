import React, { useEffect } from "react";
import { connect } from "react-redux";
import WorkoutCard from "./WorkoutCard";
import { server } from "../../api";
import { openModal, getWorkoutHistory } from "../../actions";

const WorkoutsHistory = (props) => {
  const { token, openModal, getWorkoutHistory, workoutHistory } = props;

  useEffect(() => {
    if (!token) return;
    getWorkoutHistory(token);
  }, [token, getWorkoutHistory]);

  const renderWorkoutList = () => {
    if (!workoutHistory || workoutHistory.length === 0)
      return <h2>Add first workout!</h2>;

    return workoutHistory.map((workout, i) => {
      return <WorkoutCard key={i} workout={workout} />;
    });
  };

  return (
    <div className="history-container">
      <h1 onClick={() => openModal("newworkout")}>+</h1>
      <div className="history-list">{renderWorkoutList()}</div>
    </div>
  );
};

const mapStateToProps = (state) => state;

export default connect(mapStateToProps, { openModal, getWorkoutHistory })(
  WorkoutsHistory
);
