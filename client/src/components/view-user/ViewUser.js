import React from "react";
import { connect } from "react-redux";
import Summary from "../profile/Summary";
import WorkoutHistory from "../profile/WorkoutsHistory";
import ProfileInfo from "../profile/ProfileInfo";
import "../profile/profileStyle.css";

const ViewUser = ({ viewUser }) => {
  return (
    <div className="profile-container">
      <div className="profile-head">
        <ProfileInfo user={viewUser.user} />
        <Summary viewSummary={viewUser.summary} />
      </div>
      <WorkoutHistory viewHistory={viewUser.history} />
    </div>
  );
};

const mapStateToProps = (state) => state;

export default connect(mapStateToProps)(ViewUser);
