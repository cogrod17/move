import React from "react";
import { connect } from "react-redux";
import WorkoutCard from "./WorkoutCard";
import { openModal } from "../../actions";

const WorkoutsHistory = ({ openModal, viewUser, user }) => {
  const { workouts } = viewUser;

  const renderWorkoutList = () => {
    if (!workouts) return <h2>Loading...</h2>;
    if (workouts.length === 0) return <h2>No Workouts Yet!</h2>;

    return workouts.map((workout, i) => {
      return <WorkoutCard key={i} workout={workout} />;
    });
  };

  return (
    <div className="history-container">
      {user.username === viewUser.user.username ? (
        <h1 onClick={() => openModal("newworkout")}>+</h1>
      ) : null}
      <div className="history-list">{renderWorkoutList()}</div>
    </div>
  );
};

const mapStateToProps = (state) => state;

export default connect(mapStateToProps, { openModal })(WorkoutsHistory);
