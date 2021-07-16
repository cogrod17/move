import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { getViewUser } from "../../actions";
import Summary from "./Summary";
import WorkoutHistory from "./WorkoutsHistory";
import NewWorkout from "./NewWorkout";
import ProfileInfo from "./ProfileInfo";
import "./profileStyle.css";

const Profile = ({ token, getViewUser, viewUser }) => {
  useEffect(() => {
    if (!token) return;
    getViewUser(window.location.pathname.substring(9));
  }, [getViewUser, token]);

  if (!viewUser || viewUser === "loading") return <div>LOADING</div>;
  if (viewUser.name === "Error") return <div>USER NOT FOUND</div>;

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
  getViewUser,
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
