import React, { useEffect } from "react";
import { connect } from "react-redux";
import { getViewUser } from "../../actions";
import Summary from "./Summary";
import WorkoutHistory from "./WorkoutsHistory";
import Loader from "../misc./Loader";
import ProfileInfo from "./ProfileInfo";
import history from "../../history";
import "./profileStyle.css";

const Profile = ({ getViewUser, viewUser }) => {
  useEffect(() => {
    history.listen((location) => {
      if (location.pathname.slice(1, 8) === "profile") {
        getViewUser(location.pathname.substring(9));
      }
    });

    getViewUser(window.location.pathname.substring(9));
  }, [getViewUser]);

  if (!viewUser || viewUser === "loading") return <Loader />;
  if (viewUser.name === "Error") return <div>USER NOT FOUND</div>;

  return (
    <div className="profile-container">
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
