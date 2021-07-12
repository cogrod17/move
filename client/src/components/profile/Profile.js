import React, { useEffect } from "react";
import { connect } from "react-redux";
import {
  getSummary,
  getWorkoutHistory,
  getFriendRequests,
} from "../../actions";
import Summary from "./Summary";
import WorkoutHistory from "./WorkoutsHistory";
import NewWorkout from "./NewWorkout";
import ProfileInfo from "./ProfileInfo";
import "./profileStyle.css";

const Profile = (props) => {
  const { getSummary, getWorkoutHistory, token, getFriendRequests } = props;

  useEffect(() => {
    if (!token) return;
    getSummary(token);
    getWorkoutHistory(token);
    getFriendRequests(token);
  }, [getSummary, getWorkoutHistory, getFriendRequests, token]);

  return (
    <div className="profile-container">
      <NewWorkout />
      <div className="profile-head">
        <ProfileInfo />
        <Summary />
      </div>
      <WorkoutHistory />
    </div>
  );
};

const mapStateToProps = (state) => state;

const mapDispatchToProps = {
  getSummary,
  getWorkoutHistory,
  getFriendRequests,
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
