import React, { useState } from "react";
import { connect } from "react-redux";
import { formatDate } from "../../helperFunctions";
import strengthPic from "../../images/strength.jpg";
import cardioPic from "../../images/cardio.jpg";
import { openModal } from "../../actions";

const WorkoutCard = ({ workout, viewUser, user, openModal }) => {
  const [pic, setPic] = useState(
    `http://localhost:3001/workout/image/${workout._id}`
  );
  const [picLoading, setPicLoading] = useState(true);
  const { username } = viewUser.user;

  const setDefaultPic = () => {
    if (
      workout.type.toLowerCase() === "strength" ||
      workout.type.toLowerCase() === "hiit"
    )
      setPic(strengthPic);
    if (workout.type.toLowerCase() === "cardio") setPic(cardioPic);
  };

  const pace = () => {
    if (!workout.pace) return null;
    return (
      <div>
        <p>Pace:</p>
        <p>{`${workout.pace ? workout.pace : "--"} min/mile`}</p>
      </div>
    );
  };

  const distance = () => {
    if (!workout.pace) return null;
    return (
      <div>
        <p>Distance:</p>
        <p>{`${workout.distance} miles`}</p>
      </div>
    );
  };

  return (
    <div className="workout-card">
      <div
        className={`workout-visual ${username === user.username ? "edit" : ""}`}
      >
        <div>
          <p onClick={() => openModal(`edit-workout-img:${workout._id}`)}>
            Edit
          </p>
          <p className="delete">Delete</p>
        </div>
        <img
          src={pic}
          alt={"workout-card"}
          className={`smooth-image image-${!picLoading ? "visible" : "hidden"}`}
          onLoad={() => setPicLoading(false)}
          onError={() => {
            setDefaultPic();
            setPicLoading(false);
          }}
        />
      </div>
      <div>
        <p className="item-title">{workout.title}</p>
      </div>
      <div>
        <p className="feed-date">{formatDate(workout.date)}</p>
      </div>

      <div className={`stats ${!picLoading ? "stats-height-control" : ""}`}>
        <div>
          <p>Type:</p>
          <p>{workout.type.toUpperCase()}</p>
        </div>
        {distance()}
        <div>
          <p>Duration:</p>
          <p>{`${workout.duration} minutes`}</p>
        </div>
        {pace()}
        <div>
          <p>{workout.description}</p>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => state;

export default connect(mapStateToProps, { openModal })(WorkoutCard);
