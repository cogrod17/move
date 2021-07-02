import React, { useEffect } from "react";
import { connect } from "react-redux";
import Summary from "../profile/Summary";
import WorkoutHistory from "../profile/WorkoutsHistory";
import ProfileInfo from "../profile/ProfileInfo";
import "../profile/profileStyle.css";

const ViewUser = ({ viewUser }) => {
  //ON RELOAD THE USER GETS LOST
  //HAVE TO ADD USE EFFECT HERE
  //useEffect(() => {})

  if (!viewUser) return <div>LOADING</div>;

  return (
    <div className="profile-container">
      <div className="profile-head">
        <ProfileInfo user={viewUser.user} />
        <Summary info={viewUser.summary[0]} />
      </div>
      <WorkoutHistory status={"view"} info={viewUser.workouts} />
    </div>
  );
};

const mapStateToProps = (state) => state;

export default connect(mapStateToProps)(ViewUser);
