import React from "react";
import { connect } from "react-redux";
import WorkoutCard from "./WorkoutCard";
import { openModal } from "../../actions";
import { getStatus } from "../../helperFunctions";

const WorkoutsHistory = ({ openModal, workoutHistory, viewUser }) => {
  let status = getStatus();
  let info;
  if (status === "user") info = workoutHistory;
  if (status === "view") info = viewUser.workouts;

  const renderWorkoutList = () => {
    if (!info || info.length === 0) return <h2>No Workouts Yet!</h2>;

    return info.map((workout, i) => {
      return <WorkoutCard key={i} workout={workout} />;
    });
  };

  return (
    <div className="history-container">
      {status === "user" ? (
        <h1 onClick={() => openModal("newworkout")}>+</h1>
      ) : null}
      <div className="history-list">{renderWorkoutList()}</div>
    </div>
  );
};

const mapStateToProps = (state) => state;

export default connect(mapStateToProps, { openModal })(WorkoutsHistory);
