import React, { Component } from "react";
import { connect } from "react-redux";
import Summary from "./Summary";
import WorkoutHistory from "./WorkoutsHistory";
import WorkoutView from "./WorkoutView";
import ProfileInfo from "./ProfileInfo";
import "./profileStyle.css";

class Profile extends Component {
  render() {
    return (
      <div className="profile-container">
        <h1>My Stats</h1>
        <ProfileInfo />
        <Summary />
        <h1>History</h1>
        <WorkoutHistory />
      </div>
    );
  }
}

const mapStateToProps = (state) => state;

export default connect(mapStateToProps)(Profile);
