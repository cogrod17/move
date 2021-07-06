import React, { useEffect } from "react";
import { connect } from "react-redux";
import { getSummary, getWorkoutHistory } from "../../actions";
import Summary from "./Summary";
import WorkoutHistory from "./WorkoutsHistory";
import NewWorkout from "./NewWorkout";
import ProfileInfo from "./ProfileInfo";
import "./profileStyle.css";

const Profile = (props) => {
  const {
    getSummary,
    getWorkoutHistory,
    token,
    summary,
    workoutHistory,
    user,
  } = props;

  useEffect(() => {
    if (!token) return;
    getSummary(token);
    getWorkoutHistory(token);
  }, [getSummary, getWorkoutHistory, token]);

  return (
    <div className="profile-container">
      <NewWorkout />
      <div className="profile-head">
        <ProfileInfo user={user} />
        <Summary info={summary} />
      </div>
      <WorkoutHistory info={workoutHistory} />
    </div>
  );
};

const mapStateToProps = (state) => state;

export default connect(mapStateToProps, { getSummary, getWorkoutHistory })(
  Profile
);
