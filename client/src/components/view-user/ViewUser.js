import React, { useEffect } from "react";
import { connect } from "react-redux";
import Summary from "../profile/Summary";
import WorkoutHistory from "../profile/WorkoutsHistory";
import ProfileInfo from "../profile/ProfileInfo";
import { getViewUser } from "../../actions";
import "../profile/profileStyle.css";

const ViewUser = ({ viewUser, getViewUser }) => {
  useEffect(() => {
    getViewUser();
  }, [getViewUser]);

  if (!viewUser) return <div>LOADING</div>;
  if (viewUser.name === "Error") return <div>COULD NOT GET USER</div>;

  return (
    <div className="profile-container">
      <div className="profile-head">
        <ProfileInfo />
        <Summary info={viewUser.summary[0]} />
      </div>
      <WorkoutHistory />
    </div>
  );
};

const mapStateToProps = (state) => state;

export default connect(mapStateToProps, { getViewUser })(ViewUser);
