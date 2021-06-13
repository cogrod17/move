import React, { Component } from "react";
import { connect } from "react-redux";
import Summary from "./Summary";
import WorkoutHistory from "./WorkoutsHistory";
import WorkoutView from "./WorkoutView";
import NewWorkout from "./NewWorkout";
import ProfileInfo from "./ProfileInfo";
import "./profileStyle.css";

class Profile extends Component {
  render() {
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
  }
}

const mapStateToProps = (state) => state;

export default connect(mapStateToProps)(Profile);
