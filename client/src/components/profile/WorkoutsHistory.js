import React, { useEffect } from "react";
import { connect } from "react-redux";
import WorkoutCard from "./WorkoutCard";
import { openModal } from "../../actions";
import { getUserStatus } from "../../helperFunctions";
import useInfo from "../../hooks/useInfo";

const WorkoutsHistory = ({ openModal, workoutHistory, viewUser }) => {
  const [info, getInfo] = useInfo(workoutHistory);
  const status = getUserStatus();

  useEffect(() => {
    if (!viewUser) return;
    getInfo(workoutHistory, viewUser.workouts);
  }, [workoutHistory, viewUser, getInfo]);

  const renderWorkoutList = () => {
    if (!info) return <h2>Loading...</h2>;
    if (info.length === 0) return <h2>No Workouts Yet!</h2>;

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
