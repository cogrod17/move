import React from "react";
import { connect } from "react-redux";
import WorkoutCard from "./WorkoutCard";
import { openModal } from "../../actions";

const WorkoutsHistory = ({ openModal, info, status }) => {
  const renderWorkoutList = () => {
    if (!info || info.length === 0) return <h2>Add first workout!</h2>;

    return info.map((workout, i) => {
      return <WorkoutCard key={i} workout={workout} />;
    });
  };

  return (
    <div className="history-container">
      {!status ? <h1 onClick={() => openModal("newworkout")}>+</h1> : null}
      <div className="history-list">{renderWorkoutList()}</div>
    </div>
  );
};

const mapStateToProps = (state) => state;

export default connect(mapStateToProps, { openModal })(WorkoutsHistory);
